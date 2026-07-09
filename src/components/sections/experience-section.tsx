/**
 * ExperienceSection — the outer wrapper carrying id="experience".
 *
 * This is the only element with id="experience" in the entire page.
 * The scroll-spy observer watches this ID and highlights the "Experience"
 * nav link when any part of this section (timeline, education, competencies)
 * is in the viewport trigger zone.
 *
 * Sub-sections rendered in order:
 *   1. Experience (vertical timeline)
 *   2. Education & Certificates
 *   3. Core Competencies
 *
 * All three are separated by a horizontal rule for visual rhythm.
 * Background alternates from Projects (bg-background) to bg-gray-bg
 * so the section has visual contrast when scrolling past.
 */

import { Experience }    from "@/components/sections/experience";
import { Education }     from "@/components/sections/education";
import { Competencies }  from "@/components/sections/competencies";
import { CONTAINER_CLASS, SECTION_PADDING } from "@/lib/constants";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className={`${SECTION_PADDING} bg-gray-bg dark:bg-background`}
    >
      <div className={CONTAINER_CLASS}>

        {/* Main section heading — matches the "Experience" nav label exactly */}
        <h2 className="font-heading text-4xl font-bold text-foreground mb-2">
          Experience
        </h2>
        <div className="w-12 h-1 bg-primary rounded-full mb-16" aria-hidden="true" />

        {/* 1. Timeline */}
        <Experience />

        {/*
         * aria-hidden="true" — screen readers already have structure from the
         * sub-section headings (h3). These dividers are purely visual rhythm;
         * announcing "separator" twice adds noise without information value.
         * Confirmed inside CONTAINER_CLASS — does not bleed to viewport edge.
         */}
        <hr aria-hidden="true" className="border-foreground/10 my-16" />

        {/* 2. Education & Certificates */}
        <Education />

        <hr aria-hidden="true" className="border-foreground/10 my-16" />

        {/* 3. Core Competencies */}
        <Competencies />

      </div>
    </section>
  );
}
