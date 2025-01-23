/** @format */

import { Box, useTheme } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import { usePlatformStore } from '../../store/usePlatformStore';

interface ResizablePanelProps {
  children: React.ReactNode;
  minHeight?: number;
  maxHeight?: number;
  minWidth?: number;
  maxWidth?: number;
  defaultHeight?: number;
  defaultWidth?: number;
  onResize?: (dimensions: { width: number; height: number }) => void;
}

const ResizablePanel = ({
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
  const [dimensions, setDimensions] = useState({
    width: defaultWidth,
    height: defaultHeight,
  });
  const [isDragging, setIsDragging] = useState({
    vertical: false,
    horizontal: false,
  });
  const dragStart = useRef({ x: 0, y: 0, width: 0, height: 0 });
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const [dragInProgress, setDragInProgress] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseDownCapture = () => {
    if (!resizeMode) return;
    setDragInProgress(true);
  };

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

  const handleMouseEnter = () => {
    if (resizeMode) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isDragging.vertical && !isDragging.horizontal) {
      setIsHovering(false);
    }
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
        newDimensions.width = Math.min(
          Math.max(dragStart.current.width + deltaX, minWidth),
          maxWidth
        );
      }

      if (isDragging.vertical) {
        const deltaY = e.clientY - dragStart.current.y;
        newDimensions.height = Math.min(
          Math.max(dragStart.current.height + deltaY, minHeight),
          maxHeight
        );
      }

      setDimensions(newDimensions);
      onResize?.(newDimensions);
    };

    const handleMouseUp = () => {
      setIsDragging({ vertical: false, horizontal: false });
      setDragInProgress(false);
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

  // Measure unscaled content, then apply fitting scale
  useEffect(() => {
    if (!contentRef.current) return;
    setScale(1); // reset scale
    requestAnimationFrame(() => {
      // measure unscaled content
      if (!contentRef.current) return;
      const { height: contentH } = contentRef.current.getBoundingClientRect();
      const scaleY = dimensions.height / contentH;
      const newScale = scaleY < 1 ? scaleY : 1;
      setScale(newScale);
    });
  }, [dimensions, children]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: dimensions.width,
        height: dimensions.height,
        backgroundColor: theme.palette.background.paper,
        borderRadius: resizeMode ? 1 : 0,
        transition: 'all 0.2s ease',
        boxShadow:
          isDragging.vertical || isDragging.horizontal
            ? theme.shadows[8]
            : resizeMode
              ? theme.shadows[4]
              : 'none',
        outline: resizeMode
          ? `2px dashed ${theme.palette.primary.main}`
          : 'none',
        outlineOffset: -2,
      }}>
      {/* Content Container with internal scrolling */}
      <Box
        ref={contentRef}
        sx={{
          // only scale vertically
          transform: `scale(1, ${scale})`,
          transformOrigin: 'top left',
          // allow horizontal scrolling
          overflowX: 'auto',
          overflowY: 'hidden',
          width: 'fit-content',
          height: 'fit-content',
          pointerEvents: 'auto',
          // Hide scrollbar in Firefox
          scrollbarWidth: 'thin',
          // Hide scrollbar in Chrome/Safari
          '&::-webkit-scrollbar': {
            width: '8px',
            backgroundColor: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.divider,
            borderRadius: '4px',
          },
          maxWidth: '100%',
          visibility:
            isDragging.vertical ||
            isDragging.horizontal ||
            dragInProgress ||
            isHovering
              ? 'hidden'
              : 'visible',
        }}>
        {children}
      </Box>

      {/* Visual barrier and interaction prevention during resize */}
      {(isDragging.vertical || isDragging.horizontal) && (
        <>
          {/* Blur overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(6px)',
              zIndex: theme.zIndex.modal,
              transition: 'opacity 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'auto',
            }}>
            {/* Optional: Add resize indicator */}
            <Box
              sx={{
                padding: 2,
                borderRadius: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                color: 'text.secondary',
                fontSize: '0.875rem',
                userSelect: 'none',
              }}>
              {`${dimensions.width} × ${dimensions.height}`}
            </Box>
          </Box>

          {/* Full screen overlay to capture mouse events */}
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: theme.zIndex.modal + 1,
              cursor: isDragging.horizontal
                ? 'ew-resize'
                : isDragging.vertical
                  ? 'ns-resize'
                  : 'nwse-resize',
            }}
          />
        </>
      )}

      {/* Resize handles */}
      {resizeMode && (
        <>
          <Box
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDownCapture={handleMouseDownCapture}
            onMouseDown={handleMouseDown('horizontal')}
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
              width: '4px',
              height: '100%',
              cursor: 'ew-resize',
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                opacity: 0.2,
              },
              '&:active': {
                opacity: 0.4,
              },
            }}
          />
          <Box
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDownCapture={handleMouseDownCapture}
            onMouseDown={handleMouseDown('vertical')}
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '4px',
              width: '100%',
              cursor: 'ns-resize',
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                opacity: 0.2,
              },
              '&:active': {
                opacity: 0.4,
              },
            }}
          />
          <Box
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDownCapture={handleMouseDownCapture}
            onMouseDown={handleMouseDown('corner')}
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              height: '12px',
              width: '12px',
              cursor: 'nwse-resize',
              '&:hover': {
                '&::after': {
                  opacity: 0.2,
                },
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                right: 0,
                bottom: 0,
                width: 0,
                height: 0,
                borderStyle: 'solid',
                borderWidth: '0 0 12px 12px',
                borderColor: `transparent transparent ${theme.palette.primary.main} transparent`,
                opacity: 0.1,
                transition: 'opacity 0.2s ease',
              },
            }}
          />
        </>
      )}
    </Box>
  );
};

export default ResizablePanel;
