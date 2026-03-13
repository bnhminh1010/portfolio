"use client";

import { Download, Menu, X, Globe, Terminal as TerminalIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Terminal } from "@/components/Terminal";

export function Header() {
  const [open, setOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const { language, t, toggleLanguage } = useLanguage();

  const nav = [
    { href: "#about", label: t("nav", "about") },
    { href: "#skills", label: t("nav", "skills") },
    { href: "#experience", label: t("nav", "experience") },
    { href: "#projects", label: t("nav", "projects") },
  ];

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-black">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="#top"
          className="text-base font-bold tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Dev.Ops
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium tracking-tight underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center border border-black bg-white text-black transition-colors duration-200 hover:bg-black hover:text-white md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          
          <button
            onClick={toggleLanguage}
            className="inline-flex h-10 w-10 items-center justify-center border border-black bg-white text-black transition-colors duration-200 hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
            aria-label="Toggle language"
            title={language === "en" ? "Chuyển sang Tiếng Việt" : "Switch to English"}
          >
            <span className="text-xs font-bold leading-none uppercase">{language}</span>
          </button>

          <button
            onClick={() => setTerminalOpen(true)}
            className="inline-flex h-10 items-center justify-center gap-2 border border-black bg-black text-[#0f0] px-3 font-mono font-bold transition-colors duration-200 hover:bg-transparent hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-black"
            aria-label="Open Terminal"
            title="Open Terminal"
          >
            <TerminalIcon className="h-4 w-4" />
            <span className="text-xs uppercase hidden sm:inline-block">{t("terminal", "button")}</span>
            <span className="text-xs uppercase sm:hidden">{">_"}</span>
          </button>

          <a href={language === "vi" ? "/cv-vi" : "/cv"} target="_blank" rel="noopener noreferrer" className="inline-flex">
            <Button variant="solid" className="h-10 px-4">
              <span className="hidden sm:inline-block">{t("nav", "resume")}</span>
            </Button>
          </a>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-black md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
            <div className="grid grid-cols-2 gap-2">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border border-black px-3 py-2 text-sm font-medium tracking-tight transition-colors duration-200 hover:bg-black hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <Terminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </header>
  );
}

