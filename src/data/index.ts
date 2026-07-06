/**
 * src/data/index.ts — single source of truth for all portfolio content.
 *
 * Rules (from AGENTS.md):
 *  - No raw content may be hardcoded inside section components.
 *  - All text, skill levels, and tech items live here and are imported.
 *  - Types are imported from src/types/index.ts — not re-declared inline.
 */

import type { BioData, Competency, TechCategory } from "@/types";

// ── Bio ───────────────────────────────────────────────────────────────────────

export const BIO: BioData = {
  name: "Amanuel Musa",
  paragraphs: [
    "I'm an Electrical & Computer Engineering student at Addis Ababa Institute of Technology (AAiT), building production-grade web software and embedded systems side by side. My ECE background isn't a detour from software — it's a competitive advantage. Studying digital logic, microprocessors, and signal flow gives me a low-level mental model that most web developers never develop: I think in data pipelines, system boundaries, and fault tolerance before I write a single line of application code.",
    "On the software side I've shipped full-stack products using React, Next.js, Node.js, and PostgreSQL, including a restaurant management platform (SaporiVivi) with a JWT-to-httpOnly cookie migration, an optimised image pipeline, and a normalised relational schema. On the hardware side I prototype IoT devices with ESP32, write firmware in C/C++, and use MATLAB and Proteus for simulation and circuit validation.",
    "I care about the seam between layers — where a hardware interrupt becomes an API event, where a database schema decision ripples into UI latency, where a deployment pipeline determines product reliability. That end-to-end perspective is what I bring to every project I work on.",
  ],
};

// ── Qualitative Competencies ──────────────────────────────────────────────────

/**
 * 4-block meter scale:
 *   4 / 4 → Advanced
 *   3 / 4 → Intermediate
 *   2 / 4 → Intermediate / Learning
 *   1 / 4 → Learning
 *
 * Levels are qualitative — not fake percentages.
 */
export const COMPETENCIES: Competency[] = [
  {
    label:      "Frontend Experience",
    levelLabel: "Intermediate",
    filled:     3,
    total:      4,
  },
  {
    label:      "Backend Experience",
    levelLabel: "Advanced",
    filled:     4,
    total:      4,
  },
  {
    label:      "Embedded Systems & Cloud",
    levelLabel: "Intermediate / Learning",
    filled:     2,
    total:      4,
  },
];

// ── Categorised Tech Stack ────────────────────────────────────────────────────

/**
 * Exactly 6 categories per the master plan spec.
 * icon: Lucide icon name — the Expertise component maps these to components.
 */
export const TECH_CATEGORIES: TechCategory[] = [
  {
    category: "Frontend Development",
    icon: "Layers",
    items: [
      { name: "React" },
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    category: "Backend Development",
    icon: "Code2",
    items: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "REST APIs" },
    ],
  },
  {
    category: "Databases & Storage",
    icon: "FolderOpen",
    items: [
      { name: "PostgreSQL" },
      { name: "MongoDB" },
    ],
  },
  {
    category: "Cloud & DevOps",
    icon: "Wrench",
    items: [
      { name: "Docker" },
      { name: "Git" },
      { name: "Vercel" },
      { name: "GitHub Actions" },
    ],
  },
  {
    category: "Embedded Systems & Electronics",
    icon: "Briefcase",
    items: [
      { name: "ESP32" },
      { name: "Arduino" },
      { name: "C / C++" },
      { name: "KiCad" },
      { name: "MQTT" },
    ],
  },
  {
    category: "Engineering Tools",
    icon: "Home",
    items: [
      { name: "Linux" },
      { name: "MATLAB" },
      { name: "Proteus" },
      { name: "VS Code" },
    ],
  },
];
