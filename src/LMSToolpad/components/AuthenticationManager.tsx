import { useEffect } from "react";
import { useCurrentUser, useUserActions, useRetry } from "@mui-toolpad-extended-tuni/core";

const AuthenticationManager = () => {
  const { user } = useCurrentUser();
  const { getUser } = useUserActions();

  // Use the retry hook for fetching user
  useRetry({
    action: getUser,
    condition: !user?.platformRoles,
    successMessage: "User authenticated successfully",
    errorMessage: "Failed to get user platform role",
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




  return null; // This is a manager component, no UI needed
};

export default AuthenticationManager;
