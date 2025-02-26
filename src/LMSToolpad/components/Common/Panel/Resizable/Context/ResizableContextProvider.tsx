import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  RefObject,
} from "react";
import { snapToGrid } from "../Hooks/useResizeHandlers";
import { usePanelContext } from "../../Main/Context/PanelContextProvider";

interface leap {
  x: number;
  y: number;
}

interface DragState {
  vertical: boolean;
  horizontal: boolean;
}

interface DragStartType {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ResizableContextType {
  leap: leap;
  isDragging: DragState;
  dragStart: RefObject<DragStartType>;
  setIsDragging: Dispatch<SetStateAction<DragState>>;
}

interface ResizableContextProviderProps {
  children: ReactNode;
}

const ResizableContext = createContext<ResizableContextType | undefined>(
  undefined
);

export const ResizableContextProvider = ({
  children,
}: ResizableContextProviderProps) => {
  const {
    id,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    dimensions,
    dimensionsWereTemporary,
    handleDimensionsChange,
  } = usePanelContext();

  const [isDragging, setIsDragging] = useState<DragState>({
    vertical: false,
    horizontal: false,
  });
  const dragStart = useRef<DragStartType>({
    x: 0,
    y: 0,
    width: dimensions.width,
    height: dimensions.height,
  });

  const leap = { x: minWidth, y: minHeight };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.vertical && !isDragging.horizontal) return;
      const newDimensions = { ...dimensions };
      if (isDragging.horizontal) {
        const deltaX = e.clientX - dragStart.current.x;
        const newWidth = dragStart.current.width + deltaX;
        const snappedWidth = snapToGrid(newWidth, leap.x);
        newDimensions.width = Math.min(
          Math.max(snappedWidth, minWidth),
          maxWidth
        );
      }
      if (isDragging.vertical) {
        const deltaY = e.clientY - dragStart.current.y;
        const newHeight = dragStart.current.height + deltaY;
        const snappedHeight = snapToGrid(newHeight, leap.y);
        newDimensions.height = Math.min(
          Math.max(snappedHeight, minHeight),
          maxHeight
        );
      }
      if (
        newDimensions.width !== dimensions.width ||
        newDimensions.height !== dimensions.height
      ) {
        console.log("newDimensions", newDimensions);
        handleDimensionsChange(newDimensions, false);
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
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    dimensionsWereTemporary,
    id,
  ]);

  useEffect(() => {
    if (!isDragging.vertical && !isDragging.horizontal) return;
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const newDimensions = { ...dimensions };
      if (isDragging.horizontal) {
        const deltaX = touch.clientX - dragStart.current.x;
        const newWidth = dragStart.current.width + deltaX;
        newDimensions.width = Math.min(
          Math.max(snapToGrid(newWidth, leap.x), snapToGrid(minWidth, leap.x)),
          snapToGrid(maxWidth, leap.x)
        );
      }
      if (isDragging.vertical) {
        const deltaY = touch.clientY - dragStart.current.y;
        const newHeight = dragStart.current.height + deltaY;
        newDimensions.height = Math.min(
          Math.max(
            snapToGrid(newHeight, leap.y),
            snapToGrid(minHeight, leap.y)
          ),
          snapToGrid(maxHeight, leap.y)
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
  }, [isDragging, dimensions, minWidth, maxWidth, minHeight, maxHeight]);

  useEffect(() => {
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

  return (
    <ResizableContext.Provider
      value={{
        dragStart,
        isDragging,
        setIsDragging,
        leap,
      }}
    >
      {children}
    </ResizableContext.Provider>
  );
};

export const useResizableContext = () => {
  const context = useContext(ResizableContext);
  if (!context) {
    throw new Error(
      "useResizableContext must be used within a ResizableContextProvider"
    );
  }
  return context;
};
