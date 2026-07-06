"use client";

/**
 * useScrollSpy — Intersection Observer-based active section tracker.
 *
 * How it works:
 *   1. Accepts an array of section IDs (e.g. ["home", "about", "projects"]).
 *   2. Creates one IntersectionObserver that watches all matching <section>
 *      elements simultaneously.
 *   3. Returns the ID of whichever section is currently most visible in the
 *      viewport — nav components use this to apply active-state styling.
 *
 * Why rootMargin "-40% 0px -55% 0px":
 *   - The top 40% and bottom 55% of the viewport are excluded from the
 *     "active" trigger zone, leaving a ~5% band in the upper-middle of the
 *     screen. This means a section is marked active when its heading has just
 *     scrolled into comfortable reading position, not the instant any pixel
 *     enters the viewport. Adjust if sections feel laggy or too eager.
 *
 * Why useRef for the observer:
 *   - Storing the observer in a ref avoids recreating it on every render.
 *     The effect only reruns when `sectionIds` changes identity, which is
 *     never during normal usage (the array is defined outside the component).
 */

import { useEffect, useRef, useState } from "react";

export function useScrollSpy(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Clean up any previous observer before creating a new one
    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the entry that is currently intersecting and has the highest
        // intersection ratio. If multiple sections overlap the trigger band
        // simultaneously, we prefer the one most visible.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Trigger zone: a narrow band ~5% from the top of the viewport.
        // Tune these values if the active state feels off during Phase 3+.
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0,
      }
    );

    const observer = observerRef.current;

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
