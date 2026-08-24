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

export function useRouteTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const settle = useRef<(() => void) | null>(null);

  // The new route committed: release the transition so it captures the new state.
  useEffect(() => {
    settle.current?.();
    settle.current = null;
  }, [pathname]);

  return useCallback(
    (href: string) => {
      const supported = typeof document.startViewTransition === "function";
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!supported || reduced) {
        router.push(href);
        return;
      }

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
