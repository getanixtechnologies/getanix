import badge from '../assets/getanix-badge.png'
import { heroKeywords } from '../data/content'
import { scrollToId } from '../hooks/useLenis'

export default function Hero() {
  return (
    <section className="hero grid-bg" id="top">
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow"><span className="dot" /> Kerala, India · Serving clients worldwide</p>
          <h1 className="display hero-title">
            Turn office <span className="strike">chaos</span>
            <br />into calm, <span className="green">automated</span> systems.
          </h1>
          <p className="hand hero-hand">
            from paper piles to pipelines
            <svg className="hand-arrow" viewBox="0 0 120 60" aria-hidden="true">
              <path d="M4 8 C 40 4, 80 14, 104 46" />
              <path d="M90 44 L106 50 L106 33" />
            </svg>
          </p>
          <p className="lead">
            Getanix Technologies builds AI agents, WhatsApp automation, mobile apps and custom software
            that help businesses streamline operations, engage customers and grow without the paperwork.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-green" onClick={(e) => { e.preventDefault(); scrollToId('contact') }}>Start a project</a>
            <a href="#story" className="btn btn-ghost" onClick={(e) => { e.preventDefault(); scrollToId('story') }}>
              Watch the story
              <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M8 2v11M3 8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="orbit orbit-1" />
          <div className="orbit orbit-2" />
          <img src={badge} alt="" className="hero-badge" width="360" height="360" />
          {heroKeywords.map((k, i) => (
            <span key={k} className={`chip float chip-${i}`}>{k}</span>
          ))}
          <span className="hand hero-note">built in Kerala ♥</span>
        </div>
      </div>
      <div className="scroll-cue" aria-hidden="true"><span>scroll</span><i /></div>
    </section>
  )
}
