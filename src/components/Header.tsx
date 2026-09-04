import { useEffect, useRef, useState } from "react";
import { contact, nav } from "../data/site";
import { Arrow } from "./primitives";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the mobile panel and restore focus on close.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) panelRef.current?.querySelector("a")?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key !== "Tab") return;
      const items = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!items?.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`hdr ${scrolled ? "is-solid" : ""} ${open ? "is-open" : ""}`}>
      <div className="hdr__inner container">
        <a className="hdr__brand" href="#top" aria-label="Triple Double Real Estate — home">
          <img
            src="/img/logo-white.png"
            width="800"
            height="400"
            alt=""
            className="hdr__logo hdr__logo--light"
          />
          <img
            src="/img/logo-navy.png"
            width="800"
            height="400"
            alt=""
            className="hdr__logo hdr__logo--dark"
          />
          <span className="sr-only">Triple Double Real Estate</span>
        </a>

        <nav className="hdr__nav" aria-label="Primary">
          <ul>
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hdr__end">
          <a className="hdr__cta btn btn--sm" href="#contact">
            Start a conversation
            <Arrow size={12} />
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="hdr__burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="hdr__burger-bars" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        className="mnav"
        hidden={!open}
        aria-label="Mobile"
      >
        <div className="mnav__inner container">
          <ul className="mnav__list">
            {nav.map((n, i) => (
              <li key={n.href} style={{ "--i": i } as React.CSSProperties}>
                <a href={n.href} onClick={() => setOpen(false)}>
                  <span className="mono mnav__num">{String(i + 1).padStart(2, "0")}</span>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mnav__foot">
            <a
              className="btn btn--light mnav__cta"
              href="#contact"
              onClick={() => setOpen(false)}
            >
              Start a conversation
              <Arrow size={12} />
            </a>
            <div className="mnav__meta">
              <a href={contact.emailHref}>{contact.email}</a>
              <a href={contact.phoneHref}>{contact.phone}</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
