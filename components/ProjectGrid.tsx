"use client";

import Link from "next/link";
import Image from "next/image";
import type { FeaturedProject } from "@/types";
import { triggerHaptic } from "@/lib/haptics";

interface ProjectGridProps {
  projects: FeaturedProject[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <section>
      <h2 className="text-xs font-mono uppercase tracking-wider text-text-tertiary mb-6">
        Selected Work
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/${project.slug}`}
            onClick={() => triggerHaptic("light")}
            className="group flex flex-col gap-3 p-4 rounded-lg bg-surface-1 border border-border-subtle hover:border-border-default transition-colors duration-150"
            style={{ viewTransitionName: `project-${project.slug}` }}
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-surface-2">
              <Image
                src={project.cover}
                alt={project.title}
                className="object-cover group-hover:scale-[1.02] transition-transform duration-150"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div>
              <h3 className="font-medium text-text-primary text-balance">
                {project.title}
              </h3>
              <p className="text-sm text-text-tertiary mt-1 line-clamp-2 text-pretty">
                {project.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
