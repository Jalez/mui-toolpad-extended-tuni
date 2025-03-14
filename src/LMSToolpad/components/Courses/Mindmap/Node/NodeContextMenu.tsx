import { Menu, MenuItem } from "@mui/material";

interface NodeContextMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onAddParent: () => void;
  onAddChild: () => void;
  onDelete: () => void;
}

export const NodeContextMenu = ({
  anchorEl,
  onClose,
  onAddParent,
  onAddChild,
  onDelete,
}: NodeContextMenuProps) => {
  const handleAction = (action: () => void) => {
    action();
    onClose();
  };

  return (
    <Menu
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <MenuItem onClick={() => handleAction(onAddParent)}>Add Parent</MenuItem>
      <MenuItem onClick={() => handleAction(onAddChild)}>Add Child</MenuItem>
      <MenuItem
        onClick={() => handleAction(onDelete)}
        sx={{ color: "error.main" }}
      >
        Delete Node
      </MenuItem>
    </Menu>
  );
};
