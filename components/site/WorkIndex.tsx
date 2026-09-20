import Link from "next/link";
import type { ProjectsData } from "@/types";
import styles from "./WorkIndex.module.css";

const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

type Row = {
  key: string;
  title: string;
  role: string;
  target: string;
  external: boolean;
  year: number;
  month: number;
};

/** "May, 2024 — August, 2025" and "February 2021" both file under their start. */
function toRow(key: string, p: ProjectsData[string]): Row {
  const start = p.date.split("—")[0].toLowerCase();
  return {
    key,
    title: p.title,
    role: p.role,
    target: p.target,
    external: /^https?:\/\//.test(p.target),
    year: Number(start.match(/\d{4}/)?.[0] ?? 0),
    month: MONTHS.findIndex((m) => start.includes(m)),
  };
}

function host(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

type Props = {
  id: string;
  heading: string;
  data: ProjectsData;
  /** Targets already shown elsewhere on the page. */
  exclude?: string[];
  /** How an outbound row is labelled: as a live site, or by where it lives. */
  external?: "site" | "host";
};

export default function WorkIndex({
  id,
  heading,
  data,
  exclude = [],
  external = "site",
}: Props) {
  const rows = Object.entries(data)
    .filter(([, p]) => !p.hidden && !exclude.includes(p.target))
    .map(([key, p]) => toRow(key, p))
    .sort((a, b) => b.year - a.year || b.month - a.month);

  const years = [...new Set(rows.map((r) => r.year))];

  return (
    <section className={styles.section} aria-labelledby={id}>
      <h2 id={id} className={styles.heading}>
        <span className={styles.hash} aria-hidden>
          #
        </span>
        {heading}
      </h2>

      <div>
        {years.map((year) => (
          <div key={year} className={styles.year}>
            <p className={styles.yearLabel}>{year}</p>
            <ul className={styles.rows}>
              {rows
                .filter((r) => r.year === year)
                .map((r) => (
                  <li key={r.key}>
                    {r.external ? (
                      <a
                        href={r.target}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.row}
                      >
                        <span className={styles.title}>{r.title}</span>
                        <span className={styles.role}>{r.role}</span>
                        <span className={styles.kind}>
                          {external === "host" ? host(r.target) : "Live site"}{" "}
                          <span aria-hidden>↗</span>
                          <span className="sr-only">(opens in a new tab)</span>
                        </span>
                      </a>
                    ) : (
                      <Link href={r.target} className={styles.row}>
                        <span className={styles.title}>{r.title}</span>
                        <span className={styles.role}>{r.role}</span>
                        <span className={styles.kind}>Case study</span>
                      </Link>
                    )}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
