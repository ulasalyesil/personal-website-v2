"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import PageIntro from "@/components/site/PageIntro";
import LabGrid from "./LabGrid";
import LabModal from "./LabModal";
import { LAB_ITEMS, type LabItem } from "./data";

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const onR = () => setM(window.innerWidth <= 768);
    onR();
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);
  return m;
}

export default function LabApp({ initialSlug }: { initialSlug?: string }) {
  const initialIndex = initialSlug
    ? LAB_ITEMS.findIndex((it) => it.slug === initialSlug)
    : -1;
  const [selected, setSelected] = useState<number | null>(
    initialIndex >= 0 ? initialIndex : null,
  );
  const [direction, setDirection] = useState<1 | -1>(1);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isMobile = useIsMobile();
  const total = LAB_ITEMS.length;

  const cycle = useCallback(
    (dir: "next" | "prev") => {
      if (total === 0) return;
      setDirection(dir === "next" ? 1 : -1);
      setSelected((curr) => {
        if (curr == null) return curr;
        return (curr + (dir === "next" ? 1 : -1) + total) % total;
      });
    },
    [total],
  );

  const close = useCallback(() => {
    setSelected(null);
    try {
      if (history.state?.labModalEntry) history.back();
      else history.replaceState(history.state, "", "/lab");
    } catch {}
  }, []);

  const open = useCallback((_: LabItem, index: number) => {
    setSelected(index);
    try {
      history.pushState(
        { ...history.state, labModalEntry: true },
        "",
        `/lab/${LAB_ITEMS[index].slug}`,
      );
    } catch {}
  }, []);

  // URL ↔ state sync on back/forward
  useEffect(() => {
    const handler = () => {
      const m = window.location.pathname.match(/^\/lab\/([^\/]+)$/);
      if (m) {
        const idx = LAB_ITEMS.findIndex((it) => it.slug === m[1]);
        setSelected(idx >= 0 ? idx : null);
      } else {
        setSelected(null);
      }
    };
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  // Update URL when cycling between items
  useEffect(() => {
    if (selected == null) return;
    try {
      history.replaceState(history.state, "", `/lab/${LAB_ITEMS[selected].slug}`);
    } catch {}
  }, [selected]);

  // Reading gestures belong to the content. Navigation uses explicit buttons.
  const isOpen = selected != null;
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const item = selected != null ? LAB_ITEMS[selected] : null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (item && !dialog.open) dialog.showModal();
    if (!item && dialog.open) dialog.close();
  }, [item]);

  return (
    <>
      <PageIntro
        title="Lab"
        aside={`${LAB_ITEMS.length} entries`}
        lede={
          <>
            <p>
              Interaction studies and prototypes, built to answer the questions
              a static frame can&apos;t.
            </p>
            <p>Some shipped, some didn&apos;t. One of them runs right here.</p>
          </>
        }
      />

      <LabGrid items={LAB_ITEMS} onOpen={open} />

      <dialog
        ref={dialogRef}
        aria-label={item ? `${item.title} lab detail` : "Lab detail"}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        className="m-0 h-dvh max-h-none w-full max-w-none border-0 bg-transparent p-0 backdrop:bg-black/45"
      >
        {item && (
          <div className="grid h-full place-items-center">
            <div className={isMobile ? "h-full w-full" : "lab-modal-enter"}>
              <LabModal
                item={item}
                index={selected!}
                total={total}
                isMobile={isMobile}
                direction={direction}
                onPrevious={() => cycle("prev")}
                onNext={() => cycle("next")}
                onClose={close}
              />
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
