"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface MediaMaskProps {
  children: React.ReactNode;
  className?: string;
  parallaxOffset?: number;
}

export function MediaMask({ children, className, parallaxOffset = 50 }: MediaMaskProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-parallaxOffset, parallaxOffset]);

  if (prefersReduced) {
    return (
      <div className={cn("overflow-hidden rounded-2xl relative", className)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, clipPath: "inset(20% 0 20% 0)" }}
      whileInView={{ opacity: 1, clipPath: "inset(0% 0 0% 0)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1],
        clipPath: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
      }}
      className={cn("overflow-hidden rounded-2xl relative bg-[#0a0a0c]", className)}
    >
      <motion.div
        style={{ y }}
        className="w-full h-full scale-[1.05]" // Scale slightly to hide edges during parallax
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
