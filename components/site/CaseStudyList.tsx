"use client";

import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/data/work";
import { triggerHaptic } from "@/lib/haptics";
import { isPlainClick, useRouteTransition } from "@/lib/useRouteTransition";
import { Caption, Marks } from "@/components/hud";
import styles from "./CaseStudyList.module.css";

/** The studies as a ledger: one row each, cover on the left, the claim beside it. */
export default function CaseStudyList({ studies }: { studies: CaseStudy[] }) {
  const navigate = useRouteTransition();

  return (
    <section className={styles.section} aria-labelledby="case-studies">
      <h2 id="case-studies" className={styles.heading}>
        <span className={styles.hash} aria-hidden>
          #
        </span>
        Case studies
      </h2>
      <ul>
        {studies.map((study, i) => (
          <li key={study.slug} className={styles.item}>
            <Link
              href={`/${study.slug}`}
              className={styles.row}
              onClick={(e) => {
                triggerHaptic("light");
                if (!isPlainClick(e)) return;
                e.preventDefault();
                navigate(`/${study.slug}`);
              }}
            >
              <div
                className={styles.media}
                style={{ viewTransitionName: `project-${study.slug}-cover` }}
              >
                <Image
                  src={study.cover}
                  alt={study.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 40vw"
                  priority={i === 0}
                  className={styles.image}
                />
                <Marks kind="select" />
                <Caption at="top">
                  {String(i + 1).padStart(3, "0")} · {study.year}
                </Caption>
              </div>
              <div className={styles.text}>
                <h3
                  className={styles.title}
                  style={{ viewTransitionName: `project-${study.slug}-title` }}
                >
                  {study.title}
                </h3>
                <p className={styles.line}>{study.line}</p>
                <dl className={styles.meta}>
                  <div>
                    <dt>Role</dt>
                    <dd>{study.role}</dd>
                  </div>
                  <div>
                    <dt>Year</dt>
                    <dd>{study.year}</dd>
                  </div>
                  <div>
                    <dt>Status</dt>
                    <dd>{study.status}</dd>
                  </div>
                </dl>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
