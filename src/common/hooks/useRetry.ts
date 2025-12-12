import { useState, useEffect, useCallback } from "react";
import { useNotificationStore } from "../../LMSToolpad/components/Notifications/store/useNotificationsStore";

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
  const { addNotificationData, clearNotificationsByType } = useNotificationStore();

  const retry = useCallback(() => {
    if (condition && attempts < maxAttempts) {
      // Don't show error messages during retries, just retry the action
      const timeOut = setTimeout(() => {
        action();
        setAttempts((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timeOut);
    } else if (attempts >= maxAttempts) {
      // Only show error message when all retries have failed
      addNotificationData({
        type: "error",
        message: errorMessage,
      });
    } else if (!condition) {
      // Clear any existing error notifications before showing success
      clearNotificationsByType("error");
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
    clearNotificationsByType,
  ]);

  useEffect(() => {
    return retry();
  }, [retry]);

  return { attempts };
};
