"use client";

/** Typewriter-style phrase carousel implemented with React state and `setTimeout` — no external library.
 *  Cycles through `phrases` in a type → pause → delete → pause loop.
 *  When `prefers-reduced-motion` is active, falls back to a CSS opacity crossfade with no character animation.
 *  Uses `aria-live="polite"` so screen readers announce the completed phrase, not individual characters.
 *
 *  @param phrases - Ordered list of phrases to cycle through.
 *  @param className - Applied to the text container for color and size overrides. */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type TypingCarouselProps = {
  phrases: string[];
  className?: string;
};

const TYPE_SPEED   = 60;
const DELETE_SPEED = 35;
const PAUSE_AFTER  = 2200;
const PAUSE_BEFORE = 400;

export function TypingCarousel({ phrases, className = "" }: TypingCarouselProps) {
  const reducedMotion = useReducedMotion();
  const [fadeIndex, setFadeIndex] = useState(0);

  useEffect(() => {
    if (!reducedMotion) return;
    const id = setInterval(() => setFadeIndex((i) => (i + 1) % phrases.length), 3500);
    return () => clearInterval(id);
  }, [reducedMotion, phrases.length]);

  if (reducedMotion) {
    return (
      <span className={`inline-block transition-opacity duration-700 ${className}`} aria-live="polite" aria-atomic="true">
        {phrases[fadeIndex]}
      </span>
    );
  }

  return <TypingCore phrases={phrases} className={className} />;
}

function TypingCore({ phrases, className }: { phrases: string[]; className: string }) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed]     = useState("");
  const [isDeleting, setIsDeleting]   = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = phrases[phraseIndex];

    function tick() {
      if (!isDeleting) {
        if (displayed.length < current.length) {
          setDisplayed(current.slice(0, displayed.length + 1));
          timeoutRef.current = setTimeout(tick, TYPE_SPEED);
        } else {
          timeoutRef.current = setTimeout(() => setIsDeleting(true), PAUSE_AFTER);
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(current.slice(0, displayed.length - 1));
          timeoutRef.current = setTimeout(tick, DELETE_SPEED);
        } else {
          setIsDeleting(false);
          timeoutRef.current = setTimeout(() => setPhraseIndex((i) => (i + 1) % phrases.length), PAUSE_BEFORE);
        }
      }
    }

    timeoutRef.current = setTimeout(tick, isDeleting ? DELETE_SPEED : TYPE_SPEED);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayed, isDeleting, phraseIndex, phrases]);

  return (
    <span className={`inline-block ${className}`} aria-live="polite" aria-atomic="true">
      {displayed}
      <span className="typing-cursor" aria-hidden="true">|</span>
    </span>
  );
}
