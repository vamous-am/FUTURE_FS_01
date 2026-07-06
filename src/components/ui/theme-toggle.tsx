"use client";

/**
 * ThemeToggle — a single button that swaps between light and dark modes.
 *
 * Uses next-themes' useTheme hook to read/write the current theme.
 * Icons: Sun for light mode, Moon for dark mode (shows the *opposite* state
 * of what clicking will activate, which is a common pattern — some designs
 * show the current state instead; adjust if needed).
 *
 * Mounted guard: next-themes needs a hydration cycle before `theme` is defined.
 * We suppress rendering until `mounted === true` to avoid a flash of wrong icon.
 */

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait for client hydration before rendering theme-dependent UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with the same dimensions to prevent layout shift
    return (
      <button
        className="p-2 rounded-md text-foreground/60"
        aria-label="Toggle theme"
        disabled
      >
        <div className="w-5 h-5" />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-md text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}
