import Link from "next/link";
import projectsData from "@/public/data/projects.json";
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

/** "May, 2024 — August, 2025" sorts and files under its start. */
function toRow(key: string, p: ProjectsData[string]): Row {
  const [month = "", year = "0"] = p.date.split("—")[0].split(",").map((s) => s.trim());
  return {
    key,
    title: p.title,
    role: p.role,
    target: p.target,
    external: /^https?:\/\//.test(p.target),
    year: Number(year),
    month: MONTHS.indexOf(month.toLowerCase()),
  };
}

export default function WorkIndex() {
  const rows = Object.entries(projectsData as ProjectsData)
    .filter(([, p]) => !p.hidden)
    .map(([key, p]) => toRow(key, p))
    .sort((a, b) => b.year - a.year || b.month - a.month);

  const years = [...new Set(rows.map((r) => r.year))];

  return (
    <section className={styles.section} aria-labelledby="work-index">
      <h2 id="work-index" className={styles.heading}>
        Everything, by year
      </h2>

      <div className={styles.years}>
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
                          Live site <span aria-hidden>↗</span>
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
