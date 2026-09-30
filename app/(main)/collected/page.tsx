import type { Metadata } from "next";
import BookmarkIndex from "@/components/bookmarks/BookmarkIndex";
import PageIntro from "@/components/site/PageIntro";
import type { BookmarkData } from "@/lib/bookmarks";
import bookmarks from "@/data/bookmarks.json";
import styles from "./collected.module.css";

const data = bookmarks as BookmarkData;

const DESCRIPTION = `${data.count} design resources, sorted into ${data.shelves.length} shelves: galleries, type, color, icons, motion, code, UX patterns, tools and reading. Filter, share a view, open anything.`;

export const metadata: Metadata = {
  title: "Collected — Ulaş Alyeşil",
  description: DESCRIPTION,
  alternates: { canonical: "/collected" },
  openGraph: {
    title: "Collected",
    description: DESCRIPTION,
    url: "/collected",
  },
  twitter: { title: "Collected", description: DESCRIPTION },
};

/** Boards that live on other services, kept apart from the index. */
const ELSEWHERE = [
  {
    href: "https://ulasalyesil.notion.site/Design-Resources-33f5823050a34db0946a836c603b6544?pvs=4",
    title: "Design Resources",
    where: "Notion",
    description: "The older design resources board",
  },
  {
    href: "https://www.cosmos.so/ulasalyesil/objekte",
    title: "_objekte",
    where: "Cosmos",
    description: "Objects",
  },
  {
    href: "https://www.cosmos.so/ulasalyesil/haus",
    title: "haus",
    where: "Cosmos",
    description: "Interiors",
  },
];

export default function Bookmarks() {
  return (
    <>
      <PageIntro
        title="Collected"
        aside={`${data.count} links · ${data.shelves.length} shelves · updated ${data.updated}`}
        lede={
          <p>
            Everything I keep coming back to for design work, from galleries to
            font foundries to UX pattern write-ups. Free to use. Press / or ⌘K
            to filter.
          </p>
        }
      />
      <BookmarkIndex data={data} />
      <section className={styles.elsewhere} aria-labelledby="elsewhere">
        <h2 id="elsewhere" className={styles.heading}>
          <span className={styles.hash} aria-hidden>
            #
          </span>
          Elsewhere
        </h2>
        <ul>
          {ELSEWHERE.map((link) => (
            <li key={link.title}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.row}
              >
                <span className={styles.title}>{link.title}</span>
                <span className={styles.description}>{link.description}</span>
                <span className={styles.where}>
                  {link.where} <span aria-hidden>↗</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
