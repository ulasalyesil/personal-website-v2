"use client";

import { forwardRef } from "react";

/**
 * A raw screen recording sitting inside the real device bezel.
 *
 * The bezel PNG carries its own alpha: the screen area and everything outside
 * the rail are transparent, the body is opaque. So the video goes underneath
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
  src: string;
  poster?: string;
  /** decorative — the entry's own copy describes it */
  label: string;
};

const DeviceFrame = forwardRef<HTMLVideoElement, Props>(function DeviceFrame(
  { src, poster, label },
  ref,
) {
  return (
    <div
      className="relative h-full"
      style={{ aspectRatio: FRAME_ASPECT, maxHeight: "100%" }}
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        className="absolute object-cover"
        style={{ ...SCREEN, borderRadius: "6%/2.8%" }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/lab/device-bezel.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full select-none"
        draggable={false}
      />
    </div>
  );
});

export default DeviceFrame;
