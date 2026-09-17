import { EMAIL, SOCIAL_LINKS } from "@/lib/constants";
import styles from "./Closing.module.css";

const LINKS = [
  { href: "/ulas-alyesil-resume.pdf", label: "Résumé", external: false },
  { href: SOCIAL_LINKS.linkedin, label: "LinkedIn", external: true },
  { href: SOCIAL_LINKS.github, label: "GitHub", external: true },
  { href: SOCIAL_LINKS.dribbble, label: "Dribbble", external: true },
  { href: SOCIAL_LINKS.twitter, label: "X", external: true },
];

export default function Closing() {
  return (
    <footer className={styles.closing}>
      <p className={styles.lede}>Open to remote work and relocation.</p>
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
    </footer>
  );
}
