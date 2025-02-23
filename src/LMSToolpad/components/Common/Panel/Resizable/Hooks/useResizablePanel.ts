/** @format */

/**
 * useResizablePanel:
 * Manages panel dimensions with snapping, storing/restoring from localStorage,
 * and applying mouse/touch event listeners for resize interactions.
 */
import { useState, useRef, useEffect } from "react";
import { snapToGrid } from "./useResizeHandlers";
import { loadDimensions, saveDimensions } from "./usePersistentDimensions";
import { PanelDimensions } from "../Context/ResizeContext";

interface UseResizablePanelOptions {
  id: string;
  defaultWidth: number;
  defaultHeight: number;
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  snapDimensions: PanelDimensions;
  onResize?: (dimensions: PanelDimensions) => void;
}

export type handleDimensionsChangeType = (
  dimensions: PanelDimensions,
  isTemporary: boolean
) => void;

export function useResizablePanel({
  id,
  defaultWidth,
  defaultHeight,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  snapDimensions,
  onResize,
}: UseResizablePanelOptions) {
  const [dimensions, setDimensions] = useState(() =>
    loadDimensions(id, { width: defaultWidth, height: defaultHeight })
  );
  const [isDragging, setIsDragging] = useState({
    vertical: false,
    horizontal: false,
  });
  const [wasTemporary, setWasTemporary] = useState<boolean>(false);
  const dragStart = useRef({ x: 0, y: 0, width: 0, height: 0 });

  const handleDimensionsChange: handleDimensionsChangeType = (
    newDimensions,
    isTemporary = false
  ) => {
    // console.log("handleDimensionsChange", newDimensions);
    if (!isTemporary) {
      saveDimensions(id, newDimensions);
    }
    if (isTemporary !== wasTemporary) {
      setWasTemporary(isTemporary);
    }
    setDimensions(newDimensions);
    onResize?.(newDimensions);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.vertical && !isDragging.horizontal) return;
      const newDimensions = {
        width: dimensions.width,
        height: dimensions.height,
      };
      if (isDragging.horizontal) {
        const deltaX = e.clientX - dragStart.current.x;
        const newWidth = dragStart.current.width + deltaX;
        newDimensions.width = Math.min(
          Math.max(
            snapToGrid(newWidth, snapDimensions.width),
            snapToGrid(minWidth, snapDimensions.width)
          ),
          snapToGrid(maxWidth, snapDimensions.width)
        );
      }
      if (isDragging.vertical) {
        const deltaY = e.clientY - dragStart.current.y;
        const newHeight = dragStart.current.height + deltaY;
        newDimensions.height = Math.min(
          Math.max(
            snapToGrid(newHeight, snapDimensions.height),
            snapToGrid(minHeight, snapDimensions.height)
          ),
          snapToGrid(maxHeight, snapDimensions.height)
        );
      }
      if (
        newDimensions.width !== dimensions.width ||
        newDimensions.height !== dimensions.height
      ) {
        handleDimensionsChange(newDimensions, wasTemporary);
      }
    };

    const handleMouseUp = () =>
      setIsDragging({ vertical: false, horizontal: false });

    if (isDragging.vertical || isDragging.horizontal) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isDragging,
    dimensions,
    snapDimensions,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    wasTemporary,
  ]);

  useEffect(() => {
    if (!isDragging.vertical && !isDragging.horizontal) return;
    const handleTouchMove = (e: TouchEvent) => {
      // ...existing code...
      const touch = e.touches[0];
      const newDimensions = {
        width: dimensions.width,
        height: dimensions.height,
      };
      // ...existing code...
      if (isDragging.horizontal) {
        // ...existing code...
        const deltaX = touch.clientX - dragStart.current.x;
        const newWidth = dragStart.current.width + deltaX;
        // ...existing code...
        newDimensions.width = Math.min(
          Math.max(
            snapToGrid(newWidth, snapDimensions.width),
            snapToGrid(minWidth, snapDimensions.width)
          ),
          snapToGrid(maxWidth, snapDimensions.width)
        );
      }
      if (isDragging.vertical) {
        // ...existing code...
        const deltaY = touch.clientY - dragStart.current.y;
        const newHeight = dragStart.current.height + deltaY;
        // ...existing code...
        newDimensions.height = Math.min(
          Math.max(
            snapToGrid(newHeight, snapDimensions.height),
            snapToGrid(minHeight, snapDimensions.height)
          ),
          snapToGrid(maxHeight, snapDimensions.height)
        );
      }
      handleDimensionsChange(newDimensions, false);
    };
    const handleTouchEnd = () =>
      setIsDragging({ vertical: false, horizontal: false });

    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [
    isDragging,
    dimensions,
    snapDimensions,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
  ]);

  useEffect(() => {
    // ...existing code...
    if (isDragging.vertical || isDragging.horizontal) {
      document.body.style.overflow = "hidden";
      document.body.style.userSelect = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.userSelect = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  return {
    dimensions,
    isDragging,
    setIsDragging,
    dragStart,
    handleDimensionsChange,
  };
}
