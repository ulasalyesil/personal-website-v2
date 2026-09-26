"use client";

import { useEffect, useState } from "react";
import Rolling from "@/components/hud/Rolling";
import { triggerHaptic } from "@/lib/haptics";
import styles from "./Closing.module.css";

/**
 * A second way to take the address, for readers with no mail client set
 * up, which is most people on a desktop. The visible label rolls between
 * states like any other reading, so it stays aria-hidden; the accessible
 * name and a polite status say the same thing in words.
 */
export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      triggerHaptic("light");
      setCopied(true);
    } catch {
      // No clipboard permission: the mailto link beside this still works.
    }
  };

  return (
    <button type="button" className={styles.copy} onClick={copy} aria-label="Copy email address">
      <span aria-hidden>
        [<Rolling value={copied ? "copied" : "copy"} />]
      </span>
      <span className="sr-only" role="status">
        {copied ? "Email address copied" : ""}
      </span>
    </button>
  );
}
