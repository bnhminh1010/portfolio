"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ButtonTextRollProps {
  text: string;
  className?: string;
  stagger?: number;
}

export function ButtonTextRoll({
  text,
  className = "",
  stagger = 0,
}: ButtonTextRollProps) {
  // Synchronous unified text roll (All characters roll together at once)
  if (stagger === 0) {
    return (
      <span
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden h-[1.12em] leading-none select-none",
          className
        )}
      >
        {/* Primary text */}
        <span className="inline-flex items-center justify-center leading-none transform transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[135%]">
          {text}
        </span>
        {/* Duplicate text rolling in simultaneously from bottom */}
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center leading-none translate-y-[135%] transform transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
        >
          {text}
        </span>
      </span>
    );
  }

  // Optional staggered letter-by-letter roll if explicitly requested with stagger > 0
  const letters = Array.from(text);

  return (
    <span
      className={cn(
        "relative inline-flex items-center overflow-hidden leading-none select-none h-[1.18em] self-center",
        className
      )}
    >
      {letters.map((char, index) => {
        if (char === " ") {
          return (
            <span key={index} className="inline-block w-[0.3em]">
              &nbsp;
            </span>
          );
        }

        return (
          <span
            key={`${char}-${index}`}
            className="relative inline-flex flex-col overflow-hidden h-[1.18em] leading-[1.18em]"
          >
            {/* Primary letter */}
            <span
              style={{
                transitionDelay: `${index * stagger}s`,
              }}
              className="inline-flex items-center justify-center transform transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full"
            >
              {char}
            </span>
            {/* Duplicate letter rolling in from bottom */}
            <span
              style={{
                transitionDelay: `${index * stagger}s`,
              }}
              className="absolute top-full left-0 inline-flex items-center justify-center transform transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full"
            >
              {char}
            </span>
          </span>
        );
      })}
    </span>
  );
}

export default ButtonTextRoll;
