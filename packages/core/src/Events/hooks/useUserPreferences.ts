/** @format */

import { useState, useEffect } from "react";
import { userBus } from "../UserBus";

export interface UserPreferences {
  navigationType: "direct" | "instances";
  visibleCourseLists: {
    isStudent: boolean;
    isStudentOld: boolean;
    isTeacher: boolean;
    isTeacherOld: boolean;
    available: boolean;
  };
  lastVisitedCourses: string[];
  visibleNavigation: string[];
}

/**
 * Hook to get user preferences from UserBus
 * Automatically updates when user preferences change via UserBus events
 * 
 * @returns { preferences: UserPreferences | null }
 */
export const useUserPreferences = () => {
  const [preferences, setPreferences] = useState<UserPreferences | null>(() => {
    const user = userBus.getCurrentUserSync();
    return user?.preferences || null;
  });

  useEffect(() => {
    // Subscribe to user updates
    const unsubscribe = userBus.subscribeToUser((user) => {
      setPreferences(user?.preferences || null);
    });

    return unsubscribe;
  }, []);

  return { preferences };
};
