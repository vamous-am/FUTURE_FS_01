/** Infinite horizontal scrolling strip driven by pure CSS keyframes — no JS animation loop.
 *  Two identical item lists are placed end-to-end; the animation translates the track by 50%,
 *  creating a seamless loop. Speed is controlled via the `--marquee-duration` CSS custom property.
 *  Edge fade is applied via `mask-image`. Pauses on hover and respects `prefers-reduced-motion`.
 *
 *  @param items - Array of label strings to display.
 *  @param direction - Scroll direction. `"left"` (default) or `"right"`.
 *  @param duration - Animation duration in seconds. Higher = slower. Default 45s.
 *  @param ariaLabel - Accessible label for the marquee landmark. */

type MarqueeProps = {
  items: string[];
  direction?: "left" | "right";
  duration?: number;
  ariaLabel?: string;
};

export function Marquee({
  items,
  direction = "left",
  duration = 45,
  ariaLabel = "Technology marquee",
}: MarqueeProps) {
  const trackClass = direction === "right" ? "marquee-track-reverse" : "marquee-track";

  return (
    <div
      className="marquee-wrapper overflow-hidden relative w-full"
      role="marquee"
      aria-label={ariaLabel}
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div
        className={`flex w-max ${trackClass}`}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        <ul className="flex items-center gap-8 px-4" aria-label={ariaLabel}>
          {items.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm font-medium text-foreground/50 whitespace-nowrap select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        {/* Duplicate list for seamless loop — hidden from assistive technology */}
        <ul className="flex items-center gap-8 px-4" aria-hidden="true">
          {items.map((item) => (
            <li key={`${item}-dup`} className="flex items-center gap-2 text-sm font-medium text-foreground/50 whitespace-nowrap select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
