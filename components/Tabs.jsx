// components/Tabs.jsx
"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import styled from "styled-components";

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
    <Nav ref={wrapperRef} onMouseLeave={resetHighlight}>
      <Highlight style={highlightStyles} />

      {tabsData.map((tab) => {
        if (tab.hideOnMobile && isMobile) return null;
        return (
          <Link
            key={tab.value}
            href={tab.value}
            passHref
          >
            <Tab
              onMouseOver={(e) => repositionHighlight(e, tab)}
              isSelected={highlighted?.value === tab.value}
            >
              {tab.title}
            </Tab>
          </Link>
        );
      })}
    </Nav>
  );
}

const Nav = styled.nav`
  position: relative;
  display: inline-flex;
  gap: 1rem;
`;

const Tab = styled.a`
  position: relative;
  z-index: 1;              /* sit above the highlight */
  display: inline-block;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: hsl(0 0% 43.5%);
  text-decoration: none;
  transition: color 250ms;
  cursor: pointer;

  ${(p) =>
    p.isSelected &&
    `
    color: #1d1d1d;
  `}

  &:hover {
    color: #1d1d1d;
  }
`;

const Highlight = styled.div`
  position: absolute;
  top: 0.5rem;
  height: 2rem;
  border-radius: 999px;
  background-color: #ff5701;
  z-index: 0;              /* sit behind the tabs */
  transition: width 150ms ease, transform 150ms ease, opacity 150ms ease;
`;
