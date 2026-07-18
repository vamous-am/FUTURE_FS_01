"use client";

/** Sticky bottom navigation bar, visible below `lg:` breakpoint.
 *  Renders the 5 items where `showOnMobile` is `true` — Experience is excluded to keep tap targets wide.
 *  Safe-area padding via `env(safe-area-inset-bottom)` prevents overlap with home indicators on iOS/Android.
 *  Active state is driven by the same `useScrollSpy` instance as the Sidebar. */

import Link from "next/link";
import { Home, User, FolderOpen, Wrench, Mail } from "lucide-react";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { NAV_ITEMS } from "@/lib/constants";

const ICON_MAP = { Home, User, FolderOpen, Wrench, Mail } as const;

export function BottomBar() {
  const mobileItems = NAV_ITEMS.filter((item) => item.showOnMobile);
  const sectionIds = NAV_ITEMS.map((item) => item.href.replace("#", ""));
  const activeId = useScrollSpy(sectionIds);

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white dark:bg-navy border-t border-foreground/10"
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
                ${isActive ? "text-primary-text" : "text-foreground/50 hover:text-foreground"}
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
