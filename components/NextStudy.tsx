"use client";

import ProjectCover from "@/components/stage/ProjectCover";
import type { CSSProperties } from "react";
import Link from "next/link";
import type { CaseStudy } from "@/data/work";
import { triggerHaptic } from "@/lib/haptics";
import { isPlainClick, useRouteTransition } from "@/lib/useRouteTransition";
import styles from "./NextStudy.module.css";

/**
 * The end of a study is the start of the next one. The cover carries the
 * same transition name the next page's hero uses, so it morphs into place.
 */
export default function NextStudy({ study }: { study: CaseStudy }) {
  const navigate = useRouteTransition();
  const href = `/${study.slug}`;

  return (
    <aside className={styles.wrap} aria-labelledby="next-study">
      <Link
        href={href}
        className={styles.card}
        onClick={(e) => {
          triggerHaptic("light");
          if (!isPlainClick(e)) return;
          e.preventDefault();
          navigate(href);
        }}
      >
        <div className={styles.text}>
          <p className={styles.eyebrow}>Next case study</p>
          <h2 id="next-study" className={styles.title}>
            {study.title}
          </h2>
          <p className={styles.line}>{study.line}</p>
        </div>
        <div
          className={styles.media}
          style={
            {
              viewTransitionName: `project-${study.slug}-cover`,
              "--stage-accent": study.tint,
            } as CSSProperties
          }
        >
          <ProjectCover
            study={study}
            decorative
            sizes="(max-width: 900px) 100vw, 50vw"
            imageClassName={styles.image}
          />
        </div>
      </Link>
    </aside>
  );
}
