import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { BackToLab } from "./LabNavigation";
import LabStage from "./LabStage";
import LabMedia from "./LabMedia";
import type { LabItem } from "./data";
import styles from "./Lab.module.css";

const experiments: Partial<
  Record<string, ComponentType<{ embedded?: boolean }>>
> = {
  "elastic-type": dynamic(
    () => import("@/components/elastic-type/ElasticType")
  ),
  "brand-layers": dynamic(
    () => import("@/components/brand-layers/BrandLayers")
  ),
};
const labels: Record<string, string> = {
  interaction: "Interaction study",
  prototype: "Prototype",
  system: "System",
  concept: "Concept",
};

export default function LabDetail({
  item,
  next,
}: {
  item: LabItem;
  next?: LabItem;
}) {
  const Experiment = experiments[item.slug];
  return (
    <article className={styles.page}>
      <header className={styles.detailHeading}>
        <BackToLab />
        <h1>{item.title}</h1>
      </header>
      {Experiment ? (
        <LabStage item={item} variant="interactive">
          <Experiment embedded />
        </LabStage>
      ) : (
        <LabMedia key={item.slug} item={item} />
      )}
      <div className={styles.description}>
        <p className={styles.meta}>
          {labels[item.tag] ?? item.tag} ·{" "}
          {item.wip ? "In progress" : item.date}
        </p>
        <p>{item.blurb}</p>
        {item.url && (
          <a
            href={
              item.url.startsWith("/") || /^https?:\/\//.test(item.url)
                ? item.url
                : `https://${item.url}`
            }
          >
            {Experiment ? "Open standalone" : "Open prototype"} ↗
          </a>
        )}
      </div>
      <nav className={styles.next} aria-label="More experiments">
        {next ? (
          <Link href={`/lab/${next.slug}`}>
            <LabStage item={next} variant="thumbnail">
              <Image
                src={next.media.src}
                alt=""
                width={next.media.width}
                height={next.media.height}
                sizes="160px"
              />
            </LabStage>
            <span>
              <span className={styles.meta}>Next experiment</span>
              <strong>{next.title} ↗</strong>
            </span>
          </Link>
        ) : (
          <BackToLab />
        )}
      </nav>
    </article>
  );
}
