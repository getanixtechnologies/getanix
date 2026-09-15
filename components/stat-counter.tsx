"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export function StatCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    const count = { value: 0 };
    const tween = gsap.to(count, {
      value,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 95%", once: true },
      onUpdate: () => setDisplay(Math.round(count.value)),
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value]);
  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
