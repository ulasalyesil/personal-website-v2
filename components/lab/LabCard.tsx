"use client";

import { forwardRef, useState } from "react";
import { LAB_PREVIEWS } from "./previews";
import type { LabItem } from "./data";

type Props = {
  item: LabItem;
  index: number;
  onOpen: (labItem: LabItem, itemIndex: number) => void;
};

const LabCard = forwardRef<HTMLButtonElement, Props>(function LabCard(
  { item, index, onOpen },
  ref,
) {
  const [hovered, setHovered] = useState(false);
  const Preview = LAB_PREVIEWS[item.preview];

  return (
    <button
      ref={ref}
      onClick={() => onOpen(item, index)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative block overflow-hidden rounded-lg border bg-surface-1 p-0 text-left transition-colors duration-150"
      style={{
        width: "100%",
        aspectRatio: `${item.w} / ${item.h}`,
        borderColor: hovered ? "var(--color-border-default)" : "var(--color-border-subtle)",
        cursor: "pointer",
      }}
      aria-label={`Open ${item.title}`}
    >
      {Preview && <Preview active={hovered} compact />}

      <div className="absolute left-3 top-2.5 right-3 flex items-start justify-between gap-2">
        <span className="text-xs font-medium text-text-primary tracking-tight">
          {item.title}
        </span>
      </div>

      <div className="absolute left-3 bottom-2.5 right-3 flex items-center justify-between gap-2">
        <span
          className="font-mono text-text-tertiary uppercase tracking-wider border border-border-subtle rounded-full"
          style={{
            fontSize: 10,
            padding: "3px 8px",
            background: "color-mix(in srgb, var(--color-surface-0) 85%, transparent)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
        >
          {item.tag}
        </span>
        {item.placeholder && (
          <span
            className="font-mono text-text-tertiary border border-border-subtle rounded-full"
            style={{
              fontSize: 10,
              padding: "3px 8px",
              background: "color-mix(in srgb, var(--color-surface-0) 85%, transparent)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          >
            wip
          </span>
        )}
      </div>
    </button>
  );
});

export default LabCard;
