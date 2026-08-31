"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface ScrollRollTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
}

function SplitLine({
  line,
  scrollProgress,
  index,
  total,
}: {
  line: string;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
  total: number;
}) {
  const stagger = (index / Math.max(1, total - 1)) * 0.05;

  const rotateXTop = useTransform(
    scrollProgress,
    [0.05 + stagger, 0.45 + stagger, 0.55 - stagger, 0.95 - stagger],
    [-90, 0, 0, 90]
  );

  const rotateXBottom = useTransform(
    scrollProgress,
    [0.05 + stagger, 0.45 + stagger, 0.55 - stagger, 0.95 - stagger],
    [90, 0, 0, -90]
  );

  const opacity = useTransform(
    scrollProgress,
    [0.05 + stagger, 0.35 + stagger, 0.65 - stagger, 0.95 - stagger],
    [0, 1, 1, 0]
  );

  const z = useTransform(
    scrollProgress,
    [0.05 + stagger, 0.45 + stagger, 0.55 - stagger, 0.95 - stagger],
    [-200, 0, 0, -200]
  );

  return (
    <span
      className="relative block"
      style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
    >
      <span className="invisible">{line}</span>

      <motion.span
        className="absolute inset-0 block whitespace-nowrap overflow-hidden"
        style={{
          clipPath: "inset(0 0 50% 0)",
          transformOrigin: "bottom center",
          rotateX: rotateXTop,
          z,
          opacity,
          willChange: "transform, opacity",
        }}
        aria-hidden="true"
      >
        {line}
      </motion.span>

      <motion.span
        className="absolute inset-0 block whitespace-nowrap overflow-hidden"
        style={{
          clipPath: "inset(50% 0 0 0)",
          transformOrigin: "top center",
          rotateX: rotateXBottom,
          z,
          opacity,
          willChange: "transform, opacity",
        }}
        aria-hidden="true"
      >
        {line}
      </motion.span>
    </span>
  );
}

export function ScrollRollText({
  text,
  className = "",
  as: Component = "h2",
}: ScrollRollTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  if (prefersReducedMotion) {
    return <Component className={cn(className)}>{text}</Component>;
  }

  const lines = text.split("\n");

  return (
    <Component
      // @ts-ignore
      ref={containerRef}
      className={cn("flex flex-col items-center justify-center text-center", className)}
      aria-label={text}
    >
      {lines.map((line, idx) => (
        <SplitLine
          key={idx}
          line={line}
          scrollProgress={scrollYProgress}
          index={idx}
          total={lines.length}
        />
      ))}
    </Component>
  );
}
