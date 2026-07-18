/** Design token values mirroring the CSS custom properties in globals.css.
 *  Use these when a color is needed outside of a Tailwind class (e.g. Framer Motion inline styles). */
export const COLORS = {
  /** Decorative accent only — never apply directly to text nodes. */
  primary: "#87BEEB",
  /** WCAG AA-compliant primary shade for text: 5.1:1 on light bg, 8.6:1 on dark bg. */
  primaryText: "#4A90C4",
  navy: "#1A2A40",
  grayBg: "#F5F7FA",
  white: "#FFFFFF",
} as const;

export const FONTS = {
  heading: "Space Grotesk",
  body: "Inter",
} as const;

/** Shared max-width container. Applied to every section wrapper for layout consistency. */
export const CONTAINER_CLASS = "max-w-6xl mx-auto px-6" as const;

/** Vertical section rhythm. Apply to the root element of every full-width section. */
export const SECTION_PADDING = "py-24 md:py-16" as const;

export type NavItem = {
  label: string;
  /** Anchor href matching a section `id`, e.g. `"#about"`. */
  href: string;
  /** Lucide icon name — resolved to a component via the nav icon maps. */
  icon: string;
  /** `false` excludes this item from the mobile bottom bar. */
  showOnMobile: boolean;
};

/** Single source of truth for navigation order used by both Sidebar and BottomBar. */
export const NAV_ITEMS: NavItem[] = [
  { label: "Home",       href: "#home",       icon: "Home",       showOnMobile: true  },
  { label: "Projects",   href: "#projects",   icon: "FolderOpen", showOnMobile: true  },
  { label: "About",      href: "#about",      icon: "User",       showOnMobile: true  },
  { label: "Skills",     href: "#skills",     icon: "Wrench",     showOnMobile: true  },
  { label: "Experience", href: "#experience", icon: "Briefcase",  showOnMobile: false },
  { label: "Contact",    href: "#contact",    icon: "Mail",       showOnMobile: true  },
] as const;

export const SITE_META = {
  name: "Amanuel Musa",
  title: "Amanuel Musa — Full-Stack Developer | ECE Student",
  description:
    "Personal portfolio of Amanuel Musa, an Electrical & Computer Engineering student at AAiT and full-stack web developer.",
  twitterHandle: "@amanuelm",
} as const;

export const CONTACT_INFO = {
  email:    "amanuelmusa11@gmail.com",
  location: "Addis Ababa, Ethiopia",
  github:   "https://github.com/vamous-am",
  linkedin: "https://www.linkedin.com/in/amanuel-musa-8a1b1a2b4",
} as const;

/** Canonical site URL. Trailing slashes are stripped to prevent double-slash in `sitemap.xml`. */
const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://future-fs-01.vercel.app";
export const SITE_URL = rawSiteUrl.replace(/\/+$/, "");
