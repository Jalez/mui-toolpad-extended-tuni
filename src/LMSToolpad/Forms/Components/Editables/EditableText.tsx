/** @format */

import React, { useState } from "react";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

/**
 * EditableText Component
 *
 * @version 3.0.0
 * @breaking-changes
 * - Added disabled state support
 * - Enhanced layout with flex styling for better alignment
 * - Improved hover state handling
 * - Added justification controls for edit button
 *
 * A text field that can be toggled between read-only and edit modes.
 * In read-only mode, displays text with an edit button that appears on hover.
 * In edit mode, displays a text field for editing.
 *
 * @param {Object} props
 * @param {string} props.label - Label for the text field
 * @param {string} props.value - Current value
 * @param {function} props.onChange - Callback when value changes
 * @param {string} [props.helperText] - Helper text to display below the field
 * @param {boolean} [props.disabled] - Whether the field is disabled
 */
interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  multiline?: boolean;
  helperText?: string;
  disabled?: boolean;
}

const EditableText = ({
  value,
  onChange,
  label,
  multiline,
  helperText,
  disabled,
}: EditableTextProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (isEditing) {
    return (
      <TextField
        disabled={disabled}
        fullWidth
        value={value}
        label={label}
        multiline={multiline}
        rows={multiline ? 4 : 1}
        autoFocus
        onBlur={() => setIsEditing(false)}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {label}
      </Typography>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        {!disabled && (
          <IconButton
            size="small"
            onClick={() => setIsEditing(true)}
            sx={{
              //Make it still in the dom but invisible if not hovered
              opacity: isHovered ? 1 : 0,
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        )}

        <Typography variant={label === "Title" ? "h6" : "body1"}>
          {value || `No ${label.toLowerCase()} set`}
        </Typography>
      </Box>
      <Typography variant="caption" color="text.secondary">
        {helperText}
      </Typography>
    </Box>
  );
};

export default EditableText;
