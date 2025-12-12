import { useEffect } from "react";
import { useUserStore } from "../store/useUserStore";
import { useRetry } from "../../common/hooks/useRetry";

const AuthenticationManager = () => {
  const { user, getUser } = useUserStore();

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
