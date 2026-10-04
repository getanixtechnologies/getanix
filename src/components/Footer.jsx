import Logo from './Logo'
import Marquee from './Marquee'
import { services, nav } from '../data/content'
import { scrollToId } from '../hooks/useLenis'

export default function Footer() {
  const go = (id) => (e) => { e.preventDefault(); scrollToId(id) }
  return (
    <footer className="site-footer">
      <Marquee items={['Empowering digital transformation', 'AI', 'Automation', 'Apps', 'Software']} variant="footer" speed={44} />
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo light className="footer-logo" />
          <p>A dynamic technology company delivering AI solutions, WhatsApp automation, mobile apps and custom software for businesses that want to grow.</p>
          <p className="hand footer-hand">empowering digital transformation</p>
        </div>
        <div>
          <h4>Solutions</h4>
          <ul>{services.map((s) => <li key={s.id}><a href="#solutions" onClick={go('solutions')}>{s.title}</a></li>)}</ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            {nav.map((n) => <li key={n.id}><a href={`#${n.id}`} onClick={go(n.id)}>{n.label}</a></li>)}
            <li><a href="#contact" onClick={go('contact')}>Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Visit</h4>
          <ul className="footer-contact">
            <li>Development center<br /><strong>Kerala, India</strong></li>
            <li>Remote & hybrid teams<br /><strong>Serving clients worldwide</strong></li>
          </ul>
          <a href="#contact" className="btn btn-green btn-sm" onClick={go('contact')}>Book a free consultation</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Getanix Technologies. All rights reserved.</p>
        <a href="#top" onClick={go('top')} className="to-top">Back to top ↑</a>
      </div>
      <div className="footer-giant" aria-hidden="true">GETANIX</div>
    </footer>
  )
}
