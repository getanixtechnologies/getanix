"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger);
// Lenis drives scroll via GSAP's own ticker (below); without disabling lag
// smoothing, GSAP can silently skip ticks it perceives as "catching up" after
// any delay (page load, HMR, heavy paint), which stalls Lenis's raf loop and
// freezes every scrub-linked ScrollTrigger (e.g. a pinned intro) after its
// first frame. This must run once, globally, before Lenis starts ticking.
gsap.ticker.lagSmoothing(0);
export function MotionProvider() {
  const pathname = usePathname();
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        anchors: true,
        prevent: (node) => node.closest("[data-lenis-prevent]") !== null,
      });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      // Belt-and-suspenders: also update ScrollTrigger straight off the
      // native scroll event. Lenis's own "scroll" event should cover this,
      // but scroll that reaches the document without passing through
      // Lenis's wheel handling (programmatic scrollTo, some input methods)
      // otherwise leaves every scrub-linked ScrollTrigger stuck on its
      // first frame even though the page is visibly scrolling.
      const onNativeScroll = () => ScrollTrigger.update();
      window.addEventListener("scroll", onNativeScroll, { passive: true });
      gsap.utils
        .toArray<HTMLElement>("[data-reveal]")
        .forEach((el) =>
          gsap.from(el, {
            y: 28,
            opacity: 0,
            duration: 0.7,
            scrollTrigger: { trigger: el, start: "top 94%", once: true },
          }),
        );
      gsap.utils
        .toArray<HTMLElement>("[data-parallax]")
        .forEach((el) =>
          gsap.to(el, {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }),
        );
      const timer = setTimeout(() => ScrollTrigger.refresh(), 500);
      return () => {
        clearTimeout(timer);
        gsap.ticker.remove(tick);
        window.removeEventListener("scroll", onNativeScroll);
        lenis.destroy();
      };
    });
    return () => media.revert();
  }, [pathname]);
  return null;
}
