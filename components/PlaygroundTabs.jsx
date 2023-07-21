import {
    Tabs,
    TabList,
    Tab,
    TabPanel,
    Collection
  } from "react-aria-components";
  import { useTransform } from "framer-motion";
  import { motion, animate, useScroll } from "framer-motion";
  import { useCallback, useEffect, useRef, useState } from "react";
import "../styles/globals.css"
import ProjectGrid from "./ProjectGrid";
  
  let tabs = [
    { id: "world", label: "Music", content: <ProjectGrid /> },
    { id: "ny", label: "Posters", content: <ProjectGrid /> },
    { id: "business", label: "Photography", content: <ProjectGrid /> },
    { id: "arts", label: "Artworks", content: <ProjectGrid /> },
    { id: "science", label: "Videography", content: <ProjectGrid /> },
  ];
  
  export default function PlaygroundTabs() {
    let [selectedKey, setSelectedKey] = useState(tabs[0].id);
  
    let tabListRef = useRef();
    let tabPanelsRef = useRef();
  
    // Track the scroll position of the tab panel container.
    let { scrollXProgress } = useScroll({
      container: tabPanelsRef
    });
  
    // Find all the tab elements so we can use their dimensions.
    let [tabElements, setTabElements] = useState([]);
    useEffect(() => {
      if (tabElements.length === 0) {
        let tabs = tabListRef.current.querySelectorAll("[role=tab]");
        setTabElements(tabs);
      }
    }, [tabElements]);
  
    // This function determines which tab should be selected
    // based on the scroll position.
    let getIndex = useCallback(
      (x) => Math.max(0, Math.floor((tabElements.length - 1) * x)),
      [tabElements]
    );
  
    // This function transforms the scroll position into the X position
    // or width of the selected tab indicator.
    let transform = (x, property) => {
      if (!tabElements.length) return 0;
  
      // Find the tab index for the scroll X position.
      let index = getIndex(x);
  
      // Get the difference between this tab and the next one.
      let difference =
        index < tabElements.length - 1
          ? tabElements[index + 1][property] - tabElements[index][property]
          : tabElements[index].offsetWidth;
  
      // Get the percentage between tabs.
      // This is the difference between the integer index and fractional one.
      let percent = (tabElements.length - 1) * x - index;
  
      // Linearly interpolate to calculate the position of the selection indicator.
      let value = tabElements[index][property] + difference * percent;
  
      // iOS scrolls weird when translateX is 0 for some reason. 🤷‍♂️
      return value || 0.1;
    };
  
    let x = useTransform(scrollXProgress, (x) => transform(x, "offsetLeft"));
    let width = useTransform(scrollXProgress, (x) => transform(x, "offsetWidth"));
  
    // When the user scrolls, update the selected key
    // so that the correct tab panel becomes interactive.
    useEffect(() => {
      scrollXProgress.on("change", (x) => {
        if (animationRef.current || !tabElements.length) return;
        setSelectedKey(tabs[getIndex(x)].id);
      });
    }, [scrollXProgress, getIndex, tabElements]);
  
    // When the user clicks on a tab perform an animation of
    // the scroll position to the newly selected tab panel.
    let animationRef = useRef();
    let onSelectionChange = (selectedKey) => {
      setSelectedKey(selectedKey);
  
      // If the scroll position is already moving but we aren't animating
      // then the key changed as a result of a user scrolling. Ignore.
      if (scrollXProgress.getVelocity() && !animationRef.current) {
        return;
      }
  
      let tabPanel = tabPanelsRef.current;
      let index = tabs.findIndex((tab) => tab.id === selectedKey);
      if (animationRef.current) {
        animationRef.current.stop();
      }
      animationRef.current = animate(
        tabPanel.scrollLeft,
        tabPanel.scrollWidth * (index / tabs.length),
        {
          type: "spring",
          bounce: 0.2,
          duration: 0.6,
          onUpdate: (v) => {
            tabPanel.scrollLeft = v;
          },
          onPlay: () => {
            // Disable scroll snap while the animation is going or weird things happen.
            tabPanel.style.scrollSnapType = "none";
          },
          onComplete: () => {
            tabPanel.style.scrollSnapType = "";
            animationRef.current = null;
          }
        }
      );
    };
  
    return (
      <Tabs
        className="w-full mx-auto my-12"
        selectedKey={selectedKey}
        onSelectionChange={onSelectionChange}
      >
        <div className="relative  bg-neutral-100 dark:bg-neutral-950 px-2 rounded-md">
          <TabList ref={tabListRef} className="flex space-x-1" items={tabs}>
            {(tab) =>
              // prettier-ignore
              <Tab className={({ isSelected }) =>`${isSelected ? "" : "cursor-pointer  data-[hovered]:text-neutral-900/70 dark:data-[hovered]:text-neutral-100/70 data-[pressed]:text-neutral-900/60"} cursor-default px-3 py-1.5 text-md sm:text-sm text-neutral-900 dark:text-neutral-100 transition outline-none touch-none`}>
                {({ isSelected, isFocusVisible }) => <>
                  {tab.label}
                  {isFocusVisible && isSelected && (
                    // Focus ring.
                    <motion.span
                      className="absolute inset-0 z-10 rounded-full ring-2 ring-neutral-900 dark:ring-neutral-100 ring-offset-2"
                      style={{ x, width }}
                    />
                  )}
                </>}
              </Tab>
            }
          </TabList>
          {/* Selection indicator. */}
          <motion.span
          className="absolute inset-0 z-10 bg-white/10 rounded-md mix-blend-difference"
          style={{ x, width }}
          />
        </div>
        <div
          ref={tabPanelsRef}
          className="my-4 text-neutral-900 dark:text-neutral-100  font-light text-base overflow-auto snap-x snap-mandatory no-scrollbar flex"
        >
          <Collection items={tabs}>
            {(tab) => (
              <TabPanel
                shouldForceMount
                className="flex-shrink-0 w-full px-2 snap-start outline-none -outline-offset-2 rounded data-[focus-visible]:outline-neutral-900"
              >
                <h2 className="mb-2 font-bold">{tab.label} contents...</h2>
                {/* prettier-ignore */}
                
              <p className="text-blue-500">{tab.content}</p>
              </TabPanel>
            )}
          </Collection>
        </div>
      </Tabs>
    );
  }
  