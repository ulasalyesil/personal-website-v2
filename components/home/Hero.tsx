import MultiplayerCursors from "./MultiplayerCursors";
import { EMAIL } from "@/lib/constants";
import styles from "./Hero.module.css";

/**
 * One statement, one line of context, one way to get in touch. The hero
 * used to carry its own interaction, a light/dark boundary to drag, and it
 * competed with the one the whole site now has. The way into inspect mode
 * is the site-wide chip, so the hero does not repeat it, and it carries no
 * frame marks: the cursors are its only ornament.
 *
 * It resolves against the site tokens like every other surface, so it
 * follows the reader's own colour scheme.
 */
export default function Hero() {
  return (
    <section className={`content-container ${styles.hero}`} aria-label="Introduction">
      <MultiplayerCursors />

      <div className={styles.body}>
        <p className={`reveal ${styles.statement}`}>I design products and prototype how they behave.</p>
        <p className={`reveal ${styles.now}`}>
          Now at Codeway. Before that, fintech and AI at GetirFinans, from
          product decisions to SwiftUI builds.
        </p>
        {/* The link keeps its own press transition, so the reveal rides a
            wrapper: a transition's delay outlives the entrance, and the
            link must not inherit it on release. */}
        <div className={`reveal ${styles.ctaSlot}`}>
          <a className={styles.cta} href={`mailto:${EMAIL}`}>
            <span aria-hidden>[</span>Get in touch<span aria-hidden>]</span>
          </a>
        </div>
      </div>

      <div className={styles.foot}>
        <p className={`reveal ${styles.comment}`}>
          <span aria-hidden>{"// "}</span>
          Based in Istanbul
        </p>
      </div>
    </section>
  );
}
