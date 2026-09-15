"use client";

import Image from "next/image";
import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { triggerHaptic } from "@/lib/haptics";
import type { LabItem } from "./data";

type Props = {
  item: LabItem;
  index: number;
  onOpen: (labItem: LabItem, itemIndex: number) => void;
};

/**
 * One entry, one row. The media is the card — no frame around it, sized big
 * enough that a screenshot actually resolves, on a colour field taken from
 * the work so the set doesn't read as four grey rectangles.
 */
export default function LabCard({ item, index, onOpen }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const hasVideo = Boolean(item.media.video) && !reducedMotion;

  const play = () => void videoRef.current?.play().catch(() => {});
  const stop = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <button
      type="button"
      onClick={() => {
        triggerHaptic("light");
        onOpen(item, index);
      }}
      onMouseEnter={hasVideo ? play : undefined}
      onMouseLeave={hasVideo ? stop : undefined}
      onFocus={hasVideo ? play : undefined}
      onBlur={hasVideo ? stop : undefined}
      className="group grid w-full cursor-pointer grid-cols-1 items-start gap-5 text-left lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-10"
      aria-label={`Open ${item.title}`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-surface-2 transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={item.media.src}
            alt={item.media.alt}
            className="object-cover"
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority={index === 0}
          />
          {hasVideo && (
            <video
              ref={videoRef}
              src={item.media.video}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
          )}
        </div>
      </div>

      <div className="lg:pt-2">
        {/* the colour identity lives here rather than as a mat around the
            media, which fought the backgrounds already in the captures */}
        <span
          aria-hidden
          className="mb-4 block h-[2px] w-8 rounded-full"
          style={{ backgroundColor: item.tint }}
        />
        <div className="flex items-baseline gap-3">
          <h3 className="text-subsection font-medium text-text-primary text-balance">
            {item.title}
          </h3>
          <span className="font-mono text-xs text-text-tertiary tabular-nums whitespace-nowrap">
            {item.wip ? "wip" : item.date}
          </span>
        </div>

        <p className="text-body mt-2 text-text-secondary text-pretty">
          {item.summary}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-text-tertiary">
            {item.tag}
          </span>
          {item.url && (
            <span
              className="inline-flex items-center gap-1 rounded-full border border-border-default px-2 py-1 font-mono text-xs uppercase tracking-wider text-text-secondary"
              title="This one runs in the browser"
            >
              <span aria-hidden>&#8599;</span>
              live
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
