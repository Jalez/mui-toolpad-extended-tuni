/** @format */
import { useEffect, useRef } from "react";
import { useUserStore } from "../../store/useUserStore";
import { useNavigationFilterStore } from "./store/useNavigationFilterStore";
import { useNavigationStore } from "./store/useNavigationStore";

export const useSyncNavigationFilters = () => {
  const { user, updateUser } = useUserStore();
  const { filterOptions, setFilterOptions } = useNavigationFilterStore();
  const { sectionOrder } = useNavigationStore();
  const isInitialLoad = useRef(true);
  const lastUserUpdate = useRef<string>("");

  // Initialize filter options from user preferences
  useEffect(() => {
    if (user?.preferences?.visibleNavigation) {
      // Convert array of visible headers to Record<string, boolean>
      const initialFilters: Record<string, boolean> = {};
      sectionOrder.forEach((header) => {
        initialFilters[header] =
          user.preferences.visibleNavigation.includes(header);
      });
      setFilterOptions(initialFilters);
      isInitialLoad.current = false;
    }
  }, [user?.preferences?.visibleNavigation, sectionOrder, setFilterOptions]);

  // Update user preferences when filter options change
  useEffect(() => {
    if (
      !isInitialLoad.current &&
      user &&
      Object.keys(filterOptions).length > 0
    ) {
      const newPrefs = JSON.stringify(filterOptions);
      // Only update if the preferences have actually changed
      if (lastUserUpdate.current !== newPrefs) {
        lastUserUpdate.current = newPrefs;
        // Convert Record<string, boolean> to array of visible headers
        const visibleHeaders = Object.entries(filterOptions)
          .filter(([_, isVisible]) => isVisible)
          .map(([header]) => header);

        const updatedUser = {
          ...user,
          preferences: {
            ...user.preferences,
            visibleNavigation: visibleHeaders,
          },
        };
        updateUser(updatedUser);
      }
    }
  }, [filterOptions, user, updateUser]);
};
