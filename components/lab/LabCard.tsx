"use client";

import Image from "next/image";
import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { triggerHaptic } from "@/lib/haptics";
import { isPlainClick } from "@/lib/useRouteTransition";
import DeviceFrame from "./DeviceFrame";
import type { LabItem } from "./data";
import styles from "./LabCard.module.css";

type Props = {
  item: LabItem;
  index: number;
  onOpen: (labItem: LabItem, itemIndex: number) => void;
};

const TAG_LABEL: Record<string, string> = {
  prototype: "Prototype",
  interaction: "Interaction study",
  system: "System",
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * One entry, one row, alternating sides. The media sits on a colour field
 * taken from the work, so the set doesn't read as four grey rectangles. The
 * row is a real link to the entry's own URL; a plain click opens it in place.
 */
export default function LabCard({ item, index, onOpen }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const hasVideo = Boolean(item.media.video) && !reducedMotion;
  const inDevice = item.media.device === "iphone" && Boolean(item.media.video);

  const play = () => void videoRef.current?.play().catch(() => {});
  const stop = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <a
      href={`/lab/${item.slug}`}
      data-side={index % 2 ? "end" : "start"}
      data-device={inDevice || undefined}
      className={styles.card}
      onClick={(e) => {
        triggerHaptic("light");
        if (!isPlainClick(e)) return;
        e.preventDefault();
        onOpen(item, index);
      }}
      onMouseEnter={hasVideo ? play : undefined}
      onMouseLeave={hasVideo ? stop : undefined}
      onFocus={hasVideo ? play : undefined}
      onBlur={hasVideo ? stop : undefined}
    >
      <div
        className={styles.media}
        style={{ "--tint": item.tint } as React.CSSProperties}
      >
        {inDevice ? (
          /* A phone is portrait: the whole device, nothing sliced. */
          <div className={styles.device}>
            <DeviceFrame
              ref={videoRef}
              src={item.media.video!}
              poster={item.media.poster}
              label={item.media.alt}
            />
          </div>
        ) : (
          <div className={styles.shot}>
            <Image
              src={item.media.src}
              alt={item.media.alt}
              fill
              sizes="(max-width: 900px) 100vw, 55vw"
              priority={index === 0}
              className={styles.image}
            />
          </div>
        )}
      </div>

      <div className={styles.text}>
        <p className={styles.meta}>
          <span>{TAG_LABEL[item.tag] ?? capitalize(item.tag)}</span>
          <span>{item.wip ? "In progress" : capitalize(item.date)}</span>
        </p>
        <h2 className={styles.title}>{item.title}</h2>
        <p className={styles.summary}>{item.summary}</p>
        <p className={styles.actions}>
          <span className={styles.open}>
            <span aria-hidden>[</span>Open entry<span aria-hidden>]</span>
          </span>
          {item.url && <span className={styles.live}>Runs in the browser</span>}
        </p>
      </div>
    </a>
  );
}
