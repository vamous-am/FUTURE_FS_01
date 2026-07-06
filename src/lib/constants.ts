/**
 * Design token constants — single source of truth for values used in logic/data.
 *
 * These mirror the CSS custom properties defined in globals.css (@theme block).
 * Use these in TypeScript when you need a color value outside of a Tailwind class
 * (e.g. Framer Motion inline styles, canvas drawing, dynamic style objects).
 *
 * DO NOT introduce new colors, fonts, or spacing values here.
 * All additions must match AGENTS.md and portfolio_master_plan.md Section 1.
 */

export const COLORS = {
  /** Sky blue — buttons, links, active nav states, icon highlights, hover states.
   *  Never use as a large background fill. */
  primary: "#87BEEB",

  /** Dark navy — headers, dark mode background, high-contrast text on light surfaces. */
  navy: "#1A2A40",

  /** Light gray — light mode page background. */
  grayBg: "#F5F7FA",

  /** Pure white — cards, surfaces, modal backgrounds. */
  white: "#FFFFFF",
} as const;

export const FONTS = {
  heading: "Space Grotesk",
  body: "Inter",
} as const;

/** Shared page container class — use on every section wrapper, never invent a bespoke width. */
export const CONTAINER_CLASS = "max-w-6xl mx-auto px-6" as const;

/** Section vertical rhythm — apply to every full-width section root element. */
export const SECTION_PADDING = "py-24 md:py-16" as const;

/**
 * Navigation config — single source of truth for all nav links.
 *
 * Desktop sidebar renders all 6 items (showOnMobile: true/false doesn't matter
 * for desktop). Mobile bottom bar renders only the 5 items where
 * `showOnMobile: true` — Experience is dropped on mobile per the master plan
 * because the bottom bar has 5 slots and Experience is lower priority on small
 * screens where vertical real estate is tight.
 *
 * icon: string key matching the Lucide icon name — the nav components
 * import the actual icon components and look them up by this key so this
 * file stays free of any React/JSX dependency.
 */
export type NavItem = {
  label: string;
  href: string;           // matches the section id, e.g. "#about" → <section id="about">
  icon: string;           // Lucide icon name (PascalCase string key)
  showOnMobile: boolean;  // false = desktop sidebar only
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home",       href: "#home",       icon: "Home",       showOnMobile: true  },
  { label: "About",      href: "#about",      icon: "User",       showOnMobile: true  },
  { label: "Projects",   href: "#projects",   icon: "FolderOpen", showOnMobile: true  },
  { label: "Skills",     href: "#skills",     icon: "Wrench",     showOnMobile: true  },
  { label: "Experience", href: "#experience", icon: "Briefcase",  showOnMobile: false },
  { label: "Contact",    href: "#contact",    icon: "Mail",       showOnMobile: true  },
] as const;

/** Site metadata used in layout.tsx and later in the SEO phase. */
export const SITE_META = {
  name: "Amanuel Musa",
  title: "Amanuel Musa — Full-Stack Developer | ECE Student",
  description:
    "Personal portfolio of Amanuel Musa, an Electrical & Computer Engineering student at AAiT and full-stack web developer.",
  url: "https://future-fs-01.vercel.app", // update once deployed in Phase 9
  twitterHandle: "@amanuelm",
} as const;
