/** @format */
import { useState } from "react";
import { Controls } from "reactflow";
import { IconButton, Tooltip, Menu, MenuItem } from "@mui/material";
import GridOnIcon from "@mui/icons-material/GridOn";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import { useTheme } from "@mui/material/styles";

interface MindmapControlsProps {
  showGrid: boolean;
  setShowGrid: (show: boolean) => void;
  snapToGrid: boolean;
  setSnapToGrid: (snap: boolean) => void;
  onApplyLayout: (
    layoutType: "default" | "horizontal" | "vertical" | "radial"
  ) => void;
}

export const MindmapControls = ({
  showGrid,
  setShowGrid,
  snapToGrid,
  setSnapToGrid,
  onApplyLayout,
}: MindmapControlsProps) => {
  const theme = useTheme();
  const [layoutMenuAnchor, setLayoutMenuAnchor] = useState<null | HTMLElement>(
    null
  );

  return (
    <>
      <Controls showInteractive={true}>
        <Tooltip title="Toggle Grid">
          <IconButton
            onClick={() => setShowGrid(!showGrid)}
            size="small"
            sx={{
              backgroundColor: theme.palette.background.paper,
              color: showGrid
                ? theme.palette.primary.main
                : theme.palette.text.secondary,
            }}
          >
            <GridOnIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Change Layout">
          <IconButton
            onClick={(e) => setLayoutMenuAnchor(e.currentTarget)}
            size="small"
            sx={{
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.secondary,
            }}
          >
            <ViewQuiltIcon />
          </IconButton>
        </Tooltip>
      </Controls>

      <Menu
        anchorEl={layoutMenuAnchor}
        open={Boolean(layoutMenuAnchor)}
        onClose={() => setLayoutMenuAnchor(null)}
      >
        <MenuItem
          onClick={() => {
            onApplyLayout("default");
            setLayoutMenuAnchor(null);
          }}
        >
          Force-Directed
        </MenuItem>
        <MenuItem
          onClick={() => {
            onApplyLayout("horizontal");
            setLayoutMenuAnchor(null);
          }}
        >
          Horizontal Tree
        </MenuItem>
        <MenuItem
          onClick={() => {
            onApplyLayout("vertical");
            setLayoutMenuAnchor(null);
          }}
        >
          Vertical Tree
        </MenuItem>
        <MenuItem
          onClick={() => {
            onApplyLayout("radial");
            setLayoutMenuAnchor(null);
          }}
        >
          Radial
        </MenuItem>
        <MenuItem
          onClick={() => {
            setSnapToGrid(!snapToGrid);
            setLayoutMenuAnchor(null);
          }}
        >
          {snapToGrid ? "✓ Snap to Grid" : "Snap to Grid"}
        </MenuItem>
      </Menu>
    </>
  );
};
