"use client";

import { useState } from "react";
import { triggerHaptic } from "@/lib/haptics";
import type { ExperienceItem } from "@/types";
import styles from "./WorkExperience.module.css";

interface WorkExperienceProps {
  items: ExperienceItem[];
}

type Row = ExperienceItem["positions"][number] & {
  company: string;
  current: boolean;
};

function PositionRow({ row }: { row: Row }) {
  const [expanded, setExpanded] = useState(false);
  const panelId = `experience-${row.id}`;

  return (
    <li className={styles.item}>
      <button
        type="button"
        className={styles.row}
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => {
          setExpanded((v) => !v);
          triggerHaptic("selection");
        }}
      >
        <span className={styles.period}>{row.employmentPeriod}</span>
        <span className={styles.what}>
          <span className={styles.title}>{row.title}</span>
          <span className={styles.company}>
            {row.company}
            {row.current && <span className={styles.now}>Now</span>}
          </span>
        </span>
        <span className={styles.type}>{row.employmentType}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className={styles.chevron}
          data-open={expanded || undefined}
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* `grid-template-rows: 0fr → 1fr` transitions to content height without
          measuring it. The panel stays mounted so there is something to
          animate; `inert` keeps the collapsed copy out of tab order and out
          of the accessibility tree. */}
      <div
        id={panelId}
        className={styles.panel}
        data-open={expanded || undefined}
        inert={!expanded}
      >
        <div className={styles.panelInner}>
          <div className={styles.detail}>
            {row.description && <p>{row.description}</p>}
            {row.skills && row.skills.length > 0 && (
              <p className={styles.skills}>{row.skills.join(", ")}</p>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

/** Newest first, one line per role; the detail opens in place. */
export default function WorkExperience({ items }: WorkExperienceProps) {
  const rows: Row[] = items.flatMap((item) =>
    item.positions.map((position) => ({
      ...position,
      company: item.companyName,
      current: item.isCurrentEmployer ?? false,
    })),
  );

  return (
    <section className={styles.section} aria-labelledby="experience">
      <h2 id="experience" className={styles.heading}>
        Experience
      </h2>
      <ol className={styles.list}>
        {rows.map((row) => (
          <PositionRow key={row.id} row={row} />
        ))}
      </ol>
    </section>
  );
}
