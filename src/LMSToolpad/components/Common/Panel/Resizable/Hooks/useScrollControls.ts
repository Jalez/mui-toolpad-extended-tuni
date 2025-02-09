/** @format */

/**
 * useScrollControls:
 * Manages both mouse/touch dragging and pagination for horizontal/vertical scrollers.
 * Returns refs and handlers to enable snapping, arrow button controls, and more.
 */

import { useRef, useState, useEffect, useCallback } from 'react';

interface ScrollControlsOptions {
  direction: 'horizontal' | 'vertical';
  itemSize: number;
  itemsPerPage?: number; // New prop
  itemCount?: number; // Add this
}

// Add at the top of the file
let lastHorizontalScrollTime = 0;
let lastVerticalScrollTime = 0;
const SCROLL_COOLDOWN = 500; // ms

export const useScrollControls = ({
  direction: scrollAxis, // rename for clarity
  itemSize,
  itemsPerPage = 1,
  itemCount, // Add this parameter
}: ScrollControlsOptions) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showStartButton, setShowStartButton] = useState(false);
  const [showEndButton, setShowEndButton] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ pos: 0, scroll: 0 });
  const [hasDragged, setHasDragged] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const lastDragDirection = useRef<'start' | 'end' | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let throttleTimeout: NodeJS.Timeout | null = null;

    const checkScroll = () => {
      const isHorizontal = scrollAxis === 'horizontal';
      const currentScroll = isHorizontal
        ? container.scrollLeft
        : container.scrollTop;

      // Use itemCount prop if provided, fallback to DOM children count
      const actualItemCount = itemCount ?? container.children.length;

      // Calculate total pages based on items and items per page
      const totalPagesCalc = Math.max(
        1,
        Math.ceil(actualItemCount / itemsPerPage)
      );

      // Calculate current page
      const currentPageCalc = Math.min(
        Math.floor(currentScroll / itemSize),
        totalPagesCalc - 1
      );

      setTotalPages(totalPagesCalc);
      setCurrentPage(currentPageCalc);

      // Simple button state based on current page and total pages
      setShowStartButton(currentPageCalc > 0);
      setShowEndButton(currentPageCalc < totalPagesCalc - 1);
    };

    const throttledCheckScroll = () => {
      if (throttleTimeout === null) {
        throttleTimeout = setTimeout(() => {
          throttleTimeout = null;
          checkScroll();
        }, 100); // Adjust delay as needed
      }
    };

    // Replace raw scroll logger with one that logs only when near a snap point

    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(container);
    container.addEventListener('scroll', throttledCheckScroll);
    // Use new snapped logger
    // Add MutationObserver to capture changes in container children
    const mutationObserver = new MutationObserver(checkScroll);
    mutationObserver.observe(container, { childList: true, subtree: true });
    // Defer initial check until layout is settled
    requestAnimationFrame(() => {
      requestAnimationFrame(checkScroll);
    });

    return () => {
      container.removeEventListener('scroll', throttledCheckScroll);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
  }, [scrollAxis, itemSize, itemsPerPage, itemCount]); // Add itemCount to dependencies

  // Add new effect specifically for itemCount changes
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !itemCount) return;

    const currentScroll =
      scrollAxis === 'horizontal' ? container.scrollLeft : container.scrollTop;
    const totalPagesCalc = Math.max(1, Math.ceil(itemCount / itemsPerPage));
    const currentPageCalc = Math.min(
      Math.floor(currentScroll / itemSize),
      totalPagesCalc - 1
    );

    setTotalPages(totalPagesCalc);
    setCurrentPage(currentPageCalc);
    setShowStartButton(currentPageCalc > 0);
    setShowEndButton(currentPageCalc < totalPagesCalc - 1);
  }, [itemCount, itemsPerPage, itemSize, scrollAxis]);

  // Common function to snap to nearest item
  const snapToClosest = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const isHorizontal = scrollAxis === 'horizontal';
    const currentScroll = isHorizontal
      ? container.scrollLeft
      : container.scrollTop;
    const snapPoint = Math.round(currentScroll / itemSize) * itemSize;
    container.style.scrollBehavior = 'smooth';
    if (isHorizontal) {
      container.scrollLeft = snapPoint;
    } else {
      container.scrollTop = snapPoint;
    }
  }, [scrollAxis, itemSize]);

  // Add global mouseup listener to clear dragging state
  useEffect(() => {
    const handleGlobalMouseUp = (e: MouseEvent) => {
      e.preventDefault();
      if (isDragging) {
        setIsDragging(false);
        snapToClosest();
      }
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [isDragging, snapToClosest]);

  const handleScrollAction = (forward: boolean) => {
    const container = containerRef.current;
    if (!container) return;

    // Log scrolling action with direction and current scroll value.
    const currentScroll =
      scrollAxis === 'horizontal' ? container.scrollLeft : container.scrollTop;

    const targetScroll = currentScroll + (forward ? itemSize : -itemSize);
    container.style.scrollBehavior = 'smooth';
    if (scrollAxis === 'horizontal') {
      container.scrollLeft = targetScroll;
    } else {
      container.scrollTop = targetScroll;
    }
  };

  const scroll = (scrollDirection: 'start' | 'end') => {
    handleScrollAction(scrollDirection === 'end');
  };

  const scrollToPage = (page: number) => {
    if (!containerRef.current) return;
    const containerSize =
      scrollAxis === 'horizontal'
        ? containerRef.current.clientWidth
        : containerRef.current.clientHeight;
    const itemsPerView = Math.floor(containerSize / itemSize);
    const targetScroll = page * (itemSize * itemsPerView);

    containerRef.current.style.scrollBehavior = 'smooth';
    if (scrollAxis === 'horizontal') {
      containerRef.current.scrollLeft = targetScroll;
    } else {
      containerRef.current.scrollTop = targetScroll;
    }
  };

  const DRAG_THRESHOLD = itemSize * 0.01;

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setHasDragged(false);
    const pos = scrollAxis === 'horizontal' ? e.pageX : e.pageY;
    const scrollPos =
      scrollAxis === 'horizontal'
        ? containerRef.current!.scrollLeft
        : containerRef.current!.scrollTop;

    setDragStart({ pos, scroll: scrollPos });
    lastDragDirection.current = null;

    if (containerRef.current) {
      containerRef.current.style.scrollBehavior = 'auto';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();

    const currentPos = scrollAxis === 'horizontal' ? e.pageX : e.pageY;
    const delta = dragStart.pos - currentPos;

    if (Math.abs(delta) > DRAG_THRESHOLD) {
      const now = performance.now();
      // Prevent triggering the other axis if it has fired recently.
      if (scrollAxis === 'horizontal') {
        if (now - lastVerticalScrollTime < SCROLL_COOLDOWN) return;
        lastHorizontalScrollTime = now;
      } else {
        if (now - lastHorizontalScrollTime < SCROLL_COOLDOWN) return;
        lastVerticalScrollTime = now;
      }

      const direction = delta > 0 ? 'end' : 'start';
      if (direction !== lastDragDirection.current) {
        lastDragDirection.current = direction;
        scroll(direction);
      }
      setHasDragged(true);
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    e.preventDefault();
    setIsDragging(false);
    lastDragDirection.current = null;

    if (hasDragged) {
      e.stopPropagation();
    }

    snapToClosest();
  };

  // Add touch handling
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const pos = scrollAxis === 'horizontal' ? touch.pageX : touch.pageY;
    const scrollPos =
      scrollAxis === 'horizontal'
        ? containerRef.current!.scrollLeft
        : containerRef.current!.scrollTop;

    setIsDragging(true);
    setHasDragged(false);
    setDragStart({ pos, scroll: scrollPos });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    const touch = e.touches[0];
    const currentPos = scrollAxis === 'horizontal' ? touch.pageX : touch.pageY;
    const delta = dragStart.pos - currentPos;

    if (Math.abs(delta) > 5) {
      setHasDragged(true);

      // Prevent page scrolling while swiping
      e.preventDefault();

      if (scrollAxis === 'horizontal') {
        containerRef.current.scrollLeft = dragStart.scroll + delta;
      } else {
        containerRef.current.scrollTop = dragStart.scroll + delta;
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    // Snap to nearest item
    if (containerRef.current && hasDragged) {
      snapToClosest();
    }
  };

  const canScroll = totalPages > 1;

  return {
    containerRef,
    showStartButton,
    showEndButton,
    isDragging,
    hasDragged,
    scroll,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    currentPage,
    totalPages,
    scrollToPage,
    disableStartButton: !showStartButton,
    disableEndButton: !showEndButton,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    canScroll, // Added canScroll property
  };
};
