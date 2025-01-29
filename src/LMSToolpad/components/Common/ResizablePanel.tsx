/** @format */

import { Box, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { usePlatformStore } from '../../store/usePlatformStore';
import BlurOverlay from './Resizable/BlurOverlay';
import ResizeIndicator from './Resizable/ResizeIndicator';
import InternalScrolling from './Resizable/InternalScrolling';
import ResizeHandlers from './Resizable/ResizeHandlers';
import {
  useItemCounts,
  useResizeContext,
} from './Resizable/Context/ResizeContext';
import { startDragging } from './Resizable/Hooks/useResizeHandlers';
import { useResizablePanel } from './Resizable/Hooks/useResizablePanel';

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

  const { dimensions, isDragging, setIsDragging, dragStart } =
    useResizablePanel({
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

  const handleMouseDown = (direction: 'vertical' | 'horizontal' | 'corner') =>
    startDragging(direction, resizeMode, dimensions, setIsDragging, dragStart);

  const handleTouchStart = (direction: 'vertical' | 'horizontal' | 'corner') =>
    startDragging(direction, resizeMode, dimensions, setIsDragging, dragStart);

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
        m: 1,

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
