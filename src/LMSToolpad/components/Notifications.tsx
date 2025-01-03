/** @format */

import { useEffect } from 'react';

import {
  SnackbarKey,
  VariantType,
  closeSnackbar,
  useSnackbar,
} from 'notistack';
import { useNotificationStore } from '../store/useNotificationsStore';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

//create a close button action with close icon from material ui
const closeAction = (key: SnackbarKey) => (
  <IconButton
    onClick={() => {
      //close the notification
      closeSnackbar(key);
    }}>
    <CloseIcon />
  </IconButton>
);
const Notifications = () => {
  const { notifications, removeNotificationData } = useNotificationStore();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (notifications.length > 0) {
      // setOpen(true);
      notifications.forEach((notification) => {
        enqueueSnackbar(notification.message, {
          variant: notification.type as VariantType,
          action: closeAction,
        });
        removeNotificationData(Number(notification.id));
      });
    }
  }, [notifications, enqueueSnackbar, removeNotificationData]);

  return <></>;
};

export default Notifications;
