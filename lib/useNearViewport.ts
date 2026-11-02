"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * True once the element is within a screen of the viewport, and true from the
 * start when `eager`. A `<video poster>` has no `loading="lazy"`, so every
 * poster on a page downloads at load, at the priority of a visible image,
 * whether or not it is anywhere near the screen. On a phone that put five
 * Lab posters in front of the first card. Gating the attribute on this keeps
 * the first screen's posters in the HTML and lets the rest wait their turn.
 */
export function useNearViewport(
  ref: RefObject<Element | null>,
  eager = false
): boolean {
  const [near, setNear] = useState(eager);
  useEffect(() => {
    const element = ref.current;
    if (near || !element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
      },
      { rootMargin: "100% 0px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [near, ref]);
  return near;
}
