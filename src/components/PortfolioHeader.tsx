"use client";

import { ArrowDownToLine, Languages, Menu, X } from "lucide-react";
import { type MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { copy } from "@/data/portfolio";

export function PortfolioHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [headerHeight, setHeaderHeight] = useState(84);
  const headerRef = useRef<HTMLElement>(null);
  const { language, toggleLanguage } = useLanguage();
  const labels = copy[language].nav;
  const items = useMemo(() => [
    { href: "#work", label: labels.work },
    { href: "#experience", label: labels.experience },
    { href: "#skills", label: labels.skills },
    { href: "#education", label: labels.about },
  ], [labels]);

  const scrollToSection = useCallback((href: string, behavior: ScrollBehavior = "auto") => {
    if (href === "#top") {
      window.scrollTo({ top: 0, behavior });
      return;
    }

    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;

    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 28;
    window.scrollTo({ top: Math.max(0, targetTop), behavior });
  }, [headerHeight]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const syncHeight = () => {
      const height = Math.round(header.getBoundingClientRect().height);
      setHeaderHeight(height);
      document.documentElement.style.setProperty("--header-offset", `${height}px`);
    };

    syncHeight();
    const observer = new ResizeObserver(syncHeight);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const scrollToHash = (behavior: ScrollBehavior = "auto") => {
      const href = window.location.hash;
      if (!href || href === "#top") return;
      scrollToSection(href, behavior);
    };

    let timeout = 0;
    let cancelled = false;
    const alignHash = () => {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => scrollToHash());
      });
      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => scrollToHash(), 180);
    };
    alignHash();
    document.fonts?.ready.then(() => {
      if (!cancelled) scrollToHash();
    }).catch(() => undefined);
    window.addEventListener("hashchange", alignHash);
    return () => {
      cancelled = true;
      window.removeEventListener("hashchange", alignHash);
      window.clearTimeout(timeout);
    };
  }, [scrollToSection]);

  useEffect(() => {
    const sections = items
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((section): section is HTMLElement => section !== null);
    if (sections.length === 0 || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveSection(`#${visible.target.id}`);
      },
      { rootMargin: `-${headerHeight + 28}px 0px -58% 0px`, threshold: 0.05 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [headerHeight, items]);

  const navigateToSection = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setMenuOpen(false);

    window.history.pushState(null, "", href);
    scrollToSection(href, "smooth");
    setActiveSection(href);
  };

  return (
    <header ref={headerRef} className="site-header">
      <nav className="site-nav" aria-label="Primary navigation">
        <a href="#top" className="wordmark" aria-label="Binh Minh portfolio home" onClick={(event) => navigateToSection(event, "#top")}>
          MINH<span>.OPS</span>
        </a>

        <div className="nav-links" aria-label="Section links">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={activeSection === item.href ? "is-active" : undefined}
              aria-current={activeSection === item.href ? "location" : undefined}
              onClick={(event) => navigateToSection(event, item.href)}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <button type="button" className="language-button" onClick={toggleLanguage} aria-label="Change language">
            <Languages aria-hidden="true" size={16} /> {language.toUpperCase()}
          </button>
          <a className="resume-button" href="/cv" aria-label={labels.resume}>
            <ArrowDownToLine aria-hidden="true" size={16} /> <span>{labels.resume}</span>
          </a>
          <button
            type="button"
            className="menu-button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          >
            {menuOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div id="mobile-navigation" className="mobile-nav-links">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={activeSection === item.href ? "is-active" : undefined}
              aria-current={activeSection === item.href ? "location" : undefined}
              onClick={(event) => navigateToSection(event, item.href)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
