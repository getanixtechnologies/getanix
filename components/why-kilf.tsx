"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Globe2, UsersRound, Accessibility, BookOpen } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

const BELIEFS = [
  { Icon: Globe2, title: "Global Conversations", text: "Bringing diverse perspectives together." },
  { Icon: UsersRound, title: "Diverse Voices", text: "Amplifying underrepresented voices." },
  { Icon: Accessibility, title: "Inclusive & Accessible", text: "Literature for everyone." },
  { Icon: BookOpen, title: "A Platform for Change", text: "Ideas that create a better tomorrow." },
];

export function WhyKilf() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const section = root.current;

    // Both conditions together always match one branch — a set that can all be
    // false builds no animation at all and leaves the section in its
    // pre-animation state.
    const media = gsap.matchMedia(section);
    media.add(
      {
        reduce: "(prefers-reduced-motion: reduce)",
        motion: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { reduce } = context.conditions as { reduce: boolean };
        if (reduce) return;

        const intro = gsap.timeline({
          scrollTrigger: { trigger: section, start: "top 72%", once: true },
          defaults: { ease: "power2.out" },
        });
        intro
          .from(".editorial-why-photo img", { scale: 1.16, duration: 1.4, ease: "power2.inOut" }, 0)
          .from(".editorial-why-script", { opacity: 0, rotate: -22, y: 18, duration: 0.9 }, 0.45)
          .from(".editorial-why-copy .eyebrow", { opacity: 0, y: 10, duration: 0.5 }, 0.25)
          .from(".why-word", { yPercent: 115, duration: 0.75, stagger: 0.09 }, 0.35)
          .from(".editorial-why-lede", { opacity: 0, y: 12, duration: 0.55 }, 0.7)
          .from(
            ".editorial-beliefs li",
            { opacity: 0, y: 16, duration: 0.5, stagger: 0.09 },
            0.8,
          )
          .from(
            ".editorial-beliefs svg",
            { scale: 0.5, duration: 0.45, stagger: 0.09, ease: "back.out(2)" },
            0.85,
          )
          .from(".editorial-why-quote", { opacity: 0, y: 26, duration: 0.7 }, 0.95);

        // Gentle drift on the photo for the whole time the section is passing
        // through. yPercent only, so it never competes with the entrance
        // tween above for the same transform component.
        gsap.to(".editorial-why-photo img", {
          yPercent: -5,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      },
    );

    return () => media.revert();
  }, []);

  return (
    <section className="editorial-why" ref={root} aria-labelledby="why-kilf-title">
      <div className="editorial-why-photo">
        <Image
          src={images.backwaters}
          alt="Houseboat on Kerala's palm-lined backwaters"
          fill
          sizes="(max-width: 700px) 100vw, 45vw"
        />
        <span className="editorial-why-script">
          More Human
          <br />
          Tomorrow
        </span>
      </div>
      <div className="editorial-why-copy">
        <p className="eyebrow">About KILF</p>
        <h2 id="why-kilf-title">
          <span className="why-mask">
            <span className="why-word">Why</span>
          </span>{" "}
          <span className="why-mask">
            <span className="why-word">KILF?</span>
          </span>
        </h2>
        <p className="editorial-why-lede">
          Because stories have the power to cross borders, build bridges and spark change.
        </p>
        <ul className="editorial-beliefs">
          {BELIEFS.map(({ Icon, title, text }) => (
            <li key={title}>
              <Icon />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <blockquote className="editorial-why-quote">
        <p>
          “Books,
          <br />
          conversations
          <br />
          and people
          <br />
          can change
          <br />
          the world.”
        </p>
      </blockquote>
    </section>
  );
}
