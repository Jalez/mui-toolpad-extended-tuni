/** @format */

// components/FormDialog.tsx

import React from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import useDialogStore from '../../store/useDialogStore';
import EduMLDialog from '../EduMLDialog';

interface FormDialogProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  children: React.ReactNode;
  submitText?: string;
  disableSubmit?: boolean;
}
//omit open from DialogProps
const FormDialog: React.FC<FormDialogProps> = ({
  onSubmit,
  title,
  children,
  submitText = 'Submit',
  disableSubmit = false,
  ...dialogProps
}) => {
  const { closeDialog } = useDialogStore();

  return (
    <EduMLDialog open={true} onClose={closeDialog} {...dialogProps}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <form onSubmit={onSubmit}>
          {children}
          <DialogActions>
            <Button onClick={closeDialog}>Cancel</Button>
            <Button type='submit' disabled={disableSubmit}>
              {submitText}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </EduMLDialog>
  );
};

export default FormDialog;
