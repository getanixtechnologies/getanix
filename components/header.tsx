"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/data/site";
import { Logo } from "./ui";
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  function close() {
    setOpen(false);
    toggle.current?.focus();
  }
  useEffect(() => {
    const change = () => setScrolled(window.scrollY > 24);
    change();
    window.addEventListener("scroll", change, { passive: true });
    return () => window.removeEventListener("scroll", change);
  }, []);
  useEffect(() => {
    if (!open) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const main = document.getElementById("main-content");
    const footer = document.querySelector("footer");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");
    const focusTimer = setTimeout(
      () => panel.current?.querySelector<HTMLButtonElement>("button")?.focus(),
      50,
    );
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab") {
        const elements = Array.from(
          panel.current?.querySelectorAll<HTMLElement>("a,button") || [],
        );
        const first = elements[0],
          last = elements[elements.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    const media = window.matchMedia("(min-width: 1100px)");
    const resize = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", resize);
    document.addEventListener("keydown", key);
    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = old;
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      document.removeEventListener("keydown", key);
      media.removeEventListener("change", resize);
    };
  }, [open]);
  return (
    <>
      <header
        className={
          "site-header " +
          (scrolled ? "scrolled " : "") +
          (open ? "menu-is-open" : "")
        }
        aria-hidden={open ? true : undefined}
      >
        <div className="header-inner">
          <Link
            href="/"
            className="logo-link"
            aria-label="KILF home"
            onClick={close}
          >
            <Logo />
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link
              className="button button-outline volunteer-link"
              href="/volunteer"
            >
              Volunteer
            </Link>
            <Link className="button button-primary header-pass" href="/passes">
              Pass Registration <ArrowUpRight size={15} aria-hidden />
            </Link>
            <button
              ref={toggle}
              className="menu-toggle"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(!open)}
            >
              <Menu />
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panel}
            id="mobile-menu"
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            data-lenis-prevent
            initial={{ opacity: 0, y: reduced ? 0 : -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -15 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mobile-menu-top">
              <Link href="/" aria-label="KILF home" onClick={close}>
                <Logo />
              </Link>
              <button
                className="menu-toggle"
                aria-label="Close menu"
                onClick={close}
              >
                <X />
              </button>
            </div>
            <nav aria-label="Mobile navigation">
              {[...navigation, { label: "Volunteer", href: "/volunteer" }].map(
                (item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: reduced ? 0 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduced ? 0 : i * 0.025 }}
                  >
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      onClick={close}
                    >
                      <span className="menu-number">0{i + 1}</span>
                      {item.label}
                      <ArrowUpRight />
                    </Link>
                  </motion.div>
                ),
              )}
            </nav>
            <p className="eyebrow">WORDS. PEOPLE. POSSIBILITIES.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
