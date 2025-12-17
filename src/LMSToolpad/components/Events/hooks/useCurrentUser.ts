/** @format */

import { useState, useEffect } from "react";
import { userBus } from "../UserBus";
import type { UserData } from "../userTypes";

/**
 * Hook to get current user from UserBus
 * Automatically updates when user changes via UserBus events
 * 
 * @returns { user: UserData | null, isLoading: boolean }
 */
export const useCurrentUser = () => {
  const [user, setUser] = useState<UserData | null>(() => userBus.getCurrentUserSync());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Subscribe to user updates
    const unsubscribe = userBus.subscribeToUser((currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    // Check if we need to fetch user
    if (!user) {
      setIsLoading(true);
      // Try to get user from store if not in bus
      userBus.initializeFromStore();
      // If still no user, try fetching
      if (!userBus.getCurrentUserSync()) {
        userBus.getUser().finally(() => setIsLoading(false));
      }
    }

    return unsubscribe;
  }, []);

  return { user, isLoading };
};
