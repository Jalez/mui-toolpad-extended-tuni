/** @format */

import { Box, useTheme } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import { usePlatformStore } from '../../store/usePlatformStore';
import BlurOverlay from './Resizable/BlurOverlay';
import ResizeIndicator from './Resizable/ResizeIndicator';
import InternalScrolling from './Resizable/InternalScrolling';
import ResizeHandlers from './Resizable/ResizeHandlers';
import { useItemCounts, useResizeContext } from '../../contexts/ResizeContext';

interface ResizablePanelProps {
  id: string; // New required prop
  children:
    | React.ReactNode
    | ((dimensions: { width: number; height: number }) => React.ReactNode);
  minHeight?: number;
  maxHeight?: number;
  minWidth?: number;
  maxWidth?: number;
  defaultHeight?: number;
  defaultWidth?: number;
  onResize?: (dimensions: { width: number; height: number }) => void;
}

const STORAGE_KEY_PREFIX = 'resizable-panel-dimensions-';

const loadDimensions = (
  id: string,
  defaultDimensions: { width: number; height: number }
) => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_PREFIX + id);
    return stored ? JSON.parse(stored) : defaultDimensions;
  } catch {
    return defaultDimensions;
  }
};

const saveDimensions = (
  id: string,
  dimensions: { width: number; height: number }
) => {
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + id, JSON.stringify(dimensions));
  } catch (error) {
    console.warn('Failed to save panel dimensions:', error);
  }
};

const ResizablePanel = ({
  id,
  children,
  minHeight = 200,
  maxHeight = 800,
  minWidth = 280,
  maxWidth = 1200,
  defaultHeight = 400,
  defaultWidth = 800,
  onResize,
}: ResizablePanelProps) => {
  const theme = useTheme();
  const { platform } = usePlatformStore();
  const resizeMode = platform.interface.resizeMode;
  const { snapDimensions } = useResizeContext();
  const { setItemCounts } = useItemCounts();
  const [dimensions, setDimensions] = useState(() =>
    loadDimensions(id, { width: defaultWidth, height: defaultHeight })
  );
  const [isDragging, setIsDragging] = useState({
    vertical: false,
    horizontal: false,
  });
  const dragStart = useRef({ x: 0, y: 0, width: 0, height: 0 });

  const handleMouseDown =
    (direction: 'vertical' | 'horizontal' | 'corner') =>
    (e: React.MouseEvent) => {
      if (!resizeMode) return;
      setIsDragging({
        vertical: direction === 'vertical' || direction === 'corner',
        horizontal: direction === 'horizontal' || direction === 'corner',
      });
      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        width: dimensions.width,
        height: dimensions.height,
      };
      e.preventDefault();
    };

  // Add touch handling functions
  const handleTouchStart =
    (direction: 'vertical' | 'horizontal' | 'corner') =>
    (e: React.TouchEvent) => {
      if (!resizeMode) return;
      const touch = e.touches[0];
      setIsDragging({
        vertical: direction === 'vertical' || direction === 'corner',
        horizontal: direction === 'horizontal' || direction === 'corner',
      });
      dragStart.current = {
        x: touch.clientX,
        y: touch.clientY,
        width: dimensions.width,
        height: dimensions.height,
      };
      e.preventDefault();
    };

  const handleDimensionsChange = (newDimensions: {
    width: number;
    height: number;
  }) => {
    // console.log('[ResizablePanel] New dimensions:', newDimensions);
    setDimensions(newDimensions);
    saveDimensions(id, newDimensions);
    onResize?.(newDimensions);
  };

  const snapToGrid = (value: number, snapSize: number) => {
    return Math.round(value / snapSize) * snapSize;
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

      handleDimensionsChange(newDimensions);
    };

    const handleMouseUp = () => {
      setIsDragging({ vertical: false, horizontal: false });
    };

    if (isDragging.vertical || isDragging.horizontal) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [
    isDragging,
    dimensions,
    minHeight,
    maxHeight,
    minWidth,
    maxWidth,
    onResize,
    id,
    snapDimensions,
  ]);

  // Add touch movement effect
  useEffect(() => {
    if (!isDragging.vertical && !isDragging.horizontal) return;

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const newDimensions = {
        width: dimensions.width,
        height: dimensions.height,
      };

      if (isDragging.horizontal) {
        const deltaX = touch.clientX - dragStart.current.x;
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
        const deltaY = touch.clientY - dragStart.current.y;
        const newHeight = dragStart.current.height + deltaY;
        newDimensions.height = Math.min(
          Math.max(
            snapToGrid(newHeight, snapDimensions.height),
            snapToGrid(minHeight, snapDimensions.height)
          ),
          snapToGrid(maxHeight, snapDimensions.height)
        );
      }

      handleDimensionsChange(newDimensions);
    };

    const handleTouchEnd = () => {
      setIsDragging({ vertical: false, horizontal: false });
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
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

  // Add effect to handle body scrolling
  useEffect(() => {
    if (isDragging.vertical || isDragging.horizontal) {
      // Disable scrolling when dragging
      document.body.style.overflow = 'hidden';
      document.body.style.userSelect = 'none';
    } else {
      // Re-enable scrolling when done
      document.body.style.overflow = '';
      document.body.style.userSelect = '';
    }

    return () => {
      // Cleanup
      document.body.style.overflow = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging]);

  // Add effect to calculate and log item count using snapDimensions
  useEffect(() => {
    if (snapDimensions.width > 0) {
      const itemsVisible = Math.floor(dimensions.width / snapDimensions.width);
      console.log(
        '[ResizablePanel] Currently showing:',
        itemsVisible,
        'items',
        `(Panel width: ${dimensions.width}px, Item width: ${snapDimensions.width}px)`
      );
    }
  }, [dimensions.width, snapDimensions.width]);

  // Add effect to calculate and log both horizontal and vertical item counts
  useEffect(() => {
    if (snapDimensions.width > 0 && snapDimensions.height > 0) {
      const horizontalItemsVisible = Math.floor(
        dimensions.width / snapDimensions.width
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

  return (
    <Box
      sx={{
        position: 'relative',
        width: dimensions.width + 25,
        height: dimensions.height,
        backgroundColor: theme.palette.background.paper,
        borderRadius: resizeMode ? 1 : 0,
        outline: resizeMode
          ? `0.1em dashed ${theme.palette.primary.main}`
          : 'none',
        display: 'flex', // Add this
        flexDirection: 'column', // Add this
        overflow: 'hidden', // Add this
      }}>
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

export default ResizablePanel;
