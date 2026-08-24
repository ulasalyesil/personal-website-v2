"use client";

import Link from "next/link";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { triggerHaptic } from "@/lib/haptics";
import { isPlainClick, useRouteTransition } from "@/lib/useRouteTransition";

interface SectionItemProps {
  date: string;
  projectTitle: string;
  role: string;
  target: string;
  /** Slugs whose morph name another element on this page already owns. */
  claimedSlugs?: string[];
}

export default function SectionItem({
  date,
  projectTitle,
  role,
  target,
  claimedSlugs = [],
}: SectionItemProps) {
  const isExternal = target.startsWith("http");
  const navigate = useRouteTransition();
  const path = isExternal ? null : target.replace(/^\//, "");
  const slug = path && !claimedSlugs.includes(path) ? path : null;

  return (
    <li>
      <Link
        href={target}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        onClick={(e) => {
          triggerHaptic("light");
          if (isExternal || !isPlainClick(e)) return;
          e.preventDefault();
          navigate(target);
        }}
        className="group -mx-2 flex items-center justify-between rounded-lg px-2 py-3 transition-[background-color,transform] duration-150 ease-out hover:bg-surface-1 active:scale-[0.995]"
      >
        <div className="flex flex-col">
          <span
            className="font-medium text-text-primary transition-colors duration-150 group-hover:text-brand"
            style={slug ? { viewTransitionName: `project-${slug}-title` } : undefined}
          >
            {projectTitle}
          </span>
          <span className="text-sm text-text-tertiary font-mono">{role}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-text-tertiary font-mono tabular-nums">
            {date}
          </span>
          <ArrowTopRightIcon className="size-4 text-text-tertiary opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
        </div>
      </Link>
    </li>
  );
}
