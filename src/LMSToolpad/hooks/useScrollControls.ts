/** @format */

import { useRef, useState, useEffect } from 'react';

interface ScrollControlsOptions {
  direction: 'horizontal' | 'vertical';
  itemSize: number;
  itemsPerPage?: number; // New prop
  wrapAround?: boolean;
}

export const useScrollControls = ({
  direction: scrollAxis, // rename for clarity
  itemSize,
  itemsPerPage = 1,
  // wrapAround = false,
}: ScrollControlsOptions) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showStartButton, setShowStartButton] = useState(false);
  const [showEndButton, setShowEndButton] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ pos: 0, scroll: 0 });
  const [hasDragged, setHasDragged] = useState(false);
  const [canScroll, setCanScroll] = useState(false);
  const lastDragDirection = useRef<'start' | 'end' | null>(null);
  const dragTimer = useRef<NodeJS.Timeout>();
  const hasMovedRef = useRef(false); // Add this to track any movement
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const activeScrollAxis = useRef<'horizontal' | 'vertical' | null>(null);

  // Add last logged values for debouncing
  const lastLoggedValues = useRef({
    progress: 0,
    direction: '',
    timestamp: 0,
    page: 0,
  });

  // Add debounce timer for scroll actions
  const scrollTimer = useRef<NodeJS.Timeout>();
  const lastScrollTime = useRef(0);

  const debugLog = (type: 'scroll' | 'drag' | 'action', data: any) => {
    if (process.env.NODE_ENV !== 'development') return;

    const now = Date.now();
    const minInterval = 250; // Only log every 250ms

    switch (type) {
      case 'drag':
        // Only log if direction changed or progress changed by more than 10%
        const currentProgress = parseInt(data.progress);
        if (
          now - lastLoggedValues.current.timestamp > minInterval &&
          (data.direction !== lastLoggedValues.current.direction ||
            Math.abs(currentProgress - lastLoggedValues.current.progress) >= 10)
        ) {
          console.log(`[${scrollAxis}] drag:`, data);
          lastLoggedValues.current = {
            ...lastLoggedValues.current,
            progress: currentProgress,
            direction: data.direction,
            timestamp: now,
          };
        }
        break;

      case 'scroll':
        // Only log if page changed
        if (data.page !== lastLoggedValues.current.page) {
          console.log(`[${scrollAxis}] scroll:`, data);
          lastLoggedValues.current.page = data.page;
        }
        break;

      case 'action':
        // Always log actions but with throttling
        if (now - lastLoggedValues.current.timestamp > minInterval) {
          console.log(`[${scrollAxis}] action:`, data);
          lastLoggedValues.current.timestamp = now;
        }
        break;
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkScroll = () => {
      const isHorizontal = scrollAxis === 'horizontal';
      const currentScroll = isHorizontal
        ? container.scrollLeft
        : container.scrollTop;

      const itemCount = container.children.length;

      // Calculate total pages based on items and items per page
      const totalPagesCalc = Math.max(1, Math.ceil(itemCount / itemsPerPage));

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
      setCanScroll(totalPagesCalc > 1);
    };

    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(container);
    container.addEventListener('scroll', checkScroll);
    checkScroll();

    return () => {
      container.removeEventListener('scroll', checkScroll);
      resizeObserver.disconnect();
    };
  }, [scrollAxis, itemSize, itemsPerPage]);

  const handleScrollAction = (forward: boolean) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 500) return; // Prevent rapid scrolls
    lastScrollTime.current = now;

    const container = containerRef.current;
    if (!container) return;

    const isHorizontal = scrollAxis === 'horizontal';
    const currentScroll = isHorizontal
      ? container.scrollLeft
      : container.scrollTop;
    const targetScroll = currentScroll + (forward ? itemSize : -itemSize);

    container.style.scrollBehavior = 'smooth';
    if (isHorizontal) {
      container.scrollLeft = targetScroll;
    } else {
      container.scrollTop = targetScroll;
    }
  };

  const scroll = (scrollDirection: 'start' | 'end') => {
    if (scrollTimer.current) {
      clearTimeout(scrollTimer.current);
    }

    scrollTimer.current = setTimeout(() => {
      handleScrollAction(scrollDirection === 'end');
    }, 50);
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

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setHasDragged(false);
    hasMovedRef.current = false;

    const pos = scrollAxis === 'horizontal' ? e.pageX : e.pageY;
    const scrollPos =
      scrollAxis === 'horizontal'
        ? containerRef.current!.scrollLeft
        : containerRef.current!.scrollTop;

    setDragStart({ pos, scroll: scrollPos });
    lastDragDirection.current = null;
    activeScrollAxis.current = scrollAxis;

    if (containerRef.current) {
      containerRef.current.style.scrollBehavior = 'auto';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (
      !isDragging ||
      !containerRef.current ||
      activeScrollAxis.current !== scrollAxis
    )
      return;
    e.preventDefault();

    const currentPos = scrollAxis === 'horizontal' ? e.pageX : e.pageY;
    const delta = dragStart.pos - currentPos;
    const progress = Math.round((delta / itemSize) * 100);

    // Only trigger scroll when crossing a threshold
    if (Math.abs(delta) > itemSize * 0.5) {
      // Increased threshold
      const direction = delta > 0 ? 'end' : 'start';

      if (direction !== lastDragDirection.current) {
        lastDragDirection.current = direction;
        scroll(direction);
      }
    }

    // Only log significant changes in drag
    if (Math.abs(progress) % 10 === 0) {
      debugLog('drag', {
        direction: delta > 0 ? 'forward' : 'backward',
        progress: `${progress}%`,
      });
    }

    if (Math.abs(delta) > 2) {
      hasMovedRef.current = true;
      setHasDragged(true);
    }

    if (Math.abs(delta) > itemSize * 0.2) {
      const direction = delta > 0 ? 'end' : 'start';

      if (direction !== lastDragDirection.current) {
        lastDragDirection.current = direction;
        if (dragTimer.current) {
          clearTimeout(dragTimer.current);
        }
        dragTimer.current = setTimeout(() => {
          scroll(direction);
        }, 50);
      }
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (activeScrollAxis.current !== scrollAxis) return;

    e.preventDefault();
    setIsDragging(false);
    lastDragDirection.current = null;
    activeScrollAxis.current = null;

    if (dragTimer.current) {
      clearTimeout(dragTimer.current);
    }

    // If there was any movement, prevent click
    if (hasMovedRef.current) {
      e.stopPropagation();
      // Prevent the next click event too
      const preventNextClick = (e: Event) => {
        e.stopPropagation();
        document.removeEventListener('click', preventNextClick, true);
      };
      document.addEventListener('click', preventNextClick, true);
    }

    if (hasDragged) {
      e.stopPropagation();
    }

    // Ensure we're properly snapped to an item
    if (containerRef.current) {
      const container = containerRef.current;
      const isHorizontal = scrollAxis === 'horizontal';
      const currentScroll = isHorizontal
        ? container.scrollLeft
        : container.scrollTop;
      // Snap directly to nearest item
      let snapPoint = Math.round(currentScroll / itemSize) * itemSize;

      // Clamp snap point
      snapPoint = Math.max(0, snapPoint);
      snapPoint = Math.min(snapPoint, (totalPages - 1) * itemSize);

      container.style.scrollBehavior = 'smooth';
      if (isHorizontal) {
        container.scrollLeft = snapPoint;
      } else {
        container.scrollTop = snapPoint;
      }
    }
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
    hasMovedRef.current = false;
    setDragStart({ pos, scroll: scrollPos });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    const touch = e.touches[0];
    const currentPos = scrollAxis === 'horizontal' ? touch.pageX : touch.pageY;
    const delta = dragStart.pos - currentPos;

    if (Math.abs(delta) > 5) {
      hasMovedRef.current = true;
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
    if (containerRef.current && hasMovedRef.current) {
      const container = containerRef.current;
      const currentScroll =
        scrollAxis === 'horizontal'
          ? container.scrollLeft
          : container.scrollTop;

      const snapPoint = Math.round(currentScroll / itemSize) * itemSize;

      container.style.scrollBehavior = 'smooth';
      if (scrollAxis === 'horizontal') {
        container.scrollLeft = snapPoint;
      } else {
        container.scrollTop = snapPoint;
      }
    }
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (dragTimer.current) {
        clearTimeout(dragTimer.current);
      }
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }
    };
  }, []);

  return {
    containerRef,
    showStartButton,
    showEndButton,
    isDragging,
    hasDragged,
    canScroll,
    scroll,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    hasMovedRef, // Optional: expose this if needed for custom handling
    currentPage,
    totalPages,
    scrollToPage,
    disableStartButton: !showStartButton,
    disableEndButton: !showEndButton,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};
