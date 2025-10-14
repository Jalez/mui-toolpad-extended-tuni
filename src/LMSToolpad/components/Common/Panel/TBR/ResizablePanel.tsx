/** @format */

import { Box, useTheme } from "@mui/material";
import { useRef, useEffect, useState } from "react";
import { usePanelStore } from "../../GridLayout/store/usePanelStore";
import { startDragging } from "../Resizable/Hooks/useResizeHandlers";
import { useResizablePanel } from "./useResizablePanel";
import { useExpandablePanelStore } from "../Expandable/store/useExpandablePanelStore";
import { useDimensionManagement } from "../Main/hooks/useDimensionManagement";
import { ExpandableContextProvider, useExpandableContext } from "../Expandable/context/ExpandableContextProvider";
import {
  PanelProps,
  PanelProvider,
  usePanelContext,
} from "../Main/Context/PanelContextProvider";
import { useScrollContext } from "../Scrollable/context/ScrollerContextProvider";
import PanelContent from "./PanelContent";

interface ResizablePanelProps {
  children:
    | React.ReactNode
    | ((dimensions: { width: number; height: number }) => React.ReactNode);
}

const ResizablePanelContent = ({ children }: ResizablePanelProps) => {
  const {
    id,
    tools,
    minHeight = 200,
    maxHeight = 800,
    minWidth = 300,
    maxWidth = 1200,
    defaultHeight = 200,
    defaultWidth = 900,
    expandable = false,
    dimensions: snapDimensions,
  } = usePanelContext();
  const { setItemCounts } = useScrollContext();
  const panelRef = useRef<HTMLDivElement>(null);
  const { resizeMode } = usePanelStore();
  const theme = useTheme();

  const {
    dimensions,
    isDragging,
    setIsDragging,
    dragStart,
    handleDimensionsChange,
  } = useResizablePanel({
    id,
    defaultWidth,
    defaultHeight,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    snapDimensions,
  });

  const {
    isUserResizingRef,
    wrappedHandleDimensionsChange,
    userChosenDimensionsRef,
  } = useDimensionManagement({
    id,
    dimensions,
    handleDimensionsChange,
  });

  // Handle responsive resizing
  useEffect(() => {
    if (!panelRef.current) return;

    console.log("panelRef.current.offsetTop", panelRef.current.offsetTop);
    console.log("panelRef.current.offsetLeft", panelRef.current.offsetLeft);
    const updateDimensions = () => {
      const panel = panelRef.current;
      if (!panel) return;

      const rect = panel.getBoundingClientRect();
      const offsetLeft = rect.left;
      const documentWidth = document.documentElement.clientWidth;
      const marginRight = 16;
      const availableSpace = documentWidth - offsetLeft - marginRight;

      const maxPossibleItems = Math.floor(
        (availableSpace - 25) / snapDimensions.width
      );
      const maxPossibleWidth = maxPossibleItems * snapDimensions.width;
      const currentItems = Math.floor(dimensions.width / snapDimensions.width);
      const desiredItems = Math.floor(
        userChosenDimensionsRef.current.width / snapDimensions.width
      );

      if (dimensions.width + 25 > availableSpace) {
        const newItems = Math.min(currentItems - 1, maxPossibleItems);
        const newWidth = Math.max(newItems * snapDimensions.width, minWidth);

        if (newWidth < dimensions.width) {
          wrappedHandleDimensionsChange({
            width: newWidth,
            height: dimensions.height,
          });
        }
      } else if (
        !isUserResizingRef.current &&
        userChosenDimensionsRef.current.width > dimensions.width
      ) {
        const nextItems = Math.min(
          currentItems + 1,
          desiredItems,
          maxPossibleItems
        );
        const nextWidth = nextItems * snapDimensions.width;

        if (nextWidth > dimensions.width && nextWidth <= maxPossibleWidth) {
          wrappedHandleDimensionsChange({
            width: nextWidth,
            height: dimensions.height,
          });
        }
      }
    };

    const observer = new ResizeObserver(updateDimensions);
    if (panelRef.current.offsetParent) {
      observer.observe(panelRef.current.offsetParent);
    }

    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    return () => {
      window.removeEventListener("resize", updateDimensions);
      observer.disconnect();
    };
  }, [
    dimensions,
    snapDimensions.width,
    minWidth,
    wrappedHandleDimensionsChange,
    isUserResizingRef,
    userChosenDimensionsRef,
  ]);

  // Update item counts
  useEffect(() => {
    if (!panelRef.current) return;

    const actualWidth = panelRef.current.offsetWidth;
    const horizontalItemsVisible = Math.max(
      1,
      Math.floor(actualWidth / snapDimensions.width)
    );
    const verticalItemsVisible = Math.floor(
      dimensions.height / snapDimensions.height
    );

    setItemCounts({
      horizontal: horizontalItemsVisible,
      vertical: verticalItemsVisible,
    });
  }, [dimensions, snapDimensions, setItemCounts]);

  const { isExpanded, setIsExpanded } = useExpandableContext();
  const { expandedPanelId, setExpandedPanelId } = useExpandablePanelStore();

  const toggleExpand = () => {
    if (isExpanded) {
      setIsExpanded(false);
      setExpandedPanelId(null);
    } else {
      setIsExpanded(true);
      setExpandedPanelId(id);
    }
  };

  const handleMouseDown = (direction: "vertical" | "horizontal" | "corner") => {
    isUserResizingRef.current = true;
    return startDragging(
      direction,
      resizeMode,
      dimensions,
      setIsDragging,
      dragStart,
      { x: 10, y: 10 } // default leap values
    );
  };

  const handleTouchStart = (direction: "vertical" | "horizontal" | "corner") =>
    startDragging(direction, resizeMode, dimensions, setIsDragging, dragStart, {
      x: 10,
      y: 10,
    });
  const [expandedStyle, setExpandedStyle] = useState<React.CSSProperties>({});
  const [animateExpansion, setAnimateExpansion] = useState(false);

  // When isExpanded toggles, first capture the current bounds.
  useEffect(() => {
    if (isExpanded && panelRef.current) {
      const parent = panelRef.current.offsetParent as HTMLElement;
      if (parent) {
        // On next render (using a short timeout), trigger the animation.
        setTimeout(() => {
          setAnimateExpansion(true);
        }, 500);
      }
    } else {
      setAnimateExpansion(false);
      setExpandedStyle({});
    }
  }, [isExpanded]);

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
        setExpandedStyle({
          position: "absolute",
          top: 0,
          left: 0,
          width: visibleWidth,
          height: visibleHeight,
          transition: "all 0.3s ease-in-out",
        });
      }
    }
  }, [animateExpansion]);

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
      setExpandedStyle({
        position: "absolute",
        top: 0,
        left: 0,
        width: visibleWidth,
        height: visibleHeight,
        transition: "all 0.3s ease-in-out",
      });

      wrappedHandleDimensionsChange({
        width: visibleWidth,
        height: visibleHeight,
      });
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

  const handleToggleExpand = () => {
    //Save the location of the panel
    if (panelRef.current) {
      setExpandedStyle({
        position: "absolute",
        top: panelRef.current.offsetTop,
        left: panelRef.current.offsetLeft,
        height: panelRef.current.offsetHeight,
        width: panelRef.current.offsetWidth,
        transition: "all 0.3s ease-in-out",
      });
    }
    toggleExpand();
  };

  return (
    <Box
      ref={panelRef}
      sx={{
        // m: (isExpanded && 0) || 1,

        boxSizing: "border-box",
        maxWidth: "100%",
        // height: dimensions.height,
        height:
          expandedPanelId && expandedPanelId !== id ? 0 : dimensions.height,
        backgroundColor: theme.palette.background.default,
        borderRadius: 1,
        outline: resizeMode
          ? `0.1em dashed ${theme.palette.primary.main}`
          : "none",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition:
          isDragging.horizontal || isDragging.vertical
            ? 0
            : "all 0.3s ease-in-out",
        willChange: "width, height, margin, position",
        // If expanded, merge our computed inline styles.
        ...(isExpanded ? expandedStyle : { position: "relative" }),
        ...(isExpanded && { zIndex: 10 }),
      }}
    >
      <PanelContent
        children={children}
        dimensions={dimensions}
        isDragging={isDragging}
        isExpanded={isExpanded}
        expandable={expandable}
        tools={tools}
        resizeMode={resizeMode}
        handleMouseDown={handleMouseDown}
        handleTouchStart={handleTouchStart}
        toggleExpand={handleToggleExpand}
      />
    </Box>
  );
};

const ResizablePanel = (props: PanelProps) => {
  return (
    <PanelProvider {...props}>
      <ExpandableContextProvider>
        <ResizablePanelContent {...props} />
      </ExpandableContextProvider>
    </PanelProvider>
  );
};

export default ResizablePanel;
