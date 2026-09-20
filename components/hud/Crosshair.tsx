"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import styles from "./Hud.module.css";

/**
 * Two dashed lines that track the pointer across the box they sit in, the
 * way a canvas tool shows you where you are before you commit to anything.
 *
 * It listens on its parent rather than itself so it can stay
 * `pointer-events: none`: a crosshair that eats the click on the card it
 * decorates would be an expensive joke. Coordinates are written straight to
 * the element's style — React state at pointer-move rate would re-render the
 * whole card for a line that moved four pixels.
 *
 * Fine pointers only. There is no hover on a touchscreen, and a crosshair
 * frozen wherever a finger last landed reads as a rendering bug.
 */
export default function Crosshair({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    const move = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const box = host.getBoundingClientRect();
        el.style.setProperty("--cx", `${e.clientX - box.left}px`);
        el.style.setProperty("--cy", `${e.clientY - box.top}px`);
      });
    };
    const show = () => el.setAttribute("data-on", "");
    const hide = () => {
      el.removeAttribute("data-on");
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    host.addEventListener("pointermove", move);
    host.addEventListener("pointerenter", show);
    host.addEventListener("pointerleave", hide);
    return () => {
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerenter", show);
      host.removeEventListener("pointerleave", hide);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className={cn(styles.crosshair, className)} aria-hidden />;
}
