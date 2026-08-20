"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

// ─────────────────────────────────────────────────────────────────────────────
// Captures from the SwiftUI prototypes. Every clip is a recording off the
// running simulator: no mockups, no re-creations.
// ─────────────────────────────────────────────────────────────────────────────

type Capture = {
  /** /video/... — omit for a still. */
  video?: string;
  /** /images/... poster, and the still itself when there is no video. */
  poster: string;
  alt: string;
};

type Item = {
  captures: Capture[];
  title: string;
  caption: string;
  meta: string;
};

/** Phone-scale frame. The capture is the screen, so the mask supplies the corners. */
function Screen({
  capture,
  priority,
  viewTransitionName,
}: {
  capture: Capture;
  priority?: boolean;
  viewTransitionName?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  // Play only while on screen: a page of looping videos otherwise burns
  // battery for clips nobody is looking at.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlaying(false);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) void el.play().catch(() => {});
        else el.pause();
      },
      { rootMargin: "-5% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      void el.play().catch(() => {});
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <div
      className="group/screen relative overflow-hidden rounded-[7.5%/3.5%] border border-border-subtle bg-surface-1"
      style={viewTransitionName ? { viewTransitionName } : undefined}
    >
      {capture.video ? (
        <>
          <video
            ref={ref}
            className="block w-full"
            src={capture.video}
            poster={capture.poster}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={capture.alt}
          />
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? `Pause: ${capture.alt}` : `Play: ${capture.alt}`}
            className="absolute inset-0 flex items-end justify-end p-2.5 opacity-0 transition-opacity duration-150 group-hover/screen:opacity-100 focus-visible:opacity-100"
          >
            <span className="rounded-full bg-surface-0/85 px-2.5 py-1 text-[11px] font-medium text-text-primary backdrop-blur">
              {playing ? "Pause" : "Play"}
            </span>
          </button>
        </>
      ) : (
        <Image
          src={capture.poster}
          alt={capture.alt}
          width={600}
          height={1304}
          className="block w-full"
          priority={priority}
          sizes="(max-width: 640px) 70vw, 260px"
        />
      )}
    </div>
  );
}

function Figure({ item, index }: { item: Item; index: number }) {
  const pair = item.captures.length > 1;
  return (
    <figure className={cn("flex flex-col", pair && "sm:col-span-2")}>
      <div
        className={cn(
          "mx-auto w-full",
          pair ? "grid max-w-[34rem] grid-cols-2 gap-3" : "max-w-[16rem]",
        )}
      >
        {item.captures.map((c, i) => (
          <Screen
            key={c.poster}
            capture={c}
            priority={index === 0 && i === 0}
            viewTransitionName={index === 0 && i === 0 ? "project-getirfinans-ai" : undefined}
          />
        ))}
      </div>
      <figcaption className="mt-5 space-y-1.5">
        <div className="text-sm font-semibold text-text-primary">{item.title}</div>
        <p className="text-pretty text-[15px] leading-relaxed text-text-secondary">{item.caption}</p>
        <div className="font-mono text-[11px] text-text-tertiary">{item.meta}</div>
      </figcaption>
    </figure>
  );
}

export default function Gallery({ items }: { items: Item[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2">
      {items.map((item, i) => (
        <Figure key={item.title} item={item} index={i} />
      ))}
    </div>
  );
}
