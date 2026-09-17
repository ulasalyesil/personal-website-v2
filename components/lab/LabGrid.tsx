"use client";

import LabCard from "./LabCard";
import type { LabItem } from "./data";

export default function LabGrid({
  items,
  onOpen,
}: {
  items: LabItem[];
  onOpen: (item: LabItem, index: number) => void;
}) {
  if (items.length === 0) {
    return (
      <div className="mx-[var(--gutter)] my-16 rounded-xl border border-dashed border-border-default px-6 py-14 text-center">
        <p className="text-text-secondary">Nothing here yet.</p>
        <p className="mt-1 text-sm text-text-tertiary">
          Experiments land here as they happen.
        </p>
      </div>
    );
  }

  return (
    <ul className="px-[var(--gutter)] pb-8">
      {items.map((item, index) => (
        <li key={item.slug} className="border-b border-border-subtle last:border-0">
          <LabCard item={item} index={index} onOpen={onOpen} />
        </li>
      ))}
    </ul>
  );
}
