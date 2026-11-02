"use client";

import { forwardRef } from "react";
import { posterBackground } from "@/lib/poster";

/**
 * A raw screen recording sitting inside the real device bezel.
 *
 * The bezel image carries its own alpha: the screen area and everything
 * outside the rail are transparent, the body is opaque. It is lossless WebP,
 * the same pixels as the PNG it came from at two thirds of the bytes, and
 * lazy, since most bezels sit below the first screen. So the video goes underneath
 * and shows through the cutout. These numbers are measured off that alpha
 * channel rather than eyeballed — screen rect 73,84 1204×2592 in a 1350×2760
 * image — which is why the recording lands in the glass exactly.
 */
const SCREEN = {
  left: "5.407%",
  top: "3.043%",
  width: "89.185%",
  height: "93.913%",
} as const;

const FRAME_ASPECT = 1350 / 2760;

type Props = {
  src?: string;
  poster?: string;
  /** decorative — the entry's own copy describes it */
  label: string;
  onError?: () => void;
};

const DeviceFrame = forwardRef<HTMLVideoElement, Props>(function DeviceFrame(
  { src, poster, label, onError },
  ref
) {
  return (
    <div
      className="relative h-full"
      style={{ aspectRatio: FRAME_ASPECT, maxHeight: "100%" }}
    >
      <video
        ref={ref}
        src={src}
        muted
        loop
        playsInline
        preload="none"
        onError={onError}
        aria-label={label}
        className="absolute object-cover"
        style={{ ...SCREEN, borderRadius: "6%/2.8%", ...posterBackground(poster) }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/lab/device-bezel.webp"
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full select-none"
        draggable={false}
      />
    </div>
  );
});

export default DeviceFrame;
