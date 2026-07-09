"use client";

/**
 * Competencies — core workflow and methodology tags rendered as pill badges.
 *
 * These are technical process labels, not personal buzzwords.
 * Rendered as a simple flex-wrap of static pill badges with:
 *   - Subtle background offset (bg-foreground/5)
 *   - Muted border (border-foreground/10)
 *   - Hover: primary tint background + primary-text color
 *
 * Animation: staggered fade-in on scroll, same pattern as all prior sections.
 */

import { motion, useReducedMotion } from "framer-motion";
import { CORE_COMPETENCIES } from "@/data";

const fadeUp = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export function Competencies() {
  const reduced = useReducedMotion();

  const itemVariant    = reduced ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } } : fadeUp;
  const sectionVariant = reduced ? { hidden: {}, visible: {} } : stagger;

  return (
    <div>
      {/* Sub-section heading */}
      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mb-10"
      >
        <motion.h3
          variants={itemVariant}
          className="font-heading text-2xl font-bold text-foreground mb-2"
        >
          Core Competencies
        </motion.h3>
        <motion.div
          variants={itemVariant}
          className="w-8 h-1 bg-primary rounded-full"
          aria-hidden="true"
        />
      </motion.div>

      {/* Badge grid */}
      <motion.ul
        className="flex flex-wrap gap-3"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        aria-label="Core competencies"
      >
        {CORE_COMPETENCIES.map((tag) => (
          <motion.li key={tag} variants={itemVariant}>
            <span
              className="
                inline-block px-4 py-2
                text-sm font-medium
                rounded-full
                bg-foreground/5 border border-foreground/10
                text-foreground/70
                hover:bg-primary/10 hover:border-primary/30 hover:text-primary-text
                transition-colors cursor-default
              "
            >
              {tag}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
