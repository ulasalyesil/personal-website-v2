import { Cursor, Marks } from "@/components/hud";
import InspectInvite from "@/components/inspect/InspectInvite";
import { EMAIL } from "@/lib/constants";
import { NAV } from "@/lib/nav";
import styles from "./Hero.module.css";

const PAD = (n: number) => String(n + 1).padStart(3, "0");

/**
 * One statement, one line of context, one way to get in touch. The hero
 * used to carry its own interaction, a light/dark boundary to drag, and it
 * competed with the one the whole site now has. So the hero's only moving
 * part is the invitation to inspect the page it sits on: the system is
 * shown by letting the reader take the page apart, not by a demo of it.
 *
 * It resolves against the site tokens like every other surface, so it
 * follows the reader's own colour scheme.
 */
export default function Hero() {
  return (
    <section className={styles.hero} aria-label="Introduction">
      <Marks kind="frame" ticks />

      <header className={styles.header}>
        <div className={styles.identity}>
          <h1 className={styles.name}>Ulaş Alyeşil</h1>
          <span className={styles.role}>Product designer · Istanbul</span>
        </div>
        <nav aria-label="Primary">
          <ul className={styles.nav}>
            {NAV.map((item, i) => (
              <li key={item.href}>
                <a className={styles.navLink} href={item.href}>
                  <span className={styles.navIndex} aria-hidden>
                    {PAD(i)}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className={styles.body}>
        <p className={styles.statement}>I design products and prototype how they behave.</p>
        <p className={styles.now}>
          Most recently fintech and AI at GetirFinans, before that health insurance at
          WiseCareAI and integrations at Jotform. I prototype the states a static frame
          can&apos;t explain.
        </p>
        <a className={styles.cta} href={`mailto:${EMAIL}`}>
          <span aria-hidden>[</span>Get in touch<span aria-hidden>]</span>
        </a>
      </div>

      <div className={styles.foot}>
        <p className={styles.comment}>
          <span aria-hidden>{"// "}</span>
          Open to remote work and relocation
          <Cursor />
        </p>
        <InspectInvite />
      </div>
    </section>
  );
}
