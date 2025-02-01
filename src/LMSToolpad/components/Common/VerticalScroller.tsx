/** @format */

import { Box } from '@mui/material';

import { useScrollControls } from './Resizable/Hooks/useScrollControls';
import PaginationDots from './PaginationDots';
import { useItemCounts } from './Resizable/Context/ResizeContext';

interface VerticalScrollerProps {
  children: React.ReactNode;
  itemHeight: number;
  containerHeight?: string | number;
  hideScrollbar?: boolean;
  snapScroll?: boolean;
}

// Add this constant
export const PAGINATION_WIDTH = 40; // Width of pagination dots container

const VerticalScroller = ({
  children,
  itemHeight,
  containerHeight = '100%',
  hideScrollbar = true,
  snapScroll = true,
}: VerticalScrollerProps) => {
  const { itemCounts } = useItemCounts();

  const {
    containerRef,
    showStartButton: showUpButton,
    showEndButton: showDownButton,
    isDragging,
    scroll,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    currentPage,
    totalPages,
    scrollToPage,
    disableStartButton,
    disableEndButton,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useScrollControls({
    direction: 'vertical',
    itemSize: itemHeight,
    itemsPerPage: itemCounts.vertical,
  });

  console.log('ITEM COUNTS', itemCounts);
  console.log('totalPages', totalPages);

  return (
    <Box
      sx={{
        height: containerHeight,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        // gap: 1, // Add gap between content and pagination
      }}>
      <Box
        ref={containerRef}
        sx={{
          display: 'flex',
          height: '100%',
          width: `calc(100% - ${PAGINATION_WIDTH}px)`, // Subtract pagination width
          flexDirection: 'column',
          overflowY: 'auto',
          position: 'relative',
          scrollSnapType: snapScroll ? 'y mandatory' : 'none',
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'pan-y', // Enable vertical touch scrolling
          WebkitOverflowScrolling: 'touch', // Add this
          '& > div': {
            scrollSnapAlign: snapScroll ? 'start' : 'none',
            minHeight: itemHeight,
            flex: '0 0 auto',
            height: itemHeight,
            willChange: 'transform', // Add this
          },
          '&::-webkit-scrollbar': {
            display: hideScrollbar ? 'none' : 'auto',
          },
          scrollbarWidth: hideScrollbar ? 'none' : 'auto',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}>
        {children}
      </Box>
      <PaginationDots
        total={totalPages}
        current={currentPage}
        onDotClick={scrollToPage}
        vertical={true}
        onArrowClick={scroll}
        showArrows={showUpButton || showDownButton}
        disableStart={disableStartButton}
        disableEnd={disableEndButton}
      />
    </Box>
  );
};

export default VerticalScroller;
