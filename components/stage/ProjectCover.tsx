import Image from "next/image";
import type { CaseStudy } from "@/data/work";
import StageField from "./StageField";
import styles from "./ProjectCover.module.css";

/** Keep the captured artifact intact, with a quiet field around it. */
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
      <div className={styles.artifact}>
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
