/** @format */

import { useState, useRef, useEffect } from 'react';

export const useResizeLogic = (
  initialDimensions: { width: number; height: number },
  constraints: {
    minWidth: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;
  },
  onResize?: (dimensions: { width: number; height: number }) => void,
  updatePanelDimensions?: (dimensions: {
    width: number;
    height: number;
  }) => void
) => {
  const [dimensions, setDimensions] = useState(initialDimensions);
  const [isDragging, setIsDragging] = useState({
    vertical: false,
    horizontal: false,
  });
  const dragStart = useRef({ x: 0, y: 0, width: 0, height: 0 });

  const handleMouseDown =
    (direction: 'vertical' | 'horizontal' | 'corner') =>
    (e: React.MouseEvent) => {
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

  const handleMouseDownCapture = () => {
    // Add any capture phase logic here
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.vertical && !isDragging.horizontal) return;

      // Batch dimension updates to prevent flicker
      requestAnimationFrame(() => {
        const newDimensions = {
          width: dimensions.width,
          height: dimensions.height,
        };

        if (isDragging.horizontal) {
          const deltaX = e.clientX - dragStart.current.x;
          newDimensions.width = Math.min(
            Math.max(dragStart.current.width + deltaX, constraints.minWidth),
            constraints.maxWidth
          );
        }

        if (isDragging.vertical) {
          const deltaY = e.clientY - dragStart.current.y;
          newDimensions.height = Math.min(
            Math.max(dragStart.current.height + deltaY, constraints.minHeight),
            constraints.maxHeight
          );
        }

        setDimensions(newDimensions);
        onResize?.(newDimensions);
      });
    };

    const handleMouseUp = () => {
      setIsDragging({ vertical: false, horizontal: false });
      if (updatePanelDimensions) {
        updatePanelDimensions(dimensions);
      }
    };

    if (isDragging.vertical || isDragging.horizontal) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dimensions, constraints, onResize, updatePanelDimensions]);

  return {
    dimensions,
    isDragging,
    handleMouseDown,
    handleMouseDownCapture,
    setDimensions,
  };
};
