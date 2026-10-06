"use client";

import Image from "next/image";
import { useState } from "react";
import type { LabItem } from "./data";
import LabStage from "./LabStage";
import styles from "./Lab.module.css";

export default function LabMedia({ item }: { item: LabItem }) {
  const [failed, setFailed] = useState(false);
  return (
    <LabStage item={item} variant="detail">
      {item.media.video && !failed ? (
        <video
          key={item.slug}
          src={item.media.video}
          poster={item.media.poster ?? item.media.src}
          controls
          muted
          playsInline
          preload="metadata"
          aria-label={item.media.alt}
          onError={() => setFailed(true)}
        />
      ) : (
        <Image
          src={item.media.src}
          alt={item.media.alt}
          width={item.media.width}
          height={item.media.height}
          sizes="(max-width: 899px) 100vw, 90vw"
          priority
        />
      )}
      {failed && (
        <p role="status" className={styles.mediaError}>
          Recording unavailable. Showing the still image.
        </p>
      )}
    </LabStage>
  );
}
