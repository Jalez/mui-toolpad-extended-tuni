/** @format */

import { Box } from "@mui/material";
import React from "react";

interface ResizeHandlersProps {
  handleMouseDown: (
    direction: "vertical" | "horizontal" | "corner"
  ) => (e: React.MouseEvent | React.TouchEvent) => void;
  handleTouchStart: (
    direction: "vertical" | "horizontal" | "corner"
  ) => (e: React.MouseEvent | React.TouchEvent) => void;
}

const ResizeHandlers = ({
  handleMouseDown,
  handleTouchStart,
}: ResizeHandlersProps) => {
  const commonStyles = {
    position: "absolute",
    backgroundColor: "transparent",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
    },
  };

  return (
    <>
      {/* Right handle */}
      <Box
        onMouseDown={(e) => handleMouseDown("horizontal")(e)}
        onTouchStart={(e) => handleTouchStart("horizontal")(e)}
        sx={{
          ...commonStyles,
          right: 0,
          top: 0,
          width: "10px",
          height: "100%",
          cursor: "ew-resize",
          zIndex: 10,
        }}
      />

      {/* Bottom handle */}
      <Box
        onMouseDown={handleMouseDown("vertical")}
        onTouchStart={handleTouchStart("vertical")}
        sx={{
          ...commonStyles,
          bottom: 0,
          left: 0,
          width: "100%",
          height: "8px",
          cursor: "ns-resize",
          zIndex: 10,
        }}
      />

      {/* Corner handle */}
      <Box
        onMouseDown={(e) => handleMouseDown("corner")(e)}
        onTouchStart={(e) => handleTouchStart("corner")(e)}
        sx={{
          ...commonStyles,
          bottom: 0,
          right: 0,
          width: "16px",
          height: "16px",
          cursor: "nwse-resize",
          zIndex: 10,
        }}
      />
    </>
  );
};

export default ResizeHandlers;
