"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Lab.module.css";

/**
 * Same-origin prototype frame. With `fit="content"` it grows to the
 * prototype's own height, so the page scrolls instead of the frame.
 */
export default function PrototypeFrame({
  src,
  title,
  fit,
}: {
  src: string;
  title: string;
  fit?: "content";
}) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    const frame = ref.current;
    if (fit !== "content" || !frame) return;
    let observer: ResizeObserver | undefined;
    const watch = () => {
      const body = frame.contentDocument?.body;
      if (!body) return;
      observer?.disconnect();
      observer = new ResizeObserver(() => {
        // the frame is border-box, so add its border to the content height
        const border = frame.offsetHeight - frame.clientHeight;
        setHeight(Math.ceil(body.getBoundingClientRect().height) + border);
      });
      observer.observe(body);
    };
    frame.addEventListener("load", watch);
    watch();
    return () => {
      frame.removeEventListener("load", watch);
      observer?.disconnect();
    };
  }, [fit]);

  return (
    <iframe
      ref={ref}
      className={styles.prototype}
      src={src}
      title={title}
      allow="fullscreen"
      style={height ? { height } : undefined}
    />
  );
}
