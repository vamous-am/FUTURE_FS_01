"use client";

/**
 * Sidebar — desktop left navigation (visible lg: breakpoint and up).
 *
 * Structure:
 *   1. Profile/branding area — name, title, brief identity line.
 *   2. Vertical nav links — all 6 items from NAV_ITEMS.
 *   3. Theme toggle at the bottom.
 *
 * Scroll-spy integration:
 *   - useScrollSpy tells us which section is currently visible.
 *   - Links whose href matches `#${activeId}` get the primary accent color
 *     and a left border indicator.
 *
 * Styling discipline:
 *   - Uses design tokens: bg-white dark:bg-navy, border-gray-bg dark:border-foreground/10.
 *   - All spacing is 8px-grid multiples (p-6, gap-4, etc.) per AGENTS.md.
 *   - No arbitrary values.
 *
 * Hidden on mobile (lg:flex) — mobile uses BottomBar instead.
 */

import Link from "next/link";
import {
  Home,
  User,
  FolderOpen,
  Wrench,
  Briefcase,
  Mail,
} from "lucide-react";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { NAV_ITEMS, SITE_META } from "@/lib/constants";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ProfileAvatar } from "@/components/ui/profile-avatar";

// Icon map — lookup table so we can reference icons by string key in NAV_ITEMS
const ICON_MAP = {
  Home,
  User,
  FolderOpen,
  Wrench,
  Briefcase,
  Mail,
} as const;

export function Sidebar() {
  const sectionIds = NAV_ITEMS.map((item) => item.href.replace("#", ""));
  const activeId = useScrollSpy(sectionIds);

  return (
    <aside className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:flex-col bg-white dark:bg-navy border-r border-foreground/10">
      {/* Profile/branding area */}
      <div className="p-6 border-b border-foreground/10 flex flex-col items-center gap-4">
        {/* Avatar — shows profile.jpg or initials fallback, never a broken icon */}
        <ProfileAvatar name={SITE_META.name} size={80} />
        <div className="text-center">
          <h2 className="font-heading text-lg font-bold text-foreground leading-tight">
            {SITE_META.name}
          </h2>
          <p className="text-sm text-foreground/60 mt-1">
            Full-Stack Developer
          </p>
          <p className="text-sm text-foreground/60">ECE Student</p>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = ICON_MAP[item.icon as keyof typeof ICON_MAP];
          const isActive = `#${activeId}` === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
                transition-colors relative
                ${
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                }
              `}
            >
              {/* Active indicator — left border accent */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
              )}
              <Icon className="w-5 h-5 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Theme toggle — bottom of sidebar */}
      <div className="p-4 border-t border-foreground/10">
        <ThemeToggle />
      </div>
    </aside>
  );
}
