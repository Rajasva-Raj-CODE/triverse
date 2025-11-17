"use client";
import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const toggleVisibility: () => void = () => {
      if (window.scrollY > 300) setIsVisible(true);
      else setIsVisible(false);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={scrollToTop}
        className={`
          group relative
          flex items-center justify-center
          w-14 h-14
          rounded-full
          bg-[var(--brand-primary)] 
          dark:bg-[var(--brand-primary)]
          text-white
          shadow-lg
          shadow-[var(--brand-primary)]/30
          dark:shadow-[var(--brand-primary)]/40
          backdrop-blur-sm
          border border-[var(--brand-border-light)]
          dark:border-[var(--brand-border-medium)]
          transition-all duration-300 ease-out
          hover:scale-110
          hover:shadow-xl
          hover:shadow-[var(--brand-primary)]/50
          dark:hover:shadow-[var(--brand-primary)]/60
          active:scale-95
          focus:outline-none
          focus:ring-2
          focus:ring-[var(--brand-primary)]/50
          focus:ring-offset-2
          focus:ring-offset-background
          ${isVisible 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 translate-y-4 pointer-events-none"
          }
        `}
        aria-label="Scroll to top"
      >
        {/* Animated background glow */}
        <div className="absolute inset-0 rounded-full bg-[var(--brand-primary)] opacity-0 group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity duration-300 blur-xl" />
        
        {/* Icon with smooth animation */}
        <FaArrowUp 
          className={`
            relative z-10
            text-lg
            transition-transform duration-300
            group-hover:-translate-y-1
          `}
        />
        
        {/* Ripple effect on click */}
        <span className="absolute inset-0 rounded-full bg-white opacity-0 group-active:opacity-20 group-active:animate-ping" />
      </button>
    </div>
  );
};

export default ScrollToTop;
