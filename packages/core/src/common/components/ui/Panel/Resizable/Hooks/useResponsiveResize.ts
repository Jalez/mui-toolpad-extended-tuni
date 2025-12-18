import { useEffect } from "react";
import { PanelRef } from "../../types";
import { PanelDimensions } from "../../Main/Context/PanelContextProvider";
import { useResizableContext } from "../Context/ResizableContextProvider";
import { useMovableContext } from "../../Movable/context/MovableContextProvider";

interface UseResponsiveResizeProps {
  panelRef: PanelRef;
  panelContentRef: PanelRef;
  dimensions: PanelDimensions;
  minWidth: number;
  minHeight: number;
  isUserResizingRef: React.MutableRefObject<boolean>;
  userChosenDimensionsRef: React.MutableRefObject<PanelDimensions>;
  wrappedHandleDimensionsChange: (newDimensions: PanelDimensions) => void;
}

export const useResponsiveResize = (props: UseResponsiveResizeProps) => {
  const { parentRef } = useMovableContext();
  const { leap } = useResizableContext();
  const {
    panelRef,
    panelContentRef,
    dimensions,
    minWidth,
    minHeight,
    isUserResizingRef,
    userChosenDimensionsRef,
    wrappedHandleDimensionsChange,
  } = props;

  // Simplified calculation: always grow (if not user resizing) toward the target,
  // where target is the lower of the user–chosen size and the maximum available (rounded via leap).
  const calculateNewDimension = (
    current: number,
    min: number,
    userChosen: number,
    available: number,
    leapVal: number
  ) => {
    if (current < min) return min;
    const maxSize = Math.max(Math.floor(available / leapVal) * leapVal, min);
    if (current > maxSize) return maxSize;

    // When not resizing, set target as the lower of userChosen and maxSize.
    const target = !isUserResizingRef.current
      ? Math.min(userChosen, maxSize)
      : current;
    if (current < target) {
      return Math.min(current + leapVal, target);
    }
    return current;
  };

  useEffect(() => {
    if (!panelRef.current || !parentRef.current) return;

    const updateDimensions = () => {
      const panel = panelContentRef.current;
      const parent = parentRef.current;
      if (!panel || !parent) return;

      const parentRect = parent.getBoundingClientRect();
      const panelRect = panel.getBoundingClientRect();

      const margin = 1;
      const availableWidth =
        parentRect.width - (panelRect.left - parentRect.left) - margin;
      const availableHeight =
        parentRect.height - (panelRect.top - parentRect.top) - margin;

      const newWidth = calculateNewDimension(
        dimensions.width,
        minWidth,
        userChosenDimensionsRef.current.width,
        availableWidth,
        leap.x
      );

      const newHeight = calculateNewDimension(
        dimensions.height,
        minHeight,
        userChosenDimensionsRef.current.height,
        availableHeight,
        leap.y
      );

      if (newWidth !== dimensions.width || newHeight !== dimensions.height) {
        wrappedHandleDimensionsChange({ width: newWidth, height: newHeight });
      }
    };

    // Use ResizeObserver to trigger update on any change to panel or parent size.
    const observer = new ResizeObserver(() => {
      requestAnimationFrame(updateDimensions);
    });

    observer.observe(panelRef.current);
    observer.observe(parentRef.current);

    // Initial update.
    updateDimensions();

    return () => {
      observer.disconnect();
    };
  }, [
    dimensions.width,
    dimensions.height,
    minWidth,
    minHeight,
    wrappedHandleDimensionsChange,
    isUserResizingRef,
    userChosenDimensionsRef,
    panelContentRef,
    panelRef,
    parentRef,
    leap,
  ]);
};
