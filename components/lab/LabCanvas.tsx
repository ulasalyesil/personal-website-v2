"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import StageField from "@/components/stage/StageField";
import { Caption, Marks } from "@/components/hud";
import DeviceFrame from "./DeviceFrame";
import { rememberGallery } from "./LabNavigation";
import { PLACEMENT, TILE, type Placement } from "./placement";
import { isPlainClick } from "@/lib/useRouteTransition";
import type { LabItem } from "./data";
import styles from "./LabCanvas.module.css";

/**
 * Every lab item on one screen: a board of 16 × 9 cells filling what is left
 * under the intro. One shared field sits behind the whole board instead of
 * one per tile. `?grid` draws the cells and each tile's coordinates, for
 * tuning placements.
 */
export default function LabCanvas({ items }: { items: LabItem[] }) {
  const [grid, setGrid] = useState(false);

  useEffect(() => {
    setGrid(new URLSearchParams(window.location.search).has("grid"));
  }, []);

  return (
    <div className={styles.viewport}>
      <div className={styles.artboard} data-grid={grid || undefined}>
        <StageField seed="lab-canvas" tint="#4a4a7d" />
        <ul className={styles.tiles}>
          {items.map((item) => (
            <Tile key={item.slug} item={item} place={PLACEMENT[item.slug]} grid={grid} />
          ))}
        </ul>
      </div>
    </div>
  );
}

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Tile({ item, place, grid }: { item: LabItem; place: Placement; grid: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const { w, h } = TILE[place.size];
  const still = item.media.poster ?? item.media.src;
  const loop = item.media.video && !failed ? item.media.video : undefined;

  // Hover and keyboard focus select the tile, the way a canvas tool would:
  // corners around the thing, and a caption stating what kind of thing it
  // is. Status joins it only where Ulaş has set one.
  const selection = (
    <>
      <Marks kind="select" className={styles.select} />
      <Caption className={styles.caption}>
        {item.status !== item.tag && item.tag}
        {item.status && item.status !== item.tag && " · "}
        {item.status && <>Status [{item.status}]</>}
      </Caption>
    </>
  );

  // Loops play on their own while the tile is on screen and the tab is
  // visible. Under reduced motion they rest on the poster and play on hover.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let inView = false;
    const sync = () => {
      if (inView && !document.hidden && !reducedMotion()) void video.play().catch(() => {});
      else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    observer.observe(video);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
    };
  }, [loop]);

  const hoverPlay = () => {
    if (reducedMotion()) void videoRef.current?.play().catch(() => {});
  };
  const hoverStop = () => {
    const video = videoRef.current;
    if (video && reducedMotion()) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <li
      className={styles.cell}
      style={{
        gridColumn: `${place.col} / span ${w}`,
        gridRow: `${place.row} / span ${h}`,
      }}
    >
      <Link
        id={`lab-canvas-${item.slug}`}
        href={`/lab/${item.slug}`}
        className={styles.tile}
        data-size={place.size}
        onClick={(event) => {
          if (isPlainClick(event)) rememberGallery(item.slug);
        }}
        onMouseEnter={hoverPlay}
        onMouseLeave={hoverStop}
        onFocus={hoverPlay}
        onBlur={hoverStop}
      >
        <span className={styles.media}>
          {place.size === "phone" ? (
            <span className={styles.phone}>
              <DeviceFrame
                ref={videoRef}
                src={loop}
                poster={still}
                label={item.media.alt}
                onError={() => setFailed(true)}
              />
              {selection}
            </span>
          ) : loop ? (
            <video
              ref={videoRef}
              src={loop}
              poster={still}
              muted
              loop
              playsInline
              preload="none"
              aria-label={item.media.alt}
              className={styles.video}
              onError={() => setFailed(true)}
            />
          ) : (
            <Image
              src={still}
              alt={item.media.alt}
              fill
              sizes={place.size === "lg" ? "33vw" : "20vw"}
              className={styles.image}
            />
          )}
          {place.size !== "phone" && selection}
        </span>
        <span className={styles.label}>
          <span className={styles.title}>{item.title}</span>
          <span className={styles.date}>{item.date}</span>
          {item.status && <span className={styles.hidden}>, {item.status}</span>}
        </span>
        {grid && (
          <span className={styles.coord} aria-hidden>
            {place.col},{place.row} · {w}×{h}
          </span>
        )}
      </Link>
    </li>
  );
}
