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
