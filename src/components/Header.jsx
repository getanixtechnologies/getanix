import { useEffect, useState } from 'react'
import Logo from './Logo'
import { nav } from '../data/content'
import { scrollToId, getLenis } from '../hooks/useLenis'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const lenis = getLenis()
    if (open) { lenis?.stop(); document.documentElement.classList.add('menu-open') }
    else { lenis?.start(); document.documentElement.classList.remove('menu-open') }
  }, [open])

  const go = (id) => (e) => { e.preventDefault(); setOpen(false); setTimeout(() => scrollToId(id), open ? 250 : 0) }

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="header-inner">
        <a href="#top" className="brand" onClick={go('top')} aria-label="Getanix Technologies, back to top">
          <Logo />
        </a>
        <nav className="desktop-nav" aria-label="Main">
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={go(n.id)}>{n.label}</a>
          ))}
        </nav>
        <a href="#contact" className="btn btn-green header-cta" onClick={go('contact')}>Start a project</a>
        <button className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span className="bar" /><span className="bar" />
        </button>
      </div>

      <div id="mobile-menu" className="mobile-menu" aria-hidden={!open}>
        <div className="mobile-menu-logo"><Logo light /></div>
        <nav aria-label="Mobile">
          {nav.map((n, i) => (
            <a key={n.id} href={`#${n.id}`} onClick={go(n.id)} tabIndex={open ? 0 : -1} style={{ '--i': i }}>
              <span className="mm-no">0{i + 1}</span>{n.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn btn-green" onClick={go('contact')} tabIndex={open ? 0 : -1} style={{ '--i': nav.length }}>Start a project</a>
        <p className="hand mm-hand">less paper, more progress</p>
      </div>
    </header>
  )
}
