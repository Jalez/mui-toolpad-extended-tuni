/** @format */
import React from "react";
import { Box } from "@mui/material";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import { useReactFlow } from "@xyflow/react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

interface NavigationControlsProps {
  onFitView: () => void;
  onCenterSelected: () => void;
  onToggleFullscreen: () => void;
  onToggleShortcuts: () => void;
  showShortcuts: boolean;
}

interface ControlButtonProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
}

const ControlButton: React.FC<ControlButtonProps> = ({
  title,
  icon,
  onClick,
  disabled,
  active,
}) => (
  <Tooltip title={title}>
    <span>
      <IconButton
        onClick={onClick}
        disabled={disabled}
        color={active ? "primary" : "default"}
        size="small"
      >
        {icon}
      </IconButton>
    </span>
  </Tooltip>
);

const NavigationControls: React.FC<NavigationControlsProps> = ({
  onFitView,
  onCenterSelected,
  onToggleFullscreen,
  onToggleShortcuts,
  showShortcuts,
}) => {
  const { getNodes } = useReactFlow();
  const hasSelectedNodes =
    getNodes().filter((node) => node.selected).length > 0;

  const controls = [
    {
      title: "Fit View",
      icon: <FitScreenIcon />,
      onClick: onFitView,
    },
    {
      title: "Center Selected",
      icon: <CenterFocusStrongIcon />,
      onClick: onCenterSelected,
      disabled: !hasSelectedNodes,
      active: hasSelectedNodes,
    },
    {
      title: "Toggle Fullscreen",
      icon: <OpenInFullIcon />,
      onClick: onToggleFullscreen,
    },
    {
      title: "Toggle Shortcuts",
      icon: <KeyboardIcon />,
      onClick: onToggleShortcuts,
      active: showShortcuts,
    },
  ];

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {controls.map((control) => (
        <ControlButton key={control.title} {...control} />
      ))}
    </Box>
  );
};

export default NavigationControls;
