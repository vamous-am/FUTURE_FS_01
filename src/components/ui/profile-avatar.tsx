"use client";

/** Circular avatar with a primary-color ring.
 *  Attempts to load `/images/profile.jpg`. On error, renders initials on a navy background.
 *  Never shows a broken image icon.
 *
 *  @param name - Full name used to derive up to 2 initials for the fallback state.
 *  @param size - Diameter in pixels. Defaults to 80. */

import Image from "next/image";
import { useState } from "react";

type ProfileAvatarProps = {
  name: string;
  size?: number;
};

function getInitials(name: string): string {
  return name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("");
}

export function ProfileAvatar({ name, size = 80 }: ProfileAvatarProps) {
  const [imgError, setImgError] = useState(false);
  const initials = getInitials(name);

  return (
    /* ring-offset-color matches the sidebar surface in both light and dark mode */
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
