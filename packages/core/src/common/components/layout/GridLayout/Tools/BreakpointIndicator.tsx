/** @format */
import React from "react";
import { useTheme, Tooltip, Chip, useMediaQuery } from "@mui/material";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import TabletIcon from "@mui/icons-material/Tablet";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { BREAKPOINT_INFO, BreakpointColor } from "../../../../../constants";

/**
 * Shows which responsive breakpoint is currently active
 */
const BreakpointIndicator: React.FC<{ showLabel?: boolean }> = ({
  showLabel = false,
}) => {
  const theme = useTheme();

  // Check current breakpoints using the shared constants
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));

  // Define which breakpoint is currently active
  let currentBreakpoint: keyof typeof BREAKPOINT_INFO;
  let icon: React.ReactNode;
  let color: BreakpointColor;

  if (isLg) {
    currentBreakpoint = "lg";
    icon = <DesktopWindowsIcon fontSize="small" />;
    color = BREAKPOINT_INFO.lg.color as BreakpointColor;
  } else if (isMd) {
    currentBreakpoint = "md";
    icon = <TabletIcon fontSize="small" />;
    color = BREAKPOINT_INFO.md.color as BreakpointColor;
  } else if (isSm) {
    currentBreakpoint = "sm";
    icon = <TabletIcon fontSize="small" sx={{ transform: "rotate(90deg)" }} />;
    color = BREAKPOINT_INFO.sm.color as BreakpointColor;
  } else {
    currentBreakpoint = "xs";
    icon = <PhoneIphoneIcon fontSize="small" />;
    color = BREAKPOINT_INFO.xs.color as BreakpointColor;
  }

  return (
    <Tooltip title={BREAKPOINT_INFO[currentBreakpoint].description}>
      <Chip
        icon={icon}
        label={showLabel ? currentBreakpoint.toUpperCase() : undefined}
        color={color}
        size="small"
        variant="outlined"
        sx={{
          height: 24,
          minWidth: showLabel ? 48 : 32,
          ".MuiChip-icon": {
            ml: showLabel ? undefined : "0px",
            mr: showLabel ? undefined : "-6px",
          },
        }}
      />
    </Tooltip>
  );
};

export default BreakpointIndicator;
