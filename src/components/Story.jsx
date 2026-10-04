import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { messyPapers, storyCaptions, services } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

/* Clip-path shapes: a flat sheet (16 points on the rectangle's edge) morphs into
   a lumpy paper ball (16 points on a jittered circle). Same point count = smooth tween. */
const N = 16
const sheetPoly = () => {
  const pts = []
  for (let k = 0; k < N; k++) {
    const a = (-135 + (360 / N) * k) * (Math.PI / 180)
    const c = Math.cos(a), s = Math.sin(a)
    const m = Math.max(Math.abs(c), Math.abs(s))
    pts.push(`${(50 + (50 * c) / m).toFixed(2)}% ${(50 + (50 * s) / m).toFixed(2)}%`)
  }
  return `polygon(${pts.join(', ')})`
}
const ballPoly = (seed) => {
  const pts = []
  for (let k = 0; k < N; k++) {
    const a = (-135 + (360 / N) * k) * (Math.PI / 180)
    const j = Math.sin(seed * 12.9898 + k * 78.233) * 43758.5453
    const r = 30 + (j - Math.floor(j)) * 9 // 30%..39% radius, lumpy
    pts.push(`${(50 + r * Math.cos(a)).toFixed(2)}% ${(50 + r * Math.sin(a)).toFixed(2)}%`)
  }
  return `polygon(${pts.join(', ')})`
}
const SHEET = sheetPoly()

function Creases() {
  return (
    <svg className="creases" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <radialGradient id="ballShade" cx="38%" cy="34%" r="70%">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset=".65" stopColor="#7d8aa3" stopOpacity=".28" />
          <stop offset="1" stopColor="#0A1A3A" stopOpacity=".55" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill="url(#ballShade)" />
      <g fill="none" stroke="#5b6b88" strokeOpacity=".55" strokeWidth=".9">
        <path d="M18 30 L42 44 L36 70 L60 62 L82 78" />
        <path d="M30 14 L44 44 L70 36 L86 52" />
        <path d="M14 58 L36 70 L30 88" />
        <path d="M60 62 L70 36 L62 16" />
        <path d="M42 44 L60 62 L58 86" />
        <path d="M70 36 L84 26" />
      </g>
      <g fill="none" stroke="#ffffff" strokeOpacity=".8" strokeWidth=".7">
        <path d="M22 32 L44 46 L38 68" />
        <path d="M62 18 L72 38 L88 50" />
      </g>
    </svg>
  )
}

function Paper({ p }) {
  return (
    <div className={`paper paper-${p.kind} ${p.mobile === false ? 'hide-sm' : ''}`} style={{ '--x': (p.x / 88).toFixed(3), left: `${p.x}%`, top: `${p.y}%`, '--r': `${p.r}deg` }} data-r={p.r}>
      <div className="paper-inner" style={{ clipPath: SHEET }}>
        <div className="paper-face">
          {p.kind === 'sticky' && <span className="tape" />}
          <strong>{p.title}</strong>
          {p.lines.map((l) => (<span key={l} className="paper-line">{l}</span>))}
          {p.note && <em className="paper-note">{p.note}</em>}
        </div>
        <Creases />
      </div>
    </div>
  )
}

const icons = {
  ai: <path d="M12 3v3M12 18v3M3 12h3M18 12h3M7 7h10v10H7zM10 10h4v4h-4z" />,
  wa: <path d="M4 20l1.3-4A8 8 0 1 1 8 18.7zM9 9.5c.5 2.5 2.5 4.5 5 5l1.2-1.2 2 1-.4 1.7c-4.6.3-8.6-3.7-8.3-8.3l1.7-.4 1 2z" />,
  app: <path d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2" />,
  sw: <path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 4l-4 16" />,
}
export const ServiceIcon = ({ id }) => (
  <svg className="svc-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{icons[id]}</svg>
)

export default function Story() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { root.current.classList.add('is-static'); return }

    const ctx = gsap.context(() => {
      const stage = root.current.querySelector('.story-stage')
      const desk = root.current.querySelector('.desk')
      const bin = root.current.querySelector('.bin')
      const papers = gsap.utils.toArray('.paper', root.current).filter((el) => el.offsetParent !== null)
      const inners = papers.map((p) => p.querySelector('.paper-inner'))
      const faces = papers.map((p) => p.querySelector('.paper-face'))
      const creases = papers.map((p) => p.querySelector('.creases'))
      const caps = gsap.utils.toArray('.story-caption', root.current)
      const dots = gsap.utils.toArray('.story-progress li', root.current)
      const cards = gsap.utils.toArray('.solution-card', root.current)

      papers.forEach((el) => gsap.set(el, { rotation: +el.dataset.r, xPercent: 0 }))
      gsap.set(caps.slice(1), { autoAlpha: 0, y: 30 })
      gsap.set(cards, { autoAlpha: 0, y: 90, scale: 0.9 })
      gsap.set('.solutions-head', { autoAlpha: 0, y: 20 })

      const binX = () => bin.offsetLeft + bin.offsetWidth / 2
      const binY = () => bin.offsetTop + bin.offsetHeight * 0.25
      const cx = (el) => el.offsetLeft + el.offsetWidth / 2
      const cy = (el) => el.offsetTop + el.offsetHeight / 2

      const setChapter = (n) => dots.forEach((d, i) => d.classList.toggle('is-active', i <= n))

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: () => `+=${window.innerHeight * 3.4}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => setChapter(self.progress < 0.28 ? 0 : self.progress < 0.68 ? 1 : 2),
        },
      })

      // Chapter 01: the mess fidgets a little (the office is alive and stressed)
      tl.to(papers, { y: (i) => (i % 2 ? -10 : 10), rotation: (i, el) => +el.dataset.r + (i % 2 ? 4 : -4), duration: 1, ease: 'sine.inOut' }, 0)
        .to('.desk-prop', { y: -6, duration: 1, ease: 'sine.inOut' }, 0)

      // Chapter 02: crumple every sheet into a ball
      tl.to(caps[0], { autoAlpha: 0, y: -30, duration: 0.5 }, 1)
        .to(caps[1], { autoAlpha: 1, y: 0, duration: 0.5 }, 1.3)
        .to(bin, { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power2.out' }, 1.2)

      inners.forEach((inner, i) => {
        const at = 1.2 + i * 0.22
        tl.to(inner, { clipPath: ballPoly(i + 1), scale: 0.42, rotation: (i % 2 ? 1 : -1) * 120, duration: 1.1, ease: 'power2.inOut' }, at)
          .to(faces[i], { autoAlpha: 0, filter: 'blur(2px)', duration: 0.6 }, at)
          .to(creases[i], { opacity: 1, duration: 0.8 }, at + 0.15)
      })

      // ...and toss them into the bin, in a little arc
      papers.forEach((el, i) => {
        const at = 3.6 + i * 0.2
        tl.to(el, { x: () => binX() - cx(el), duration: 1, ease: 'power1.out' }, at)
          .to(el, { y: () => binY() - cy(el), duration: 1, ease: 'back.in(2.2)' }, at)
          .to(el, { rotation: '+=280', duration: 1 }, at)
          .to(el, { scale: 0.35, autoAlpha: 0, duration: 0.25 }, at + 0.85)
          .to(bin, { rotation: i % 2 ? 4 : -4, duration: 0.1, yoyo: true, repeat: 1 }, at + 0.85)
      })
      tl.to('.desk-prop', { autoAlpha: 0, duration: 0.6 }, 5.2)

      // Chapter 03: clarity, the solutions rise out of the bin
      tl.to(caps[1], { autoAlpha: 0, y: -30, duration: 0.5 }, 5.6)
        .to(caps[2], { autoAlpha: 1, y: 0, duration: 0.5 }, 5.9)
        .to(bin, { y: 60, autoAlpha: 0, duration: 0.7, ease: 'power2.in' }, 6.1)
        .to(desk, { '--desk-tint': 1, duration: 0.8 }, 5.8)
        .to('.solutions-head', { autoAlpha: 1, y: 0, duration: 0.6 }, 6.4)
        .to(cards, { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.2, ease: 'back.out(1.6)' }, 6.6)
        .to('.solution-card .strike-wrap', { backgroundSize: '100% 2px', duration: 0.5, stagger: 0.2 }, 7.4)
        .to({}, { duration: 0.8 })
    }, root)

    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    return () => ctx.revert()
  }, [])

  return (
    <section className="story" id="story" ref={root} aria-label="From messy office to calm system">
      <div className="story-stage">
        <div className="story-top container">
          <ol className="story-progress" aria-hidden="true">
            <li className="is-active">Chaos</li><li>Crumple</li><li>Clarity</li>
          </ol>
          <div className="story-captions">
            {storyCaptions.map((c) => (
              <div className="story-caption" key={c.kicker}>
                <p className="eyebrow">{c.kicker}</p>
                <h2 className="display">{c.title}</h2>
                <p className="hand story-hand">{c.hand}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="desk">
          <svg className="desk-prop coffee" viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#b98a5a" strokeOpacity=".35" strokeWidth="5" strokeDasharray="190 30" />
            <circle cx="50" cy="50" r="30" fill="#e9d8c3" />
            <circle cx="50" cy="50" r="22" fill="#6b4a2f" />
          </svg>
          <svg className="desk-prop pencil" viewBox="0 0 200 20" aria-hidden="true">
            <rect x="20" y="4" width="150" height="12" fill="#14D411" />
            <rect x="0" y="4" width="22" height="12" fill="#227BFF" />
            <path d="M170 4 L198 10 L170 16z" fill="#f2d3a2" /><path d="M190 8.3 L198 10 L190 11.7z" fill="#0A1A3A" />
          </svg>
          <svg className="desk-prop clip" viewBox="0 0 30 60" aria-hidden="true">
            <path d="M8 50 V12 a7 7 0 0 1 14 0 V44 a4 4 0 0 1 -8 0 V16" fill="none" stroke="#8a97ad" strokeWidth="3" strokeLinecap="round" />
          </svg>

          {messyPapers.map((p) => <Paper key={p.id} p={p} />)}

          <svg className="bin" viewBox="0 0 120 130" aria-hidden="true">
            <path d="M14 22 L106 22 L96 124 L24 124 Z" fill="#0A1A3A" />
            <path d="M8 14 H112 V26 H8z" fill="#13285A" />
            <g stroke="#14D411" strokeWidth="3" opacity=".9"><path d="M38 40 L42 110" /><path d="M60 40 V110" /><path d="M82 40 L78 110" /></g>
            <text x="60" y="76" textAnchor="middle" fontFamily="Caveat, cursive" fontSize="17" fill="#fff" transform="rotate(-8 60 76)">old way</text>
          </svg>

          <div className="solutions">
            <p className="solutions-head hand">what Getanix puts on your desk instead</p>
            <div className="solution-grid">
              {services.map((s) => (
                <article className="solution-card" key={s.id}>
                  <ServiceIcon id={s.id} />
                  <h3>{s.short}</h3>
                  <p className="replaced hand"><span className="strike-wrap">{s.replaces}</span></p>
                  <p className="outcome">{s.outcome}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
