/** @format */

import { Tooltip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import useGridLayout from "../useGridLayout";

/**
 * Toggles edit mode for the grid layout system.
 * This activates both resize and move functionality at once.
 */
const EditModeToggler = () => {
  const { editMode, toggleEditMode } = useGridLayout();

  const handleClick = () => {
    console.log("Toggling edit mode, current:", editMode);
    toggleEditMode();
  };

  return (
    <Tooltip title={editMode ? "Exit Edit Mode" : "Enter Edit Mode"}>
      <IconButton
        onClick={handleClick}
        size="small"
        color={editMode ? "primary" : "default"}
        sx={{
          border: editMode ? "1px solid" : "none",
          "&:hover": {
            backgroundColor: editMode ? "rgba(25, 118, 210, 0.08)" : undefined,
          },
        }}
      >
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};

export default EditModeToggler;
