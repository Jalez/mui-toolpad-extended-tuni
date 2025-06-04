import { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { useNotificationStore } from "./Notifications/store/useNotificationsStore";
import useCourseStore from "./Courses/store/useCourseStore";
import { useRetry } from "../hooks/useRetry";

const AuthenticationManager = () => {
  const [loggingIn, setLoggingIn] = useState(false);
  const { user, getUser, logout } = useUserStore();
  const { currentCourse } = useCourseStore();
  const { addNotificationData } = useNotificationStore();
  const [parentUrl, setParentUrl] = useState<string | null>(null);

  // Use the retry hook for fetching user
  useRetry({
    action: getUser,
    condition: !user?.platformRoles,
    successMessage: "User authenticated successfully",
    errorMessage: "Failed to get user platform role, retrying...",
  });

  // Handle return from authentication
  useEffect(() => {
    if (user?.id) {
      const returnLocation = localStorage.getItem("returnLocation");
      if (returnLocation) {
        localStorage.removeItem("returnLocation");
        window.location.href = returnLocation;
      }
    }
  }, [user]);

  // Listen for parent frame URL messages
  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      const { url } = event.data;
      if (url) {
        setParentUrl(url);
      }
    };

    window.addEventListener("message", messageHandler);
    return () => window.removeEventListener("message", messageHandler);
  }, []);

  const handleLogin = () => {
    const current = window?.top || window;
    setLoggingIn(true);
    localStorage.setItem("returnLocation", parentUrl || window.location.href);

    const loginUrl = currentCourse?.ltiLoginUrl;
    if (loginUrl) {
      current.location.href = loginUrl;
    } else {
      if (!currentCourse?.id) {
        addNotificationData({
          type: "error",
          message: "Failed to login. Please select a course first.",
        });
      } else {
        addNotificationData({
          type: "error",
          message: "Login is not available. Please contact the course staff.",
        });
      }
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      addNotificationData({
        type: "error",
        message: "Failed to logout. Please try again.",
      });
    }
  };

  return null; // This is a manager component, no UI needed
};

export default AuthenticationManager;
