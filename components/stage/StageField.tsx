"use client";

import { useEffect, useRef } from "react";
import { attachStageField } from "./fieldRenderer";
import styles from "./StageField.module.css";

export default function StageField({
  seed,
  tint,
}: {
  seed: string;
  tint: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    return attachStageField(ref.current, seed, tint);
  }, [seed, tint]);
  return <canvas ref={ref} className={styles.field} aria-hidden="true" />;
}
