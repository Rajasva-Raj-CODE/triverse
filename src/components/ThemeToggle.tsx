"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface ThemeToggleProps {
  variant?: "default" | "icon" | "button";
  className?: string;
}

export function ThemeToggle({ variant = "default", className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={className}
        suppressHydrationWarning
      >
        <Moon className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  if (variant === "button") {
    return (
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-background/50 hover:bg-brand-primary/10 border border-border/50 hover:border-brand-primary/30 transition-all duration-200 text-foreground font-medium ${className || ""}`}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <>
            <Sun className="w-4 h-4" />
            <span>Light Mode</span>
          </>
        ) : (
          <>
            <Moon className="w-4 h-4" />
            <span>Dark Mode</span>
          </>
        )}
      </button>
    );
  }

  if (variant === "icon") {
    return (
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={`relative flex items-center justify-center w-8 h-8 rounded-full bg-background/50 hover:bg-brand-primary/10 border border-border/50 hover:border-brand-primary/30 transition-all duration-200 hover:scale-105 ${className || ""}`}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Sun className="w-3.5 h-3.5 text-foreground" />
        ) : (
          <Moon className="w-3.5 h-3.5 text-foreground" />
        )}
      </button>
    );
  }

  // Default variant: Dropdown menu with Light/Dark/System options
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`h-9 w-9 rounded-lg border border-[var(--brand-border)] dark:border-[var(--brand-border-medium)] hover:bg-[var(--brand-primary)]/30 dark:hover:bg-[var(--brand-primary)]/30 text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] transition-all duration-200 ${className || ""}`}
          suppressHydrationWarning
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 bg-white dark:bg-[var(--brand-bg-primary)]/95 backdrop-blur border border-[var(--brand-border-medium)] dark:border-[var(--brand-border)]">
        <DropdownMenuItem 
          onClick={() => setTheme("light")} 
          className="text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] hover:bg-[var(--brand-primary)]/30 dark:hover:bg-[var(--brand-primary)]/30"
        >
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")} 
          className="text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] hover:bg-[var(--brand-primary)]/30 dark:hover:bg-[var(--brand-primary)]/30"
        >
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")} 
          className="text-[var(--brand-text-primary)] dark:text-[var(--brand-text-primary)] hover:bg-[var(--brand-primary)]/30 dark:hover:bg-[var(--brand-primary)]/30"
        >
          <Settings className="mr-2 h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

