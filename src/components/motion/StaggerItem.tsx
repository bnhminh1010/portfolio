"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { 
  useReducedMotion, 
  staggerItemVariants, 
  getVariantsWithReducedMotion,
  defaultTransition 
} from "@/lib/motion";

type StaggerItemProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode;
  className?: string;
};

export function StaggerItem({ children, className, ...props }: StaggerItemProps) {
  const reducedMotion = useReducedMotion();
  const variants = getVariantsWithReducedMotion(staggerItemVariants, reducedMotion);

  return (
    <motion.div
      variants={variants}
      transition={defaultTransition}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
