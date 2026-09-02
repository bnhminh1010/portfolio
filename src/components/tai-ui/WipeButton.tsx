"use client";

import React, { useState } from "react";
import { motion } from "motion/react";

interface WipeButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  target?: string;
  rel?: string;
  as?: "button" | "a" | "div";
  wipeColor?: string;
  textColor?: string;
  hoverTextColor?: string;
  borderColor?: string;
  hoverBorderColor?: string;
  ariaLabel?: string;
}

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export function WipeButton({
  children,
  className = "",
  onClick,
  href,
  target,
  rel,
  as = "button",
  wipeColor = "#ffffff",
  textColor = "#ffffff",
  hoverTextColor = "#05070a",
  borderColor = "rgba(255, 255, 255, 0.12)",
  hoverBorderColor = "#ffffff",
  ariaLabel,
}: WipeButtonProps) {
  const [wipeState, setWipeState] = useState<"idle" | "in" | "out">("idle");

  const handleMouseEnter = () => {
    setWipeState("in");
  };

  const handleMouseLeave = () => {
    setWipeState("out");
  };

  const isLink = as === "a" || Boolean(href);

  const innerContent = (
    <>
      {/* Sliding Through Wipe Layer (Enters left, Exits right) */}
      <motion.div
        initial={{ x: "-102%" }}
        animate={
          wipeState === "in"
            ? { x: "0%" }
            : wipeState === "out"
            ? { x: "102%" }
            : { x: "-102%" }
        }
        transition={
          wipeState === "idle"
            ? { duration: 0 }
            : { duration: 0.42, ease: LUXURY_EASE }
        }
        onAnimationComplete={() => {
          if (wipeState === "out") {
            setWipeState("idle");
          }
        }}
        className="absolute inset-0 pointer-events-none rounded-[inherit]"
        style={{ backgroundColor: wipeColor, zIndex: 0 }}
      />
      {/* Foreground Content */}
      <span
        className="relative z-10 inline-flex items-center justify-center gap-2.5 sm:gap-3.5 w-full h-full transition-colors duration-300 leading-none"
        style={{
          color: wipeState === "in" ? hoverTextColor : textColor,
        }}
      >
        {children}
      </span>
    </>
  );

  const sharedStyles: React.CSSProperties = {
    position: "relative",
    overflow: "hidden",
    borderColor: wipeState === "in" ? hoverBorderColor : borderColor,
    transition: "border-color 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
  };

  if (isLink && href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={className}
        style={sharedStyles}
        aria-label={ariaLabel}
      >
        {innerContent}
      </a>
    );
  }

  if (as === "div") {
    return (
      <div
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={className}
        style={sharedStyles}
        aria-label={ariaLabel}
      >
        {innerContent}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={sharedStyles}
      aria-label={ariaLabel}
    >
      {innerContent}
    </button>
  );
}
