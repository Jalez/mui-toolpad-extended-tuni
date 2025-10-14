/** @format */

import { usePanelStore } from "../../GridLayout/store/usePanelStore";
import { startDragging } from "./Hooks/useResizeHandlers";
import { useDimensionManagement } from "../Main/hooks/useDimensionManagement";
import BlurOverlay from "../Main/tools/BlurOverlay";
import ResizeIndicator from "./ResizeIndicator";
import ResizeHandlers from "./ResizeHandlers";
import { usePanelContext } from "../Main/Context/PanelContextProvider";
import { useResizableContext } from "./Context/ResizableContextProvider";
import { useResponsiveResize } from "./Hooks/useResponsiveResize";

const Resizable = () => {
  const { resizeMode } = usePanelStore();
  const {
    id,
    dimensions,
    handleDimensionsChange,
    minWidth,
    minHeight,
    panelRef,
    panelContentRef,
  } = usePanelContext();
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

  useResponsiveResize({
    panelRef,
    panelContentRef,
    dimensions,
    minWidth,
    minHeight,
    isUserResizingRef,
    userChosenDimensionsRef,
    wrappedHandleDimensionsChange,
  });

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
