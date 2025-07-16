"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    // update position
    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    // hover handlers
    const onEnter = () => setIsHover(true);
    const onLeave = () => setIsHover(false);

    window.addEventListener("mousemove", onMove);

    // attach to links, buttons, or anything with .hover-target
    const els = document.querySelectorAll("a, button, .hover-target");
    els.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      els.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
        width: 24,
        height: 24,
        borderRadius: "50%",
        backgroundColor: "#FF5703",
        mixBlendMode: "difference",
        transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%) scale(${
          isHover ? 2 : 1
        })`,
        transition: "transform 0.15s ease-out",
        isolation: "isolate",
      }}
    />
  );
}
