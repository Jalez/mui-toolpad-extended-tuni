/** @format */

import { useEffect } from "react";
import { usePanelStore } from "../Main/store/usePanelStore";
import { startDragging } from "./Hooks/useResizeHandlers";
import { useDimensionManagement } from "../Main/hooks/useDimensionManagement";
import BlurOverlay from "../Main/tools/BlurOverlay";
import ResizeIndicator from "./ResizeIndicator";
import ResizeHandlers from "./ResizeHandlers";
import { usePanelContext } from "../Main/Context/PanelContextProvider";
import { useResizableContext } from "./Context/ResizableContextProvider";

const Resizable = () => {
  const { resizeMode } = usePanelStore();
  const { id, dimensions, handleDimensionsChange, minWidth, panelRef } =
    usePanelContext();
  const { dragStart, isDragging, setIsDragging, leap } = useResizableContext();

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

    const updateDimensions = () => {
      console.log("UPDATE DIMENSIONS", id);
      const panel = panelRef.current;
      if (!panel) return;

      const rect = panel.getBoundingClientRect();
      const offsetLeft = rect.left;
      const documentWidth = document.documentElement.clientWidth;
      const marginRight = 16;
      const availableSpace = documentWidth - offsetLeft - marginRight;

      // Calculate the base unit width (minimum width for one item)
      const baseUnitWidth = minWidth;

      const maxPossibleItems = Math.floor(
        (availableSpace - 25) / baseUnitWidth
      );
      const maxPossibleWidth = maxPossibleItems * baseUnitWidth;
      const currentItems = Math.floor(dimensions.width / baseUnitWidth);
      const desiredItems = Math.floor(
        userChosenDimensionsRef.current.width / baseUnitWidth
      );

      if (dimensions.width + 25 > availableSpace) {
        const newItems = Math.min(currentItems - 1, maxPossibleItems);
        const newWidth = Math.max(newItems * baseUnitWidth, minWidth);

        if (newWidth < dimensions.width) {
          wrappedHandleDimensionsChange({
            width: newWidth,
            height: dimensions.height,
          });
        }
      } else if (
        !isUserResizingRef.current &&
        userChosenDimensionsRef.current.width > dimensions.width &&
        dimensions.width + baseUnitWidth <= availableSpace
      ) {
        const nextItems = Math.min(
          currentItems + 1,
          desiredItems,
          maxPossibleItems
        );
        const nextWidth = nextItems * baseUnitWidth;

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
    minWidth,
    wrappedHandleDimensionsChange,
    isUserResizingRef,
    userChosenDimensionsRef,
    panelRef,
  ]);

  const handleMouseDown = (direction: "vertical" | "horizontal" | "corner") => {
    isUserResizingRef.current = true;
    return startDragging(
      direction,
      resizeMode,
      dimensions,
      setIsDragging,
      dragStart,
      leap
    );
  };

  const handleTouchStart = (direction: "vertical" | "horizontal" | "corner") =>
    startDragging(
      direction,
      resizeMode,
      dimensions,
      setIsDragging,
      dragStart,
      leap
    );

  return (
    <>
      {(isDragging.vertical || isDragging.horizontal) && (
        <BlurOverlay>
          <ResizeIndicator dimensions={dimensions} />
        </BlurOverlay>
      )}

      {resizeMode && (
        <ResizeHandlers
          handleMouseDown={handleMouseDown}
          handleTouchStart={handleTouchStart}
        />
      )}
    </>
  );
};

export default Resizable;
