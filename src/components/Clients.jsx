import { clients } from '../data/content'
import Marquee from './Marquee'

export default function Clients() {
  return (
    <section className="clients section grid-bg" id="clients">
      <div className="container">
        <div className="clients-head" data-reveal>
          <div>
            <p className="eyebrow">Our valued clients & partners</p>
            <h2 className="display">Brands that <span className="hand big-hand">trust</span> Getanix.</h2>
          </div>
          <p className="lead">We are proud to collaborate with forward-thinking organizations across technology, culture, fashion, print, media and community care.</p>
        </div>

        <ul className="logo-wall" data-reveal>
          {clients.map((c) => (
            <li className="logo-cell" key={c.name}>
              <span className="cross tl" aria-hidden="true" /><span className="cross br" aria-hidden="true" />
              <div className="logo-box">
                {c.logo ? (
                  <img src={c.logo} alt={c.name} loading="lazy" className={c.fit === 'cover' ? 'is-tile' : ''} />
                ) : (
                  <span className="wordmark" aria-label={c.name}>CAPITAL<b>MEDIA</b></span>
                )}
              </div>
              <div className="logo-meta">
                <span className="logo-name">{c.name}</span>
                <span className="logo-sector">{c.sector}</span>
              </div>
            </li>
          ))}
          <li className="logo-cell logo-cell-cta">
            <span className="cross tl" aria-hidden="true" /><span className="cross br" aria-hidden="true" />
            <p className="hand">your logo here?</p>
            <a href="#contact" className="btn btn-green btn-sm">Let's talk</a>
          </li>
        </ul>
      </div>
      <div className="clients-strip">
        <Marquee items={clients.map((c) => c.name)} variant="light" speed={30} />
      </div>
    </section>
  )
}
