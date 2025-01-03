/** @format */

import { Dialog } from '@mui/material';
import { ReactNode } from 'react';

type EduMLDialogProps = {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
};
const EduMLDialog = ({
  children,
  open,
  onClose,
  ...dialogProps
}: EduMLDialogProps) => {
  const isMobile = window.innerWidth < 600;
  return (
    <Dialog
      //If mobile, dont round corners
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: isMobile ? '0px !important' : '14px',
        },
      }}
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      {...dialogProps}>
      {children}
    </Dialog>
  );
};

export default EduMLDialog;
