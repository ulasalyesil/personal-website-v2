'use client'
import React from "react";
import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";

const tabsData = [
  {
    title: "Home",
    value: "/"
  },
  {
    title: "About",
    value: "/about",
    hideOnMobile: true
  },
  {
    title: "Works",
    value: "/works",
  },
  {
    title: "Bookmarks",
    value: "/bookmarks",
    hideOnMobile: true
  }
];

const Tabs = () => {
  const [tabBoundingBox, setTabBoundingBox] = React.useState(null);
  const [wrapperBoundingBox, setWrapperBoundingBox] = React.useState(null);
  const [highlightedTab, setHighlightedTab] = React.useState(null);
  const [isHoveredFromNull, setIsHoveredFromNull] = React.useState(true);

  const highlightRef = React.useRef(null);
  const wrapperRef = React.useRef(null);

  const repositionHighlight = (e, tab) => {
    setTabBoundingBox(e.target.getBoundingClientRect());
    setWrapperBoundingBox(wrapperRef.current.getBoundingClientRect());
    setIsHoveredFromNull(!highlightedTab);
    setHighlightedTab(tab);
  };

  const resetHighlight = () => setHighlightedTab(null);

  const highlightStyles = {};

  if (tabBoundingBox && wrapperBoundingBox) {
    highlightStyles.transitionDuration = isHoveredFromNull ? "0ms" : "150ms";
    highlightStyles.opacity = highlightedTab ? 1 : 0;
    highlightStyles.width = `${tabBoundingBox.width}px`;
    highlightStyles.transform = `translate(${
      tabBoundingBox.left - wrapperBoundingBox.left
    }px)`;
  }

  return (
    <TabsNav ref={wrapperRef} onMouseLeave={resetHighlight}>
      <TabsHighlight ref={highlightRef} style={highlightStyles} className="bg-neutral-200 dark:bg-neutral-800" />
      {tabsData.map((tab) => (
        <Link href={tab.value} key={tab.value}>
        <Tab onMouseOver={(ev) => repositionHighlight(ev, tab)}>
          {tab.title}
        </Tab>
        </Link>
      ))}
    </TabsNav>
  );
};

const TabsNav = styled.div`
  position: relative;
`;

const Tab = styled.a`
  padding: 16px 16px;
  font-size: ${14 / 16}rem;
  color: hsl(0 0% 43.5%);
  display: inline-block;
  position: relative;
  cursor: pointer;
  transition: color 250ms;

  &:hover {
    color: #017bfc;
  }
`;

const TabsHighlight = styled.div`
  position: absolute;
  top: 12px;
  left: 0;
  border-radius: 6px;
  height: 2rem;
  transition: 0.15s ease-in-out;
  transition-property: width, transform, opacity;
`;

export default Tabs;
