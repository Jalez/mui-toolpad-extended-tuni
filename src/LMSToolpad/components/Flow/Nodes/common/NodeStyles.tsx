import { styled } from "@mui/material/styles";
import { Box, Paper, Typography } from "@mui/material";
import { Handle } from "@xyflow/react";

// Common type for color props
type ColorProps = {
  color: string;
};

type SelectableProps = {
  selected?: boolean;
};

// Base styles for all node containers
export const BaseNodeContainer = styled(Paper, {
  shouldForwardProp: (prop) => !["selected", "color"].includes(prop as string),
})<ColorProps & SelectableProps>(({ theme, color, selected }) => ({
  position: "relative",
  borderRadius: "8px",
  backgroundColor: "transparent",
  border: "0.5em solid",
  borderColor: selected ? color : theme.palette.divider,
  color: theme.palette.text.primary,
  width: "100%",
  height: "100%",
  minWidth: 300,
  minHeight: 150,
  transition: theme.transitions.create(["box-shadow", "transform"]),
  boxShadow: selected
    ? `0 0 0 2px ${color}, 0 0 10px 2px ${color}`
    : theme.shadows[2],
  "& .react-flow__handle": {
    opacity: 0.8,
    visibility: "visible",
    zIndex: 1000,
    background: color,
    border: "none",
    width: 8,
    height: 8,
    transition: theme.transitions.create(["opacity", "background-color"]),
    "&:hover": {
      opacity: 1,
    },
  },
}));

// Common node handle component
export const StyledHandle = styled(Handle, {
  shouldForwardProp: (prop) => prop !== "color",
})<ColorProps>(({ theme, color }) => ({
  background: color,
  width: 8,
  height: 8,
  opacity: 0.8,
  transition: theme.transitions.create(["opacity", "background-color"]),
  "&:hover": {
    opacity: 1,
  },
}));

// Common resize control component
export const StyledResizeControl = styled(Box, {
  shouldForwardProp: (prop) => !["selected", "color"].includes(prop as string),
})<ColorProps & SelectableProps>(({ theme, color, selected }) => ({
  position: "absolute",
  right: -6,
  bottom: -6,
  width: 24,
  height: 24,
  bgcolor: selected ? color : theme.palette.grey[400],
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "nwse-resize",
  color: theme.palette.common.white,
  transition: theme.transitions.create(["transform", "background-color"]),
  "&:hover": {
    transform: "scale(1.1)",
    bgcolor: color,
  },
  boxShadow: theme.shadows[2],
}));

// Common styled typography for titles
export const StyledTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "color",
})<ColorProps>(({ color }) => ({
  color,
  fontWeight: "bold",
}));
