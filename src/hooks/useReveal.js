import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Gentle rise-in for anything marked [data-reveal]. Elements stay visible at rest
// (opacity never starts at 0), so nothing is hidden if scripts or observers lag.
export default function useReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 36,
          opacity: 0.35,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
    })
    const t = setTimeout(() => ScrollTrigger.refresh(), 600)
    return () => { clearTimeout(t); ctx.revert() }
  }, [])
}
