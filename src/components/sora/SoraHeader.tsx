"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { WipeButton } from "./WipeButton";
import { ButtonTextRoll } from "./ButtonTextRoll";
import { ArrowRoll } from "./ArrowRoll";

interface SoraHeaderProps {
  onOpenAbout: () => void;
  onOpenContact?: () => void;
}

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export function SoraHeader({ onOpenAbout, onOpenContact }: SoraHeaderProps) {
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hide header when scrolling into the CTA section (#contact) or Footer
  useEffect(() => {
    const handleScroll = () => {
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect();
        if (rect.top <= 120) {
          setIsHeaderHidden(true);
          return;
        }
      }
      setIsHeaderHidden(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (anchorId?: string) => {
    setIsMobileMenuOpen(false);
    if (anchorId) {
      const el = document.getElementById(anchorId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.reload();
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        animate={
          isHeaderHidden && !isMobileMenuOpen
            ? {
                opacity: 0,
                filter: "blur(12px)",
                y: -14,
                transition: { duration: 0.4, ease: LUXURY_EASE },
              }
            : {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                transition: { duration: 0.45, ease: LUXURY_EASE },
              }
        }
        className="fixed top-0 inset-x-0 z-50 bg-transparent px-3 sm:px-10 lg:px-14 py-3 sm:py-5 flex items-center justify-between pointer-events-none"
      >
        {/* Left: ThinkAI Studio Logo Mark (Click to Reload Entire Web) */}
        <button
          type="button"
          onClick={handleLogoClick}
          className={`h-10 inline-flex items-center justify-center gap-2 sm:gap-2.5 group cursor-pointer px-2.5 sm:px-3.5 rounded-[6px] bg-black/50 border border-white/20 backdrop-blur-md hover:bg-black/70 transition-all shadow-xl leading-none shrink-0 ${
            isHeaderHidden && !isMobileMenuOpen ? "pointer-events-none" : "pointer-events-auto"
          }`}
          aria-label="Reload ThinkAI Studio Website"
        >
          <div className="relative w-5 h-5 rounded overflow-hidden shrink-0 flex items-center justify-center">
            <Image
              src="/images/thinkai_studio_logo.png"
              alt="ThinkAI Studio Logo"
              fill
              sizes="20px"
              className="object-contain invert group-hover:scale-105 transition-transform"
            />
          </div>
          <span className="text-white font-bold font-mono text-[11px] sm:text-xs tracking-wider uppercase drop-shadow inline-flex items-center leading-none select-none whitespace-nowrap">
            ThinkAI Studio
          </span>
        </button>

        {/* Center-Right: Desktop Nav Links */}
        <nav
          className={`h-10 hidden sm:inline-flex items-center gap-1 p-1 rounded-[6px] bg-black/50 border border-white/20 backdrop-blur-md shadow-xl ${
            isHeaderHidden ? "pointer-events-none" : "pointer-events-auto"
          }`}
        >
          <WipeButton
            onClick={onOpenAbout}
            className="h-full inline-flex items-center justify-center px-3.5 rounded-[4px] font-sans font-bold text-xs sm:text-[13px] tracking-tight cursor-pointer leading-none"
            wipeColor="#ffffff"
            textColor="#ffffff"
            hoverTextColor="#05070a"
          >
            About
          </WipeButton>
          <WipeButton
            as="a"
            href="#work"
            className="h-full inline-flex items-center justify-center px-3.5 rounded-[4px] font-sans font-bold text-xs sm:text-[13px] tracking-tight cursor-pointer leading-none"
            wipeColor="#ffffff"
            textColor="#ffffff"
            hoverTextColor="#05070a"
          >
            Work
          </WipeButton>
          <WipeButton
            as="a"
            href="#products"
            className="h-full inline-flex items-center justify-center px-3.5 rounded-[4px] font-sans font-bold text-xs sm:text-[13px] tracking-tight cursor-pointer leading-none"
            wipeColor="#ffffff"
            textColor="#ffffff"
            hoverTextColor="#05070a"
          >
            Products
          </WipeButton>
          <WipeButton
            as="a"
            href="#contact"
            className="h-full inline-flex items-center justify-center px-3.5 rounded-[4px] font-sans font-bold text-xs sm:text-[13px] tracking-tight cursor-pointer leading-none"
            wipeColor="#ffffff"
            textColor="#ffffff"
            hoverTextColor="#05070a"
          >
            Contact
          </WipeButton>
        </nav>

        {/* Far Right: Start a project Button + Mobile Menu Toggle */}
        <div
          className={`flex items-center gap-2.5 sm:gap-3 ${
            isHeaderHidden && !isMobileMenuOpen ? "pointer-events-none" : "pointer-events-auto"
          }`}
        >
          <WipeButton
            onClick={onOpenContact}
            wipeColor="#05070a"
            textColor="#05070a"
            hoverTextColor="#ffffff"
            borderColor="#ffffff"
            hoverBorderColor="rgba(255, 255, 255, 0.4)"
            className="group h-10 inline-flex items-center justify-center gap-2 sm:gap-2.5 px-3 sm:px-5 rounded-[6px] text-xs sm:text-[15.5px] font-extrabold cursor-pointer shadow-xl select-none bg-white border border-white active:scale-[0.93] transition-transform duration-150 leading-none shrink-0"
          >
            <ButtonTextRoll
              text="Start a project"
              className="font-extrabold text-xs sm:text-[15.5px] tracking-tight leading-none"
            />
            <ArrowRoll size="md" />
          </WipeButton>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="h-10 sm:hidden inline-flex items-center justify-center px-2.5 sm:px-3.5 rounded-[6px] text-xs font-mono font-bold text-white bg-black/50 hover:bg-black/70 border border-white/20 backdrop-blur-md transition-colors cursor-pointer shadow-xl leading-none shrink-0"
            aria-label="Toggle navigation menu"
          >
            <ButtonTextRoll
              text={isMobileMenuOpen ? "Close" : "Menu"}
              className="font-mono text-xs font-bold leading-none"
            />
          </button>
        </div>
      </motion.header>

      {/* ─── REFINED FROSTED MOBILE NAVIGATION SHEET (Clean Slide-Down Panel) ─── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: LUXURY_EASE }}
            className="fixed inset-x-0 top-[66px] z-40 bg-[#0c0c0e]/94 backdrop-blur-3xl border-b border-white/15 px-6 pt-6 pb-8 sm:hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] max-h-[82vh] overflow-y-auto"
          >
            {/* Giant Vertical Navigation Links */}
            <div className="flex flex-col gap-4 font-bold text-3xl tracking-tight text-white">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAbout();
                }}
                className="text-left py-1 hover:text-neutral-300 transition-colors w-fit cursor-pointer"
              >
                About
              </button>
              <button
                onClick={() => handleNavClick("work")}
                className="text-left py-1 hover:text-neutral-300 transition-colors w-fit cursor-pointer"
              >
                Work
              </button>
              <button
                onClick={() => handleNavClick("products")}
                className="text-left py-1 hover:text-neutral-300 transition-colors w-fit cursor-pointer"
              >
                Products
              </button>
              <button
                onClick={() => handleNavClick("contact")}
                className="text-left py-1 hover:text-neutral-300 transition-colors w-fit cursor-pointer"
              >
                Contact
              </button>
            </div>

            {/* Bottom Featured Live Product Callout Card */}
            <div className="pt-6 mt-4 border-t border-white/[0.08]">
              <a
                href="https://hostdeck.thinkai.id.vn"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-lg bg-white/[0.04] border border-white/[0.1] flex items-center justify-between gap-3 group hover:bg-white/[0.08] transition-all"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="relative w-12 h-9 rounded overflow-hidden border border-white/10 shrink-0 bg-[#161619]">
                    <Image
                      src="/images/products/hostdeck-screen.png"
                      alt="HostDeck Console"
                      fill
                      sizes="48px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="space-y-0.5 overflow-hidden">
                    <div className="text-xs font-bold text-white tracking-tight truncate">
                      HostDeck Console is live - Bare-Metal CLI
                    </div>
                    <div className="text-[10px] font-mono text-neutral-400">
                      AUGUST 2026 · PRODUCTION ACTIVE
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white shrink-0 transition-colors" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
