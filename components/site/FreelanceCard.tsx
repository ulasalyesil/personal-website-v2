"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Marks } from "@/components/hud";
import { FREELANCE, type FreelancePreview } from "@/data/freelance";
import { EMAIL } from "@/lib/constants";
import styles from "./FreelanceCard.module.css";

/** The project behind a service, pinned where the about page pins its peeks. */
function Peek({ preview }: { preview: FreelancePreview }) {
  return (
    <div className={styles.peek} aria-hidden>
      <div className={styles.peekMedia}>
        <Image src={preview.image} alt="" fill sizes="320px" className={styles.peekImage} />
      </div>
      <div className={styles.peekText}>
        <div className={styles.peekTitle}>{preview.title}</div>
        <p className={styles.peekNote}>{preview.note}</p>
        <div className={styles.peekHost}>Case study</div>
      </div>
    </div>
  );
}

/**
 * The work that carries on whatever the day job is. Framed rather than
 * listed, because it is an offer: the label and status take the column the
 * experience list gives its dates, so the two read as one page. Each
 * service previews the project that proves it, and opens it on click.
 */
export default function FreelanceCard() {
  const [active, setActive] = useState<FreelancePreview | null>(null);
  const href = `mailto:${EMAIL}?subject=${encodeURIComponent(FREELANCE.subject)}`;

  return (
    <section className={`content-container ${styles.section}`} aria-labelledby="freelance">
      <div className={styles.card}>
        <Marks kind="frame" />

        <header className={styles.head}>
          <h2 id="freelance" className={styles.heading}>
            Freelance
          </h2>
          <p className={styles.status}>
            <span className={styles.dot} aria-hidden />
            {FREELANCE.status}
          </p>
          <p className={styles.since}>Since {FREELANCE.since}</p>
        </header>

        <div className={styles.body}>
          <p className={styles.lead}>{FREELANCE.lead}</p>

          <ul className={styles.services}>
            {FREELANCE.services.map((service) => {
              const preview = "preview" in service ? service.preview : undefined;
              const inner = (
                <>
                  <h3 className={styles.name}>
                    {service.name}
                    {preview ? (
                      <span className={styles.arrow} aria-hidden>
                        →
                      </span>
                    ) : (
                      <span className={styles.soon}>Soon</span>
                    )}
                  </h3>
                  <p className={styles.line}>{service.line}</p>
                </>
              );

              return (
                <li key={service.name}>
                  {preview ? (
                    <Link
                      href={preview.href}
                      className={styles.service}
                      aria-label={`${service.name}: ${preview.title} case study`}
                      onMouseEnter={() => setActive(preview)}
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(preview)}
                      onBlur={() => setActive(null)}
                    >
                      <Marks kind="frame" className={styles.itemMarks} />
                      {inner}
                    </Link>
                  ) : (
                    <div className={styles.service}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className={styles.foot}>
            <p className={styles.clients}>
              <span className={styles.clientsLabel}>Clients</span>
              {FREELANCE.clients.join(", ")}
            </p>
            <a className={styles.cta} href={href}>
              <span aria-hidden>[</span>Start a project<span aria-hidden>]</span>
            </a>
          </div>
        </div>
      </div>

      {active && <Peek key={active.href} preview={active} />}
    </section>
  );
}
