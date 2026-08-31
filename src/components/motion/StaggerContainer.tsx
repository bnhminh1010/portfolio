"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { 
  useReducedMotion, 
  staggerContainerVariants, 
  getVariantsWithReducedMotion 
} from "@/lib/motion";

type StaggerContainerProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
};

export function StaggerContainer({ 
  children, 
  className, 
  staggerDelay = 0.1,
  ...props 
}: StaggerContainerProps) {
  const reducedMotion = useReducedMotion();
  const variants = getVariantsWithReducedMotion(staggerContainerVariants, reducedMotion);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
