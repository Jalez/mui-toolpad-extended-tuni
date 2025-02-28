/** @format */

import { IconButton, Tooltip } from "@mui/material";
import { usePanelStore } from "../../GridLayout/store/usePanelStore";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

const MoveToggler = () => {
  const { moveMode, toggleMoveMode } = usePanelStore();

  return (
    <Tooltip title={moveMode ? "Exit Move Mode" : "Enter Move Mode"}>
      <IconButton
        size="small"
        // onClick={toggleMoveMode}
        onClick={toggleMoveMode}
        color={moveMode ? "primary" : "default"}
      >
        <CompareArrowsIcon />
      </IconButton>
    </Tooltip>
  );
};

export default MoveToggler;
