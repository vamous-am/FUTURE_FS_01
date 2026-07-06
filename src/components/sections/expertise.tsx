"use client";

/**
 * Expertise — section id="skills", picked up by the Phase 2 scroll-spy observer.
 *
 * Two sub-sections:
 *   1. Qualitative Competency Meters — block-pill meters for 3 domain levels.
 *   2. Tech Category Grid — 6 cards, 3 cols on desktop, 2 on tablet, 1 on mobile.
 *
 * Data: all content from src/data/index.ts.
 *
 * Accessibility:
 *   - Each meter row has aria-label="<domain>: <level>" on its container.
 *   - The visual pill blocks have aria-hidden="true" — they carry no info a
 *     screen reader doesn't already get from the aria-label.
 *   - Tech badge lists are plain <ul>/<li> — semantic and announced correctly.
 *
 * Animation:
 *   - Competency pills animate width 0→full via Framer Motion whileInView.
 *   - Tech cards fade-up staggered on scroll.
 *   - useReducedMotion disables all animation variants.
 */

import { motion, useReducedMotion } from "framer-motion";
import {
  Layers,
  Code2,
  FolderOpen,
  Wrench,
  Briefcase,
  Home,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CONTAINER_CLASS, SECTION_PADDING } from "@/lib/constants";
import { COMPETENCIES, TECH_CATEGORIES } from "@/data";
import { Card } from "@/components/ui/card";

// ── Icon map ──────────────────────────────────────────────────────────────────

/*
 * Maps the string icon keys in TECH_CATEGORIES to actual Lucide components.
 * Using the same icon set confirmed in the project (Phase 2 prompt).
 * "Home" is a fallback for "Engineering Tools" — Phase 5+ can refine if needed.
 */
const ICON_MAP: Record<string, LucideIcon> = {
  Layers,
  Code2,
  FolderOpen,
  Wrench,
  Briefcase,
  Home,
};

// ── Variants ──────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// ── Competency Meter ──────────────────────────────────────────────────────────

interface MeterProps {
  label:      string;
  levelLabel: string;
  filled:     number;
  total:      number;
  reduced:    boolean | null;
  /** Stagger index — drives per-item animation delay. */
  index:      number;
}

function CompetencyMeter({
  label,
  levelLabel,
  filled,
  total,
  reduced,
  index,
}: MeterProps) {
  return (
    /*
     * aria-label gives screen readers the full meaningful description:
     * "Frontend Experience: Advanced". The visual blocks below are aria-hidden.
     */
    <motion.div
      aria-label={`${label}: ${levelLabel}`}
      className="flex flex-col gap-2"
      variants={reduced ? undefined : fadeUp}
      custom={index}
      initial={reduced ? undefined : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, margin: "-60px" }}
    >
      {/* Label row */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm text-primary-text font-medium">{levelLabel}</span>
      </div>

      {/* Visual pill blocks — purely decorative */}
      <div
        className="flex gap-2"
        aria-hidden="true"
      >
        {Array.from({ length: total }).map((_, i) => {
          const isActive = i < filled;
          return (
            <motion.div
              key={i}
              className={`
                h-3 flex-1 rounded-full
                ${isActive
                  ? "bg-primary"
                  : "bg-foreground/10"}
              `}
              /*
               * Animate filled blocks: scale from 0.4→1 with a slight delay
               * per block to give a left-to-right "fill" impression.
               * Inactive blocks are static.
               */
              initial={reduced || !isActive ? undefined : { scaleX: 0.4, opacity: 0 }}
              whileInView={reduced || !isActive ? undefined : { scaleX: 1, opacity: 1 }}
              transition={
                reduced || !isActive
                  ? undefined
                  : { duration: 0.35, delay: i * 0.07, ease: "easeOut" }
              }
              viewport={{ once: true }}
              style={{ transformOrigin: "left" }}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export function Expertise() {
  const reduced = useReducedMotion();

  const sectionVariant = reduced
    ? { hidden: {}, visible: {} }
    : stagger;

  const itemVariant = reduced
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : fadeUp;

  return (
    <section
      id="skills"
      className={`${SECTION_PADDING} bg-gray-bg dark:bg-background`}
    >
      <div className={CONTAINER_CLASS}>

        {/* ── Section heading ── */}
        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <motion.h2
            variants={itemVariant}
            className="font-heading text-4xl font-bold text-foreground mb-2"
          >
            Technical Expertise
          </motion.h2>
          <motion.div
            variants={itemVariant}
            className="w-12 h-1 bg-primary rounded-full"
            aria-hidden="true"
          />
        </motion.div>

        {/* ── 1. Competency meters ── */}
        <div className="mb-16">
          <motion.h3
            variants={itemVariant}
            initial={reduced ? undefined : "hidden"}
            whileInView={reduced ? undefined : "visible"}
            viewport={{ once: true }}
            className="font-heading text-lg font-semibold text-foreground mb-6"
          >
            Core Competencies
          </motion.h3>

          <div className="flex flex-col gap-6 max-w-2xl">
            {COMPETENCIES.map((c, i) => (
              <CompetencyMeter
                key={c.label}
                label={c.label}
                levelLabel={c.levelLabel}
                filled={c.filled}
                total={c.total}
                reduced={reduced}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* ── 2. Tech category grid ── */}
        <div>
          <motion.h3
            variants={itemVariant}
            initial={reduced ? undefined : "hidden"}
            whileInView={reduced ? undefined : "visible"}
            viewport={{ once: true }}
            className="font-heading text-lg font-semibold text-foreground mb-6"
          >
            Technology Stack
          </motion.h3>

          {/*
           * Responsive grid:
           *   Mobile  (< md)  — 1 column
           *   Tablet  (md+)   — 2 columns
           *   Desktop (lg+)   — 3 columns
           */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={sectionVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {TECH_CATEGORIES.map((cat) => {
              const Icon = ICON_MAP[cat.icon] ?? Wrench;

              return (
                <motion.div key={cat.category} variants={itemVariant}>
                  {/*
                   * Canonical Card component — border, radius, shadow, padding
                   * are all inherited from the Phase 1 card primitive.
                   * No bespoke card styles here.
                   */}
                  <Card className="h-full">
                    {/* Card header — icon + category name */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="p-2 rounded-md bg-primary/10">
                        <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                      </span>
                      <h4 className="font-heading text-base font-semibold text-foreground">
                        {cat.category}
                      </h4>
                    </div>

                    {/* Tech badges */}
                    <ul
                      className="flex flex-wrap gap-2"
                      aria-label={`${cat.category} technologies`}
                    >
                      {cat.items.map((item) => (
                        <li key={item.name}>
                          <span
                            className="
                              inline-block px-3 py-1 text-sm
                              rounded-full
                              bg-foreground/5 border border-foreground/10
                              text-foreground/70
                              hover:bg-primary/10 hover:border-primary/30 hover:text-primary-text
                              transition-colors cursor-default
                            "
                          >
                            {item.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
