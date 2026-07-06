/**
 * Card — canonical card primitive.
 *
 * This is the ONE card style for the entire project (per AGENTS.md).
 * Every card-style element — project cards, tech category cards, education
 * cards, certificate cards — must use this component. Never redefine card
 * radius, border, shadow, or padding per section.
 *
 * Anatomy:
 *   - bg-white  dark:bg-foreground/5  — white surface in light, subtle tint in dark.
 *   - border    border-foreground/10  — 1px muted border, works in both modes.
 *   - rounded-lg (--radius-lg: 12px)  — canonical radius from the design system.
 *   - shadow-sm                       — very subtle lift, not a heavy drop shadow.
 *   - p-6                             — 24px internal padding (8px grid × 3).
 *   - hover: slight border brightening + shadow-md lift — applied when hoverable.
 *
 * Props:
 *   - className  — additional classes to merge (e.g. col-span, height overrides).
 *   - hoverable  — enables the hover micro-animation (default: true).
 *   - asChild    — not implemented; add if you need slot composition later.
 *
 * DO NOT add colors, radii, or shadows outside this component for card surfaces.
 */

import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Enables hover border + shadow lift. Pass false for static display cards. */
  hoverable?: boolean;
}

export function Card({ children, className = "", hoverable = true }: CardProps) {
  return (
    <div
      className={`
        bg-white dark:bg-foreground/5
        border border-foreground/10
        rounded-lg shadow-sm
        p-6
        ${hoverable
          ? "transition-all duration-200 hover:border-foreground/20 hover:shadow-md"
          : ""}
        ${className}
      `.trim().replace(/\s+/g, " ")}
    >
      {children}
    </div>
  );
}
