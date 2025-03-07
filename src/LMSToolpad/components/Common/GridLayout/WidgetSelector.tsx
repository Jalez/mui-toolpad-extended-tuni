import {
  IconButton,
  Tooltip,
  Dialog,
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { getWidget } from "./WidgetRegistry";

type WidgetSelectorProps = {
  onSelect: (id: string) => void;
  availableWidgets: string[];
};

const WidgetSelector = ({
  onSelect,
  availableWidgets,
}: WidgetSelectorProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (id: string) => {
    onSelect(id);
    setOpen(false);
  };

  const availableWidgetDetails = availableWidgets.map((id) => {
    const widget = getWidget(id);
    return {
      id,
      name: widget?.name || id,
      description: widget?.description,
      Icon: widget?.iconComponent,
      category: widget?.category,
    };
  });

  // Group widgets by category
  const widgetsByCategory = availableWidgetDetails.reduce(
    (acc, widget) => {
      const category = widget.category || "Other";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(widget);
      return acc;
    },
    {} as Record<string, typeof availableWidgetDetails>
  );

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

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Add Widget
          </Typography>
          {availableWidgets.length > 0 ? (
            Object.entries(widgetsByCategory).map(([category, widgets]) => (
              <Box key={category} sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  {category}
                </Typography>
                <List>
                  {widgets.map(({ id, name, description, Icon }) => (
                    <ListItem key={id} disablePadding>
                      <ListItemButton onClick={() => handleSelect(id)}>
                        {Icon && (
                          <ListItemIcon>
                            <Icon />
                          </ListItemIcon>
                        )}
                        <ListItemText primary={name} secondary={description} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))
          ) : (
            <Typography color="text.secondary">
              All available widgets are already on your dashboard.
            </Typography>
          )}
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default WidgetSelector;
