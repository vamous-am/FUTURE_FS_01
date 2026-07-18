/** Canonical card surface used across all card-style elements in the project.
 *
 *  Surface: `bg-white dark:bg-foreground/5`, `border border-foreground/10`, `rounded-lg`, `shadow-sm`, `p-6`.
 *
 *  @param hoverable - Enables border-brighten + shadow-lift on hover. Pass `false` for static display cards.
 *  @param className - Additional classes merged into the wrapper (e.g. height or col-span overrides). */

import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
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
