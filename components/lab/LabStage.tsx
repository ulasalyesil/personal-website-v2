import type { CSSProperties, ReactNode } from "react";
import type { LabItem } from "./data";
import StageField from "@/components/stage/StageField";
import styles from "./LabStage.module.css";

export default function LabStage({
  item,
  variant = "preview",
  children,
}: {
  item: LabItem;
  variant?: "preview" | "detail" | "interactive" | "thumbnail";
  children: ReactNode;
}) {
  return (
    <div
      className={styles.stage}
      data-format={variant}
      data-phone={item.media.device === "iphone" || undefined}
      style={{ "--lab-accent": item.tint } as CSSProperties}
    >
      <StageField seed={item.slug} tint={item.tint} />
      <div className={styles.work}>{children}</div>
    </div>
  );
}
