"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CaseStudyDialog({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  const close = useCallback(() => {
    router.back();
  }, [router]);

  // Body scroll lock + Escape, the lab modal's conventions.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [close]);

  return (
    <>
      <div
        onClick={close}
        className="fixed inset-0 z-[95] lab-scrim"
        style={{
          background: "rgba(10,10,10,0.45)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      />
      <div className="fixed inset-0 z-[96] grid place-items-center p-4 sm:p-8 pointer-events-none">
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="pointer-events-auto w-full max-w-3xl max-h-full overflow-y-auto overscroll-contain rounded-xl bg-surface-0 border border-border-subtle px-4 sm:px-8 py-8 lab-modal-enter"
        >
          {children}
        </div>
      </div>
    </>
  );
}
