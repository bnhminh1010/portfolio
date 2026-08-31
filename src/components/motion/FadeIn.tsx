"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { useReducedMotion, fadeInVariants, getVariantsWithReducedMotion } from "@/lib/motion";

type FadeInProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

export function FadeIn({ children, delay = 0, className, ...props }: FadeInProps) {
  const reducedMotion = useReducedMotion();
  const variants = getVariantsWithReducedMotion(fadeInVariants, reducedMotion);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
