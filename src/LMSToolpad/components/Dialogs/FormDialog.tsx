/** @format */

// components/FormDialog.tsx

import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogProps,
  IconButton,
  Dialog,
  DialogContentText,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useDialogStore from '../../store/useDialogStore';
import EduMLDialog from '../EduMLDialog';
import { Box } from '@mui/system';
import { useState } from 'react';

interface FormDialogProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  children: React.ReactNode;
  submitText?: string;
  disableSubmit?: boolean;
  maxWidth?: DialogProps['maxWidth'];
  fullWidth?: boolean;
  showUnsavedChangesWarning?: boolean;
  isDirty?: boolean;
}

const FormDialog: React.FC<FormDialogProps> = ({
  onSubmit,
  title,
  children,
  submitText = 'Submit',
  disableSubmit = false,
  showUnsavedChangesWarning = false,
  isDirty = false,
  ...dialogProps
}) => {
  const { closeDialog } = useDialogStore();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleClose = () => {
    if (showUnsavedChangesWarning && isDirty) {
      setShowConfirmDialog(true);
    } else {
      closeDialog();
    }
  };

  const handleConfirmClose = () => {
    setShowConfirmDialog(false);
    closeDialog();
  };

  return (
    <>
      <EduMLDialog open={true} onClose={handleClose} {...dialogProps}>
        <DialogTitle sx={{ m: 0, p: 2, pr: 6 }}>
          {title}
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            p: '24px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
          }}>
          <form
            onSubmit={onSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              minHeight: 0,
            }}>
            <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
              {children}
            </Box>
            <DialogActions
              sx={{
                px: 0,
                // py: 2,
                borderTop: 1,
                borderColor: 'divider',
                // mt: 2,
                m: 0,
                p: 0,
              }}>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type='submit' disabled={!isDirty || disableSubmit}>
                {submitText}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </EduMLDialog>

      <Dialog
        open={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}>
        <DialogTitle>Unsaved Changes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have unsaved changes. Are you sure you want to close?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmClose} color='warning'>
            Close Without Saving
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FormDialog;
