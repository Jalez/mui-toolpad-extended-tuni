/** @format */

import { useEffect, useRef } from "react";
import { useUserStore } from "./store/useUserStore";
import { userBus, UserEvent } from '@mui-toolpad-extended-tuni/main';
import { configureUserBus } from "./configureUserBus"; // Ensure UserBus is configured

/**
 * UserEventPublisher publishes user state changes to the UserBus.
 * This component converts user store changes to user events and publishes them.
 * It maintains separation by only knowing about users and the UserBus API.
 */
const UserEventPublisher: React.FC = () => {
  const { user } = useUserStore();
  const previousUserRef = useRef<typeof user>(null);

  // Initialize UserBus with current user on mount
  useEffect(() => {
    // Ensure UserBus is configured before using it
    configureUserBus();
    userBus.initializeFromStore();
  }, []);

  useEffect(() => {
    const currentUser = user;
    const previousUser = previousUserRef.current;

    // User logged in
    if (currentUser && !previousUser) {
      const event: UserEvent = {
        type: "user:loggedIn",
        user: currentUser,
        timestamp: new Date().toISOString(),
      };
      userBus.publish(event);
    }
    // User logged out
    else if (!currentUser && previousUser) {
      const event: UserEvent = {
        type: "user:loggedOut",
        user: null,
        timestamp: new Date().toISOString(),
      };
      userBus.publish(event);
    }
    // User updated
    else if (currentUser && previousUser && currentUser.id === previousUser.id) {
      // Check if preferences changed
      const preferencesChanged =
        JSON.stringify(currentUser.preferences) !==
        JSON.stringify(previousUser.preferences);

      if (preferencesChanged) {
        const changedPreferences: string[] = [];
        if (
          currentUser.preferences.navigationType !==
          previousUser.preferences.navigationType
        ) {
          changedPreferences.push("navigationType");
        }
        if (
          JSON.stringify(currentUser.preferences.visibleCourseLists) !==
          JSON.stringify(previousUser.preferences.visibleCourseLists)
        ) {
          changedPreferences.push("visibleCourseLists");
        }
        if (
          JSON.stringify(currentUser.preferences.visibleNavigation) !==
          JSON.stringify(previousUser.preferences.visibleNavigation)
        ) {
          changedPreferences.push("visibleNavigation");
        }
        if (
          JSON.stringify(currentUser.preferences.lastVisitedCourses) !==
          JSON.stringify(previousUser.preferences.lastVisitedCourses)
        ) {
          changedPreferences.push("lastVisitedCourses");
        }

        const event: UserEvent = {
          type: "user:preferencesChanged",
          user: currentUser,
          timestamp: new Date().toISOString(),
          metadata: { changedPreferences },
        };
        userBus.publish(event);
      }

      // Check if other user data changed (not just preferences)
      const userDataChanged =
        currentUser.name !== previousUser.name ||
        currentUser.email !== previousUser.email ||
        JSON.stringify(currentUser.privacySettings) !==
          JSON.stringify(previousUser.privacySettings) ||
        JSON.stringify(currentUser.gdprConsent) !==
          JSON.stringify(previousUser.gdprConsent) ||
        JSON.stringify(currentUser.dataRetention) !==
          JSON.stringify(previousUser.dataRetention) ||
        JSON.stringify(currentUser.platformRoles) !==
          JSON.stringify(previousUser.platformRoles);

      if (userDataChanged && !preferencesChanged) {
        const event: UserEvent = {
          type: "user:updated",
          user: currentUser,
          timestamp: new Date().toISOString(),
          metadata: { previousUser },
        };
        userBus.publish(event);
      }
    }

    // Update ref for next comparison
    previousUserRef.current = currentUser;
  }, [user]);

  return null; // This component doesn't render anything
};

export default UserEventPublisher;
