"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type FloatingDockProps = {
  className?: string;
  children: React.ReactNode;
};

export const FloatingDock = ({ className, children }: FloatingDockProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-lg",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

