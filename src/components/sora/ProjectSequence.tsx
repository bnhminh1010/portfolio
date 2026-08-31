"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ExternalLink, Layers, Copy, Check } from "lucide-react";
import { SoraButton } from "./SoraButton";
import { ProductMockup } from "./ProductMockup";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export interface Project {
  id: string;
  category: string;
  period: string;
  title: string;
  summary: string;
  story: {
    problem: string;
    approach: string;
    outcome: string;
  };
  stack: string[];
  cliSnippet?: string;
  liveUrl?: string;
  repo: string;
  domain: string;
  type: "homelab" | "thinkai";
}

interface ProjectSequenceProps {
  projects: Project[];
  lang: "vi" | "en";
  text: any;
  onOpenArch?: (id: string) => void;
}

const DURATION = 6000; // 6s per slide

export function ProjectSequence({ projects, lang, text, onOpenArch }: ProjectSequenceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copiedCli, setCopiedCli] = useState<string | null>(null);
  const prefersReduced = useReducedMotion();
  const startTimeRef = useRef<number>(Date.now());
  const animationFrameRef = useRef<number | null>(null);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCli(cmd);
    setTimeout(() => setCopiedCli(null), 2000);
  };

  // Auto-play timer with smooth progress bar
  useEffect(() => {
    if (prefersReduced) return;

    startTimeRef.current = Date.now() - (progress / 100) * DURATION;

    const tick = () => {
      if (!isPaused) {
        const elapsed = Date.now() - startTimeRef.current;
        const newProgress = Math.min((elapsed / DURATION) * 100, 100);
        setProgress(newProgress);

        if (elapsed >= DURATION) {
          handleNext();
          return;
        }
      }
      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [currentIndex, isPaused, prefersReduced]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const current = projects[currentIndex];

  const fadeVariants = prefersReduced
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
      };

  return (
    <div 
      className="space-y-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        startTimeRef.current = Date.now() - (progress / 100) * DURATION;
      }}
    >
      {/* Sequence Header & Controls matching 12-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-white/[0.08] pb-6">
        {/* Left: Section Label */}
        <div className="lg:col-span-2 flex items-center gap-2 text-sm font-medium text-neutral-400">
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-400" />
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-300">Products</span>
        </div>

        {/* Center: Counter & Active Chapter Tag */}
        <div className="lg:col-span-7 flex items-center gap-6">
          <div className="text-3xl sm:text-4xl font-bold text-white font-mono tracking-tighter">
            0{currentIndex + 1}
            <span className="text-neutral-600">/0{projects.length}</span>
          </div>
          <div className="h-8 w-px bg-white/[0.08]" />
          <div className="sora-label text-neutral-300">
            {current.category} · {current.period}
          </div>
        </div>

        {/* Right: Progress Bar & Next/Prev Controls */}
        <div className="lg:col-span-3 flex items-center justify-between lg:justify-end gap-4">
          {/* Progress Bar (Paused on hover) */}
          <div className="flex-1 lg:w-28 h-1 bg-white/[0.08] rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-white transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handlePrev}
              aria-label="Previous project"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/[0.1] text-neutral-300 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next project"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/[0.1] text-neutral-300 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Sequence Body in 12-Column Grid */}
      <div className="relative min-h-[580px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: prefersReduced ? 0.01 : 0.55, ease: LUXURY_EASE }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
          >
            {/* Left 2 Cols: Chapter Indicator on desktop */}
            <div className="hidden lg:block lg:col-span-2 space-y-4">
              <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                {lang === "vi" ? "DANH MỤC" : "CHAPTER"}
              </div>
              <div className="space-y-2 font-mono text-xs">
                {projects.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setProgress(0);
                      startTimeRef.current = Date.now();
                    }}
                    className={`block w-full text-left py-1 transition-colors cursor-pointer ${
                      idx === currentIndex ? "text-white font-semibold" : "text-neutral-500 hover:text-neutral-300"
                    }`}
                  >
                    0{idx + 1} / {p.id.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Center 6 Cols: Large Realistic Laptop Mockup */}
            <div className="lg:col-span-6">
              <ProductMockup
                title={current.title}
                headline={current.category}
                description={current.summary}
                domain={current.domain}
                type={current.type}
              />
            </div>

            {/* Right 4 Cols: Info, 3-Pillar Story, Stack & CLI Box */}
            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-2">
                <div className="sora-label text-neutral-400">
                  {current.category} ← 0{currentIndex + 1}/0{projects.length}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {current.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed font-light">
                  {current.summary}
                </p>
              </div>

              {/* 3-Pillar Story Grid */}
              <div className="space-y-3 pt-2 text-xs border-y border-white/[0.08] py-4">
                <div className="space-y-1">
                  <div className="font-mono text-neutral-500 uppercase tracking-wider text-[11px]">
                    01 // {text.work.storyLabels.problem}
                  </div>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    {current.story.problem}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="font-mono text-neutral-500 uppercase tracking-wider text-[11px]">
                    02 // {text.work.storyLabels.approach}
                  </div>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    {current.story.approach}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="font-mono text-neutral-500 uppercase tracking-wider text-[11px]">
                    03 // {text.work.storyLabels.outcome}
                  </div>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    {current.story.outcome}
                  </p>
                </div>
              </div>

              {/* Stack Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {current.stack.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.06] text-xs font-mono text-neutral-200 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* CLI Command Snippet Box if available */}
              {current.cliSnippet && (
                <div className="space-y-2 pt-1">
                  <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">CLI</div>
                  <motion.div
                    whileHover={{ scale: 1.01, borderColor: "rgba(255, 255, 255, 0.25)" }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleCopy(current.cliSnippet!)}
                    className="p-3 bg-[#161619] border border-white/[0.08] rounded flex items-center justify-between text-neutral-300 transition-colors cursor-pointer group font-mono text-xs"
                  >
                    <span className="truncate">{current.cliSnippet}</span>
                    {copiedCli === current.cliSnippet ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-2" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white shrink-0 ml-2" />
                    )}
                  </motion.div>
                </div>
              )}

              {/* Action Links */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono">
                {onOpenArch && (
                  <SoraButton
                    onClick={() => onOpenArch(current.id)}
                    variant="secondary"
                    icon={<Layers className="w-3.5 h-3.5" />}
                  >
                    {text.work.architecture}
                  </SoraButton>
                )}

                {current.liveUrl && (
                  <SoraButton
                    href={current.liveUrl}
                    variant="outline"
                    icon={<ExternalLink className="w-3.5 h-3.5" />}
                  >
                    {text.work.live}
                  </SoraButton>
                )}

                <motion.a
                  whileHover={{ x: 3, color: "#ffffff" }}
                  transition={{ duration: 0.2 }}
                  href={current.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="text-neutral-400 transition-colors"
                >
                  {text.work.source} ↗
                </motion.a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
