"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import DeviceFrame from "@/components/lab/DeviceFrame";
import { LAB_ITEMS, type LabItem } from "@/components/lab/data";
import styles from "./HomeLabSlot.module.css";

const TILE_SLUGS = ["flow", "brand-layers", "campaigns"];

function Recording({
  item,
  automatic = false,
}: {
  item: LabItem;
  automatic?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [paused, setPaused] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(preference.matches);
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const frame = frameRef.current;
    if (!video || !frame) return;
    let visible = false;
    let active = true;
    const syncPlayback = () => {
      const allowed = visible && !document.hidden;
      if (!allowed || (automatic && (reduced || paused))) video.pause();
      else if (automatic)
        video.play().catch(() => {
          if (active)
            setError(
              "Playback unavailable. Open the Lab entry to view the recording."
            );
        });
    };
    const sync = () => {
      setPlaying(!video.paused);
      setEnded(video.ended);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.4;
        syncPlayback();
      },
      { threshold: [0, 0.4] }
    );
    observer.observe(frame);
    video.addEventListener("play", sync);
    video.addEventListener("pause", sync);
    video.addEventListener("ended", sync);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      active = false;
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      video.removeEventListener("play", sync);
      video.removeEventListener("pause", sync);
      video.removeEventListener("ended", sync);
      video.pause();
    };
  }, [automatic, reduced, paused]);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    setError("");
    if (playing) {
      if (automatic) setPaused(true);
      video.pause();
    } else {
      if (automatic) setPaused(false);
      if (video.ended) video.currentTime = 0;
      video
        .play()
        .catch(() =>
          setError(
            "Playback unavailable. Open the Lab entry to view the recording."
          )
        );
    }
  };

  // Loops stay still under reduced motion; the feature plays only on request.
  const posterOnly = automatic && reduced;
  return (
    <>
      <div ref={frameRef} className={styles.frame}>
        {item.media.device ? (
          <div className={styles.device}>
            <DeviceFrame
              ref={videoRef}
              src={posterOnly ? undefined : item.media.video}
              poster={item.media.poster}
              label={item.media.alt}
              onError={() =>
                setError(
                  "Playback unavailable. Open the Lab entry to view the recording."
                )
              }
            />
          </div>
        ) : (
          <video
            ref={videoRef}
            className={styles.video}
            src={posterOnly ? undefined : item.media.video}
            poster={item.media.poster}
            aria-label={item.media.alt}
            muted
            playsInline
            loop={automatic}
            preload="none"
            onError={() =>
              setError(
                "Playback unavailable. Open the Lab entry to view the recording."
              )
            }
          />
        )}
      </div>
      <div className={styles.actions}>
        {posterOnly ? (
          <span className={styles.label}>Reduced motion: poster</span>
        ) : (
          <button
            className={styles.control}
            type="button"
            onClick={toggle}
            aria-label={`${playing ? "Pause" : ended ? "Replay" : "Play"} ${item.slug === "flow" ? "Flow" : item.title} recording`}
          >
            <span aria-hidden>[</span>
            {playing ? "Pause" : ended ? "Replay" : "Play"}
            <span aria-hidden>]</span>
          </button>
        )}
        <Link className={styles.control} href={`/lab/${item.slug}`}>
          <span aria-hidden>[</span>Explore{" "}
          {item.slug === "flow" ? "Flow" : item.title}
          <span aria-hidden>]</span>
        </Link>
      </div>
      {error && (
        <p className={styles.error} role="status">
          {error}
        </p>
      )}
    </>
  );
}

/** Three Lab pieces under the hero: muted loops that run only while seen. */
export default function HomeLabSlot() {
  return (
    <section className={`content-container ${styles.section}`} aria-labelledby="home-lab-tiles">
      <h2 id="home-lab-tiles" className={styles.label}>
        From the Lab
      </h2>
      <div className={styles.tiles}>
        {TILE_SLUGS.map((slug, index) => {
          const item = LAB_ITEMS.find((entry) => entry.slug === slug);
          if (!item) return null;
          return (
            <article key={item.slug} className={`enter ${styles.tile}`}>
              <h3 className={styles.label}>
                LAB-0{index + 1} / {item.slug === "flow" ? "Flow" : item.title}
              </h3>
              <Recording item={item} automatic />
            </article>
          );
        })}
      </div>
    </section>
  );
}
