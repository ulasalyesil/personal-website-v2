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

  let highlightStyles = { opacity: 0, scale: 0.95 };
  if (tabBox && wrapBox) {
    highlightStyles = {
      transitionDuration: cameFromNull ? "0ms" : "200ms",
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      opacity: highlighted ? 1 : 0,
      width: `${tabBox.width}px`,
      transform: `translateX(${tabBox.left - wrapBox.left}px) scale(${highlighted ? 1 : 0.95})`,
    };
  }

  return (
    <nav
      ref={wrapperRef}
      onMouseLeave={resetHighlight}
      className="relative inline-flex gap-1 p-1 rounded-full bg-neutral-100 dark:bg-neutral-800/50"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Animated highlight pill */}
      <div
        className="absolute top-1 h-[calc(100%-8px)] rounded-full bg-white dark:bg-neutral-700 shadow-sm z-0 transition-[width,transform,opacity] pointer-events-none"
        style={highlightStyles}
      />

      {tabsData.map((tab) => {
        if (tab.hideOnMobile && isMobile) return null;
        const isSelected = highlighted?.value === tab.value;
        
        return (
          <Link
            key={tab.value}
            href={tab.value}
            passHref
            legacyBehavior
          >
            <a
              onMouseOver={(e) => repositionHighlight(e, tab)}
              aria-current={isSelected ? "page" : undefined}
              className={`
                relative z-10 inline-block px-4 py-2 text-sm font-medium rounded-full no-underline transition-colors duration-200 cursor-pointer
                ${isSelected 
                  ? 'text-neutral-900 dark:text-neutral-100' 
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'}
              `}
            >
              {tab.title}
            </a>
          </Link>
        );
      })}
    </nav>
  );
}

