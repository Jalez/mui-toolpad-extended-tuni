/** @format */

import { Button, MenuItem } from '@mui/material';

// Dialog store and icon utilities should be provided by the consuming application
// These are placeholders that can be overridden via props or context
type dialogType = string;

type DialogOpenerProps = {
  title: string;
  dialogId: dialogType;
  callOnOpen?: (
    event: React.MouseEvent<HTMLButtonElement | HTMLElement>
  ) => void;
  showTitle?: boolean;
  onOpenDialog?: (dialogId: string) => void;
  icon?: React.ReactNode;
};

const DialogOpener = ({
  title,
  dialogId,
  callOnOpen,
  showTitle = true,
  onOpenDialog,
  icon,
}: DialogOpenerProps) => {
  const openDialog = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    if (onOpenDialog) {
      onOpenDialog(dialogId);
    } else {
      console.warn('DialogOpener: onOpenDialog prop not provided. Please provide a dialog store handler.');
    }
    if (callOnOpen) callOnOpen(event);
  };

  return (
    <MenuItem
      component={Button}
      onClick={openDialog}
      style={{
        marginLeft: 'auto',
        zIndex: 1000,
        width: '100%',
        display: 'flex',
        justifyContent: 'left',
        columnGap: 2,
      }}>
      {icon} {showTitle && title}
    </MenuItem>
  );
};

export default DialogOpener;
