/** @format */

import React from "react";
import { Box } from "@mui/material";

interface ResizeHandlersProps {
  isResizing: boolean;
  onResizeStart?: (direction: string) => void;
}

/**
 * Resize handles for panel resizing
 */
const ResizeHandlers: React.FC<ResizeHandlersProps> = ({
  isResizing,
  onResizeStart,
}) => {
  const handleStyle = {
    position: "absolute" as const,
    backgroundColor: "primary.main",
    opacity: isResizing ? 1 : 0.3,
    transition: "opacity 0.2s ease",
    "&:hover": {
      opacity: 1,
    },
  };

  return (
    <>
      {/* Corner handles */}
      <Box
        sx={{
          ...handleStyle,
          bottom: -4,
          right: -4,
          width: 8,
          height: 8,
          cursor: "se-resize",
        }}
        onMouseDown={() => onResizeStart?.("se")}
      />
      <Box
        sx={{
          ...handleStyle,
          bottom: -4,
          left: -4,
          width: 8,
          height: 8,
          cursor: "sw-resize",
        }}
        onMouseDown={() => onResizeStart?.("sw")}
      />
      <Box
        sx={{
          ...handleStyle,
          top: -4,
          right: -4,
          width: 8,
          height: 8,
          cursor: "ne-resize",
        }}
        onMouseDown={() => onResizeStart?.("ne")}
      />
      <Box
        sx={{
          ...handleStyle,
          top: -4,
          left: -4,
          width: 8,
          height: 8,
          cursor: "nw-resize",
        }}
        onMouseDown={() => onResizeStart?.("nw")}
      />
    </>
  );
};

export default ResizeHandlers;
