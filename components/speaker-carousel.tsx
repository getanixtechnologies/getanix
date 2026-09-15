"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { speakers } from "@/data/speakers";
gsap.registerPlugin(ScrollTrigger);
const DRAG_THRESHOLD = 6;
const AUTOPLAY_MS = 3800;
export function SpeakerCarousel() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const offsetRef = useRef(0);
  const activeRef = useRef(0);
  const drag = useRef({ dragging: false, moved: false, startX: 0, startOffset: 0 });
  const interaction = useRef({ hovered: false, focused: false });
  const pinActiveRef = useRef(false);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const step = useCallback(() => {
    const card = cardRefs.current[0];
    const track = trackRef.current;
    if (!card || !track) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0") || 0;
    return card.getBoundingClientRect().width + gap;
  }, []);
  // How far the track can travel before its right edge reaches the right edge
  // of the viewport. Advancing a full step per card would keep going until the
  // last card sits flush left, trailing a screen of empty space behind it.
  const maxTravel = useCallback(() => {
    const track = trackRef.current;
    const viewport = track?.parentElement;
    if (!track || !viewport) return 0;
    const style = getComputedStyle(viewport);
    const visible =
      viewport.clientWidth -
      (parseFloat(style.paddingLeft) || 0) -
      (parseFloat(style.paddingRight) || 0);
    return Math.max(0, track.scrollWidth - visible);
  }, []);
  const goTo = useCallback(
    (index: number) => {
      const wrapped = ((index % speakers.length) + speakers.length) % speakers.length;
      activeRef.current = wrapped;
      setActive(wrapped);
      const track = trackRef.current;
      if (!track) return;
      const x = Math.max(-wrapped * step(), -maxTravel());
      offsetRef.current = x;
      gsap.to(track, {
        x,
        duration: reducedMotion() ? 0 : 0.75,
        ease: "power3.out",
      });
    },
    [step, maxTravel],
  );
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onDown = (e: PointerEvent) => {
      if (pinActiveRef.current) return;
      if (e.button !== undefined && e.button !== 0) return;
      drag.current = {
        dragging: true,
        moved: false,
        startX: e.clientX,
        startOffset: offsetRef.current,
      };
      track.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!drag.current.dragging) return;
      if (pinActiveRef.current) {
        drag.current.dragging = false;
        return;
      }
      const dx = e.clientX - drag.current.startX;
      if (Math.abs(dx) > DRAG_THRESHOLD) drag.current.moved = true;
      gsap.set(track, { x: drag.current.startOffset + dx });
    };
    const onUp = (e: PointerEvent) => {
      if (!drag.current.dragging) return;
      drag.current.dragging = false;
      if (pinActiveRef.current) return;
      const dx = e.clientX - drag.current.startX;
      const s = step();
      if (s && Math.abs(dx) > s * 0.18) {
        goTo(activeRef.current + (dx < 0 ? 1 : -1));
      } else {
        goTo(activeRef.current);
      }
    };
    track.addEventListener("pointerdown", onDown);
    track.addEventListener("pointermove", onMove);
    track.addEventListener("pointerup", onUp);
    track.addEventListener("pointercancel", onUp);
    return () => {
      track.removeEventListener("pointerdown", onDown);
      track.removeEventListener("pointermove", onMove);
      track.removeEventListener("pointerup", onUp);
      track.removeEventListener("pointercancel", onUp);
    };
  }, [goTo, step]);
  useEffect(() => {
    const onResize = () => {
      if (pinActiveRef.current) return;
      goTo(activeRef.current);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [goTo]);
  // Scroll-jack: pin the section while the user scrolls through it, driving
  // the horizontal card position from vertical scroll progress, then release
  // the pin so the page continues scrolling normally.
  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track || reducedMotion()) return;
    const section = (root.closest(".speakers-section") as HTMLElement | null) ?? root;
    const total = speakers.length - 1;
    if (total <= 0) return;
    if (maxTravel() <= 0) return;
    const syncActive = (idx: number) => {
      offsetRef.current = Math.max(-idx * step(), -maxTravel());
      activeRef.current = idx;
      setActive(idx);
    };
    // The furthest card reachable once travel stops at the right edge, which
    // is short of the last index whenever several cards share the viewport.
    const lastIndex = () => (step() ? Math.round(maxTravel() / step()) : 0);
    const ctx = gsap.context(() => {
      // Held in an object the boundary callbacks below can read later.
      // ScrollTrigger can fire them while it is still building the tween (on a
      // reload that restores a scroll position past this section, say), and a
      // plain `const tween = gsap.to(...)` would throw on access before it is
      // initialised.
      const held: { tween?: gsap.core.Tween } = {};
      held.tween = gsap.to(track, {
        x: () => -maxTravel(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + maxTravel(),
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          onUpdate: (self) => {
            syncActive(Math.round(self.progress * lastIndex()));
          },
          onToggle: (self) => {
            pinActiveRef.current = self.isActive;
          },
          // Guarantee the boundary cards always land fully in or out of
          // view, even if a very fast scroll skips the frame that would
          // have driven the tween all the way to 0 or 1.
          onLeave: () => {
            held.tween?.progress(1);
            syncActive(lastIndex());
          },
          onLeaveBack: () => {
            held.tween?.progress(0);
            syncActive(0);
          },
        },
      });
    }, root);
    return () => ctx.revert();
  }, [step, maxTravel]);
  // Autoplay: advance to the right on an interval, pausing on hover, focus,
  // drag, reduced motion, an off-screen section, or a hidden tab.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !playing) return;
    let visible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.25 },
    );
    observer.observe(root);
    const interval = window.setInterval(() => {
      if (
        visible &&
        !document.hidden &&
        !interaction.current.hovered &&
        !interaction.current.focused &&
        !drag.current.dragging &&
        !pinActiveRef.current
      ) {
        goTo(activeRef.current + 1);
      }
    }, AUTOPLAY_MS);
    return () => {
      observer.disconnect();
      window.clearInterval(interval);
    };
  }, [playing, goTo]);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const cards = cardRefs.current.filter(Boolean);
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 85%", once: true },
      });
      tl.from(".cinema-rule", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 0.6,
        ease: "power2.out",
      })
        .from(
          cards,
          { opacity: 0, y: 40, duration: 0.7, stagger: 0.1, ease: "power2.out" },
          "-=0.3",
        )
        .from(
          ".cinema-controls",
          { opacity: 0, y: 12, duration: 0.5, ease: "power2.out" },
          "-=0.3",
        );
    });
    media.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".cinema-rule", { scaleX: 1 });
      gsap.set(cardRefs.current.filter(Boolean), { opacity: 1, y: 0 });
      gsap.set(".cinema-controls", { opacity: 1, y: 0 });
    });
    return () => media.revert();
  }, []);
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (pinActiveRef.current) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(active + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(active - 1);
    }
  };
  return (
    <div
      className="speaker-cinema"
      ref={rootRef}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") interaction.current.hovered = true;
      }}
      onPointerLeave={() => {
        interaction.current.hovered = false;
      }}
      onFocusCapture={() => {
        interaction.current.focused = true;
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          interaction.current.focused = false;
        }
      }}
    >
      <span className="cinema-rule" aria-hidden />
      <div className="cinema-viewport">
        <div
          className="cinema-track"
          ref={trackRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Coming speakers. Use arrow keys or drag to browse."
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          {speakers.map((speaker, index) => {
            const isActive = index === active;
            return (
              <div
                key={speaker.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={"cinema-card" + (isActive ? " is-active" : "")}
                aria-current={isActive ? "true" : undefined}
                onClick={() => {
                  if (!drag.current.moved && !pinActiveRef.current) goTo(index);
                }}
              >
                <div className="cinema-reveal">
                  <h3>{speaker.name}</h3>
                  <p className="cinema-role">{speaker.role}</p>
                  <p className="cinema-quote">&ldquo;{speaker.quote}&rdquo;</p>
                  <Link
                    href={"/speakers/" + speaker.slug}
                    className="cinema-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Profile <ArrowRight size={14} />
                  </Link>
                </div>
                <div className="cinema-card-media">
                  <Image
                    src={speaker.image}
                    alt={"Illustrative portrait of " + speaker.name}
                    fill
                    draggable={false}
                    sizes="(max-width: 700px) 88vw, 33vw"
                  />
                  <div className="cinema-card-shade" />
                  <div className="cinema-card-caption">
                    <h4>{speaker.name}</h4>
                    <p>{speaker.role}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="cinema-controls">
        <span className="cinema-count">
          {String(active + 1).padStart(2, "0")} /{" "}
          {String(speakers.length).padStart(2, "0")}
        </span>
        <div className="cinema-arrows">
          <button
            className="cinema-autoplay"
            aria-label={playing ? "Pause automatic scrolling" : "Start automatic scrolling"}
            onClick={() => setPlaying((p) => !p)}
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button
            aria-label="Previous speaker"
            onClick={() => {
              if (!pinActiveRef.current) goTo(active - 1);
            }}
          >
            <ArrowLeft size={18} />
          </button>
          <button
            aria-label="Next speaker"
            onClick={() => {
              if (!pinActiveRef.current) goTo(active + 1);
            }}
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
