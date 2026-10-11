"use client";

import ProjectCover from "@/components/stage/ProjectCover";
import type { CSSProperties } from "react";
import Link from "next/link";
import type { CaseStudy as WorkPiece } from "@/data/work";
import { Caption, Marks } from "@/components/hud";
import Crosshair from "@/components/hud/Crosshair";
import { triggerHaptic } from "@/lib/haptics";
import { isPlainClick, useRouteTransition } from "@/lib/useRouteTransition";
import styles from "./SelectedWork.module.css";

/** Card numbers, so the pieces read as an indexed set rather than a grid. */
const PAD = (n: number) => String(n + 1).padStart(3, "0");

export default function SelectedWork({ pieces }: { pieces: WorkPiece[] }) {
  const navigate = useRouteTransition();

  return (
    <section className={`content-container ${styles.section}`} aria-labelledby="selected-work">
      <div className={styles.head}>
        <h2 id="selected-work" className={styles.heading}>
          <span className={styles.hash} aria-hidden>
            #
          </span>
          Selected work
        </h2>
        <Link href="/works" className={styles.all}>
          <span aria-hidden>[</span>All projects<span aria-hidden>]</span>
        </Link>
      </div>

      <div className={styles.grid}>
        {pieces.map((piece, i) => (
          <Link
            key={piece.slug}
            href={`/${piece.slug}`}
            className={styles.piece}
            onClick={(e) => {
              triggerHaptic("light");
              if (!isPlainClick(e)) return;
              e.preventDefault();
              navigate(`/${piece.slug}`);
            }}
          >
            <div
              className={styles.media}
              style={
                {
                  viewTransitionName: `project-${piece.slug}-cover`,
                  "--stage-accent": piece.tint,
                } as CSSProperties
              }
            >
              <ProjectCover
                study={piece}
                sizes="(max-width: 899px) calc(100vw - 48px), (max-width: 1440px) 55vw, 750px"
                priority={i === 0}
                imageClassName={styles.image}
              />
              {/* Selection marks, not a border: the cover reads as the thing
                  currently picked out on a canvas. The float label states
                  the one fact the text below does not repeat. */}
              <Marks kind="select" />
              <Crosshair />
              <Caption at="top">
                {PAD(i)} · {piece.year}
              </Caption>
            </div>
            <div className={styles.text}>
              <h3
                className={styles.title}
                style={{ viewTransitionName: `project-${piece.slug}-title` }}
              >
                {piece.title}
              </h3>
              <p className={styles.line}>{piece.line}</p>
              <dl className={styles.meta}>
                <div>
                  <dt>Role</dt>
                  <dd>{piece.role}</dd>
                </div>
                <div>
                  <dt>Year</dt>
                  <dd>{piece.year}</dd>
                </div>
              </dl>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
