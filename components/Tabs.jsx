"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";

const tabsData = [
  { title: "Home",      value: "/"        },
  { title: "About",     value: "/about"   },
  { title: "Works",     value: "/works"   },
  { title: "Bookmarks", value: "/bookmarks", hideOnMobile: true },
];

export default function Tabs() {
  const [tabBox, setTabBox] = useState(null);
  const [wrapBox, setWrapBox] = useState(null);
  const [highlighted, setHighlighted] = useState(null);
  const [cameFromNull, setCameFromNull] = useState(true);
  const wrapperRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const repositionHighlight = (e, tab) => {
    setTabBox(e.target.getBoundingClientRect());
    setWrapBox(wrapperRef.current.getBoundingClientRect());
    setCameFromNull(!highlighted);
    setHighlighted(tab);
  };
  const resetHighlight = () => setHighlighted(null);

  let highlightStyles = { opacity: 0 };
  if (tabBox && wrapBox) {
    highlightStyles = {
      transitionDuration: cameFromNull ? "0ms" : "150ms",
      opacity: highlighted ? 1 : 0,
      width: `${tabBox.width}px`,
      transform: `translateX(${tabBox.left - wrapBox.left}px)`,
    };
  }

  return (
    <nav
      ref={wrapperRef}
      onMouseLeave={resetHighlight}
      className="relative inline-flex gap-4"
      role="navigation"
      aria-label="Main navigation"
    >
      <div
        className="absolute top-2 h-8 rounded-full bg-brand z-0 transition-[width,transform,opacity] ease-out"
        style={highlightStyles}
      />

      {tabsData.map((tab) => {
        if (tab.hideOnMobile && isMobile) return null;
        const isSelected = highlighted?.value === tab.value;
        
        return (
          <Link
            key={tab.value}
            href={tab.value}
            onMouseOver={(e) => repositionHighlight(e, tab)}
            aria-current={isSelected ? "page" : undefined}
            className={`
              relative z-10 inline-block px-4 py-3 text-sm no-underline transition-colors duration-250 cursor-pointer
              ${isSelected ? 'text-[#1d1d1d]' : 'text-[hsl(0_0%_43.5%)] hover:text-[#1d1d1d]'}
            `}
          >
            {tab.title}
          </Link>
        );
      })}
    </nav>
  );
}

