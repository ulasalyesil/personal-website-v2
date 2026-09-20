"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import DeviceFrame from "@/components/lab/DeviceFrame";
import { LAB_ITEMS } from "@/components/lab/data";
import styles from "./LabFeature.module.css";

const FEATURED = "fx-chart-range";

/**
 * One interaction, shown working. The band takes its colour from the entry
 * itself, the same tint the Lab uses behind it.
 */
export default function LabFeature() {
  const item = LAB_ITEMS.find((it) => it.slug === FEATURED);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const sync = () => setPlaying(!video.paused);
    video.addEventListener("play", sync);
    video.addEventListener("pause", sync);

    // Plays only while on screen, and never on its own under reduced motion.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduced) return;
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(video);
    return () => {
      io.disconnect();
      video.removeEventListener("play", sync);
      video.removeEventListener("pause", sync);
    };
  }, []);

  if (!item?.media.video) return null;

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  return (
    <section
      className={styles.band}
      style={{ "--tint": item.tint } as React.CSSProperties}
      aria-labelledby="lab-feature"
    >
      <div className={styles.device}>
        <DeviceFrame
          ref={videoRef}
          src={item.media.video}
          poster={item.media.poster}
          label={item.media.alt}
        />
      </div>

      <div className={styles.copy}>
        <h2 id="lab-feature" className={styles.kicker}>
          <span aria-hidden>#</span> From the Lab
        </h2>
        <p className={styles.headline}>A range, not a point.</p>
        <p className={styles.summary}>{item.summary}</p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.play}
            onClick={toggle}
            aria-pressed={playing}
          >
            <span aria-hidden className={styles.playIcon} data-playing={playing || undefined} />
            {playing ? "Pause recording" : "Play recording"}
          </button>
          <Link href={`/lab/${item.slug}`} className={styles.link}>
            <span aria-hidden>[</span>How it works<span aria-hidden>]</span>
          </Link>
          <Link href="/lab" className={styles.link}>
            <span aria-hidden>[</span>All {LAB_ITEMS.length} entries
            <span aria-hidden>]</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
