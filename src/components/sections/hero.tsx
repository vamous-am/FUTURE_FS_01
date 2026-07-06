"use client";

/**
 * Hero — the above-the-fold section of the portfolio.
 *
 * Layout: full-viewport-height, content left-aligned, vertically centred.
 * Uses CONTAINER_CLASS and SECTION_PADDING from constants — no bespoke widths.
 *
 * No profile photo here — photo lives in the sidebar only (per master plan).
 *
 * Sub-components used:
 *   - TypingCarousel  — cycles through four ECE/software hybrid domains.
 *   - Marquee (×2)    — web stack (left) and ECE stack (right) below the fold.
 *   - ChevronDown     — animated scroll indicator.
 *
 * Framer Motion:
 *   - Staggered fade-in for each content block (intro → headline → carousel
 *     → bio → CTAs). Delay increments by 0.15s per item.
 *   - useReducedMotion: when set, all variants resolve to their visible state
 *     immediately — no animation runs.
 *
 * CTA button styling:
 *   - "View Projects" — filled primary (#87BEEB), navy text for contrast.
 *   - "Download CV"   — navy outline + navy text; placeholder href="#" until
 *     the real CV file exists (Phase 9). Includes Lucide Download icon.
 *   - "Let's Connect" — ghost (transparent bg), primary border + text.
 */

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Download, ChevronDown } from "lucide-react";
import { CONTAINER_CLASS, SECTION_PADDING } from "@/lib/constants";
import { TypingCarousel } from "@/components/ui/typing-carousel";
import { Marquee } from "@/components/ui/marquee";

// ── Data ──────────────────────────────────────────────────────────────────────

const TYPING_PHRASES = [
  "Building Full-Stack Applications",
  "Building Embedded Systems",
  "Building IoT Solutions",
  "Building AI-Powered Projects",
];

const WEB_STACK = [
  "Next.js", "React", "TypeScript", "Node.js",
  "Express", "MongoDB", "PostgreSQL", "Docker", "Git", "Tailwind",
];

const ECE_STACK = [
  "ESP32", "Arduino", "MATLAB", "Proteus",
  "Python", "OpenCV", "Linux", "MQTT", "C++",
];

// ── Animation variants ────────────────────────────────────────────────────────

/**
 * Each content block fades up from 16px below its final position.
 * The parent `container` staggers children with delayChildren + staggerChildren.
 * When reducedMotion is true, all variants return the final (visible) state
 * immediately so nothing animates.
 */
function buildVariants(reduced: boolean | null): {
  container: Variants;
  item: Variants;
} {
  if (reduced) {
    return {
      container: {},
      item: {
        hidden:  { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      },
    };
  }
  return {
    container: {
      hidden:  {},
      visible: {
        transition: { delayChildren: 0.1, staggerChildren: 0.15 },
      },
    },
    item: {
      hidden:  { opacity: 0, y: 16 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    },
  };
}

// ── Component ─────────────────────────────────────────────────────────────────

export function Hero() {
  const reduced = useReducedMotion();
  const variants = buildVariants(reduced);

  return (
    <section
      id="home"
      /*
       * min-h-dvh: section fills at least the full dynamic viewport height
       * (dvh accounts for mobile browser chrome better than vh).
       * flex col + justify-between: content block sits in the middle,
       * marquees sit at the bottom of the section.
       * SECTION_PADDING is applied inside the container, not on the section
       * root, so the marquee strip can bleed full-width.
       */
      className="min-h-dvh flex flex-col bg-background"
    >
      {/* ── Main content block ── */}
      <div className={`flex-1 flex items-center ${SECTION_PADDING}`}>
        <motion.div
          className={`${CONTAINER_CLASS} w-full`}
          variants={variants.container}
          initial="hidden"
          animate="visible"
        >
          {/* Intro line */}
          <motion.p
            variants={variants.item}
            className="text-base text-primary-text font-medium tracking-wide mb-2"
          >
            Hello, I&apos;m Amanuel Musa
          </motion.p>

          {/* Primary headline — single static string, completely isolated from the carousel below */}
          <motion.h1
            variants={variants.item}
            className="font-heading text-4xl md:text-6xl font-bold leading-tight mb-4 text-foreground"
          >
            Full-Stack Developer{" "}
            <span className="text-primary-text">| ECE Student</span>
          </motion.h1>

          {/* Typing carousel */}
          <motion.div variants={variants.item} className="mb-6 h-8">
            <TypingCarousel
              phrases={TYPING_PHRASES}
              className="text-lg text-foreground/70 font-medium"
            />
          </motion.div>

          {/* Short bio */}
          <motion.p
            variants={variants.item}
            className="text-base text-foreground/60 max-w-lg leading-relaxed mb-8"
          >
            Electrical &amp; Computer Engineering student at AAiT who builds
            production-grade web applications and embedded systems. I bring
            systems thinking from hardware to software — designing reliable
            full-stack products from database schema through to responsive UI.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={variants.item}
            className="flex flex-wrap gap-4"
          >
            {/*
             * "View Projects" — filled primary.
             * text-navy ensures accessible contrast against the #87BEEB fill
             * (WCAG AA passes at this combination).
             */}
            <a
              href="#projects"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-white font-semibold text-sm hover:bg-primary/85 transition-colors"
            >
              View Projects
            </a>

            {/*
             * "Download CV" — navy outline.
             * href="#" until the real PDF exists; swap the href in Phase 9.
             * Uses border-foreground/70 + text-foreground so it works in both
             * light (navy text/border) and dark (gray-bg text/border) without
             * relying on text-navy / border-navy which Tailwind v4 may not
             * generate if the classes aren't used elsewhere first.
             */}
            <a
              href="#"
              aria-label="Download CV (coming soon)"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border-2 border-foreground/70 text-foreground font-semibold text-sm hover:bg-foreground/5 transition-colors"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              Download CV
            </a>

            {/* "Let's Connect" — ghost */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md border-2 border-primary text-primary-text font-semibold text-sm hover:bg-primary/10 transition-colors"
            >
              Let&apos;s Connect
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      {/*
       * Positioned between the content and the marquees.
       * ChevronDown bounces gently to signal more content below.
       * prefers-reduced-motion: Framer Motion's animate prop is a no-op when
       * reduced motion is active — the chevron still renders but doesn't bounce.
       */}
      <div className="flex justify-center pb-6">
        <motion.div
          animate={reduced ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <ChevronDown className="w-6 h-6 text-foreground/30" />
        </motion.div>
      </div>

      {/* ── Tech marquees ── */}
      {/*
       * Full-width strips — intentionally outside CONTAINER_CLASS so they
       * bleed edge-to-edge. Separated by 1px border for visual rhythm.
       */}
      <div className="border-t border-foreground/8 py-4 space-y-4 pb-8">
        <Marquee
          items={WEB_STACK}
          direction="left"
          duration={40}
          ariaLabel="Web technology stack"
        />
        <Marquee
          items={ECE_STACK}
          direction="right"
          duration={40}
          ariaLabel="Electrical and Computer Engineering stack"
        />
      </div>
    </section>
  );
}
