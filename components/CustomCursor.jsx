"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const addHoverListeners = () => {
      const hoverTargets = document.querySelectorAll(
        "a, button, .hover-target"
      );

      hoverTargets.forEach((el) => {
        el.addEventListener("mouseenter", () => setHovering(true));
        el.addEventListener("mouseleave", () => setHovering(false));
      });
    };

    // Initial setup
    document.addEventListener("mousemove", updatePosition);
    addHoverListeners();

    // Optional: Track DOM changes to update hover targets dynamically
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 z-[9999] pointer-events-none transition-transform duration-150 ease-out ${
        hovering ? "scale-[2]" : "scale-100"
      }`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
      }}
    >
      <div className="w-4 h-4 rounded-full bg-orange-500 mix-blend-difference" />
    </div>
  );
}
