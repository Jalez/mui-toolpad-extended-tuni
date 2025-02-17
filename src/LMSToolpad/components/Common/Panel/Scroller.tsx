/** @format */
import { Box, SxProps, Theme, Typography } from "@mui/material";
import React from "react";
import { useScrollControls } from "./Resizable/Hooks/useScrollControls";
import PaginationDots from "./PaginationDots";
import { useItemCounts } from "./Resizable/Context/ResizeContext";
import { priority as PriorityType } from "../../Courses/NoCourseNotice";

interface ScrollerProps {
  direction: "vertical" | "horizontal";
  children: React.ReactNode;
  itemSize: number; // For vertical: item height; for horizontal: item width.
  containerSize?: string | number; // For vertical: overall height; for horizontal: container height.
  hideScrollbar?: boolean;
  snapScroll?: boolean;
  title?: string;
  priority?: PriorityType; // For title styling (e.g., "high", "low", or default)
}

const PAGINATION_SIZE = 40; // For vertical: fixed width for pagination area

const Scroller = ({
  direction,
  children,
  itemSize,
  containerSize = "100%",
  hideScrollbar = true,
  snapScroll = true,
  title,
  priority,
}: ScrollerProps) => {
  const { itemCounts } = useItemCounts();
  const itemsPerPage =
    direction === "vertical" ? itemCounts.vertical : itemCounts.horizontal;

  const {
    containerRef,
    showStartButton,
    showEndButton,
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
    hasDragged,
    canScroll,
    setHasDragged,
  } = useScrollControls({
    direction,
    itemSize,
    itemsPerPage,
  });

  const isVertical = direction === "vertical";

  // Title render function.
  const renderTitle = () =>
    title ? (
      <Typography
        variant="h6"
        sx={{
          color:
            priority === "high"
              ? "primary.main"
              : priority === "low"
                ? "text.secondary"
                : "text.primary",
          textAlign: "left",
          mb: 1,
        }}
      >
        {title}
      </Typography>
    ) : null;

  // Define container styles.
  const horizontalContainerStyles: SxProps<Theme> = {
    width: "100%",
    display: "flex",
    overflowX: "hidden",
    scrollBehavior: "smooth",
    cursor: isDragging ? "grabbing" : "grab",
    "&::-webkit-scrollbar": { display: "none" },
    msOverflowStyle: "none",
    scrollbarWidth: "none",
    position: "relative",
    zIndex: 1,
    scrollSnapType: snapScroll ? "x mandatory" : "none",
    userSelect: "none",
    height: "100%",
    touchAction: "pan-x",
  };

  const verticalContainerStyles: SxProps<Theme> = {
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    position: "relative",
    scrollSnapType: snapScroll ? "y mandatory" : "none",
    cursor: isDragging ? "grabbing" : "grab",
    touchAction: "pan-y",
    WebkitOverflowScrolling: "touch",
    "& > div": {
      scrollSnapAlign: snapScroll ? "start" : "none",
      minHeight: itemSize,
      flex: "0 0 auto",
      height: itemSize,
      willChange: "transform",
    },
    "&::-webkit-scrollbar": { display: hideScrollbar ? "none" : "auto" },
    scrollbarWidth: hideScrollbar ? "none" : "auto",
    height: "100%",
  };

  const containerStyle = isVertical
    ? {
        ...verticalContainerStyles,
        width: `calc(100% - ${PAGINATION_SIZE}px)`,
        mb: "0!important",
      }
    : horizontalContainerStyles;

  // Common event handlers to cancel clicks after dragging.
  const commonHandlers = {
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseUp,
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onClickCapture: (e: React.MouseEvent) => {
      if (hasDragged) {
        e.stopPropagation();
        e.preventDefault();
        setHasDragged(false);
      }
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: containerSize,
        width: "100%",
      }}
    >
      {renderTitle()}
      {isVertical ? (
        // Vertical layout: content on the left and pagination dots on the right.
        <Box sx={{ display: "flex", flexDirection: "row", height: "100%" }}>
          <Box
            data-testid="reel-container"
            ref={containerRef}
            sx={containerStyle}
            {...commonHandlers}
          >
            {children}
          </Box>
          <Box
            sx={{
              width: PAGINATION_SIZE,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <PaginationDots
              total={totalPages}
              current={currentPage}
              onDotClick={scrollToPage}
              onArrowClick={scroll}
              vertical={true}
              showArrows={showStartButton || showEndButton}
              disableStart={disableStartButton}
              disableEnd={disableEndButton}
            />
          </Box>
        </Box>
      ) : (
        // Horizontal layout: content on top and pagination dots below.
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <Box ref={containerRef} sx={containerStyle} {...commonHandlers}>
            {React.Children.map(children, (child) => (
              <Box
                data-testid="reel-item"
                sx={{
                  width: itemSize,
                  scrollSnapAlign: "start",
                  display: "flex",
                  flexShrink: 0,
                }}
              >
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
      )}
    </Box>
  );
};

export default Scroller;
