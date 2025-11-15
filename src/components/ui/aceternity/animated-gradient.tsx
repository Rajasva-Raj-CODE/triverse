"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedGradientProps = {
  className?: string;
  children?: React.ReactNode;
};

export const AnimatedGradient = ({ className, children }: AnimatedGradientProps) => {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, var(--brand-primary)/20, transparent 50%)",
            "radial-gradient(circle at 80% 80%, var(--brand-secondary)/20, transparent 50%)",
            "radial-gradient(circle at 40% 20%, var(--brand-primary)/20, transparent 50%)",
            "radial-gradient(circle at 20% 50%, var(--brand-primary)/20, transparent 50%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
};

