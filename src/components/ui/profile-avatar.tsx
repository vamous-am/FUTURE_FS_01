"use client";

/**
 * ProfileAvatar — circular avatar with a primary-color ring.
 *
 * Spec (Phase 2, point 3):
 *   - Size: 80px (within the locked 72–96px range, sits cleanly in the sidebar).
 *   - Ring: 2px solid #87BEEB (primary token).
 *   - Image source: /images/profile.jpg — drop the real photo there with that
 *     exact filename and this component updates automatically, no code change.
 *   - Fallback: if the image is missing or fails to load, show initials on a
 *     Dark Navy (#1A2A40) background in white Space Grotesk text.
 *     Never show a broken-image icon.
 *
 * Why a Client Component:
 *   - We use useState to track onError on the <img> tag so we can swap to the
 *     initials fallback when the file doesn't exist or fails to load.
 *   - next/image's onError prop also requires "use client" in App Router.
 *
 * The avatar appears only in the Sidebar. It does not appear in the Hero or
 * About section — that constraint is documented in the master plan.
 */

import Image from "next/image";
import { useState } from "react";

type ProfileAvatarProps = {
  /** Full name — used to derive initials for the fallback state. */
  name: string;
  /** Diameter in pixels. Defaults to 80 (within the 72–96px spec). */
  size?: number;
};

/** Derive up to 2 initials from a full name, e.g. "Amanuel Musa" → "AM". */
function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

export function ProfileAvatar({ name, size = 80 }: ProfileAvatarProps) {
  const [imgError, setImgError] = useState(false);
  const initials = getInitials(name);

  return (
    /*
     * Ring: 2px border in primary color + 2px white gap between image and ring
     * achieved with ring-2 ring-primary ring-offset-2.
     * ring-offset-color inherits from the surface (white in light, navy in dark)
     * so the gap color matches the sidebar background automatically.
     */
    <div
      className="rounded-full ring-2 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-navy overflow-hidden shrink-0"
      style={{ width: size, height: size }}
    >
      {!imgError ? (
        <Image
          src="/images/profile.jpg"
          alt={`${name} profile photo`}
          width={size}
          height={size}
          className="object-cover w-full h-full"
          onError={() => setImgError(true)}
          priority
        />
      ) : (
        /* Initials fallback — navy bg, white Space Grotesk text */
        <div
          className="w-full h-full flex items-center justify-center bg-navy dark:bg-foreground/10"
          aria-label={`${name} — initials avatar`}
        >
          <span
            className="font-heading font-bold text-white select-none"
            style={{ fontSize: size * 0.35 }}
          >
            {initials}
          </span>
        </div>
      )}
    </div>
  );
}
