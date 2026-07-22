"use client";

import Link from "next/link";
import { LAB_ITEMS } from "@/components/lab/data";
import { triggerHaptic } from "@/lib/haptics";
import styles from "./LabTeaserCard.module.css";

// Abstract stand-ins for the lab grid — six tiles on the same 3×2 rhythm the
// page uses, so the teaser previews the layout it links to.
const TILES = [-4, 5, -3, 6, -5, 4];

export default function LabTeaserCard() {
  const count = LAB_ITEMS.length;

  return (
    <Link
      href="/lab"
      onClick={() => triggerHaptic("light")}
      className={`${styles.card} group flex flex-col sm:flex-row gap-3 sm:gap-6 p-4 rounded-lg bg-surface-1 border border-border-subtle hover:border-border-default transition-colors duration-150`}
    >
      <div className="relative h-28 sm:h-36 sm:w-64 shrink-0 overflow-hidden rounded-md bg-surface-2 p-3">
        <div className="grid h-full grid-cols-3 grid-rows-2 gap-2">
          {TILES.map((drift, i) => (
            <div
              key={i}
              className={styles.tile}
              style={
                {
                  transitionDelay: `${i * 30}ms`,
                  "--drift": `${drift}px`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="font-medium text-text-primary text-balance">Lab</h3>
        <p className="text-sm text-text-tertiary mt-1 text-pretty">
          Prototypes, interaction studies, and generative sketches
          {count > 0 ? ` — ${count} experiments and counting` : ""}. Some of
          them graduate into the site itself.
        </p>
      </div>
    </Link>
  );
}
