"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import BackLink from "@/components/BackLink";
import { NAV } from "@/lib/nav";
import styles from "./SiteHeader.module.css";

type Props = {
  /** Case studies: a slim sticky bar that leads with the way back. */
  back?: { href: string; label: string };
};

/**
 * The same header the home hero draws, on the page's own surface. Work, Lab
 * and About are always one click away.
 */
export default function SiteHeader({ back }: Props) {
  const pathname = usePathname();

  return (
    <header className={styles.header} data-variant={back ? "bar" : "page"}>
      {back ? (
        <BackLink href={back.href} label={back.label} />
      ) : (
        <Link href="/" className={styles.identity}>
          <span className={styles.name}>Ulaş Alyeşil</span>
          <span className={styles.role}>Product designer, Istanbul</span>
        </Link>
      )}

      <nav aria-label="Primary">
        <ul className={styles.nav}>
          {NAV.map((item) => {
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
