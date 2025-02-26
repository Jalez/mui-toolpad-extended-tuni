/** @format */
import { useRef, useState, useEffect, useCallback } from "react";

interface ScrollControlsOptions {
  direction: "horizontal" | "vertical";
  itemSize: number;
  itemsPerPage?: number;
  itemCount?: number;
}

// Global scroll cooldown vars remain unchanged.
let lastHorizontalScrollTime = 0;
let lastVerticalScrollTime = 0;
const SCROLL_COOLDOWN = 500; // ms

// New thresholds
const DRAG_TIME_THRESHOLD = 200; // ms for long press drag
const DRAG_DISTANCE_THRESHOLD = 5; // pixels

export const useScrollControls = ({
  direction: scrollAxis,
  itemSize,
  itemsPerPage = 1,
  itemCount,
}: ScrollControlsOptions) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showStartButton, setShowStartButton] = useState(false);
  const [showEndButton, setShowEndButton] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [dragStart, setDragStart] = useState({ pos: 0, scroll: 0 });
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const lastDragDirection = useRef<"start" | "end" | null>(null);
  const dragTimerRef = useRef<number | null>(null);

  // (Scroll, resize, and mutation observers remain the same)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let throttleTimeout: NodeJS.Timeout | null = null;
    const checkScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const isHorizontal = scrollAxis === "horizontal";
      const currentScroll = isHorizontal
        ? container.scrollLeft
        : container.scrollTop;
      const actualItemCount = itemCount ?? container.children.length;
      const buffer = 5; // small buffer to account for partial visibility

      if (isHorizontal) {
        const effectiveItemsPerPage = Math.max(
          1,
          Math.round((container.clientWidth + buffer) / itemSize)
        );
        const totalPagesCalc = Math.max(
          1,
          actualItemCount - effectiveItemsPerPage + 1
        );
        const currentPageCalc = Math.min(
          Math.floor(currentScroll / itemSize),
          totalPagesCalc - 1
        );
        setTotalPages(totalPagesCalc);
        setCurrentPage(currentPageCalc);
        setShowStartButton(currentPageCalc > 0);
        setShowEndButton(currentPageCalc < totalPagesCalc - 1);
      } else {
        // Use similar logic for vertical scrolling:
        const effectiveItemsPerPage = Math.max(
          1,
          Math.round((container.clientHeight + buffer) / itemSize)
        );
        const totalPagesCalc = Math.max(
          1,
          actualItemCount - effectiveItemsPerPage + 1
        );
        const currentPageCalc = Math.min(
          Math.floor(currentScroll / itemSize),
          totalPagesCalc - 1
        );
        setTotalPages(totalPagesCalc);
        setCurrentPage(currentPageCalc);
        setShowStartButton(currentPageCalc > 0);
        setShowEndButton(currentPageCalc < totalPagesCalc - 1);
      }
    };
    const throttledCheckScroll = () => {
      if (throttleTimeout === null) {
        throttleTimeout = setTimeout(() => {
          throttleTimeout = null;
          checkScroll();
        }, 100);
      }
    };

    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(container);
    container.addEventListener("scroll", throttledCheckScroll);
    const mutationObserver = new MutationObserver(checkScroll);
    mutationObserver.observe(container, { childList: true, subtree: true });
    requestAnimationFrame(() => {
      requestAnimationFrame(checkScroll);
    });
    return () => {
      container.removeEventListener("scroll", throttledCheckScroll);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
  }, [scrollAxis, itemSize, itemsPerPage, itemCount]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !itemCount) return;
    const currentScroll =
      scrollAxis === "horizontal" ? container.scrollLeft : container.scrollTop;
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

  const snapToClosest = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const isHorizontal = scrollAxis === "horizontal";
    const currentScroll = isHorizontal
      ? container.scrollLeft
      : container.scrollTop;
    const snapPoint = Math.round(currentScroll / itemSize) * itemSize;
    container.style.scrollBehavior = "smooth";
    if (isHorizontal) {
      container.scrollLeft = snapPoint;
    } else {
      container.scrollTop = snapPoint;
    }
  }, [scrollAxis, itemSize]);

  // Global mouseup to clear dragging and timer.
  useEffect(() => {
    const handleGlobalMouseUp = (e: MouseEvent) => {
      e.preventDefault();
      if (isDragging) {
        setIsDragging(false);
        snapToClosest();
      }
      if (dragTimerRef.current) {
        clearTimeout(dragTimerRef.current);
        dragTimerRef.current = null;
      }
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, [isDragging, snapToClosest]);

  const handleScrollAction = (forward: boolean) => {
    const container = containerRef.current;
    if (!container) return;
    const currentScroll =
      scrollAxis === "horizontal" ? container.scrollLeft : container.scrollTop;
    const targetScroll = currentScroll + (forward ? itemSize : -itemSize);
    container.style.scrollBehavior = "smooth";
    if (scrollAxis === "horizontal") {
      container.scrollLeft = targetScroll;
    } else {
      container.scrollTop = targetScroll;
    }
  };

  const scroll = (scrollDirection: "start" | "end") => {
    handleScrollAction(scrollDirection === "end");
  };

  const scrollToPage = (page: number) => {
    if (!containerRef.current) return;
    const targetScroll = page * itemSize;
    containerRef.current.style.scrollBehavior = "smooth";
    if (scrollAxis === "horizontal") {
      containerRef.current.scrollLeft = targetScroll;
    } else {
      containerRef.current.scrollTop = targetScroll;
    }
  };

  // --- Updated Mouse Handlers ---
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setHasDragged(false);
    const pos = scrollAxis === "horizontal" ? e.pageX : e.pageY;
    const scrollPos =
      scrollAxis === "horizontal"
        ? containerRef.current!.scrollLeft
        : containerRef.current!.scrollTop;
    setDragStart({ pos, scroll: scrollPos });
    lastDragDirection.current = null;
    if (containerRef.current) {
      containerRef.current.style.scrollBehavior = "auto";
    }
    // Start a timer so a long press marks this as a drag.
    dragTimerRef.current = window.setTimeout(() => {
      setIsDragging(true);
      dragTimerRef.current = null;
    }, DRAG_TIME_THRESHOLD);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    if (e.buttons === 0) {
      setIsDragging(false);
      if (dragTimerRef.current) {
        clearTimeout(dragTimerRef.current);
        dragTimerRef.current = null;
      }
      return;
    }
    const currentPos = scrollAxis === "horizontal" ? e.pageX : e.pageY;
    const delta = dragStart.pos - currentPos;
    if (Math.abs(delta) > DRAG_DISTANCE_THRESHOLD) {
      setHasDragged(true);
      if (!isDragging) {
        setIsDragging(true);
        if (dragTimerRef.current) {
          clearTimeout(dragTimerRef.current);
          dragTimerRef.current = null;
        }
      }
      // Optionally, use a cooldown to prevent rapid page scrolls.
      const now = performance.now();
      if (scrollAxis === "horizontal") {
        if (now - lastVerticalScrollTime < SCROLL_COOLDOWN) return;
        lastHorizontalScrollTime = now;
      } else {
        if (now - lastHorizontalScrollTime < SCROLL_COOLDOWN) return;
        lastVerticalScrollTime = now;
      }
      const direction = delta > 0 ? "end" : "start";
      if (direction !== lastDragDirection.current) {
        lastDragDirection.current = direction;
        scroll(direction);
      }
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    e.preventDefault();
    setIsDragging(false);
    lastDragDirection.current = null;
    if (dragTimerRef.current) {
      clearTimeout(dragTimerRef.current);
      dragTimerRef.current = null;
    }
    snapToClosest();
  };

  // --- Updated Touch Handlers (similar to mouse) ---
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const pos = scrollAxis === "horizontal" ? touch.pageX : touch.pageY;
    const scrollPos =
      scrollAxis === "horizontal"
        ? containerRef.current!.scrollLeft
        : containerRef.current!.scrollTop;
    setHasDragged(false);
    setDragStart({ pos, scroll: scrollPos });
    dragTimerRef.current = window.setTimeout(() => {
      setIsDragging(true);
      dragTimerRef.current = null;
    }, DRAG_TIME_THRESHOLD);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const touch = e.touches[0];
    const currentPos = scrollAxis === "horizontal" ? touch.pageX : touch.pageY;
    const delta = dragStart.pos - currentPos;
    if (Math.abs(delta) > DRAG_DISTANCE_THRESHOLD) {
      setHasDragged(true);
      if (!isDragging) {
        setIsDragging(true);
        if (dragTimerRef.current) {
          clearTimeout(dragTimerRef.current);
          dragTimerRef.current = null;
        }
      }
      e.preventDefault();
      if (scrollAxis === "horizontal") {
        containerRef.current.scrollLeft = dragStart.scroll + delta;
      } else {
        containerRef.current.scrollTop = dragStart.scroll + delta;
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (dragTimerRef.current) {
      clearTimeout(dragTimerRef.current);
      dragTimerRef.current = null;
    }
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
    setHasDragged, // Add this line
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
    canScroll,
  };
};
