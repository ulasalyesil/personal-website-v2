import Image from "next/image";
import type { CaseStudy } from "@/data/work";
import StageField from "./StageField";
import styles from "./ProjectCover.module.css";

/**
 * The field is the only ground. Device covers are cut out and stand on it
 * directly; window covers are full-bleed UI, so they get an inset frame.
 */
export default function ProjectCover({
  study,
  sizes,
  priority = false,
  decorative = false,
  imageClassName,
}: {
  study: CaseStudy;
  sizes: string;
  priority?: boolean;
  decorative?: boolean;
  imageClassName?: string;
}) {
  return (
    <>
      <StageField seed={`project-${study.slug}`} tint={study.tint} />
      <div className={styles.artifact} data-frame={study.frame}>
        <Image
          src={study.cover}
          alt={decorative ? "" : study.alt}
          fill
          sizes={sizes}
          priority={priority}
          fetchPriority={priority ? "high" : undefined}
          className={imageClassName}
          style={{ objectFit: "contain" }}
        />
      </div>
    </>
  );
}
