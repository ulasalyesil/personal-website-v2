"use client";

import Link from "next/link";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { triggerHaptic } from "@/lib/haptics";

interface SectionItemProps {
  date: string;
  projectTitle: string;
  role: string;
  target: string;
}

export default function SectionItem({ date, projectTitle, role, target }: SectionItemProps) {
  const isExternal = target.startsWith("http");

  return (
    <li>
      <Link
        href={target}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        onClick={() => triggerHaptic("light")}
        className="flex items-center justify-between py-3 px-2 -mx-2 rounded-lg hover:bg-surface-1 transition-colors duration-150 group"
      >
        <div className="flex flex-col">
          <span className="font-medium text-text-primary group-hover:text-brand transition-colors duration-150">
            {projectTitle}
          </span>
          <span className="text-sm text-text-tertiary font-mono">{role}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-text-tertiary font-mono tabular-nums">
            {date}
          </span>
          <ArrowTopRightIcon className="size-4 text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
        </div>
      </Link>
    </li>
  );
}
