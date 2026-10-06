"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import LabStage from "./LabStage";
import DeviceFrame from "./DeviceFrame";
import { rememberGallery } from "./LabNavigation";
import { isPlainClick } from "@/lib/useRouteTransition";
import type { LabItem } from "./data";
import styles from "./LabCard.module.css";

export default function LabCard({
  item,
  index,
}: {
  item: LabItem;
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const inDevice = item.media.device === "iphone";
  const stop = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };
  const play = () => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover)").matches
    )
      return;
    void videoRef.current?.play().catch(() => {});
  };
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause();
    });
    observer.observe(video);
    const visibility = () => {
      if (document.hidden) video.pause();
    };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const preference = () => {
      if (reduced.matches) video.pause();
    };
    document.addEventListener("visibilitychange", visibility);
    reduced.addEventListener("change", preference);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      reduced.removeEventListener("change", preference);
    };
  }, []);
  return (
    <Link
      id={`lab-${item.slug}`}
      href={`/lab/${item.slug}`}
      className={styles.card}
      onClick={(event) => {
        if (isPlainClick(event)) rememberGallery(item.slug);
      }}
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
    >
      <LabStage item={item}>
        {item.media.video && !failed ? (
          inDevice ? (
            <div className={styles.device}>
              <DeviceFrame
                ref={videoRef}
                src={item.media.video}
                poster={item.media.poster ?? item.media.src}
                label={item.media.alt}
                onError={() => setFailed(true)}
              />
            </div>
          ) : (
            <video
              ref={videoRef}
              src={item.media.video}
              poster={item.media.poster ?? item.media.src}
              muted
              loop
              playsInline
              preload="none"
              aria-label={item.media.alt}
              className={styles.image}
              onError={() => setFailed(true)}
            />
          )
        ) : (
          <Image
            src={item.media.src}
            alt={item.media.alt}
            width={item.media.width}
            height={item.media.height}
            sizes="(max-width: 899px) 100vw, 50vw"
            priority={index < 2}
            className={styles.image}
          />
        )}
      </LabStage>
      <div className={styles.caption}>
        <h2>{item.title}</h2>
        {item.wip && <span>In progress</span>}
        <span aria-hidden="true">↗</span>
      </div>
    </Link>
  );
}
