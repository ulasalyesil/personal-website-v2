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
