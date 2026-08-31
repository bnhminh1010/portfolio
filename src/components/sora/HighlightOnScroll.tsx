"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface HighlightOnScrollProps {
  text: string;
  className?: string;
}

function Word({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block mr-[0.28em] last:mr-0">
      {/* Background shadow letter for contrast */}
      <span className="text-white/20 select-none">{word}</span>
      {/* Active foreground highlighting */}
      <motion.span
        style={{ opacity }}
        className="absolute inset-0 text-white font-medium will-change-[opacity]"
      >
        {word}
      </motion.span>
    </span>
  );
}

export function HighlightOnScroll({ text, className = "" }: HighlightOnScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 35%"],
  });

  const words = text.split(" ");

  if (prefersReducedMotion) {
    return (
      <div className={cn("text-white font-medium", className)}>
        {text}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("flex flex-wrap justify-center leading-relaxed", className)}
      aria-label={text}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word
            key={i}
            word={word}
            range={[start, end]}
            progress={scrollYProgress}
          />
        );
      })}
    </div>
  );
}
