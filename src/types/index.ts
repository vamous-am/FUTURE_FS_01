/**
 * Shared TypeScript interfaces for all data structures used across sections.
 *
 * Rule: every data shape consumed by a section component must be defined here
 * first. Components import types from here — never define inline type literals
 * inside component files for data that comes from src/data/index.ts.
 */

// ── About / Bio ───────────────────────────────────────────────────────────────

export interface BioData {
  /** Short display name shown in section headings. */
  name: string;
  /** One or more paragraphs of bio text. Kept as an array so components can
   *  render each entry as its own <p> without splitting on arbitrary newlines. */
  paragraphs: string[];
}

// ── Competencies ──────────────────────────────────────────────────────────────

/**
 * Qualitative skill level — maps to a filled-block count out of `total`.
 * We deliberately avoid percentages; these labels are meaningful and honest.
 */
export interface Competency {
  /** Displayed domain name, e.g. "Frontend Experience". */
  label: string;
  /** Qualitative descriptor shown next to the block meter, e.g. "Advanced". */
  levelLabel: string;
  /** Number of filled (highlighted) blocks — represents current level. */
  filled: number;
  /** Total number of blocks in the meter (always 4 per spec). */
  total: number;
}

// ── Tech Stack ────────────────────────────────────────────────────────────────

/** A single technology badge inside a category card. */
export interface TechItem {
  name: string;
}

/** One category card in the tech grid. */
export interface TechCategory {
  /** Category heading, e.g. "Frontend Development". */
  category: string;
  /** Lucide icon name string — looked up in the expertise component's icon map. */
  icon: string;
  /** Technologies listed inside this category card. */
  items: TechItem[];
}

// ── Projects ──────────────────────────────────────────────────────────────────

export interface Project {
  /** Unique slug — used as React key and future routing anchor. */
  id: string;
  title: string;
  /** Problem/Solution/Result styled narrative — rendered as body text. */
  description: string;
  /** Tech badge labels. Optional — placeholder projects omit this. */
  techStack?: string[];
  /**
   * Path to screenshot image relative to /public.
   * Optional — placeholder projects render no image at all.
   * If the file is missing at runtime, ProjectCard falls back to a muted panel.
   */
  imageUrl?: string;
  /**
   * Required when imageUrl is present. Must be highly descriptive for
   * screen readers — do not use generic strings like "screenshot".
   */
  imageAlt?: string;
  /** GitHub repository URL. Optional — placeholder projects omit this. */
  githubUrl?: string;
  /** Live deployment URL. Optional — hidden when absent. */
  liveUrl?: string;
  /**
   * true → renders a dashed "under construction" card with no image or links.
   * false/undefined → renders the full active project card.
   */
  isPlaceholder?: boolean;
  /**
   * true → card spans full grid width (md:col-span-2) at the top of the grid.
   * Reserved for the flagship project only.
   */
  featured?: boolean;
}
