/** @format */
import { Box, Typography } from '@mui/material';
import React, { useRef, useEffect } from 'react';
import { useScrollControls } from './Resizable/Hooks/useScrollControls';
import PaginationDots from './PaginationDots';
import { useItemCounts } from './Resizable/Context/ResizeContext';
import { priority } from '../Courses/NoCourseNotice';

type HorizontalScrollerProps = {
  title?: string;
  children: React.ReactNode;
  priority: priority;
  height: number;
  itemWidth: number;
  itemCount: number;
};

const HorizontalScroller = ({
  children,
  title,
  priority,
  height,
  itemWidth,
  itemCount,
}: HorizontalScrollerProps) => {
  const { itemCounts } = useItemCounts();

  const {
    containerRef,
    isDragging,
    hasDragged,
    canScroll,
    scroll,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    currentPage,
    totalPages,
    scrollToPage,
    disableStartButton,
    disableEndButton,
    handleTouchStart, // Add these three
    handleTouchMove, // touch handlers
    handleTouchEnd, // from useScrollControls
  } = useScrollControls({
    direction: 'horizontal',
    itemSize: itemWidth,
    itemsPerPage: itemCounts.horizontal,
    itemCount, // Add this
  });

  const dragThreshold = 4; // Minimum pixels to consider as drag
  const dragDistance = 0;

  const handleClick = (e: React.MouseEvent) => {
    if (hasDragged || dragDistance > dragThreshold) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  useEffect(() => {
    console.log('Triggered this for title:', title);
  }, []);
  // Add an effect to count children once this scroller becomes visible

  const reelRef = useRef<HTMLDivElement>(null);

  if (!children || React.Children.count(children) === 0) {
    return (
      <Box
        sx={{
          minHeight: height,
        }}>
        {title && <ReelTitle title={title} priority={priority} />}
        <Typography sx={{ px: 2, mt: 1, color: 'text.secondary' }}>
          This list is empty
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      ref={reelRef}
      sx={{
        height: height,
        display: 'flex',
        flexDirection: 'column',
        // width: itemWidth,
      }}>
      {title && <ReelTitle title={title} priority={priority} />}
      <Box
        data-testid='reel-container'
        ref={containerRef}
        sx={{
          width: '100%',
          display: 'flex',
          overflowX: 'hidden',
          scrollBehavior: 'smooth',
          cursor: isDragging ? 'grabbing' : 'grab',
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          position: 'relative',
          zIndex: 1,
          scrollSnapType: 'x mandatory',
          userSelect: 'none',
          height: '100%', // Take full height
          touchAction: 'pan-x', // Enable horizontal touch scrolling
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}>
        {React.Children.map(children, (child) => (
          <Box
            data-testid='reel-item'
            sx={{
              width: itemWidth,
              scrollSnapAlign: 'start',
              flexShrink: 0,
              display: 'flex',
              padding: 2,
            }}>
            {child}
          </Box>
        ))}
      </Box>
      <PaginationDots
        total={totalPages}
        current={currentPage}
        onDotClick={scrollToPage}
        onArrowClick={scroll}
        showArrows={canScroll}
        disableStart={disableStartButton}
        disableEnd={disableEndButton}
      />
    </Box>
  );
};

const ReelTitle = ({
  title,
  priority,
}: {
  title: string;
  priority: priority;
}) => {
  return (
    <Typography
      variant='h6'
      sx={{
        color:
          priority === 'high'
            ? 'primary.main'
            : priority === 'low'
              ? 'text.secondary'
              : 'text.primary',
        textAlign: 'left',
      }}>
      {title}
    </Typography>
  );
};

export default HorizontalScroller;
