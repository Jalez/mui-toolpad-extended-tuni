/** @format */

/**
 * snapToGrid:
 * Utility to snap a given numeric value to a specified grid size.
 */
export function snapToGrid(value: number, snapSize: number) {
  return Math.round(value / snapSize) * snapSize;
}

/**
 * startDragging:
 * Creates a handler that prepares for resizing by capturing mouse/touch location
 * and storing initial dimensions.
 */
export function startDragging(
  direction: 'vertical' | 'horizontal' | 'corner',
  resizeMode: boolean,
  dimensions: { width: number; height: number },
  setIsDragging: (d: { vertical: boolean; horizontal: boolean }) => void,
  dragStart: React.MutableRefObject<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>
) {
  return (e: React.MouseEvent | React.TouchEvent) => {
    if (!resizeMode) return;
    const { clientX, clientY } = 'touches' in e ? e.touches[0] : e;
    setIsDragging({
      vertical: direction === 'vertical' || direction === 'corner',
      horizontal: direction === 'horizontal' || direction === 'corner',
    });
    dragStart.current = {
      x: clientX,
      y: clientY,
      width: dimensions.width,
      height: dimensions.height,
    };
    e.preventDefault();
  };
}
