"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Logo } from "./ui";
import { MaroonBrush } from "./decorations";
import { images } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

const SHOW_INTRO_ONCE_PER_SESSION = true;
const INTRO_SESSION_KEY = "kilf-intro-shown";
const TITLE_WORDS = ["Kollam", "International", "Literature", "Festival"];

export function Intro() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  // Read once at component creation (before any effect can write the flag) so
  // this can't be fooled by React 19 Strict Mode's double-invoked effects in
  // dev, where a first effect run's write would otherwise be read back as
  // "already seen" by the immediately-following second run.
  const [alreadySeen] = useState(() => {
    try {
      return (
        SHOW_INTRO_ONCE_PER_SESSION && sessionStorage.getItem(INTRO_SESSION_KEY) === "1"
      );
    } catch {
      return false;
    }
  });

  useEffect(() => {
    // The `intro-seen` class (set synchronously by a beforeInteractive script in
    // the root layout, before this effect ever runs) already hides `.kilf-intro`
    // via CSS on repeat visits within the session — so there is nothing to
    // animate here, and no scroll-triggered pin to set up.
    if (alreadySeen) return;
    try {
      if (SHOW_INTRO_ONCE_PER_SESSION) sessionStorage.setItem(INTRO_SESSION_KEY, "1");
    } catch {}
    if (!root.current || !stage.current) return;

    // The one-time appearance animates the inner logo, while scroll drives the
    // wrapper. Sharing an element would make the scrubbed timeline record its
    // start values mid-fade — capturing opacity 0 as the logo's baseline and
    // animating up from invisible for the rest of the scroll.
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.fromTo(
      ".kilf-intro-mark .reference-logo",
      { opacity: 0, scale: prefersReduced ? 1 : 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
    );

    // Scope selector text to the intro section. matchMedia already reverts
    // everything created inside its callback, so it does the job a nested
    // gsap.context() was doing — nesting the two layered two cleanup paths
    // over the same elements, which under Strict Mode's mount/cleanup/mount
    // left a reverted zombie trigger behind holding the stage.
    const media = gsap.matchMedia(root.current);
    media.add(
      // Each pair must cover every case: gsap.matchMedia only invokes the
      // callback when at least one condition matches, so a set that can all
      // be false (e.g. only "reduce" + "max-width") silently builds no
      // animation at all on a wide, motion-friendly screen.
      {
        reduce: "(prefers-reduced-motion: reduce)",
        motion: "(prefers-reduced-motion: no-preference)",
        mobile: "(max-width: 760px)",
        desktop: "(min-width: 760.01px)",
      },
      (context) => {
        const { reduce, mobile } = context.conditions as {
          reduce: boolean;
          mobile: boolean;
        };
        const d = mobile ? 0.45 : 1;
        const section = root.current!;

        {
          gsap.set(".kilf-intro-goldline", { opacity: 1 });
          gsap.set(".kilf-intro-title-line", { yPercent: reduce ? 0 : 30 });
          gsap.set(".kilf-intro-motto", { yPercent: reduce ? 0 : 20 });
          gsap.set(".kilf-intro-handwriting", { yPercent: reduce ? 0 : 20 });

          if (!reduce) {
            gsap.set(".kilf-intro-image-1", { xPercent: -10, yPercent: 0, scale: 1.2 });
            gsap.set(".kilf-intro-image-2", { xPercent: 10, yPercent: 5, scale: 1.15 });
            gsap.set(".kilf-intro-image-3", { xPercent: -5, yPercent: 0, scale: 1.1 });
            gsap.set(".kilf-intro-image-4", { xPercent: 5, yPercent: 0, scale: 1.15 });
            gsap.set(".kilf-intro-brush", { opacity: 0, rotate: -8, xPercent: -4, yPercent: 2, scale: 1.1 });
          } else {
            gsap.set(".kilf-intro-image", { xPercent: 0, yPercent: 0, scale: 1.05, opacity: 0 });
            gsap.set(".kilf-intro-brush", { opacity: 0 });
          }

          // The stage is held in place by CSS `position: sticky`, not by
          // ScrollTrigger's pin. Pinning wraps the stage in a pin-spacer whose
          // padding feeds back into where this vh-sized section's "bottom"
          // sits, and its `position: fixed` fights the `overflow: clip` on
          // `.editorial-home` — both of which left scroll progress mapped onto
          // the wrong distance. Sticky is held by the browser itself, so
          // ScrollTrigger only has to read scroll position and drive values.
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => "+=" + (section.offsetHeight - window.innerHeight),
              invalidateOnRefresh: true,
              scrub: 0.8,
            },
            defaults: { ease: "none" },
          });

          // Phase 1 — 0 -> 0.20: logo grows, background stays near-black.
          // fromTo, not to: the start values must be stated rather than read
          // off whatever the element happens to look like when this is built.
          tl.fromTo(
            ".kilf-intro-mark",
            { scale: 1, opacity: 1, yPercent: 0 },
            { scale: reduce ? 1.1 : 1.6, duration: 0.2 },
            0,
          );

          if (!reduce) {
            // Phase 2 — 0.20 -> 0.45: Kollam imagery emerges as independent parallax layers.
            tl.to(".kilf-intro-overlay", { opacity: 0.9 }, 0.2)
              .to(".kilf-intro-overlay", { opacity: 0.75 }, 0.32)
              .to(".kilf-intro-overlay", { opacity: 0.55 }, 0.45)
              .to(".kilf-intro-image-1", { xPercent: 5 * d, yPercent: -5 * d, scale: 1 }, 0.2)
              .to(".kilf-intro-image-2", { xPercent: -5 * d, yPercent: -5 * d, scale: 1.05 }, 0.2)
              .to(".kilf-intro-image-3", { xPercent: 10 * d, scale: 1 }, 0.2)
              .to(".kilf-intro-image-4", { xPercent: -10 * d, scale: 1 }, 0.2)
              .to(".kilf-intro-brush", { opacity: 0.85, rotate: 4, xPercent: 3, yPercent: -4, scale: 1 }, 0.55);
          } else {
            tl.to(".kilf-intro-overlay", { opacity: 0.85 }, 0.2)
              .to(".kilf-intro-image", { opacity: 0.3 }, 0.2)
              .to(".kilf-intro-brush", { opacity: 0.4 }, 0.6);
          }

          // Phase 3 — 0.40 -> 0.65: the mark opens up and the scroll carries the
          // viewer through it — it keeps growing past the edges of the frame
          // while thinning to a watermark, and the festival title surfaces from
          // inside it rather than replacing it.
          tl.to(
            ".kilf-intro-mark",
            { scale: reduce ? 1.2 : 5.5, opacity: 0.1, yPercent: reduce ? 0 : -6 },
            0.4,
          ).to(
            ".kilf-intro-title-line",
            { opacity: 1, yPercent: 0, stagger: 0.05 },
            0.48,
          );
          if (!reduce) {
            tl.fromTo(
              ".kilf-intro-title",
              { scale: 0.92 },
              { scale: 1, duration: 0.25 },
              0.48,
            );
          }

          // Phase 4 — 0.65 -> 0.85: full identity — motto, handwriting, gold + maroon detail.
          tl.to(".kilf-intro-motto", { opacity: 1, yPercent: 0 }, 0.66)
            .to(".kilf-intro-handwriting", { opacity: 1, yPercent: 0 }, 0.73)
            .to(".kilf-intro-goldline", { scaleX: 1 }, 0.68);

          // Phase 5 — 0.85 -> 1.0: fade to black and release into the homepage hero.
          tl.to(
            [
              ".kilf-intro-mark",
              ".kilf-intro-title-line",
              ".kilf-intro-motto",
              ".kilf-intro-handwriting",
              ".kilf-intro-brush",
              ".kilf-intro-goldline",
            ],
            { opacity: 0 },
            0.92,
          ).to(".kilf-intro-overlay", { opacity: 1 }, 0.9);
        }
      },
    );

    return () => {
      media.revert();
    };
  }, [alreadySeen]);

  return (
    <section className="kilf-intro" ref={root} aria-hidden="true">
      <div className="kilf-intro-stage" ref={stage}>
        <div className="kilf-intro-images">
          <div className="kilf-intro-image kilf-intro-image-1">
            <Image src={images.lighthouse} alt="" fill sizes="100vw" />
          </div>
          <div className="kilf-intro-image kilf-intro-image-2">
            <Image src={images.backwaters} alt="" fill sizes="100vw" />
          </div>
          <div className="kilf-intro-image kilf-intro-image-3">
            <Image src={images.coast} alt="" fill sizes="100vw" />
          </div>
          <div className="kilf-intro-image kilf-intro-image-4">
            <Image src={images.maidan} alt="" fill sizes="100vw" />
          </div>
        </div>
        <div className="kilf-intro-overlay" />
        <MaroonBrush className="kilf-intro-brush" />
        <span className="kilf-intro-goldline kilf-intro-goldline-a" />
        <span className="kilf-intro-goldline kilf-intro-goldline-b" />
        <div className="kilf-intro-mark">
          <Logo />
        </div>
        <h2 className="kilf-intro-title">
          {TITLE_WORDS.map((word) => (
            <span className="kilf-intro-title-line" key={word}>
              {word}
            </span>
          ))}
        </h2>
        <p className="kilf-intro-motto">Words · People · Possibilities</p>
        <p className="kilf-intro-handwriting">
          More Human
          <br />
          <span>Tomorrow</span>
        </p>
      </div>
    </section>
  );
}
