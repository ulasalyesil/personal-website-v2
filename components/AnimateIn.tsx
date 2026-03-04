"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, staggerContainer } from "@/lib/animations";

interface AnimateInProps {
  children: ReactNode;
  className?: string;
}

export default function AnimateIn({ children, className }: AnimateInProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}

interface AnimateItemProps {
  children: ReactNode;
  className?: string;
}

export function AnimateItem({ children, className }: AnimateItemProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
