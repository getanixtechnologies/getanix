import { useState } from 'react'
import { faqs } from '../data/content'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Faq() {
  const [group, setGroup] = useState(0)
  const [open, setOpen] = useState(0)
  const pick = (i) => { setGroup(i); setOpen(0); setTimeout(() => ScrollTrigger.refresh(), 350) }
  const toggle = (i) => { setOpen(open === i ? -1 : i); setTimeout(() => ScrollTrigger.refresh(), 350) }

  return (
    <section className="faq section grid-bg" id="faq">
      <div className="container faq-inner">
        <div className="faq-side" data-reveal>
          <p className="eyebrow">Frequently asked questions</p>
          <h2 className="display">Answers, <span className="hand big-hand">quickly.</span></h2>
          <div className="faq-tabs" role="tablist" aria-label="FAQ topics">
            {faqs.map((g, i) => (
              <button key={g.group} role="tab" id={`faq-tab-${i}`} aria-selected={group === i} className={group === i ? 'is-active' : ''} onClick={() => pick(i)}>
                {g.group}
              </button>
            ))}
          </div>
        </div>
        <div className="faq-list" role="tabpanel" aria-labelledby={`faq-tab-${group}`}>
          {faqs[group].items.map((f, i) => (
            <div className={`faq-item ${open === i ? 'is-open' : ''}`} key={f.q}>
              <button className="faq-q" aria-expanded={open === i} aria-controls={`faq-a-${group}-${i}`} id={`faq-q-${group}-${i}`} onClick={() => toggle(i)}>
                <span>{f.q}</span><i aria-hidden="true" />
              </button>
              <div className="faq-a" id={`faq-a-${group}-${i}`} role="region" aria-labelledby={`faq-q-${group}-${i}`}>
                <div><p>{f.a}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
