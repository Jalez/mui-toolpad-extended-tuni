import { useState, useEffect, useCallback } from "react";
import { useNotificationStore } from "../components/Notifications/store/useNotificationsStore";

interface UseRetryProps {
  action: () => Promise<any> | void;
  maxAttempts?: number;
  delay?: number;
  successMessage?: string;
  errorMessage?: string;
  condition?: boolean;
}

export const useRetry = ({
  action,
  maxAttempts = 3,
  delay = 1000,
  successMessage = "Operation successful",
  errorMessage = "Operation failed, retrying...",
  condition = true,
}: UseRetryProps) => {
  const [attempts, setAttempts] = useState(0);
  const { addNotificationData } = useNotificationStore();

  const retry = useCallback(() => {
    if (condition && attempts < maxAttempts) {
      if (attempts >= 1) {
        addNotificationData({
          type: "error",
          message: errorMessage,
        });
      }

      const timeOut = setTimeout(() => {
        action();
        setAttempts((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timeOut);
    } else if (attempts >= maxAttempts) {
      addNotificationData({
        type: "error",
        message: "Maximum retry attempts reached. Please try again later.",
      });
    } else if (!condition) {
      addNotificationData({
        type: "success",
        message: successMessage,
      });
    }
  }, [
    action,
    attempts,
    condition,
    maxAttempts,
    delay,
    errorMessage,
    successMessage,
  ]);

  useEffect(() => {
    return retry();
  }, [retry]);

  return { attempts };
};
