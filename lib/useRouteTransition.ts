"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

/**
 * `experimental.viewTransition` in next.config only exposes React's
 * `unstable_ViewTransition`, which stable React 19.2 does not export. So the
 * `view-transition-name`s in this app were inert: `document.startViewTransition`
 * was never called on a soft navigation. This drives it directly instead.
 *
 * The transition captures the old page, waits for the new route to paint, then
 * animates the named elements between the two. `SAFETY_MS` exists because a
 * transition that never resolves leaves the page frozen under the snapshot;
 * a navigation slower than that is better off finishing without motion.
 */
const SAFETY_MS = 700;

/**
 * `html[data-routing]` is set from the click until the next page has been on
 * screen long enough for its reveal to have run. Elements that morph between
 * the two pages (a case study title) must not also fade themselves in under
 * the morph, and the attribute is what their CSS keys on. It is cleared a
 * fixed time after the new route commits, not after the transition: a CSS
 * animation takes its start time when it is created, so shortening it to 0s
 * and restoring it only once it would have ended is a no-op, while restoring
 * it earlier would play the remainder late. `ROUTING_MS` must exceed the
 * longest reveal (delay plus duration); `FALLBACK_MS` clears it if the route
 * never commits.
 */
const ROUTING_MS = 1200;
const FALLBACK_MS = 8000;
let routingTimer = 0;

function setRouting(ms: number) {
  if (!("routing" in document.documentElement.dataset)) return;
  window.clearTimeout(routingTimer);
  routingTimer = window.setTimeout(() => {
    delete document.documentElement.dataset.routing;
  }, ms);
}

function markRouting() {
  document.documentElement.dataset.routing = "";
  setRouting(FALLBACK_MS);
}

export function useRouteTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const settle = useRef<(() => void) | null>(null);

  // The new route committed: release the transition so it captures the new state.
  useEffect(() => {
    settle.current?.();
    settle.current = null;
    setRouting(ROUTING_MS);
  }, [pathname]);

  return useCallback(
    (href: string) => {
      const supported = typeof document.startViewTransition === "function";
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!supported || reduced) {
        router.push(href);
        return;
      }

      markRouting();
      document.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            const done = () => {
              settle.current = null;
              resolve();
            };
            settle.current = done;
            setTimeout(done, SAFETY_MS);
            router.push(href);
          }),
      );
    },
    [router],
  );
}

/**
 * True for a plain left click. Modifier clicks and middle clicks must keep the
 * browser's own behaviour (new tab, new window), so they never get intercepted.
 */
export function isPlainClick(e: React.MouseEvent): boolean {
  return !(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0);
}
