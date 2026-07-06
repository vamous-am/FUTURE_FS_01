"use client";

/**
 * ThemeProvider wraps next-themes' ThemeProvider with project-specific defaults.
 *
 * Key decisions:
 * - defaultTheme: "light" — master plan specifies light-first, not system-first.
 * - attribute: "class" — Tailwind v4 dark mode reads the `dark` class on <html>.
 * - enableSystem: false — we don't follow the OS preference by default; the user
 *   controls it explicitly via the toggle built in Phase 2.
 * - disableTransitionOnChange: false — allows the CSS transition defined in
 *   globals.css to animate the background/color swap smoothly.
 */

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}
