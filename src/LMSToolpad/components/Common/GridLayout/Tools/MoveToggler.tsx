/** @format */

import React from "react";
import { Tooltip, IconButton } from "@mui/material";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import useGridLayout from "../useGridLayout";

/**
 * Toggles move mode for the grid layout system.
 */
const MoveToggler = () => {
  const { moveMode, toggleMoveMode } = useGridLayout();

  const handleClick = () => {
    console.log("Toggling move mode, current:", moveMode);
    toggleMoveMode();
  };

  return (
    <Tooltip title={moveMode ? "Exit Move Mode" : "Enter Move Mode"}>
      <IconButton
        onClick={handleClick}
        size="small"
        color={moveMode ? "primary" : "default"}
        sx={{
          border: moveMode ? "1px solid" : "none",
          "&:hover": {
            backgroundColor: moveMode ? "rgba(25, 118, 210, 0.08)" : undefined,
          },
        }}
      >
        <OpenWithIcon />
      </IconButton>
    </Tooltip>
  );
};

export default MoveToggler;
