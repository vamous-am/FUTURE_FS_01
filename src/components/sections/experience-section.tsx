/** Outer wrapper for the Experience group (`id="experience"`).
 *  Scroll-spy targets this ID to highlight the "Experience" nav link across all three sub-sections:
 *  the timeline, education & certificates, and core competency tags.
 *  Dividers are `aria-hidden="true"` — structure is conveyed by sub-section headings, not separators. */

import { Experience }   from "@/components/sections/experience";
import { Education }    from "@/components/sections/education";
import { Competencies } from "@/components/sections/competencies";
import { CONTAINER_CLASS, SECTION_PADDING } from "@/lib/constants";

export function ExperienceSection() {
  return (
    <section id="experience" className={`${SECTION_PADDING} bg-gray-bg dark:bg-background`}>
      <div className={CONTAINER_CLASS}>

        <h2 className="font-heading text-4xl font-bold text-foreground mb-2">Experience</h2>
        <div className="w-12 h-1 bg-primary rounded-full mb-16" aria-hidden="true" />

        <Experience />
        <hr aria-hidden="true" className="border-foreground/10 my-16" />
        <Education />
        <hr aria-hidden="true" className="border-foreground/10 my-16" />
        <Competencies />

      </div>
    </section>
  );
}
