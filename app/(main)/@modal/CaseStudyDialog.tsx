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
          className="pointer-events-auto relative w-full max-w-5xl max-h-[90vh] overflow-y-auto overscroll-contain rounded-xl bg-surface-0 border border-border-subtle lab-modal-enter"
        >
          {/* Sticky, zero-height row so the close button stays pinned without
              reserving layout space above the content. */}
          <div className="sticky top-0 z-20 flex h-0 justify-end overflow-visible pointer-events-none">
            <button
              type="button"
              onClick={close}
              aria-label="Close case study"
              className="pointer-events-auto mr-3 mt-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-surface-1 text-text-secondary transition-colors duration-150 hover:text-text-primary"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="px-4 sm:px-6 pb-8 pt-8">{children}</div>
        </div>
      </div>
    </>
  );
}
