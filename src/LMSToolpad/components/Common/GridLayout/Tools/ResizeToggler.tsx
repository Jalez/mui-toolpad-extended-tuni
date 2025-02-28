/** @format */

import { Tooltip, IconButton } from "@mui/material";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import useGridLayout from "../useGridLayout";

/**
 * Toggles resize mode for the grid layout system.
 */
const ResizeToggler = () => {
  const { resizeMode, toggleResizeMode } = useGridLayout();

  const handleClick = () => {
    console.log("Toggling resize mode, current:", resizeMode);
    toggleResizeMode();
  };

  return (
    <Tooltip title={resizeMode ? "Exit Resize Mode" : "Enter Resize Mode"}>
      <IconButton
        onClick={handleClick}
        size="small"
        color={resizeMode ? "primary" : "default"}
        sx={{
          border: resizeMode ? "1px solid" : "none",
          "&:hover": {
            backgroundColor: resizeMode
              ? "rgba(25, 118, 210, 0.08)"
              : undefined,
          },
        }}
      >
        <AspectRatioIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ResizeToggler;
