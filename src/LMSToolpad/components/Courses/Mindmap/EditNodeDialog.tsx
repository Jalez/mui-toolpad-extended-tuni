/** @format */
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { EditNodeDialogProps } from "./types";

export const EditNodeDialog = ({
  open,
  onClose,
  onSave,
  initialLabel,
  initialDetails,
}: EditNodeDialogProps) => {
  const [label, setLabel] = useState(initialLabel);
  const [details, setDetails] = useState(initialDetails);

  useEffect(() => {
    setLabel(initialLabel);
    setDetails(initialDetails);
  }, [initialLabel, initialDetails]);

  const handleSave = () => {
    onSave(label, details);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Node</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Label"
          fullWidth
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Details"
          fullWidth
          multiline
          rows={4}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
