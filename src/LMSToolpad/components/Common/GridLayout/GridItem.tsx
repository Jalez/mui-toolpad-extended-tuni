/** @format */

import React, { ReactNode } from "react";
import { Box, useTheme } from "@mui/material";
import useGridLayout from "./useGridLayout";

export interface GridItemProps {
  children: ReactNode;
  id: string;
  isFlexContainer?: boolean;
}

/**
 * Grid item component that applies consistent styling and resize visual feedback.
 *
 * Features:
 * - Visual indication when in resize or move mode
 * - Consistent styling for all grid items
 * - Optional flex container for content that needs to fill the space
 */
const GridItem: React.FC<GridItemProps> = ({
  children,
  id,
  isFlexContainer = false,
}) => {
  const theme = useTheme();
  const { editMode } = useGridLayout();

  return (
    <Box
      data-grid-item-id={id}
      sx={{
        bgcolor: theme.palette.background.default,
        borderRadius: 1,
        boxShadow: 1,
        overflow: "hidden",
        p: 1,
        // height: "100%",
        display: isFlexContainer ? "flex" : "block",
        flexDirection: isFlexContainer ? "column" : "initial",
        // Add visual indication when in edit mode
        outline: editMode ? `2px dashed ${theme.palette.primary.main}` : "none",
        transition: "outline 0.2s ease-in-out",
        position: "relative", // For proper positioning of tools
        "&:hover": {
          outline: editMode
            ? `2px solid ${theme.palette.primary.main}`
            : "none",
        },
      }}
    >
      {children}
    </Box>
  );
};

export default GridItem;
