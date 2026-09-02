"use client";

import React, { useState, useRef, type ElementType } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const NBSP = "\u00A0";

export interface TextRollProps {
  text: string;
  className?: string;
  as?: ElementType;
  stagger?: number;
  duration?: number;
  rolls?: number;
}

export function TextRoll({
  text,
  className = "",
  as: Component = "span",
  stagger = 0.02,
  duration = 0.85,
  rolls = 2,
}: TextRollProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "0px 0px -5% 0px", amount: 0.1 });
  const prefersReduced = useReducedMotion();
  const [triggerCount, setTriggerCount] = useState(0);

  const letters = Array.from(text);

  const handleMouseEnter = () => {
    setTriggerCount((c) => c + 1);
  };

  if (prefersReduced) {
    return (
      <Component className={cn("inline-flex whitespace-pre", className)}>
        {text}
      </Component>
    );
  }

  const totalRolls = rolls;
  const itemHeightEm = 1.08;
  const targetY = -(totalRolls * itemHeightEm);

  return (
    <Component
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={cn(
        "inline-flex whitespace-pre select-none tracking-tight cursor-pointer",
        className
      )}
      aria-label={text}
    >
      {letters.map((char, index) => {
        if (char === " ") {
          return (
            <span key={index} className="inline-block w-[0.25em]">
              {NBSP}
            </span>
          );
        }

        const delay = index * stagger;

        return (
          <span
            key={`${char}-${index}`}
            className="relative inline-block overflow-hidden"
            style={{
              height: `${itemHeightEm}em`,
              lineHeight: `${itemHeightEm}em`,
              verticalAlign: "top",
            }}
          >
            <motion.span
              key={`${char}-${index}-${triggerCount}`}
              initial={{ y: 0 }}
              animate={isInView ? { y: `${targetY}em` } : { y: 0 }}
              transition={{
                duration: duration,
                ease: [0.16, 1, 0.3, 1],
                delay: delay,
              }}
              className="flex flex-col will-change-transform"
            >
              {/* Vertical roll slot: Initial char -> 2 rolls to final char */}
              {Array.from({ length: totalRolls + 1 }).map((_, rIdx) => {
                return (
                  <span
                    key={rIdx}
                    className="flex items-center justify-center text-white"
                    style={{
                      height: `${itemHeightEm}em`,
                      lineHeight: `${itemHeightEm}em`,
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </motion.span>
          </span>
        );
      })}
    </Component>
  );
}

export default TextRoll;
