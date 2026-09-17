import PageIntro from "@/components/site/PageIntro";
import styles from "./bookmarks.module.css";

export const metadata = { title: "Collected — Ulaş Alyeşil" };

const LINKS = [
  {
    href: "https://ulasalyesil.notion.site/Design-Resources-33f5823050a34db0946a836c603b6544?pvs=4",
    title: "Design Resources",
    where: "Notion",
    description: "Collecting anything related to design here",
  },
  {
    href: "https://www.cosmos.so/ulasalyesil/objekte",
    title: "_objekte",
    where: "Cosmos",
    description: "Collecting objects in Cosmos",
  },
  {
    href: "https://www.cosmos.so/ulasalyesil/haus",
    title: "haus",
    where: "Cosmos",
    description: "Collecting interior inspirations in Cosmos",
  },
  {
    href: "https://www.cosmos.so/ulasalyesil/haus",
    title: "grafik",
    where: "Cosmos",
    description: "Collecting graphic design inspirations in Cosmos",
  },
];

export default function Bookmarks() {
  return (
    <>
      <PageIntro
        title="Collected"
        aside={`${LINKS.length} collections`}
        lede="Where references end up: design resources, objects, interiors and graphics."
      />
      <ul className={styles.list}>
        {LINKS.map((link) => (
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
    </>
  );
}
