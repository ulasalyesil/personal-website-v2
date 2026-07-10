"use client";

import Link from "next/link";
import { LAB_ITEMS } from "@/components/lab/data";
import { triggerHaptic } from "@/lib/haptics";
import styles from "./LabTeaserCard.module.css";

// Abstract stand-ins for the lab canvas scatter — positions are percentages
// of the visual area, sized to read as "small prototype cards" at a glance.
const SCATTER = [
  { left: "8%", top: "18%", width: "26%", height: "44%", tilt: -3, drift: -4 },
  { left: "40%", top: "8%", width: "22%", height: "38%", tilt: 2, drift: 5 },
  { left: "68%", top: "22%", width: "24%", height: "48%", tilt: -1.5, drift: -6 },
  { left: "22%", top: "58%", width: "20%", height: "34%", tilt: 1, drift: 6 },
  { left: "52%", top: "54%", width: "28%", height: "38%", tilt: -2, drift: -3 },
];

export default function LabTeaserCard() {
  return (
    <Link
      href="/lab"
      onClick={() => triggerHaptic("light")}
      className={`${styles.card} group flex flex-col sm:flex-row gap-3 sm:gap-6 p-4 rounded-lg bg-surface-1 border border-border-subtle hover:border-border-default transition-colors duration-150`}
    >
      <div className="relative h-28 sm:h-36 sm:w-64 shrink-0 overflow-hidden rounded-md bg-surface-2 order-first sm:order-last">
        {SCATTER.map((tile, i) => (
          <div
            key={i}
            className={styles.tile}
            style={{
              left: tile.left,
              top: tile.top,
              width: tile.width,
              height: tile.height,
              transitionDelay: `${i * 30}ms`,
              "--tilt": `${tile.tilt}deg`,
              "--drift": `${tile.drift}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="font-medium text-text-primary text-balance">Lab</h3>
        <p className="text-sm text-text-tertiary mt-1 text-pretty">
          Prototypes, interaction studies, and generative sketches —{" "}
          {LAB_ITEMS.length} experiments and counting. Some of them graduate
          into the site itself.
        </p>
      </div>
    </Link>
  );
}
