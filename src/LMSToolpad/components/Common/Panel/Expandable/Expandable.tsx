/** @format */

import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";

import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { usePanelStore } from "../Main/store/usePanelStore";
import { usePanelContext } from "../Main/Context/PanelContextProvider";
import { useExpandablePanelStore } from "./store/useExpandablePanelStore";
import { useExpandableContext } from "./context/ExpandableContextProvider";

const Expandable = () => {
  const { expandedPanelId } = useExpandablePanelStore();

  const { setExtendedStyle, panelRef, addTool, handleDimensionsChange, id } =
    usePanelContext();
  const { isExpanded, setIsExpanded } = useExpandableContext();

  const [readyForExpansion, setReadyForExpansion] = useState(false);
  const [animateExpansion, setAnimateExpansion] = useState(false);

  const [initialPosition, setInitialPosition] = useState({
    top: 0,
    left: 0,
  });
  const [initialDimensions, setInitialDimensions] = useState({
    width: 0,
    height: 0,
  });

  // Add tool only once on mount
  useEffect(() => {
    const toolInstance = <ExpandTool />;
    addTool(toolInstance);
  }, []); // Empty dependency array ensures this runs once

  // EXPANSION STEP 1: When expandedPanelId changes, set the initial position and dimensions of the panel.
  useEffect(() => {
    const currentTop = panelRef.current?.offsetTop || 0;
    const currentLeft = panelRef.current?.offsetLeft || 0;
    const currentHeight = panelRef.current?.offsetHeight || 0;
    const currentWidth = panelRef.current?.offsetWidth || 0;
    if (expandedPanelId) {
      requestAnimationFrame(() => {
        console.log("PREPARING FOR EXPANSION", id);
        setExtendedStyle({
          position: "absolute",
          top: currentTop,
          left: currentLeft,
          height: expandedPanelId === id ? currentHeight : 0,
          width: expandedPanelId === id ? currentWidth : 0,
          transition: "all 0.3s ease-in-out",
        });
        setInitialPosition({
          top: currentTop,
          left: currentLeft,
        });
        setInitialDimensions({
          width: currentWidth,
          height: currentHeight,
        });
        if (expandedPanelId === id) setReadyForExpansion(true);
      });
    }
  }, [expandedPanelId, id, panelRef]);

  // EXPANSION STEP 2: After a short delay, trigger the expansion animation.
  useEffect(() => {
    if (readyForExpansion && panelRef.current) {
      const parent = panelRef.current.offsetParent as HTMLElement;
      if (parent) {
        const timeoutId = setTimeout(() => {
          setAnimateExpansion(true);
          setReadyForExpansion(false);
        }, 100);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [readyForExpansion, id, panelRef]);

  // EXPANSION STEP 3: Handle the actual expansion animation.
  // When animateExpansion becomes true, update the style to fill the parent.
  // On the next render, update style to fill parent's visible area (without forcing scroll).
  useEffect(() => {
    if (animateExpansion && panelRef.current) {
      const parent = panelRef.current.offsetParent as HTMLElement;
      if (parent) {
        // Compute parent's bounding rectangle.
        const parentRect = parent.getBoundingClientRect();
        // Compute the maximum visible dimensions.
        const visibleWidth = parent.clientWidth;
        const visibleHeight = Math.min(
          parent.clientHeight,
          window.innerHeight - parentRect.top
        );

        requestAnimationFrame(() => {
          console.log("EXPANDING", id);
          setExtendedStyle({
            position: "absolute",
            top: 0,
            left: 0,
            width: visibleWidth,
            height: visibleHeight,
            transition: "all 0.3s ease-in-out",
          });
          setIsExpanded(true);
          setAnimateExpansion(false);
        });
      }
    }
  }, [animateExpansion, setExtendedStyle]);

  // EXPANSION STEP 4: Handle the collapse of the expanded panel.
  //If it is expanded and the expandedPanelId is null, reset the style to its initial state.
  // If it is not expanded and the expandedPanelId is null, remove the expanded style.
  // This is necessary to ensure that the panel returns to its original position and dimensions.
  useEffect(() => {
    if (isExpanded && expandedPanelId === null && panelRef.current) {
      requestAnimationFrame(() => {
        console.log("SETTING BACK TO NORMAL", id);
        setExtendedStyle({
          position: "absolute",
          top: initialPosition.top,
          left: initialPosition.left,
          height: initialDimensions.height,
          width: initialDimensions.width,
          transition: "all 0.1s ease",
        });
        setIsExpanded(false);
      });
    } else if (!isExpanded && expandedPanelId === null && panelRef.current) {
      requestAnimationFrame(() => {
        console.log("REMOVING EXPANDED STYLE", id);
        setExtendedStyle({});
      });
    }
  }, [expandedPanelId, id, isExpanded, setExtendedStyle]);
  // Also update expanded style on window resize while expanded.
  useEffect(() => {
    if (!isExpanded || !panelRef.current) return;
    const parent = panelRef.current.offsetParent as HTMLElement;
    if (!parent) return;

    // Our original update function:
    const updateExpandedStyle = () => {
      const parentRect = parent.getBoundingClientRect();
      const visibleWidth = parent.clientWidth;
      const visibleHeight = Math.min(
        parent.clientHeight,
        window.innerHeight - parentRect.top
      );
      setExtendedStyle({
        position: "absolute",
        top: 0,
        left: 0,
        width: visibleWidth,
        height: visibleHeight,
        transition: "all 0.3s ease-in-out",
      });
      handleDimensionsChange(
        {
          width: visibleWidth,
          height: visibleHeight,
        },
        true
      );
    };

    // Debounce logic: wait until no resize events for 250ms.
    let resizeTimer: ReturnType<typeof setTimeout>;
    const debouncedUpdate = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateExpandedStyle();
      }, 250);
    };

    window.addEventListener("resize", debouncedUpdate);
    return () => {
      window.removeEventListener("resize", debouncedUpdate);
      clearTimeout(resizeTimer);
    };
  }, [isExpanded]);

  return null;
};

export const ExpandTool = () => {
  const { id, panelRef } = usePanelContext();
  const { isExpanded } = useExpandableContext();
  const { resizeMode } = usePanelStore();
  const { setExpandedPanelId } = useExpandablePanelStore();

  const handleToggleExpand = () => {
    if (!isExpanded) {
      const currentWidth = panelRef.current?.offsetWidth || 0;
      console.log("handleToggleExpand: currentWidth", currentWidth, id);
      setExpandedPanelId(id);
    } else {
      setExpandedPanelId(null);
    }
  };

  return (
    <IconButton disabled={resizeMode} onClick={handleToggleExpand} size="small">
      {isExpanded ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
    </IconButton>
  );
};

export default Expandable;
