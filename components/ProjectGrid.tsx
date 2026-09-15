"use client";

import Link from "next/link";
import Image from "next/image";
import type { FeaturedProject } from "@/types";
import { triggerHaptic } from "@/lib/haptics";
import { isPlainClick, useRouteTransition } from "@/lib/useRouteTransition";

interface ProjectGridProps {
  projects: FeaturedProject[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const navigate = useRouteTransition();

  return (
    <section>
      <h2 className="text-xs font-mono uppercase tracking-wider text-text-tertiary mb-6">
        Selected Work
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <Link
            key={project.slug}
            href={`/${project.slug}`}
            onClick={(e) => {
              triggerHaptic("light");
              if (!isPlainClick(e)) return;
              e.preventDefault();
              navigate(`/${project.slug}`);
            }}
            className="group flex flex-col gap-3 rounded-lg border border-border-subtle bg-surface-1 p-4 transition-[border-color,transform] duration-150 ease-out hover:border-border-default active:scale-[0.99]"
          >
            <h3
              className="font-medium text-text-primary text-balance"
              style={{ viewTransitionName: `project-${project.slug}-title` }}
            >
              {project.title}
            </h3>
            <div
              className="relative aspect-[16/10] overflow-hidden rounded-md bg-surface-2"
              style={{ viewTransitionName: `project-${project.slug}-cover` }}
            >
              <Image
                src={project.cover}
                alt={project.title}
                className="object-cover transition-transform duration-150 group-hover:scale-[1.02]"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                // The first cover is the LCP element on the home page: it
                // sits inside the initial viewport, so it must not be
                // lazy-loaded. `priority` emits the preload link and drops
                // loading="lazy"; the explicit hint is separate, and is what
                // lcp-discovery-insight's `priorityHinted` check reads.
                priority={index === 0}
                fetchPriority={index === 0 ? "high" : undefined}
              />
            </div>
            <p className="text-sm text-text-tertiary line-clamp-2 text-pretty">
              {project.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
