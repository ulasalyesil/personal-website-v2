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

export default function LabCard({ item, index, onOpen }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const hasVideo = Boolean(item.media.video) && !reducedMotion;

  const play = () => {
    void videoRef.current?.play().catch(() => {});
  };

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
      className="group flex h-full w-full flex-col gap-3 p-4 rounded-lg bg-surface-1 border border-border-subtle hover:border-border-default transition-colors duration-150 text-left cursor-pointer"
      aria-label={`Open ${item.title}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-surface-2">
        <Image
          src={item.media.src}
          alt={item.media.alt}
          className="object-cover group-hover:scale-[1.02] transition-transform duration-150"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
            className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-150"
          />
        )}
      </div>

      <div>
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-medium text-text-primary text-balance">
            {item.title}
          </h3>
          <span className="font-mono text-xs text-text-tertiary tabular-nums whitespace-nowrap">
            {item.wip ? "wip" : item.date}
          </span>
        </div>
        <p className="text-sm text-text-tertiary mt-1 line-clamp-2 text-pretty">
          {item.blurb}
        </p>
        <span className="font-mono text-xs uppercase tracking-wider text-text-tertiary mt-2 inline-block">
          {item.tag}
        </span>
      </div>
    </button>
  );
}
