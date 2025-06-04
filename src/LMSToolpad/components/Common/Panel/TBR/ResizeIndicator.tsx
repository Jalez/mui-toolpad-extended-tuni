/** @format */

import React from "react";
import { Box } from "@mui/material";

interface ResizeIndicatorProps {
  isResizing: boolean;
  direction?: string;
}

/**
 * Visual indicator shown when a panel is being resized
 */
const ResizeIndicator: React.FC<ResizeIndicatorProps> = ({
  isResizing,
  direction = "se",
}) => {
  if (!isResizing) return null;

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        border: "2px dashed",
        borderColor: "primary.main",
        pointerEvents: "none",
        zIndex: 1000,
        borderRadius: 1,
      }}
    />
  );
};

export default ResizeIndicator;
