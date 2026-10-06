"use client";

import Link from "next/link";
import { useEffect } from "react";
import { isPlainClick } from "@/lib/useRouteTransition";

// Only a gallery visit in this page session owns a return position. A direct
// load or new tab starts fresh instead of inheriting an old sessionStorage key.
let position: { slug: string; y: number } | undefined;
let returning = false;

export function rememberGallery(slug: string) {
  position = { slug, y: window.scrollY };
}

export function BackToLab() {
  return (
    <Link
      href="/lab"
      onClick={(event) => {
        if (isPlainClick(event)) returning = true;
      }}
    >
      ← Back to Lab
    </Link>
  );
}

/** Native history handles browser Back; this restores the explicit return link. */
export function GalleryRestore() {
  useEffect(() => {
    if (!returning || !position) return;
    const saved = position;
    const frame = requestAnimationFrame(() => {
      returning = false;
      position = undefined;
      document
        .getElementById(`lab-${saved.slug}`)
        ?.focus({ preventScroll: true });
      window.scrollTo({ top: saved.y, behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  return null;
}
