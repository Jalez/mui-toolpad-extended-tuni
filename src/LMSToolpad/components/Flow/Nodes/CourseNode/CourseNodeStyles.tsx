import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { Handle } from "@xyflow/react";

export const StyledBaseNode = styled(Box, {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected?: boolean }>(({ theme, selected }) => ({
  position: "relative",
  borderRadius: "8px",
  border: "0.5em solid",
  borderColor: selected ? theme.palette.primary.main : theme.palette.divider,
  padding: theme.spacing(2.5),
  color: theme.palette.text.primary,
  transition: "all 0.2s ease-in-out",
  width: "100%",
  height: "100%",
  minWidth: 300,
  minHeight: 200,
  boxShadow: selected
    ? `0 0 0 2px ${theme.palette.primary.main}`
    : theme.shadows[2],
  "& .react-flow__handle": {
    opacity: 1,
    visibility: "visible",
    zIndex: 1000,
    background: theme.palette.primary.main,
    border: "none",
    width: 8,
    height: 8,
  },
}));

export const StyledNodeHandle = styled(Handle)(({ theme }) => ({
  opacity: 0.8,
  transition: theme.transitions.create(["opacity", "background-color"]),
  "&:hover": {
    opacity: 1,
  },
}));

export const StyledGroupNodeLabel = styled(Box)({
  width: "100%",
  height: "100%",
});

export const StyledResizeControl = styled(Box, {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected?: boolean }>(({ theme, selected }) => ({
  position: "absolute",
  right: -6,
  bottom: -6,
  width: 24,
  height: 24,
  bgcolor: selected ? theme.palette.primary.main : theme.palette.grey[400],
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "nwse-resize",
  color: "white",
  transition: theme.transitions.create(["transform", "background-color"]),
  "&:hover": {
    transform: "scale(1.1)",
    bgcolor: theme.palette.primary.main,
  },
  boxShadow: theme.shadows[2],
}));
