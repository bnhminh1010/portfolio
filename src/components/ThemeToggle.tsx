"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--sora-border)] bg-[var(--sora-surface)] text-[var(--sora-fg)] transition-all hover:border-[var(--sora-border-hover)] hover:bg-[var(--sora-surface-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--sora-accent-cyan)] focus:ring-offset-2 focus:ring-offset-[var(--sora-bg)]"
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
    >
      <Sun 
        className={`absolute h-4 w-4 transition-all duration-300 ${
          theme === "dark" 
            ? "rotate-90 scale-0 opacity-0" 
            : "rotate-0 scale-100 opacity-100"
        }`} 
      />
      <Moon 
        className={`absolute h-4 w-4 transition-all duration-300 ${
          theme === "dark" 
            ? "rotate-0 scale-100 opacity-100" 
            : "-rotate-90 scale-0 opacity-0"
        }`} 
      />
    </button>
  );
}
