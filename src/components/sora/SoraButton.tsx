"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface SoraButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  icon?: React.ReactNode;
  className?: string;
}

export function SoraButton({
  children,
  href,
  variant = "primary",
  icon,
  className,
  ...props
}: SoraButtonProps) {
  const prefersReduced = useReducedMotion();

  const baseClasses =
    "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded font-mono text-xs tracking-wider uppercase transition-colors group cursor-pointer select-none";

  const variants = {
    primary: "bg-white text-neutral-950 hover:bg-neutral-200 px-5 py-2.5 font-bold shadow-sm",
    secondary: "bg-[#18181c] text-white hover:bg-[#222228] px-5 py-2.5 border border-white/[0.08] hover:border-white/20 font-medium",
    outline: "bg-transparent text-white border border-white/[0.15] hover:border-white/40 px-5 py-2.5 font-medium",
    ghost: "bg-transparent text-neutral-400 hover:text-white px-3 py-1.5 font-medium",
  };

  const Component = href ? motion.a : motion.button;

  const bgVariants = prefersReduced
    ? { hover: { opacity: 1 } }
    : { hover: { y: "0%", opacity: 1 } };

  const bgInitial = prefersReduced
    ? { opacity: 0 }
    : { y: "100%", opacity: 0 };

  const contentVariants = prefersReduced
    ? { hover: { y: 0 } }
    : { hover: { y: -0.5 } };

  // Directional semantics: strictly forward translation, no decorative rotation
  const iconVariants = prefersReduced
    ? { hover: { x: 0 } }
    : { hover: { x: 4 } };

  return (
    <Component
      {...(props as any)}
      // @ts-ignore
      href={href}
      className={cn(baseClasses, variants[variant], className)}
      whileHover="hover"
      whileTap={{ scale: prefersReduced ? 1 : 0.98 }}
    >
      {/* Background sweep effect with snappy luxury easing */}
      {variant !== "ghost" && (
        <motion.div
          className="absolute inset-0 bg-white/10 mix-blend-overlay pointer-events-none"
          initial={bgInitial}
          variants={bgVariants}
          transition={{
            duration: prefersReduced ? 0 : 0.25,
            ease: [0.19, 1, 0.22, 1],
          }}
        />
      )}

      {/* Content wrapper */}
      <motion.span
        className="relative flex items-center gap-2"
        variants={contentVariants}
        transition={{ duration: prefersReduced ? 0 : 0.2 }}
      >
        <span>{children}</span>

        {/* Directional Icon */}
        {icon && (
          <motion.span
            variants={iconVariants}
            transition={{
              duration: prefersReduced ? 0 : 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex items-center justify-center shrink-0"
          >
            {icon}
          </motion.span>
        )}
      </motion.span>
    </Component>
  );
}
