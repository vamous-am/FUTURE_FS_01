"use client";

/**
 * ProjectCard — renders one project entry from PROJECT_ITEMS.
 *
 * Two visual modes controlled by project.isPlaceholder:
 *
 * ── Active card (isPlaceholder false/undefined) ──────────────────────────────
 *   - Screenshot image in a fixed aspect-video container with next/image fill.
 *   - `sizes` attribute provided to prevent Lighthouse performance warnings:
 *     "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
 *   - onError fallback: if the image file is missing, a muted panel with an
 *     ImageOff icon renders instead — no broken <img> icon ever shown.
 *   - Tech badges below the description.
 *   - GitHub and Live Demo outline buttons with explicit aria-labels to satisfy
 *     WCAG 2.4.6 "Link Purpose in Context".
 *   - Live Demo button hidden entirely when liveUrl is absent — no dead links.
 *
 * ── Placeholder card (isPlaceholder true) ────────────────────────────────────
 *   - No image, no tech badges, no action buttons.
 *   - Dashed border + muted panel with a Construction icon signals WIP clearly.
 *   - hoverable={false} on Card — no cursor-pointer, no shadow lift.
 *   - "Coming Soon" badge replaces action buttons.
 *   - cursor-not-allowed on the wrapper reinforces non-interactivity.
 *
 * Reuses the canonical Card component — no bespoke radius, border, or shadow.
 */

import Image from "next/image";
import { useState } from "react";
import { GitBranch, ExternalLink, ImageOff, Construction } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);

  // ── Placeholder variant ───────────────────────────────────────────────────
  if (project.isPlaceholder) {
    return (
      /*
       * border-dashed overrides the Card's default solid border.
       * border-foreground/20 is lighter than the default /10 to look intentionally
       * muted rather than broken.
       * cursor-not-allowed signals non-interactivity at the OS level.
       */
      <Card
        hoverable={false}
        className="border-dashed border-foreground/20 cursor-not-allowed h-full flex flex-col"
      >
        {/* Muted image-area panel */}
        <div className="w-full aspect-video rounded-md bg-foreground/5 flex items-center justify-center mb-4">
          <Construction
            className="w-10 h-10 text-foreground/20"
            aria-hidden="true"
          />
        </div>

        {/* Title */}
        <h3 className="font-heading text-lg font-semibold text-foreground/40 mb-2">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-foreground/40 leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Coming Soon badge — replaces action buttons */}
        <div className="mt-4">
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full border border-dashed border-foreground/20 text-foreground/40">
            Coming Soon
          </span>
        </div>
      </Card>
    );
  }

  // ── Active project variant ────────────────────────────────────────────────
  return (
    <Card hoverable className="flex flex-col h-full">

      {/* Screenshot — aspect-video container with next/image fill */}
      {project.imageUrl && (
        <div className="relative w-full aspect-video rounded-md overflow-hidden mb-4 bg-foreground/5">
          {!imgError ? (
            <Image
              src={project.imageUrl}
              alt={project.imageAlt ?? project.title}
              fill
              className="object-cover object-top"
              onError={() => setImgError(true)}
              /*
               * sizes prevents Lighthouse from flagging oversized images:
               * - full-width on mobile (<768px)
               * - ~50vw on tablet (768–1200px, 2-col grid)
               * - ~33vw on desktop (1200px+, featured card is 2-col so effectively 66vw;
               *   this value is conservative and safe for the non-featured case)
               */
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            /* Fallback panel — never a broken image icon */
            <div className="w-full h-full flex items-center justify-center">
              <ImageOff className="w-8 h-8 text-foreground/20" aria-hidden="true" />
            </div>
          )}
        </div>
      )}

      {/* Title */}
      <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
        {project.title}
      </h3>

      {/* Problem/Solution/Result description */}
      <p className="text-sm text-foreground/60 leading-relaxed mb-4 flex-1">
        {project.description}
      </p>

      {/* Tech badges */}
      {project.techStack && project.techStack.length > 0 && (
        <ul className="flex flex-wrap gap-2 mb-4" aria-label={`Technologies used in ${project.title}`}>
          {project.techStack.map((tech) => (
            <li key={tech}>
              <span className="inline-block px-2 py-1 text-xs rounded-full bg-primary/10 border border-primary/20 text-primary-text font-medium">
                {tech}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 mt-auto">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View GitHub repository for ${project.title}`}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-foreground/20 text-foreground/70 hover:border-foreground/40 hover:text-foreground transition-colors"
          >
            <GitBranch className="w-4 h-4" aria-hidden="true" />
            GitHub Repo
          </a>
        )}

        {/* Live Demo only renders when liveUrl is present — no dead links */}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View live demo of ${project.title}`}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-primary/40 text-primary-text hover:bg-primary/10 hover:border-primary/60 transition-colors"
          >
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
            Live Demo
          </a>
        )}
      </div>

    </Card>
  );
}
