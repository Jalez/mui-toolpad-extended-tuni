import {
  IconButton,
  Tooltip,
  Dialog,
  Box,
  Button,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

type WidgetSelectorProps = {
  onSelect: (id: string) => void;
  availableWidgets: string[];
};
const WidgetSelector = ({
  onSelect,
  availableWidgets,
}: WidgetSelectorProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip title="Add Widget">
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            right: 20,
            bottom: 20,
            bgcolor: "primary.main",
            color: "primary.contrastText",
            "&:hover": { bgcolor: "primary.dark" },
            zIndex: 1000,
          }}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box sx={{ p: 3, minWidth: 300 }}>
          <Typography variant="h6" gutterBottom>
            Add Widget
          </Typography>
          {availableWidgets.length > 0 ? (
            availableWidgets.map((id) => (
              <Button
                key={id}
                variant="outlined"
                sx={{ m: 1 }}
                onClick={() => {
                  onSelect(id);
                  setOpen(false);
                }}
              >
                {id}
              </Button>
            ))
          ) : (
            <p>All available widgets are already on your dashboard.</p>
          )}
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default WidgetSelector;
