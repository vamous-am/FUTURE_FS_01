"use client";

/**
 * About — section id="about", picked up by the Phase 2 scroll-spy observer.
 *
 * Photo fallback:
 *   - Attempts to load /images/profile.jpg via next/image.
 *   - On error, flips to an initials placeholder (same pattern as ProfileAvatar
 *     in the sidebar) — navy bg, white Space Grotesk initials.
 *   - Never shows a broken image icon.
 *   - When the real photo is dropped into public/images/profile.jpg, the
 *     component updates automatically with no code change.
 */

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CONTAINER_CLASS, SECTION_PADDING } from "@/lib/constants";
import { BIO } from "@/data";
import { Card } from "@/components/ui/card";

// Shared fade-up variant reused for each animated block
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const fadeUpStagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export function About() {
  const reduced = useReducedMotion();
  const [imgError, setImgError] = useState(false);

  // Derive initials for fallback: "Amanuel Musa" → "AM"
  const initials = BIO.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  /*
   * When reduced motion is preferred, all variants resolve to their visible
   * state with zero duration — elements appear immediately without animating.
   */
  const itemVariant  = reduced ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } } : fadeUp;
  const groupVariant = reduced ? { hidden: {}, visible: {} }                                      : fadeUpStagger;

  return (
    <section
      id="about"
      className={`${SECTION_PADDING} bg-background`}
    >
      <div className={CONTAINER_CLASS}>
        {/*
         * 12-column grid:
         *   lg:grid-cols-12 — activated at the lg breakpoint (1024px+).
         *   Below lg: single column, gap-12 provides vertical breathing room.
         */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* ── Left column — text content ── */}
          <motion.div
            className="lg:col-span-7"
            variants={groupVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/* Section heading */}
            <motion.h2
              variants={itemVariant}
              className="font-heading text-4xl font-bold text-foreground mb-2"
            >
              About Me
            </motion.h2>

            {/* Accent underline — primary color, 8px grid width */}
            <motion.div
              variants={itemVariant}
              className="w-12 h-1 bg-primary rounded-full mb-8"
              aria-hidden="true"
            />

            {/* Bio paragraphs — rendered from data, Inter body font */}
            {BIO.paragraphs.map((para, i) => (
              <motion.p
                key={i}
                variants={itemVariant}
                className="text-base text-foreground/70 leading-relaxed mb-4 last:mb-0"
              >
                {para}
              </motion.p>
            ))}
          </motion.div>

          {/* ── Right column — profile photo ── */}
          <motion.div
            className="lg:col-span-5"
            variants={itemVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {/*
             * Card wraps the image for the canonical border/radius/shadow.
             * p-0 override removes the default p-6 so the image fills edge-to-edge
             * inside the rounded container — cleaner for a photo frame.
             * hoverable=false — the photo card is purely decorative, no hover lift.
             */}
            <Card className="p-0 overflow-hidden" hoverable={false}>
              <div className="relative w-full aspect-[4/5]">
                {!imgError ? (
                  <Image
                    src="/images/profile.jpg"
                    alt={`${BIO.name} — professional photo`}
                    fill
                    className="object-cover object-top"
                    onError={() => setImgError(true)}
                    priority={false}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                ) : (
                  /* Initials fallback — navy bg, white Space Grotesk text */
                  <div className="w-full h-full flex items-center justify-center bg-navy dark:bg-foreground/10">
                    <span className="font-heading font-bold text-white text-6xl select-none">
                      {initials}
                    </span>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
