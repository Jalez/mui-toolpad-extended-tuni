/** @format */
import { useEffect, useRef } from "react";
import { useUserStore } from "../../store/useUserStore";
import { useNavigationFilterStore } from "./store/useNavigationFilterStore";
import { useNavigationStore } from "./store/useNavigationStore";
import { isEqual } from "lodash";

export const useSyncNavigationFilters = () => {
  const { user, updateUser } = useUserStore();
  const { filterOptions, setFilterOptions } = useNavigationFilterStore();
  const { sectionOrder } = useNavigationStore();
  const isInitialLoad = useRef(true);
  const lastUserUpdate = useRef<string>("");
  const previousSectionOrder = useRef<string[]>([]);
  const previousUserPrefs = useRef<string[]>([]);

  // Initialize filter options from user preferences
  useEffect(() => {
    if (!user?.preferences?.visibleNavigation) return;

    // Skip if section order hasn't changed and user preferences haven't changed
    const currentUserPrefs = JSON.stringify(user.preferences.visibleNavigation);
    const currentSectionOrder = JSON.stringify(sectionOrder);

    if (
      currentUserPrefs === JSON.stringify(previousUserPrefs.current) &&
      currentSectionOrder === JSON.stringify(previousSectionOrder.current) &&
      !isInitialLoad.current
    ) {
      return;
    }

    // Convert array of visible headers to Record<string, boolean>
    const initialFilters: Record<string, boolean> = {};
    sectionOrder.forEach((header) => {
      // Always set "Last 5 visited courses" to visible if it exists
      if (header === "Last 5 visited courses") {
        initialFilters[header] = true;
      } else {
        initialFilters[header] =
          user.preferences.visibleNavigation.includes(header);
      }
    });

    // Only update if there's an actual change to avoid infinite loops
    const filtersChanged = !isEqual(initialFilters, filterOptions);

    if (filtersChanged || isInitialLoad.current) {
      setFilterOptions(initialFilters);
      isInitialLoad.current = false;
    }

    // Update refs for next comparison
    previousSectionOrder.current = [...sectionOrder];
    previousUserPrefs.current = [...user.preferences.visibleNavigation];
  }, [
    user?.preferences?.visibleNavigation,
    sectionOrder,
    setFilterOptions,
    filterOptions,
  ]);

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
        // Exclude "Last 5 visited courses" from being saved in preferences
        const visibleHeaders = Object.entries(filterOptions)
          .filter(
            ([header, isVisible]) =>
              isVisible && header !== "Last 5 visited courses"
          )
          .map(([header]) => header);

        // Only update user if visible headers have actually changed
        if (!isEqual(visibleHeaders, user.preferences.visibleNavigation)) {
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
    }
  }, [filterOptions, user, updateUser]);
};
