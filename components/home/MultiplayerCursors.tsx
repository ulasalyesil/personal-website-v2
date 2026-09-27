import styles from "./MultiplayerCursors.module.css";

/** Multiplayer cursor path shared with eyluldeniz.com and both sites' app icons (16-unit grid). */
const PATH = "M1 1l5.5 14 2-6 6-2z";

function Arrow({ color }: { color: string }) {
  return (
    <svg className={styles.arrow} width="18" height="18" viewBox="0 0 16 16" aria-hidden>
      <path d={PATH} fill="#fff" stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
      <path d={PATH} fill={color} stroke={color} strokeWidth="0.9" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * The hero as a shared file: Ulaş's own cursor and Eylül's, drifting in
 * the empty right half. eyluldeniz.com hosts the same pair the other way
 * round, and each guest cursor links to its owner's site. The guest stops
 * on hover so it can be clicked.
 */
export default function MultiplayerCursors() {
  return (
    <>
      <div className={`${styles.cursor} ${styles.own}`} aria-hidden>
        <Arrow color="var(--own)" />
        <span className={styles.tag}>ulaş</span>
      </div>
      <a
        className={`${styles.cursor} ${styles.guest}`}
        href="https://eyluldeniz.com"
        target="_blank"
        rel="noreferrer"
        aria-label="Eylül Deniz Kızılay's website, eyluldeniz.com"
      >
        <Arrow color="var(--guest)" />
        <span className={styles.tag} aria-hidden>
          eylül<span className={styles.host}> · eyluldeniz.com ↗</span>
        </span>
      </a>
    </>
  );
}
