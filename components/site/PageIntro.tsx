import type { ReactNode } from "react";
import styles from "./PageIntro.module.css";

type Props = {
  title: string;
  lede?: ReactNode;
  /** A short fact set against the title's baseline, like a count. */
  aside?: ReactNode;
};

/**
 * Every inner page opens the way the home page does: one word at display
 * size, and the sentence that explains it set against its baseline.
 */
export default function PageIntro({ title, lede, aside }: Props) {
  return (
    <header className={styles.intro}>
      <h1 className={styles.title}>{title}</h1>
      {(lede || aside) && (
        <div className={styles.side}>
          {aside && <p className={styles.aside}>{aside}</p>}
          {lede && <div className={styles.lede}>{lede}</div>}
        </div>
      )}
    </header>
  );
}
