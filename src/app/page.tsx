/*
 * Phase 1 placeholder page.
 *
 * This page's only job is to verify that:
 *   1. The design tokens resolve correctly (background, text, primary accent).
 *   2. Both fonts load (Space Grotesk on the heading, Inter on body text).
 *   3. The dark-mode toggle works (ThemeProvider wires it up; the toggle UI
 *      itself ships in Phase 2 as part of the navigation frame).
 *
 * The entire content of this file will be replaced in Phase 3 (Hero section).
 * Do not build anything here beyond a sanity-check placeholder.
 */

export default function Home() {
  return (
    <main id="home" className="min-h-dvh bg-background text-foreground flex flex-col items-center justify-center gap-6 px-6">
      {/* Heading — Space Grotesk via font-heading class */}
      <h1 className="font-heading text-4xl font-bold text-navy dark:text-gray-bg text-center">
        Aman Vergara
      </h1>

      {/* Sub-line — Inter (default body font) */}
      <p className="text-lg text-foreground/70 text-center">
        Full-Stack Developer | ECE Student
      </p>

      {/* Primary accent color swatch — confirms token resolves */}
      <div className="flex items-center gap-3 text-sm">
        <span
          className="inline-block w-6 h-6 rounded-full bg-primary"
          aria-hidden="true"
        />
        <span className="text-foreground/60">primary #87BEEB</span>
      </div>

      <p className="text-sm text-foreground/40 mt-4">
        Phase 1 complete — design system scaffold. Content ships in Phase 3.
      </p>
    </main>
  );
}
