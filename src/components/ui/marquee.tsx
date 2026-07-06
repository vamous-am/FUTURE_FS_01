/**
 * Marquee — infinite horizontal scrolling strip.
 *
 * Implementation strategy — pure CSS keyframes, no JS animation loop:
 *   - The track div holds two identical copies of the items list side-by-side.
 *   - The keyframe slides the track by -50% (left) or from -50%→0 (right),
 *     which brings the second copy exactly into view when the first exits —
 *     creating a seamless loop with zero JS overhead.
 *   - Animation class is picked from globals.css: .marquee-track (left) or
 *     .marquee-track-reverse (right).
 *   - Duration is passed as a CSS custom property so speed is controllable
 *     without touching the keyframe definition.
 *
 * Accessibility:
 *   - aria-hidden="true" on the duplicate copy — screen readers only announce
 *     the items once.
 *   - The wrapper gets role="marquee" and aria-label so AT users know it's a
 *     ticker and can skip it.
 *   - prefers-reduced-motion pauses the animation (handled in globals.css).
 *
 * Fade edges:
 *   - A CSS mask-image gradient fades the left and right edges to transparent
 *     so items don't hard-clip at the container boundary.
 */

type MarqueeProps = {
  items: string[];
  /** "left" (default) or "right" — controls scroll direction. */
  direction?: "left" | "right";
  /** Animation duration in seconds. Longer = slower. Default 45s. */
  duration?: number;
  /** Accessible label for the marquee region. */
  ariaLabel?: string;
};

export function Marquee({
  items,
  direction = "left",
  duration = 45,
  ariaLabel = "Technology marquee",
}: MarqueeProps) {
  const trackClass =
    direction === "right" ? "marquee-track-reverse" : "marquee-track";

  return (
    <div
      className="marquee-wrapper overflow-hidden relative w-full"
      role="marquee"
      aria-label={ariaLabel}
      /* Soft fade on left and right edges */
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      {/*
       * Track: two copies of the item list placed end-to-end.
       * The animation slides the combined width by 50% so the second copy
       * slides into view exactly as the first slides out.
       */}
      <div
        className={`flex w-max ${trackClass}`}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {/* First copy — visible to screen readers */}
        <ul className="flex items-center gap-8 px-4" aria-label={ariaLabel}>
          {items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-sm font-medium text-foreground/50 whitespace-nowrap select-none"
            >
              {/* Accent dot separator */}
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>

        {/* Second copy — hidden from AT, purely visual for seamless loop */}
        <ul className="flex items-center gap-8 px-4" aria-hidden="true">
          {items.map((item) => (
            <li
              key={`${item}-dup`}
              className="flex items-center gap-2 text-sm font-medium text-foreground/50 whitespace-nowrap select-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
