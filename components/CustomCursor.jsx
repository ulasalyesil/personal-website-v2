"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [isHover, setIsHover] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    // Direct DOM manipulation for smooth cursor following
    const onMove = (e) => {
      if (cursorRef.current) {
        // Use requestAnimationFrame for smoother movement
        requestAnimationFrame(() => {
          if (cursorRef.current) {
            cursorRef.current.style.left = `${e.clientX}px`;
            cursorRef.current.style.top = `${e.clientY}px`;
          }
        });
      }
    };

    // Use event delegation for hover detection
    const onMouseOver = (e) => {
      if (e.target.closest("a, button, .hover-target")) {
        setIsHover(true);
      } else {
        setIsHover(false);
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
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
        // Center the cursor and handle scaling
        transform: `translate(-50%, -50%) scale(${isHover ? 2 : 1})`,
        // Only transition the scale, not position
        transition: "transform 0.15s ease-out",
        // Ensure proper blending context
        isolation: "isolate",
        // Hardware acceleration
        willChange: "transform",
      }}
    />
  );
}
