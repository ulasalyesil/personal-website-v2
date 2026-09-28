"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/nav";
import styles from "./SiteHeader.module.css";

type Props = {
  home?: boolean;
  caseStudy?: boolean;
};

/** One identity and navigation layout across home, pages, and case studies. */
export default function SiteHeader({ home = false, caseStudy = false }: Props) {
  const pathname = usePathname();

  return (
    <header className={styles.header} data-case-study={caseStudy || undefined}>
      {home ? (
        <div className={styles.identity}>
          <h1 className={styles.name}>Ulaş Alyeşil</h1>
          <span className={styles.role}>Product designer · Istanbul</span>
        </div>
      ) : (
        <Link href="/" className={styles.identity}>
          <span className={styles.name}>Ulaş Alyeşil</span>
          <span className={styles.role}>Product designer · Istanbul</span>
        </Link>
      )}

      <nav aria-label="Primary">
        <ul className={styles.nav}>
          {NAV.map((item, i) => {
            const current =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.link}
                  aria-current={current ? "page" : undefined}
                  target={item.href.endsWith(".pdf") ? "_blank" : undefined}
                >
                  {/* The index keeps the nav as one numbered contents list. */}
                  <span className={styles.index} aria-hidden>
                    {String(i + 1).padStart(3, "0")}
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
