"use client";

import { Download, Menu, X, Globe, Terminal as TerminalIcon, FileText, Code, Monitor, HelpCircle, File } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Terminal } from "@/components/Terminal";

export function Header() {
  const [open, setOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const { language, t, toggleLanguage } = useLanguage();

  const cvOptions = [
    { href: "/cv/backend", label: "Backend/DevOps", icon: Code },
    { href: "/cv/frontend", label: "Frontend", icon: Monitor },
    { href: "/cv/it-helpdesk", label: "IT Helpdesk", icon: HelpCircle },
    { href: "/2026-NguyenBinhMinh-Backend-Devops.pdf", label: "View PDF", icon: File, external: true },
  ];

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

          <Button variant="solid" className="h-10 px-4" onClick={() => setCvModalOpen(true)}>
              <span className="hidden sm:inline-block">{t("nav", "resume")}</span>
            </Button>
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

      {/* CV Selection Modal */}
      {cvModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-50" onClick={() => setCvModalOpen(false)} />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-[280px] px-4">
            <div className="bg-white rounded-lg shadow-xl">
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <span className="text-sm font-medium">Select CV</span>
                <button onClick={() => setCvModalOpen(false)} className="text-gray-400 hover:text-black">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-2">
                {cvOptions.map((cv) => (
                  <a
                    key={cv.href}
                    href={cv.href}
                    target={cv.external ? "_blank" : "_blank"}
                    rel="noopener noreferrer"
                    onClick={() => setCvModalOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-black hover:bg-gray-50 transition-colors rounded-md"
                  >
                    <cv.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{cv.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

