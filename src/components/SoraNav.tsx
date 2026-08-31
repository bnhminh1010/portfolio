"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Menu, X, FileText } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useLanguage } from "@/context/LanguageContext";

const navLinks = [
  { href: "#work", label: { en: "Work", vi: "Dự án" } },
  { href: "#skills", label: { en: "Capabilities", vi: "Kỹ năng" } },
  { href: "#experience", label: { en: "Experience", vi: "Kinh nghiệm" } },
  { href: "#contact", label: { en: "Contact", vi: "Liên hệ" } },
];

export function SoraNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`sora-nav-capsule flex items-center justify-between px-6 py-3 rounded-full text-xs font-mono ${
            scrolled ? "border-[var(--sora-border-strong)]" : ""
          }`}
        >
          {/* Brand Monogram */}
          <a
            href="#hero"
            className="flex items-center gap-2 text-[var(--sora-fg)] font-bold tracking-tight hover:opacity-80 transition-opacity"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[var(--sora-accent-cyan)]/20 text-[var(--sora-accent-cyan)] border border-[var(--sora-accent-cyan)]/30">
              <Terminal className="w-3 h-3" />
            </span>
            <span className="tracking-wider">MINH.OPS</span>
          </a>

          {/* Center Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-7 text-[var(--sora-muted)] font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[var(--sora-fg)] transition-colors"
              >
                {link.label[language]}
              </a>
            ))}
          </div>

          {/* Status & Quick Actions */}
          <div className="flex items-center gap-3">
            {/* Status Indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--sora-accent-emerald)]/10 border border-[var(--sora-accent-emerald)]/30 text-[var(--sora-accent-emerald)] text-[11px] font-mono">
              <span className="relative flex h-2 w-2">
                <span className="sora-ping absolute inline-flex h-full w-full rounded-full bg-[var(--sora-accent-emerald)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--sora-accent-emerald)]"></span>
              </span>
              <span>ACTIVE</span>
            </div>

            {/* CV Button - Desktop */}
            <a
              href="/CV_DevOps_NguyenBinhMinh.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--sora-border)] text-[var(--sora-muted)] hover:text-[var(--sora-fg)] hover:border-[var(--sora-border-hover)] transition-all"
            >
              <FileText className="w-3 h-3 text-[var(--sora-accent-cyan)]" />
              <span>{language === "en" ? "DevOps CV" : "CV DevOps"}</span>
            </a>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex items-center justify-center h-9 w-9 rounded-lg border border-[var(--sora-border)] bg-[var(--sora-surface)] text-[var(--sora-fg)] hover:border-[var(--sora-border-hover)] transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[var(--sora-bg)]/95 backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-2xl font-bold text-[var(--sora-fg)] hover:text-[var(--sora-accent-cyan)] transition-colors"
                >
                  {link.label[language]}
                </motion.a>
              ))}
              <motion.a
                href="/CV_DevOps_NguyenBinhMinh.pdf"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="mt-4 px-6 py-3 rounded-lg bg-[var(--sora-accent-cyan)] text-black font-semibold font-mono text-sm flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>{language === "en" ? "Download DevOps CV" : "Tải CV DevOps"}</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
