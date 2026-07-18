"use client";

/** Tracks the currently visible section using a single `IntersectionObserver`.
 *  Returns the `id` of the section most visible within a narrow trigger band near the top of the viewport.
 *  The `rootMargin` of `-40% 0px -55% 0px` activates a section when its heading enters comfortable reading
 *  position, not the instant any pixel enters the viewport. The observer is stored in a `ref` to avoid
 *  recreation on every render.
 *
 *  @param sectionIds - Array of section element IDs to observe, e.g. `["home", "about", "projects"]`. */

import { useEffect, useRef, useState } from "react";

export function useScrollSpy(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
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
