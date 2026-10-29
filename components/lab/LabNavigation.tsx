"use client";

import Link from "next/link";
import { useEffect } from "react";
import { isPlainClick } from "@/lib/useRouteTransition";

// Only a gallery visit in this page session owns a return position. A direct
// load or new tab starts fresh instead of inheriting an old sessionStorage key.
let position: { slug: string; y: number } | undefined;
let returning = false;

// Browser Back returns to the gallery too, so it restores focus the same way.
if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    if (position) returning = true;
  });
}

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

/**
 * Focus goes back to the tile that was opened: on the canvas on desktop, in
 * the feed on phones, whichever is rendered.
 */
export function GalleryRestore() {
  useEffect(() => {
    if (!returning || !position) return;
    const saved = position;
    const frame = requestAnimationFrame(() => {
      returning = false;
      position = undefined;
      [`lab-canvas-${saved.slug}`, `lab-${saved.slug}`]
        .map((id) => document.getElementById(id))
        .find((el) => el && el.getClientRects().length > 0)
        ?.focus({ preventScroll: true });
      window.scrollTo({ top: saved.y, behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  return null;
}
