import styles from "./GuestCursor.module.css";

/** Multiplayer cursor path shared with eyluldeniz.com and both sites' app icons (16-unit grid). */
const PATH = "M1 1l5.5 14 2-6 6-2z";

/**
 * Eylül's multiplayer cursor, parked in the hero like an idle collaborator
 * in a shared file. Her site hosts this site's cursor the same way, and
 * each links to the other. It stays still: the caret remains the only
 * thing on the page that moves by itself.
 */
export default function GuestCursor() {
  return (
    <a
      className={styles.guest}
      href="https://eyluldeniz.com"
      target="_blank"
      rel="noreferrer"
      aria-label="Eylül Deniz Kızılay's website, eyluldeniz.com"
    >
      <svg className={styles.arrow} width="18" height="18" viewBox="0 0 16 16" aria-hidden>
        <path d={PATH} fill="#fff" stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
        <path d={PATH} fill="var(--guest)" stroke="var(--guest)" strokeWidth="0.9" strokeLinejoin="round" />
      </svg>
      <span className={styles.tag} aria-hidden>
        eylül<span className={styles.host}> · eyluldeniz.com ↗</span>
      </span>
    </a>
  );
}
