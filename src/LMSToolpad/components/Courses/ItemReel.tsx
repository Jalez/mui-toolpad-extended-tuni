/** @format */

import { Box, IconButton, useTheme } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import React, { useRef, useState, useEffect } from 'react';

type ItemReelProps = {
  title?: string;
  children: React.ReactNode;
};

const ItemReel = ({ children }: ItemReelProps) => {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [showControls, setShowControls] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScroll, setCanScroll] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [dragThreshold] = useState(5); // Minimum pixels to consider as drag
  const [dragDistance, setDragDistance] = useState(0);

  useEffect(() => {
    const checkScrollable = () => {
      if (containerRef.current) {
        const { scrollWidth, clientWidth } = containerRef.current;
        setCanScroll(scrollWidth > clientWidth);
      }
    };

    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, [children]);

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scrollAmount = container.clientWidth * 0.8;

    if (direction === 'left') {
      if (container.scrollLeft <= 0) {
        // Wrap to end - instant jump
        container.style.scrollBehavior = 'auto';
        container.scrollLeft = container.scrollWidth;
        // Wait a frame then scroll smoothly
        requestAnimationFrame(() => {
          container.style.scrollBehavior = 'smooth';
          container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    } else {
      if (
        container.scrollLeft >=
        container.scrollWidth - container.clientWidth
      ) {
        // Wrap to start - instant jump
        container.style.scrollBehavior = 'auto';
        container.scrollLeft = 0;
        // Wait a frame then scroll smoothly
        requestAnimationFrame(() => {
          container.style.scrollBehavior = 'smooth';
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setHasDragged(false);
    setDragDistance(0);
    setStartX(e.pageX - containerRef.current!.offsetLeft);
    setScrollLeft(containerRef.current!.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    setDragDistance(Math.abs(walk));
    if (Math.abs(walk) > dragThreshold) {
      setHasDragged(true);
    }
    containerRef.current!.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    setIsDragging(false);
    // Prevent click event if we've dragged
    if (hasDragged) {
      e.stopPropagation();
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (hasDragged || dragDistance > dragThreshold) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        '&:hover .reel-controls': { opacity: 1 },
        userSelect: 'none',
      }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onDragStart={(e) => e.preventDefault()}>
      <Box
        ref={containerRef}
        sx={{
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
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleClick}>
        {React.Children.map(children, (child) => (
          <Box
            sx={{
              scrollSnapAlign: 'start',
              flexShrink: 0,
              pl: 1,
            }}>
            {child}
          </Box>
        ))}
      </Box>

      {/* Control Buttons */}
      {canScroll && (
        <Box
          className='reel-controls'
          sx={{
            opacity: showControls ? 1 : 0,
            transition: 'opacity 0.3s ease',
            // pointerEvents: showControls ? 'auto' : 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2,
            pointerEvents: 'none', // Let clicks pass through to content
          }}>
          <IconButton
            sx={{
              position: 'absolute',
              left: theme.spacing(1),
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(0,0,0,0.7)',
              color: 'white',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' },
              zIndex: 3,
              pointerEvents: 'auto', // Re-enable clicks for button
            }}
            onClick={(e) => {
              e.stopPropagation();
              scroll('left');
            }}>
            <ChevronLeft />
          </IconButton>
          <IconButton
            sx={{
              position: 'absolute',
              right: theme.spacing(1),
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(0,0,0,0.7)',
              color: 'white',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' },
              zIndex: 3,
              pointerEvents: 'auto', // Re-enable clicks for button
            }}
            onClick={(e) => {
              e.stopPropagation();
              scroll('right');
            }}>
            <ChevronRight />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default ItemReel;
