/** @format */

import { Button, MenuItem } from '@mui/material';

import React from 'react';
import useDialogStore, { dialogType } from '../../store/useDialogStore';
import { iconByType } from '../tools/iconsByType';

type DialogOpenerProps = {
  title: string;
  dialogId: dialogType;
  callOnOpen?: (
    event: React.MouseEvent<HTMLButtonElement | HTMLElement>
  ) => void;
  showTitle?: boolean;
};

const DialogOpener = ({
  title,
  dialogId,
  callOnOpen,
  showTitle = true,
}: DialogOpenerProps) => {
  const { setOpenDialog } = useDialogStore();

  const openDialog = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setOpenDialog(dialogId);
    if (callOnOpen) callOnOpen(event);
  };

  return (
    <MenuItem
      component={Button}
      onClick={openDialog}
      //   variant="contained"
      style={{
        marginLeft: 'auto',
        zIndex: 1000,
        width: '100%',
        display: 'flex',
        justifyContent: 'left',
        columnGap: 2,
      }}>
      {iconByType[title.toLowerCase()]} {showTitle && title}
    </MenuItem>
  );
};

export default DialogOpener;
