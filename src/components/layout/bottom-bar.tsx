"use client";

/**
 * BottomBar — mobile sticky bottom navigation (hidden lg: breakpoint and up).
 *
 * Renders the 5 items where showOnMobile === true from NAV_ITEMS.
 * Experience is excluded per the master plan — 5 slots keeps each tap target
 * large enough to be comfortably tappable on small screens.
 *
 * Safe-area padding:
 *   `pb-safe` / `padding-bottom: env(safe-area-inset-bottom)` ensures the bar
 *   doesn't overlap the iPhone home indicator or Android gesture strip.
 *   Applied via an inline style since Tailwind v4 doesn't ship `pb-safe` out of
 *   the box without a plugin. The bar's own padding (pb-2) stacks on top via the
 *   CSS padding-bottom shorthand override; we use a style prop here to be
 *   explicit rather than relying on an arbitrary value.
 *
 * Scroll-spy: same useScrollSpy hook, same sectionIds as the Sidebar so both
 * components always reflect the same active state from one shared source.
 */

import Link from "next/link";
import {
  Home,
  User,
  FolderOpen,
  Wrench,
  Mail,
} from "lucide-react";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { NAV_ITEMS } from "@/lib/constants";

const ICON_MAP = {
  Home,
  User,
  FolderOpen,
  Wrench,
  Mail,
} as const;

export function BottomBar() {
  const mobileItems = NAV_ITEMS.filter((item) => item.showOnMobile);
  const sectionIds = NAV_ITEMS.map((item) => item.href.replace("#", ""));
  const activeId = useScrollSpy(sectionIds);

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white dark:bg-navy border-t border-gray-bg dark:border-foreground/10"
      /* Safe-area inset for devices with home indicators (iOS, some Android) */
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-around h-16">
        {mobileItems.map((item) => {
          const Icon = ICON_MAP[item.icon as keyof typeof ICON_MAP];
          const isActive = `#${activeId}` === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex flex-col items-center justify-center gap-1 flex-1 h-full
                text-xs font-medium transition-colors
                ${
                  isActive
                    ? "text-primary"
                    : "text-foreground/50 hover:text-foreground"
                }
              `}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
