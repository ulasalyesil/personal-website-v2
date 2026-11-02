import type { CSSProperties } from "react";
import { getImageProps } from "next/image";

/**
 * A `<video poster>` takes one URL, so it never goes through next/image and
 * ships the raw JPEG. This hands it to the same optimizer anyway: AVIF or
 * WebP, encoded at the file's own size because the optimizer never enlarges.
 * The frame keeps its intrinsic dimensions, so layout does not move; only
 * the bytes drop (the five Lab posters go from 285 KB to 113 KB).
 */
export function posterSrc(src: string): string {
  return getImageProps({ src, alt: "", fill: true }).props.src;
}

/**
 * The same frame as a CSS background, for a video its box sizes with
 * `object-fit: cover`. A background is fetched only for an element that
 * renders, so a video inside a view hidden with `display: none` (the Lab
 * canvas on a phone) costs nothing, where a `poster` attribute downloads
 * regardless. Center and cover are what `object-fit: cover` does to a
 * poster, so the frame lands where it did.
 */
export function posterBackground(url?: string): CSSProperties | undefined {
  return url ? { background: `center / cover no-repeat url("${url}")` } : undefined;
}
