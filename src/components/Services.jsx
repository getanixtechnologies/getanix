import { services } from '../data/content'
import { ServiceIcon } from './Story'
import { scrollToId } from '../hooks/useLenis'

export default function Services() {
  return (
    <section className="services section" id="solutions">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">Our core products & services</p>
          <h2 className="display">Four ways we <span className="green">future-proof</span> your business.</h2>
          <p className="lead">From custom software to intelligent automation, our developers and strategists turn your ideas into products people actually use.</p>
        </div>

        <div className="svc-list">
          {services.map((s) => (
            <article className="svc" key={s.id} data-reveal>
              <div className="svc-num" aria-hidden="true">{s.no}</div>
              <div className="svc-main">
                <div className="svc-title">
                  <ServiceIcon id={s.id} />
                  <h3>{s.title}</h3>
                </div>
                <p className="hand svc-hand">{s.hand}</p>
                <p className="svc-desc">{s.description}</p>
              </div>
              <div className="svc-side">
                <ul className="kw" aria-label={`${s.title} keywords`}>
                  {s.keywords.map((k) => <li key={k}>{k}</li>)}
                </ul>
                <a href="#contact" className="svc-link" onClick={(e) => { e.preventDefault(); scrollToId('contact') }}>
                  {s.cta}
                  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
