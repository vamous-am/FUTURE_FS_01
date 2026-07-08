"use client";

/**
 * Projects — section id="projects", picked up by the Phase 2 scroll-spy.
 *
 * Grid layout:
 *   Mobile  (<md)  — single column, all cards stacked.
 *   Tablet+ (md+)  — 2-column grid.
 *     Row 1: Featured card (SaporiVivi) spans both columns via md:col-span-2.
 *     Row 2: Two placeholder cards sit side-by-side symmetrically.
 *
 * This layout ensures there are never awkward half-empty rows regardless of
 * viewport width. Three cards = one 2-wide + two 1-wide = perfect rectangle.
 *
 * Animation: same fade-up stagger pattern as Phases 3 & 4.
 * useReducedMotion disables all animation when the user prefers it.
 *
 * Data: all content from PROJECT_ITEMS in src/data/index.ts.
 * No strings, URLs, or tech tags hardcoded in this file.
 */

import { motion, useReducedMotion } from "framer-motion";
import { CONTAINER_CLASS, SECTION_PADDING } from "@/lib/constants";
import { PROJECT_ITEMS } from "@/data";
import { ProjectCard } from "@/components/ui/project-card";

// ── Animation variants — identical pattern to Phase 4 ────────────────────────

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ── Component ─────────────────────────────────────────────────────────────────

export function Projects() {
  const reduced = useReducedMotion();

  const itemVariant    = reduced ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } } : fadeUp;
  const sectionVariant = reduced ? { hidden: {}, visible: {} } : stagger;

  return (
    <section
      id="projects"
      className={`${SECTION_PADDING} bg-background`}
    >
      <div className={CONTAINER_CLASS}>

        {/* ── Section header ── */}
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
            Featured Projects
          </motion.h2>
          <motion.div
            variants={itemVariant}
            className="w-12 h-1 bg-primary rounded-full mb-4"
            aria-hidden="true"
          />
          <motion.p
            variants={itemVariant}
            className="text-base text-foreground/60 max-w-xl"
          >
            Production work and engineering projects — built from schema to deployment.
          </motion.p>
        </motion.div>

        {/* ── Project grid ── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {PROJECT_ITEMS.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariant}
              /*
               * Featured project spans both columns on md+ viewports.
               * On mobile (single column) col-span has no effect — correct.
               */
              className={project.featured ? "md:col-span-2" : ""}
            >
              {/*
               * Featured badge is rendered inside the card's title area via a
               * wrapper here — keeps ProjectCard unaware of layout context.
               */}
              <div className="relative h-full">
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary text-white shadow-sm">
                      Flagship Project
                    </span>
                  </div>
                )}
                <ProjectCard project={project} />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
