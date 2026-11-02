import type { ReactNode } from "react";
import styles from "./Peek.module.css";

/**
 * The preview pinned bottom-right while a row is hovered or focused: what a
 * link leads to, before following it. Ornament, so it is hidden from
 * assistive tech; the row itself names the destination.
 */
export default function Peek({
  media,
  title,
  note,
  host,
}: {
  /** Fills a 16:10 box: an image with `fill`, or a video. */
  media: ReactNode;
  title: string;
  note: string;
  host: string;
}) {
  return (
    <div className={styles.peek} aria-hidden>
      <div className={styles.media}>{media}</div>
      <div className={styles.text}>
        <div className={styles.title}>{title}</div>
        <p className={styles.note}>{note}</p>
        <div className={styles.host}>{host}</div>
      </div>
    </div>
  );
}
