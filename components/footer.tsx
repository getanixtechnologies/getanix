import Link from "next/link";
import { Instagram, Youtube, Facebook, ArrowUpRight } from "lucide-react";
import { Logo } from "./ui";
import { navigation, site } from "@/data/site";
import { FestivalForm } from "./forms";
import { WaveDecoration } from "./decorations";
export function Newsletter() {
  return (
    <section className="newsletter-section">
      <div className="container newsletter-inner">
        <div data-reveal suppressHydrationWarning>
          <p className="eyebrow">LET THE CONVERSATION CONTINUE</p>
          <h2>
            Good stories.
            <br />
            <em>In your inbox.</em>
          </h2>
        </div>
        <div>
          <p>
            Be the first to hear about the programme,
            <br className="desktop-break" /> new voices and moments worth being
            there for.
          </p>
          <FestivalForm kind="newsletter" />
        </div>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <WaveDecoration />
      <div className="container">
        <div className="footer-top">
          <Link href="/" className="footer-brand">
            <Logo />
            <span>
              KOLLAM INTERNATIONAL
              <br />
              LITERATURE FESTIVAL
            </span>
          </Link>
          <p className="footer-tagline">More Human Tomorrow.</p>
          <div className="powered">
            <small>POWERED BY</small>
            <strong>© CAPITAL MEDIA</strong>
          </div>
        </div>
        <div className="footer-nav">
          <nav aria-label="Footer navigation">
            {navigation.map((n) => (
              <Link href={n.href} key={n.href}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="social-links">
            {[
              {
                name: "Instagram",
                href: site.socials.instagram,
                Icon: Instagram,
              },
              { name: "X", href: site.socials.x, Icon: ArrowUpRight },
              { name: "Facebook", href: site.socials.facebook, Icon: Facebook },
              { name: "YouTube", href: site.socials.youtube, Icon: Youtube },
            ]
              .filter((s) => s.href)
              .map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={18} />
                </a>
              ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 KILF. All rights reserved.</p>
          <div>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/accessibility">Accessibility</Link>
          </div>
          <span>MADE OF WORDS. ROOTED IN KOLLAM.</span>
        </div>
      </div>
    </footer>
  );
}
