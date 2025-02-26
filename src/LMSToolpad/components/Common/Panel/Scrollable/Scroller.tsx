/** @format */
import { Box, SxProps, Theme, Typography } from "@mui/material";
import { useScrollControls } from "./hooks/useScrollControls";
import PaginationDots from "./PaginationDots";
import { priority } from "../../../Courses/CourseList";
import { useScrollContext } from "./context/ScrollerContextProvider";
import React, { ReactNode } from "react";

interface ScrollerProps {
  direction: "vertical" | "horizontal";
  children: ReactNode;
  itemSize: number; // For vertical: item height; for horizontal: item width.
  containerSize?: string | number; // For vertical: overall height; for horizontal: container height.
  hideScrollbar?: boolean;
  snapScroll?: boolean;
  title?: string;
  priority?: priority; // For title styling (e.g., "high", "low", or default)
}

const PAGINATION_SIZE = 25; // For vertical: fixed width for pagination area

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
  const { itemCounts } = useScrollContext();
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
        }}
      >
        {title}
      </Typography>
    ) : null;

  // Define container styles.
  let containerStyle: SxProps<Theme> = {
    zIndex: 1,
    padding: 1,
    width: "100%",
    height: "100%",
    display: "flex",
    overflow: "hidden",
    position: "relative",
    flexDirection: isVertical ? "column" : "row",
    cursor: isDragging ? "grabbing" : "grab",
    touchAction: isVertical ? "pan-y" : "pan-x",
    scrollSnapType: snapScroll ? "x mandatory" : "none",
    scrollbarWidth: hideScrollbar ? "none" : "auto",
    userSelect: "none",
    scrollBehavior: "smooth",
    WebkitOverflowScrolling: "touch",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": { display: hideScrollbar ? "none" : "auto" },
  };

  if (isVertical) {
    containerStyle = {
      ...containerStyle,
      "& > div": {
        scrollSnapAlign: snapScroll ? "start" : "none",
        minHeight: itemSize,
        flex: "0 0 auto",
        height: itemSize,
        willChange: "transform",
      },
    };
  }

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
            data-testid="pagination-dots-container"
            sx={{
              width: PAGINATION_SIZE,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
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
