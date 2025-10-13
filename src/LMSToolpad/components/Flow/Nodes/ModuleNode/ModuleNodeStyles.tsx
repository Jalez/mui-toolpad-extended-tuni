import { styled } from "@mui/material/styles";
import { Paper, Box, Typography } from "@mui/material";
import { Handle } from "@xyflow/react";

export const StyledModuleNode = styled(Paper, {
  shouldForwardProp: (prop) =>
    !["selected", "moduleColor"].includes(prop as string),
})<{ selected?: boolean; moduleColor: string }>(
  ({ theme, selected, moduleColor }) => ({
    width: "100%",
    height: "100%",
    minWidth: 300,
    minHeight: 150,
    padding: theme.spacing(1.25),
    position: "relative",
    backgroundColor: "transparent",
    border: `2px solid ${moduleColor}`,
    borderRadius: "8px",
    color: theme.palette.text.primary,
    transition: theme.transitions.create(["box-shadow", "transform"]),
    ...(selected && {
      boxShadow: `0 0 0 2px ${moduleColor}, 0 0 10px 2px ${moduleColor}`,
    }),
    elevation: selected ? 4 : 2,
  })
);

export const StyledModuleHandle = styled(Handle, {
  shouldForwardProp: (prop) => prop !== "moduleColor",
})<{ moduleColor: string }>(({ moduleColor }) => ({
  background: moduleColor,
  width: 8,
  height: 8,
}));

export const StyledModuleTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "moduleColor",
})<{ moduleColor: string }>(({ moduleColor }) => ({
  color: moduleColor,
  fontWeight: "bold",
}));

export const StyledResizeControl = styled(Box, {
  shouldForwardProp: (prop) =>
    !["selected", "moduleColor"].includes(prop as string),
})<{ selected?: boolean; moduleColor: string }>(
  ({ theme, selected, moduleColor }) => ({
    position: "absolute",
    right: -6,
    bottom: -6,
    width: 24,
    height: 24,
    bgcolor: selected ? moduleColor : theme.palette.grey[400],
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "nwse-resize",
    color: theme.palette.common.white,
    transition: theme.transitions.create(["transform", "background-color"]),
    "&:hover": {
      transform: "scale(1.1)",
      bgcolor: moduleColor,
    },
    boxShadow: theme.shadows[2],
  })
);
