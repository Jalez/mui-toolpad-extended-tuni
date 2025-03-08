/** @format */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Node } from "reactflow";

interface NodeSelectionDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (nodeId: string) => void;
  nodes: Node[];
  title: string;
  description?: string;
}

export const NodeSelectionDialog = ({
  open,
  onClose,
  onSelect,
  nodes,
  title,
  description,
}: NodeSelectionDialogProps) => {
  // Immediately select node on click
  const handleNodeClick = (nodeId: string) => {
    onSelect(nodeId);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {description}
          </Typography>
        )}
        <List sx={{ pt: 0 }}>
          {nodes.map((node) => (
            <ListItem key={node.id} disablePadding>
              <ListItemButton
                onClick={() => handleNodeClick(node.id)}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <ListItemText
                  primary={node.data.label || node.id}
                  secondary={
                    node.data.details
                      ? node.data.details.substring(0, 60) +
                        (node.data.details.length > 60 ? "..." : "")
                      : null
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};
