import type { ReactNode } from "react";
import { Marks } from "@/components/hud";
import styles from "./PageIntro.module.css";

type Props = {
  title: string;
  lede?: ReactNode;
  /** A short fact set against the title's baseline, like a count. */
  aside?: ReactNode;
};

/**
 * Every inner page opens the way the home page does: a section marker, the
 * name of the page in the display face, and the sentence that explains it
 * set against its baseline. The marker is what makes four different pages
 * read as sections of one document.
 */
export default function PageIntro({ title, lede, aside }: Props) {
  return (
    <header className={styles.intro}>
      <Marks kind="frame" />
      <h1 className={styles.title}>
        <span className={styles.hash} aria-hidden>
          #
        </span>
        {title}
      </h1>
      {(lede || aside) && (
        <div className={styles.side}>
          {aside && <p className={styles.aside}>{aside}</p>}
          {lede && <div className={styles.lede}>{lede}</div>}
        </div>
      )}
    </header>
  );
}
