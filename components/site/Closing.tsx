import { BlockLabel, Cursor, Readout } from "@/components/hud";
import { EMAIL, SOCIAL_LINKS } from "@/lib/constants";
import { BUILD } from "@/lib/system-facts";
import styles from "./Closing.module.css";

const LINKS = [
  { href: "/ulas-alyesil-resume.pdf", label: "Résumé", external: false },
  { href: "/bookmarks", label: "Collected", external: false },
  { href: SOCIAL_LINKS.linkedin, label: "LinkedIn", external: true },
  { href: SOCIAL_LINKS.github, label: "GitHub", external: true },
  { href: SOCIAL_LINKS.dribbble, label: "Dribbble", external: true },
  { href: SOCIAL_LINKS.twitter, label: "X", external: true },
];

export default function Closing() {
  return (
    <footer className={styles.closing}>
      <BlockLabel className={styles.label}>Contact</BlockLabel>
      <p className={styles.lede}>
        <span aria-hidden>{"// "}</span>Open to remote work and relocation
        <Cursor />
      </p>
      <a className={styles.email} href={`mailto:${EMAIL}`}>
        {EMAIL}
      </a>
      <div className={styles.bottom}>
        <ul className={styles.links}>
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className={styles.link}
                {...(l.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p className={styles.small}>© {new Date().getFullYear()} Ulaş Alyeşil</p>
      </div>

      {/* The build the reader is actually looking at. It belongs at the end
          of the page for the same reason a colophon does. */}
      {BUILD.ref && (
        <Readout
          className={styles.build}
          items={[
            { key: "build", value: `${BUILD.branch} @ ${BUILD.ref}` },
            ...(BUILD.tokens ? [{ key: "tokens", value: BUILD.tokens }] : []),
          ]}
        />
      )}
    </footer>
  );
}
