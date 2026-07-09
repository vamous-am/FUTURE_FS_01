"use client";

/**
 * Experience — vertical timeline of professional and academic work.
 *
 * Semantic markup:
 *   - <ol> (ordered list) for the timeline — this is a genuinely chronological
 *     sequence, so <ol> is more semantically correct than <ul> or <div> stacks.
 *   - Each <li> contains the node dot, connector line, and content card.
 *
 * Timeline anatomy:
 *   - Left column: primary-color filled circle node + vertical connector line.
 *   - Right column: role, organisation, period, bullet list.
 *   - The connector line is drawn as a border-left on the <li> element, offset
 *     to align with the center of the node circle — no absolute-positioned hacks.
 *
 * Animation:
 *   - Each timeline item fades up on scroll entry via whileInView.
 *   - useReducedMotion: all variants resolve immediately, no motion at all.
 *
 * This section does NOT carry id="experience" — it is one sub-section of the
 * parent <section id="experience"> wrapper in page.tsx (with Education and
 * Competencies below), so scroll-spy correctly highlights "Experience" nav link
 * for the entire group.
 */

import { motion, useReducedMotion } from "framer-motion";
import { TIMELINE } from "@/data";

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export function Experience() {
  const reduced = useReducedMotion();

  const itemVariant    = reduced ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } } : fadeUp;
  const sectionVariant = reduced ? { hidden: {}, visible: {} } : stagger;

  return (
    <div>
      {/* Timeline list — heading is the parent h2 "Experience" in ExperienceSection */}
      <motion.ol
        className="flex flex-col gap-0"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        aria-label="Experience timeline"
      >
        {TIMELINE.map((entry, idx) => {
          const isLast = idx === TIMELINE.length - 1;

          return (
            <motion.li
              key={entry.id}
              variants={itemVariant}
              className="flex gap-4"
            >
              {/* ── Left column: node + connector ── */}
              <div className="flex flex-col items-center">
                {/*
                 * Circle node — primary fill, white center dot for the
                 * "hollow ring" effect on hover would require JS; keep it
                 * simple as a solid filled circle here.
                 */}
                <div
                  className="w-3 h-3 rounded-full bg-primary shrink-0 mt-1.5 ring-2 ring-primary/30"
                  aria-hidden="true"
                />
                {/* Connector line — hidden on the last item */}
                {!isLast && (
                  <div
                    className="w-px flex-1 bg-foreground/10 my-2"
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* ── Right column: content ── */}
              <div className={`flex-1 ${isLast ? "pb-0" : "pb-8"}`}>
                {/* Role + period */}
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                  <h4 className="font-heading text-base font-semibold text-foreground">
                    {entry.role}
                  </h4>
                  <span className="text-sm text-foreground/50 font-medium shrink-0">
                    {entry.period}
                  </span>
                </div>

                {/* Organisation */}
                <p className="text-sm text-primary-text font-medium mb-3">
                  {entry.organisation}
                </p>

                {/* Accomplishment bullets */}
                <ul className="space-y-1.5" aria-label={`Accomplishments at ${entry.organisation}`}>
                  {entry.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-2 text-sm text-foreground/60 leading-relaxed">
                      {/* Bullet accent dot */}
                      <span
                        className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0"
                        aria-hidden="true"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          );
        })}
      </motion.ol>
    </div>
  );
}
