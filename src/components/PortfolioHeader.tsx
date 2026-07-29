"use client";

import { ArrowDownToLine, Languages, Menu, X } from "lucide-react";
import { type MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { copy } from "@/data/portfolio";

export function PortfolioHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
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

  useEffect(() => {
    const sections = ["work", "experience", "skills", "education", "awards", "contact"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    if (sections.length === 0) return;

    const syncActiveSection = () => {
      if (window.scrollY <= 8) {
        setActiveSection("#top");
        return;
      }

      const marker = headerHeight + 28;
      const current = sections.reduce<HTMLElement | null>((latest, section) => (
        section.getBoundingClientRect().top <= marker ? section : latest
      ), null);

      const activeHref = current && ["education", "awards", "contact"].includes(current.id)
        ? "#education"
        : current ? `#${current.id}` : "#top";
      setActiveSection(activeHref);
    };

    syncActiveSection();
    window.addEventListener("scroll", syncActiveSection, { passive: true });
    window.addEventListener("resize", syncActiveSection);
    return () => {
      window.removeEventListener("scroll", syncActiveSection);
      window.removeEventListener("resize", syncActiveSection);
    };
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
    let fallbackTimer: number | undefined;

    const scrollToHash = () => {
      const href = window.location.hash;
      if (!href || href === "#top") return;

      const target = document.querySelector<HTMLElement>(href);
      const header = headerRef.current;
      if (!target || !header) return;

      const top = target.getBoundingClientRect().top + window.scrollY - header.getBoundingClientRect().height - 28;
      window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
    };

    const scheduleHashOffset = () => {
      window.requestAnimationFrame(scrollToHash);
      window.clearTimeout(fallbackTimer);
      fallbackTimer = window.setTimeout(scrollToHash, 160);
    };

    scheduleHashOffset();
    window.addEventListener("hashchange", scheduleHashOffset);
    return () => {
      window.clearTimeout(fallbackTimer);
      window.removeEventListener("hashchange", scheduleHashOffset);
    };
  }, [headerHeight]);

  const navigateToSection = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setMenuOpen(false);

    window.requestAnimationFrame(() => {
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;
      window.requestAnimationFrame(() => {
        const header = headerRef.current;
        if (!header) return;
        const top = href === "#top"
          ? 0
          : target.getBoundingClientRect().top + window.scrollY - header.getBoundingClientRect().height - 28;
        setActiveSection(href);
        window.history.pushState(null, "", href);
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      });
    });
  };

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 12);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  return (
    <header ref={headerRef} className="site-header" data-scrolled={scrolled || undefined}>
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
          <a className="resume-button" href="/cv">
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
