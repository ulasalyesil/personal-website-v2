import type { ReactNode } from "react";
import { Marks } from "@/components/hud";
import styles from "./PageIntro.module.css";

type Props = {
  title: string;
  lede?: ReactNode;
  /** A short fact set against the title's baseline, like a count. */
  aside?: ReactNode;
  /** h2 when something else on the page is its subject, like an open lab entry. */
  as?: "h1" | "h2";
};

/**
 * Every inner page opens the way the home page does: a section marker, the
 * name of the page in the display face, and the sentence that explains it
 * set against its baseline. The marker is what makes four different pages
 * read as sections of one document.
 */
export default function PageIntro({ title, lede, aside, as: Heading = "h1" }: Props) {
  return (
    <header className={styles.intro}>
      <Marks kind="frame" />
      <Heading className={styles.title}>
        <span className={styles.hash} aria-hidden>
          #
        </span>
        {title}
      </Heading>
      {(lede || aside) && (
        <div className={styles.side}>
          {aside && <p className={styles.aside}>{aside}</p>}
          {lede && <div className={styles.lede}>{lede}</div>}
        </div>
      )}
    </header>
  );
}
