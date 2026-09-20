import styles from "./HudFrame.module.css";

const CORNERS = ["tl", "tr", "bl", "br"] as const;
const TICKS = ["top", "right", "bottom", "left"] as const;

/**
 * Registration marks around a panel. Purely ornamental, so it is hidden from
 * assistive tech entirely: a screen reader announcing eight empty corners
 * would be noise, and there is no information here that the text does not
 * already carry.
 */
export default function HudFrame() {
  return (
    <div className={styles.frame} aria-hidden>
      {CORNERS.map((at) => (
        <span key={at} className={styles.corner} data-at={at} />
      ))}
      {TICKS.map((at) => (
        <span key={at} className={styles.tick} data-at={at} />
      ))}
    </div>
  );
}
