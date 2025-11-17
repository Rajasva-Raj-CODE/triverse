"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
} from "@/components/ui/resizable-navbar";
import Logo from "@/app/home/components/Helper/Logo";
import { navLinks } from "@/app/home/components/constant/constant";
import Link from "next/link";

const ResponsiveNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = navLinks.map((link) => ({
    name: link.label,
    link: link.url,
  }));

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Navbar>
      <NavBody>
        <Link href="/" className="relative z-20 flex items-center flex-shrink-0">
          <Logo />
        </Link>
        <NavItems items={navItems} />
        <div className="relative z-20 flex items-center gap-1.5 flex-shrink-0">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="relative z-20 flex items-center justify-center w-8 h-8 rounded-full bg-background/50 hover:bg-brand-primary/10 border border-border/50 hover:border-brand-primary/30 transition-all duration-200 hover:scale-105 flex-shrink-0"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-3.5 h-3.5 text-foreground" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-foreground" />
              )}
            </button>
          )}
          <Link
            href="/auth/login"
            className="relative z-20 px-4 py-2 rounded-full bg-brand-primary hover:bg-brand-primary/90 text-brand-text-primary font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-brand-primary/20 whitespace-nowrap flex-shrink-0"
          >
            Login
          </Link>
          <Link
            href="/auth/partner"
            className="relative z-20 px-4 py-2 rounded-full bg-background/50 hover:bg-background border border-border/50 hover:border-brand-primary/30 text-foreground font-semibold text-sm transition-all duration-200 hover:scale-105 whitespace-nowrap flex-shrink-0"
          >
            Partner
          </Link>
        </div>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>
        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          
        >
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.url}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-foreground hover:text-brand-primary transition-colors py-2"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border/50">
            {mounted && (
              <button
                onClick={() => {
                  toggleTheme();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-full bg-background/50 hover:bg-brand-primary/10 border border-border/50 hover:border-brand-primary/30 transition-all duration-200 text-foreground font-medium"
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
            )}
            <Link
              href="/auth/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2.5 rounded-full bg-brand-primary hover:bg-brand-primary/90 text-brand-text-primary font-semibold text-base transition-all duration-200 hover:shadow-lg hover:shadow-brand-primary/20"
            >
              Login
            </Link>
            <Link
              href="/auth/partner"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2.5 rounded-full bg-background/50 hover:bg-background border border-border/50 hover:border-brand-primary/30 text-foreground font-semibold text-base transition-all duration-200"
            >
              Become A Partner
            </Link>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
};

export default ResponsiveNav;
