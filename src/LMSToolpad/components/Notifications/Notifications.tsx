/** @format */

import { useEffect, useState, useRef } from "react";
import {
  SnackbarKey,
  VariantType,
  closeSnackbar,
  useSnackbar,
} from "notistack";
import { useNotificationStore } from "./store/useNotificationsStore";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, CircularProgress } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

const NOTIFICATION_DURATION = 6000; // 6 seconds in milliseconds

const CircularProgressAction = ({
  notificationKey,
}: {
  notificationKey: SnackbarKey;
}) => {
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();
  const startTimeRef = useRef<number>(Date.now());
  const elapsedRef = useRef<number>(0);

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        elapsedRef.current += Date.now() - startTimeRef.current;
      }
      return;
    }

    startTimeRef.current = Date.now();

    timerRef.current = setInterval(() => {
      const totalElapsed =
        elapsedRef.current + (Date.now() - startTimeRef.current);
      const remaining = Math.max(
        0,
        100 * (1 - totalElapsed / NOTIFICATION_DURATION)
      );
      setProgress(remaining);

      if (remaining <= 0) {
        clearInterval(timerRef.current);
        closeSnackbar(notificationKey);
      }
    }, 50);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused, notificationKey]);

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        mr: 1,
      }}
    >
      <CircularProgress
        variant="determinate"
        value={progress}
        size={24}
        sx={{ color: "rgba(255, 255, 255, 0.7)" }}
      />
      <IconButton
        size="small"
        onClick={() => setIsPaused(!isPaused)}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "rgba(255, 255, 255, 0.7)",
          padding: 0,
          "&:hover": { color: "white" },
          width: 16,
          height: 16,
        }}
      >
        {isPaused ? (
          <PlayArrowIcon sx={{ fontSize: 12 }} />
        ) : (
          <PauseIcon sx={{ fontSize: 12 }} />
        )}
      </IconButton>
    </Box>
  );
};

const closeAction = (key: SnackbarKey) => (
  <IconButton
    onClick={() => {
      closeSnackbar(key);
    }}
  >
    <CloseIcon />
  </IconButton>
);

const createActions = (key: SnackbarKey) => (
  <Box sx={{ display: "flex", alignItems: "center" }}>
    <CircularProgressAction notificationKey={key} />
    {closeAction(key)}
  </Box>
);

const Notifications = () => {
  const { notifications, removeNotificationData } = useNotificationStore();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (notifications.length > 0) {
      notifications.forEach((notification) => {
        enqueueSnackbar(notification.message, {
          variant: notification.type as VariantType,
          action: createActions,
          autoHideDuration: null, // Explicitly disable auto-hiding
          persist: true, // Add this to ensure notification stays until we close it
        });
        removeNotificationData(Number(notification.id));
      });
    }
  }, [notifications, enqueueSnackbar, removeNotificationData]);

  return <></>;
};

export default Notifications;
