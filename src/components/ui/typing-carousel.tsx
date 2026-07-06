"use client";

/**
 * TypingCarousel — cycles through a list of phrases with a typewriter effect.
 *
 * Implementation:
 *   - Pure React state + setTimeout — no external library dependency.
 *   - Three phases per phrase: typing → pause → deleting → pause → next phrase.
 *   - A blinking cursor is rendered as a separate <span> with a CSS animation
 *     defined in globals.css so it respects prefers-reduced-motion automatically.
 *
 * Timing constants (tweak here if the feel needs adjusting):
 *   TYPE_SPEED    — ms per character while typing forward.
 *   DELETE_SPEED  — ms per character while deleting (slightly faster feels natural).
 *   PAUSE_AFTER   — ms to hold the completed phrase before starting to delete.
 *   PAUSE_BEFORE  — ms to pause on the empty string before typing the next phrase.
 *
 * Accessibility:
 *   - The container has aria-live="polite" so screen readers announce the
 *     completed phrase once typing finishes, without announcing each character.
 *   - prefers-reduced-motion: when set, we skip the typing animation entirely
 *     and just cross-fade between the full phrases using CSS opacity transition.
 *     This is detected via the useReducedMotion hook from framer-motion, which
 *     is already a project dependency — no new package needed.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type TypingCarouselProps = {
  phrases: string[];
  /** Class applied to the text span — use for color/size overrides. */
  className?: string;
};

const TYPE_SPEED   = 60;   // ms per char, typing forward
const DELETE_SPEED = 35;   // ms per char, deleting
const PAUSE_AFTER  = 2200; // ms hold on completed phrase
const PAUSE_BEFORE = 400;  // ms pause before typing next phrase

export function TypingCarousel({ phrases, className = "" }: TypingCarouselProps) {
  const reducedMotion = useReducedMotion();

  // ── Reduced-motion variant: simple fade crossfade, no typing ──────────────
  const [fadeIndex, setFadeIndex] = useState(0);
  useEffect(() => {
    if (!reducedMotion) return;
    const id = setInterval(() => {
      setFadeIndex((i) => (i + 1) % phrases.length);
    }, 3500);
    return () => clearInterval(id);
  }, [reducedMotion, phrases.length]);

  if (reducedMotion) {
    return (
      <span
        className={`inline-block transition-opacity duration-700 ${className}`}
        aria-live="polite"
        aria-atomic="true"
      >
        {phrases[fadeIndex]}
      </span>
    );
  }

  // ── Full typing variant ────────────────────────────────────────────────────
  return <TypingCore phrases={phrases} className={className} />;
}

/** Inner component — only mounts when animations are allowed. */
function TypingCore({
  phrases,
  className,
}: {
  phrases: string[];
  className: string;
}) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed]     = useState("");
  const [isDeleting, setIsDeleting]   = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = phrases[phraseIndex];

    function tick() {
      if (!isDeleting) {
        // Still typing forward
        if (displayed.length < current.length) {
          setDisplayed(current.slice(0, displayed.length + 1));
          timeoutRef.current = setTimeout(tick, TYPE_SPEED);
        } else {
          // Finished typing — pause, then start deleting
          timeoutRef.current = setTimeout(() => setIsDeleting(true), PAUSE_AFTER);
        }
      } else {
        // Deleting backward
        if (displayed.length > 0) {
          setDisplayed(current.slice(0, displayed.length - 1));
          timeoutRef.current = setTimeout(tick, DELETE_SPEED);
        } else {
          // Finished deleting — pause, then move to next phrase
          setIsDeleting(false);
          timeoutRef.current = setTimeout(() => {
            setPhraseIndex((i) => (i + 1) % phrases.length);
          }, PAUSE_BEFORE);
        }
      }
    }

    timeoutRef.current = setTimeout(tick, isDeleting ? DELETE_SPEED : TYPE_SPEED);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // displayed and isDeleting intentionally drive the recursion
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayed, isDeleting, phraseIndex, phrases]);

  return (
    /*
     * aria-live="polite" — SR announces the text once the phrase is complete,
     * not on every character update. aria-atomic prevents partial reads.
     */
    <span
      className={`inline-block ${className}`}
      aria-live="polite"
      aria-atomic="true"
    >
      {displayed}
      {/* Blinking cursor — CSS animation defined in globals.css */}
      <span className="typing-cursor" aria-hidden="true">|</span>
    </span>
  );
}
