"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site, stats } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);
export function Hero() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!root.current) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        const intro = gsap.timeline({ defaults: { ease: "power2.out" } });
        intro.from(".editorial-atmosphere", { opacity: 0, duration: 0.5 })
          .from(".editorial-photo-reveal", { clipPath: "inset(0 0 100% 0)", duration: 1 }, 0.15)
          .from(".editorial-brush-reveal", { opacity: 0, duration: 0.75 }, 0.6)
          .from(".editorial-eyebrow", { opacity: 0, y: 8, duration: 0.4 }, 1.1)
          .from(".editorial-word", { yPercent: 110, duration: 0.65, stagger: 0.13 }, 1.2)
          .from(".editorial-description, .editorial-meta", { opacity: 0, y: 8, stagger: 0.12, duration: 0.45 }, 1.9)
          .from(".editorial-actions a", { opacity: 0, y: 8, stagger: 0.1, duration: 0.4 }, 2.1)
          .from(".editorial-handwriting, .editorial-birds", { opacity: 0, duration: 0.7 }, 1.3)
          .fromTo(".editorial-gold path", { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 2 }, 1.3);
        const scroll = { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 };
        gsap.fromTo(".editorial-photo", { scale: 1.05 }, { scale: 1, ease: "none", scrollTrigger: scroll });
        gsap.to(".editorial-brush", { x: 9, y: -12, ease: "none", scrollTrigger: scroll });
        gsap.to(".editorial-gold", { y: -14, ease: "none", scrollTrigger: scroll });
        gsap.to(".editorial-handwriting", { y: -20, ease: "none", scrollTrigger: scroll });
        gsap.to(".editorial-heading", { y: -12, ease: "none", scrollTrigger: scroll });
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);
  return (
    <>
      <section className="editorial-hero" ref={root} aria-labelledby="festival-headline">
        <div className="editorial-atmosphere" aria-hidden="true" />
        <div className="editorial-intro">
          <p className="eyebrow editorial-eyebrow">Words · People · Possibilities</p>
          <h1 id="festival-headline" className="editorial-heading">
            {["Kollam", "International", "Literature", "Festival"].map(word => <span className="editorial-word-mask" key={word}><span className="editorial-word">{word}</span></span>)}
          </h1>
        </div>
        <div className="editorial-art" aria-hidden="true">
          <div className="editorial-photo-mask">
            <div className="editorial-photo-reveal">
              <Image className="editorial-photo" src="/images/hero-lighthouse-v2.png" alt="" fill priority sizes="(max-width: 700px) 100vw, 57vw" />
            </div>
          </div>
          <div className="editorial-brush-reveal">
            <Image className="editorial-brush" src="/images/maroon-frame.png" alt="" fill priority sizes="(max-width: 700px) 100vw, 57vw" />
          </div>
          <svg className="editorial-birds" viewBox="0 0 400 180" fill="none">
            <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M70 80q8-2 12 5q2-8 11-10M210 31q9 0 12 7q4-8 12-8M280 98q8-4 13 1q2-8 9-10M146 134q7-1 10 5q2-7 9-9" />
            </g>
          </svg>
          <p className="editorial-handwriting">More Human<br /><span>Tomorrow</span></p>
          <svg className="editorial-gold" viewBox="0 0 800 200" fill="none">
            <path pathLength="1" d="M3 125C90 18 159 70 238 115S385 162 491 125 624 61 795 130" />
            <path pathLength="1" d="M15 144C106 43 175 96 241 129" />
          </svg>
        </div>
        <div className="editorial-details">
          <p className="editorial-description">A global gathering of writers, thinkers, artists<br className="desktop-break" /> and change-makers in the heart of Kollam.<br className="desktop-break" /> Conversations that inspire. Ideas that unite.</p>
          <div className="editorial-meta">
            <span><CalendarDays size={17} />{site.dates}</span>
            <span><MapPin size={17} />{site.location}</span>
          </div>
          <div className="editorial-actions">
            <Link href="/passes" className="button button-primary">Pass Registration <ArrowRight size={16} /></Link>
            <Link href="/volunteer" className="button button-outline">Become a Volunteer <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
      <section className="editorial-stats" aria-label="Festival at a glance">
        <div className="container editorial-stats-inner">
          {stats.map(stat => <div className="editorial-stat" key={stat.label}><strong>{stat.value}{stat.suffix}</strong><span>{stat.label}</span></div>)}
        </div>
      </section>
    </>
  );
}
