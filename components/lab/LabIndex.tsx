"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Peek from "@/components/site/Peek";
import { rememberGallery } from "./LabNavigation";
import { isPlainClick } from "@/lib/useRouteTransition";
import type { LabItem } from "./data";
import styles from "./LabIndex.module.css";

/**
 * The same items as rows, for reading rather than looking: date, title,
 * kind, status. The loop shows in the peek while a row is hovered or
 * focused, so the motion is still one gesture away.
 */
export default function LabIndex({ items }: { items: LabItem[] }) {
  const [active, setActive] = useState<LabItem | null>(null);
  const [motion, setMotion] = useState(true);

  useEffect(() => {
    setMotion(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <>
      <ol className={styles.list}>
        {items.map((item) => (
          <li key={item.slug} className={styles.item}>
            <Link
              id={`lab-index-${item.slug}`}
              href={`/lab/${item.slug}`}
              className={styles.row}
              onClick={(event) => {
                if (isPlainClick(event)) rememberGallery(item.slug);
              }}
              onMouseEnter={() => setActive(item)}
              onMouseLeave={() => setActive(null)}
              // Keyboard focus only: returning from a write-up refocuses the
              // row, and a mouse reader did not ask for a preview then.
              onFocus={(event) => {
                if (event.currentTarget.matches(":focus-visible")) setActive(item);
              }}
              onBlur={() => setActive(null)}
            >
              <span className={styles.date}>{item.date}</span>
              <span className={styles.title}>{item.title}</span>
              <span className={styles.tag}>{item.tag}</span>
              <span className={styles.status}>
                {item.status ? (
                  <>
                    <span aria-hidden>[</span>
                    {item.status}
                    <span aria-hidden>]</span>
                  </>
                ) : (
                  <span aria-hidden>·</span>
                )}
              </span>
              <span className={styles.arrow} aria-hidden>
                →
              </span>
            </Link>
          </li>
        ))}
      </ol>

      {active && (
        <Peek
          key={active.slug}
          title={active.title}
          note={active.summary}
          host={`/lab/${active.slug}`}
          media={<PeekMedia item={active} motion={motion} />}
        />
      )}
    </>
  );
}

function PeekMedia({ item, motion }: { item: LabItem; motion: boolean }) {
  const { media } = item;
  // Phone recordings are portrait; show the whole screen, not a crop of it.
  const fit = media.device === "iphone" ? { objectFit: "contain" as const } : undefined;
  const still = media.poster ?? media.src;

  return media.video && motion ? (
    <video src={media.video} poster={still} autoPlay muted loop playsInline style={fit} />
  ) : (
    <Image src={still} alt="" fill sizes="320px" style={fit} />
  );
}
