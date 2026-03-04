"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { triggerHaptic } from "@/lib/haptics";
import Pill from "@/components/ui/Pill";
import type { ExperienceItem } from "@/types";

interface WorkExperienceProps {
  items: ExperienceItem[];
}

interface PositionRowProps {
  position: ExperienceItem["positions"][number];
  isCurrentEmployer: boolean;
}

function PositionRow({ position, isCurrentEmployer }: PositionRowProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-border-subtle last:border-0">
      <button
        onClick={() => { setExpanded((v) => !v); triggerHaptic("selection"); }}
        className="w-full flex items-center justify-between py-3 gap-4 text-left group"
        aria-expanded={expanded}
      >
        <div className="flex flex-col gap-0.5 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-text-primary text-sm">{position.title}</span>
            {isCurrentEmployer && (
              <span className="relative flex size-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-brand" />
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-text-tertiary font-mono">
            <span>{position.employmentPeriod}</span>
            {position.employmentType && (
              <>
                <span>·</span>
                <span>{position.employmentType}</span>
              </>
            )}
          </div>
        </div>
        <ChevronDown
          className={cn(
            "size-4 text-text-tertiary shrink-0 transition-transform duration-200",
            expanded && "rotate-180",
          )}
        />
      </button>

      {expanded && (
        <div className="pb-4 space-y-3">
          {position.description && (
            <div className="text-sm text-text-secondary font-mono leading-relaxed">
              <ReactMarkdown>{position.description}</ReactMarkdown>
            </div>
          )}
          {position.skills && position.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {position.skills.map((skill) => (
                <Pill key={skill} label={skill} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function WorkExperience({ items }: WorkExperienceProps) {
  return (
    <section className="mt-16">
      <h2 className="text-xs font-mono uppercase tracking-wider text-text-tertiary mb-6">
        Work Experience
      </h2>
      <div className="flex flex-col gap-8">
        {items.map((item) => (
          <div key={item.id}>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-text-primary">{item.companyName}</span>
            </div>
            <div className="border border-border-subtle rounded-lg px-4 divide-y divide-border-subtle">
              {item.positions.map((position) => (
                <PositionRow
                  key={position.id}
                  position={position}
                  isCurrentEmployer={item.isCurrentEmployer ?? false}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
