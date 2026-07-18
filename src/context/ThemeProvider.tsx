"use client";

/** Wraps `next-themes` ThemeProvider with project defaults.
 *  Uses class-based dark mode (`attribute="class"`) to match Tailwind v4's `@custom-variant dark` strategy.
 *  Defaults to light mode; system preference is intentionally ignored — the user controls it via the toggle. */

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
