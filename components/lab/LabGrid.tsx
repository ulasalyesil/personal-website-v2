"use client";

import AnimateIn, { AnimateItem } from "@/components/AnimateIn";
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
      <div className="rounded-lg border border-dashed border-border-subtle px-6 py-14 text-center">
        <p className="text-text-secondary m-0">Nothing here yet.</p>
        <p className="text-sm text-text-tertiary mt-1 m-0">
          Experiments land here as they happen.
        </p>
      </div>
    );
  }

  return (
    <AnimateIn className="flex flex-col divide-y divide-border-subtle">
      {items.map((item, index) => (
        <AnimateItem key={item.slug} index={index} className="py-10 first:pt-0 last:pb-0">
          <LabCard item={item} index={index} onOpen={onOpen} />
        </AnimateItem>
      ))}
    </AnimateIn>
  );
}
