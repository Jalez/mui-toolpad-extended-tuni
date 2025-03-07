import { Box, IconButton } from "@mui/material";
import React, { memo, useCallback } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { getWidget } from "./WidgetRegistry";

interface GridItemProps {
  id: string;
  isEditable: boolean;
  onRemove?: (id: string) => void;
  handleAboutToRemove?: (value: boolean) => void;
}

const GridItem = ({
  id,
  isEditable,
  onRemove,
  handleAboutToRemove,
}: GridItemProps) => {
  const theme = useTheme();
  const widget = getWidget(id);

  if (!widget) {
    return null;
  }

  const { Component, props } = widget;

  // Handler for remove button - memoize to prevent recreation on every render
  const handleRemove = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (onRemove) onRemove(id);
      if (handleAboutToRemove) handleAboutToRemove(false);
    },
    [id, onRemove, handleAboutToRemove]
  );

  const handleMouseEnter = useCallback(() => {
    if (handleAboutToRemove) handleAboutToRemove(true);
  }, [handleAboutToRemove]);

  const handleMouseLeave = useCallback(() => {
    if (handleAboutToRemove) handleAboutToRemove(false);
  }, [handleAboutToRemove]);

  return (
    <>
      {isEditable && onRemove && (
        <IconButton
          onClick={handleRemove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          size="small"
          sx={{
            position: "absolute",
            top: 5,
            right: 5,
            zIndex: 9999,
            bgcolor: "background.paper",
            borderRadius: "50%",
            width: 24,
            height: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            pointerEvents: "auto", // This is critical - allows click events
            "&:hover": {
              bgcolor: "error.light",
              color: "error.contrastText",
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
      <Box
        sx={{

          borderRadius: 1,
          overflow: "hidden",
          position: "relative",
          outline: isEditable
            ? `2px dashed ${theme.palette.primary.main}`
            : "none",
          "&:hover": {
            outline: isEditable
              ? `2px solid ${theme.palette.primary.main}`
              : "none",
          },
          height: "100%",
          width: "100%",
        }}
      >
        <Box
          sx={{
            p: 0,
            m: 0,
            height: "100%",
            overflow: "hidden",
            userSelect: isEditable ? "none" : "auto",
            pointerEvents: isEditable ? "none" : "auto",
          }}
        >
          <Component {...props} />
        </Box>
      </Box>
    </>
  );
};

export default memo(GridItem);
