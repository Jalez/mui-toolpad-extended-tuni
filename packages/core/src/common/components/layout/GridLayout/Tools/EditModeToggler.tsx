/** @format */

import { Tooltip, IconButton, Divider, Box } from "@mui/material";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import usePanelStore from "../store/usePanelStore";
import BreakpointIndicator from "./BreakpointIndicator";

/**
 * Toggles edit mode for the grid layout system.
 * This activates both resize and move functionality at once.
 */
const EditModeToggler = () => {
  const { editMode, toggleEditMode } = usePanelStore();

  const handleClick = () => {
    toggleEditMode();
  };

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Tooltip title={editMode ? "Exit Layout Edit Mode" : "Edit Layout"}>
        <IconButton
          onClick={handleClick}
          size="small"
          color={editMode ? "primary" : "default"}
          sx={{
            border: editMode ? "1px solid" : "none",
            "&:hover": {
              backgroundColor: editMode
                ? "rgba(25, 118, 210, 0.08)"
                : undefined,
            },
          }}
        >
          <ViewModuleIcon />
        </IconButton>
        {/* {If its in edit mode, also show the breakpoint indicator} */}
      </Tooltip>
      {editMode && (
        <>
          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

          <BreakpointIndicator showLabel />
        </>
      )}
    </Box>
  );
};

export default EditModeToggler;
