/** @format */

import { Box, useTheme } from '@mui/material';
import { useEffect, useRef } from 'react';
import { usePanelStore } from './Resizable/store/usePanelStore';
import BlurOverlay from './Resizable/BlurOverlay';
import ResizeIndicator from './Resizable/ResizeIndicator';
import InternalScrolling from './Resizable/InternalScrolling';
import ResizeHandlers from './Resizable/ResizeHandlers';
import {
  useItemCounts,
  useResizeContext,
  ResizeProvider,
} from './Resizable/Context/ResizeContext';
import { startDragging } from './Resizable/Hooks/useResizeHandlers';
import { useResizablePanel } from './Resizable/Hooks/useResizablePanel';
import {
  loadDesiredWidth,
  saveDesiredWidth,
} from './Resizable/Hooks/usePersistentDimensions';
import { ToolsContainerWrapper } from './PanelTools/ToolsContainer';

interface ResizablePanelProps {
  id: string; // New required prop
  children:
    | React.ReactNode
    | ((dimensions: { width: number; height: number }) => React.ReactNode);
  tools?: React.ReactNode; // Add this prop
  minHeight?: number;
  maxHeight?: number;
  minWidth?: number;
  maxWidth?: number;
  defaultHeight?: number;
  defaultWidth?: number;
  onResize?: (dimensions: { width: number; height: number }) => void;
}

// Inner component that uses context
const ResizablePanelContent = (props: ResizablePanelProps) => {
  const {
    id,
    children,
    tools,
    minHeight = 200,
    maxHeight = 800,
    minWidth = 300,
    maxWidth = 1200,
    defaultHeight = 200,
    defaultWidth = 900,
    onResize,
  } = props;

  const theme = useTheme();
  const { resizeMode } = usePanelStore();
  const { snapDimensions } = useResizeContext();
  const { setItemCounts } = useItemCounts();
  const panelRef = useRef<HTMLDivElement>(null);

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
    onResize,
  });

  const isUserResizingRef = useRef(false);
  const userChosenWidthRef = useRef(loadDesiredWidth(id, defaultWidth)); // Initialize with stored value

  // Update preferred width during any dimension change
  const originalHandleDimensionsChange = handleDimensionsChange;
  const wrappedHandleDimensionsChange = (newDim: {
    width: number;
    height: number;
  }) => {
    if (isUserResizingRef.current) {
      // Update userChosenWidth when user is actually dragging
      userChosenWidthRef.current = newDim.width;
      console.log('User dragged to width:', newDim.width);
    }
    originalHandleDimensionsChange(newDim);
  };

  const handleMouseDown = (direction: 'vertical' | 'horizontal' | 'corner') => {
    isUserResizingRef.current = true;
    return startDragging(
      direction,
      resizeMode,
      dimensions,
      setIsDragging,
      dragStart
    );
  };

  const handleTouchStart = (direction: 'vertical' | 'horizontal' | 'corner') =>
    startDragging(direction, resizeMode, dimensions, setIsDragging, dragStart);

  useEffect(() => {
    const handleMouseUp = () => {
      if (isUserResizingRef.current) {
        userChosenWidthRef.current = dimensions.width;
        // Save the desired width when user finishes dragging
        saveDesiredWidth(id, dimensions.width);
        console.log(
          'User finished resize, new chosen width:',
          dimensions.width
        );
      }
      isUserResizingRef.current = false;
    };

    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, [dimensions.width, id]); // Add id as dependency

  // Add effect to calculate and log item count using snapDimensions
  useEffect(() => {
    if (snapDimensions.width > 0 && panelRef.current) {
      const actualWidth = panelRef.current.offsetWidth;
      const itemsVisible = Math.floor(actualWidth / snapDimensions.width);
      console.log(
        '[ResizablePanel] Actually showing:',
        itemsVisible,
        'items',
        `(Computed width: ${actualWidth}px, Snap width: ${snapDimensions.width}px)`
      );
    }
  }, [dimensions.width, snapDimensions.width]);

  // Add effect to calculate and log both horizontal and vertical item counts
  useEffect(() => {
    if (
      snapDimensions.width > 0 &&
      snapDimensions.height > 0 &&
      panelRef.current
    ) {
      const actualWidth = panelRef.current.offsetWidth;
      const horizontalItemsVisible = Math.floor(
        actualWidth / snapDimensions.width
      );
      const verticalItemsVisible = Math.floor(
        dimensions.height / snapDimensions.height
      );

      setItemCounts({
        horizontal: horizontalItemsVisible,
        vertical: verticalItemsVisible,
      });
    }
  }, [
    dimensions.width,
    dimensions.height,
    snapDimensions.width,
    snapDimensions.height,
    setItemCounts,
  ]);

  useEffect(() => {
    if (!panelRef.current || snapDimensions.width <= 0) return;
    const parentWidth =
      panelRef.current.offsetParent?.clientWidth || window.innerWidth;
    const totalDesiredWidth = dimensions.width + 25;
    if (totalDesiredWidth > parentWidth) {
      const allowableItems = Math.floor(
        (parentWidth - 25) / snapDimensions.width
      );
      const newWidth = Math.max(
        allowableItems * snapDimensions.width,
        minWidth
      );
      if (newWidth < dimensions.width) {
        wrappedHandleDimensionsChange({
          width: newWidth,
          height: dimensions.height,
        });
      }
    }
  }, [
    dimensions.width,
    dimensions.height,
    snapDimensions.width,
    minWidth,
    panelRef,
    wrappedHandleDimensionsChange,
  ]);

  useEffect(() => {
    if (!panelRef.current) return;

    let growthTimeout: NodeJS.Timeout;

    const handleResize = () => {
      if (!panelRef.current || snapDimensions.width <= 0) return;

      // Calculate total horizontal space taken by other elements
      const rect = panelRef.current.getBoundingClientRect();
      const offsetLeft = rect.left;
      const documentWidth = document.documentElement.clientWidth;
      const marginRight = 16; // Account for safety margin
      const availableSpace = documentWidth - offsetLeft - marginRight;

      // Calculate based on actual available space
      const maxPossibleItems = Math.floor(
        (availableSpace - 25) / snapDimensions.width
      );
      const maxPossibleWidth = maxPossibleItems * snapDimensions.width;
      const currentItems = Math.floor(dimensions.width / snapDimensions.width);
      const desiredItems = Math.floor(
        userChosenWidthRef.current / snapDimensions.width
      );

      // Rest of resize logic using new available space calculation
      if (dimensions.width + 25 > availableSpace) {
        // Shrink immediately when needed
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
        userChosenWidthRef.current > dimensions.width
      ) {
        // Delay growth to prevent rapid back-and-forth
        clearTimeout(growthTimeout);
        growthTimeout = setTimeout(() => {
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
        }, 150); // Add a delay before growing
      }
    };

    // Observe parent size
    let observer: ResizeObserver | null = null;
    if (panelRef.current.offsetParent) {
      observer = new ResizeObserver(handleResize);
      observer.observe(panelRef.current.offsetParent as Element);
    }

    // Also handle window resizing for fallback
    window.addEventListener('resize', handleResize);

    // Run once on mount
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (observer) observer.disconnect();
      clearTimeout(growthTimeout);
    };
  }, [
    dimensions.width,
    dimensions.height,
    snapDimensions.width,
    minWidth,
    maxWidth,
    wrappedHandleDimensionsChange,
  ]);

  // Add a new effect to handle initial dimensions
  useEffect(() => {
    const storedDesiredWidth = loadDesiredWidth(id, defaultWidth);
    if (storedDesiredWidth !== dimensions.width) {
      // Update dimensions to match stored desired width if possible
      const parentWidth =
        panelRef.current?.offsetParent?.clientWidth || window.innerWidth;
      const availableSpace = parentWidth - 25;
      const maxPossibleItems = Math.floor(
        availableSpace / snapDimensions.width
      );
      const maxPossibleWidth = maxPossibleItems * snapDimensions.width;

      // Use the smaller of stored width or maximum possible width
      const targetWidth = Math.min(storedDesiredWidth, maxPossibleWidth);

      if (targetWidth !== dimensions.width) {
        wrappedHandleDimensionsChange({
          width: targetWidth,
          height: dimensions.height,
        });
      }
    }
  }, [id, defaultWidth, snapDimensions.width]); // Run once on mount with required deps

  // Add debug logging
  useEffect(() => {
    console.log('Width changed:', {
      dimensionsWidth: dimensions.width,
      userChosenWidth: userChosenWidthRef.current,
      isUserResizing: isUserResizingRef.current,
    });
  }, [dimensions.width]);

  return (
    <Box
      ref={panelRef}
      sx={{
        m: 1,
        position: 'relative',
        width: dimensions.width + 25,
        maxWidth: '100%', // Constrain width
        height: dimensions.height,
        backgroundColor: theme.palette.background.paper,
        borderRadius: resizeMode ? 1 : 0,
        outline: resizeMode
          ? `0.1em dashed ${theme.palette.primary.main}`
          : 'none',
        display: 'flex', // Add this
        flexDirection: 'column', // Add this
        overflow: 'hidden', // Add this
        // Add smooth transitions except during drag
        transition:
          isDragging.horizontal || isDragging.vertical
            ? 'none'
            : 'width 0.3s ease-in-out, height 0.3s ease-in-out',
        // Optimize animations
        willChange: 'width, height',
      }}>
      {tools && (
        <ToolsContainerWrapper position='bottom-right'>
          {tools}
        </ToolsContainerWrapper>
      )}
      <InternalScrolling dimensions={dimensions}>
        {typeof children === 'function' ? children(dimensions) : children}
      </InternalScrolling>

      {(isDragging.vertical || isDragging.horizontal) && (
        <BlurOverlay>
          <ResizeIndicator dimensions={dimensions} />
        </BlurOverlay>
      )}

      {/* Resize handles */}
      {resizeMode && (
        <ResizeHandlers
          handleMouseDown={handleMouseDown}
          handleTouchStart={handleTouchStart}
        />
      )}
    </Box>
  );
};

// Main component that provides context
const ResizablePanel = (props: ResizablePanelProps) => {
  return (
    <ResizeProvider>
      <ResizablePanelContent {...props} />
    </ResizeProvider>
  );
};

export default ResizablePanel;
