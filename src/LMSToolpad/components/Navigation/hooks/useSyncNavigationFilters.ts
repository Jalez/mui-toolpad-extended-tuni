/** @format */
import { useEffect, useRef } from "react";
import { useCurrentUser } from "../../../components/Events/hooks/useCurrentUser";
import { useUserActions } from "../../../components/Events/hooks/useUserActions";
import { useNavigationFilterStore } from "../store/useNavigationFilterStore";
import { useNavigationStore } from "../store/useNavigationStore";
import { isEqual } from "lodash";

const NAVIGATION_FILTER_STORAGE_KEY = "navigation-filter-preferences";

/**
 * Check if localStorage has saved filter preferences
 */
const hasLocalStoragePreferences = (): boolean => {
  try {
    const saved = localStorage.getItem(NAVIGATION_FILTER_STORAGE_KEY);
    return saved !== null && saved !== "{}";
  } catch {
    return false;
  }
};

export const useSyncNavigationFilters = () => {
  const { user } = useCurrentUser();
  const { updateUser } = useUserActions();
  const { filterOptions, setFilterOptions } = useNavigationFilterStore();
  const { sectionOrder, setVisibleSections } = useNavigationStore();
  const isInitialLoad = useRef(true);
  const lastUserUpdate = useRef<string>("");
  const previousSectionOrder = useRef<string[]>([]);
  const previousUserPrefs = useRef<string[]>([]);

  // Initialize filter options from user preferences ONLY if localStorage doesn't have preferences
  // localStorage takes priority over user preferences
  useEffect(() => {
    // Skip if localStorage already has preferences (localStorage is the source of truth)
    if (hasLocalStoragePreferences()) {
      // localStorage has preferences, so we don't load from user preferences
      // Just sync visibleSections with current filterOptions
      if (isInitialLoad.current && Object.keys(filterOptions).length > 0) {
        setVisibleSections(filterOptions);
        isInitialLoad.current = false;
      }
      return;
    }

    // Only load from user preferences if localStorage is empty
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
      initialFilters[header] =
        user?.preferences?.visibleNavigation?.includes(header) ?? false;
    });

    // Only update if there's an actual change to avoid infinite loops
    const filtersChanged = !isEqual(initialFilters, filterOptions);

    if (filtersChanged || isInitialLoad.current) {
      setFilterOptions(initialFilters);
      // Sync visibleSections with filterOptions
      setVisibleSections(initialFilters);
      isInitialLoad.current = false;
    }

    // Update refs for next comparison
    previousSectionOrder.current = [...sectionOrder];
    previousUserPrefs.current = [...(user?.preferences?.visibleNavigation || [])];
  }, [
    user?.preferences?.visibleNavigation,
    sectionOrder,
    setFilterOptions,
    filterOptions,
    setVisibleSections,
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
        const visibleHeaders = Object.entries(filterOptions)
          .filter(([, isVisible]) => isVisible)
          .map(([header]) => header);

        // Only update user if visible headers have actually changed
        if (!user?.preferences?.visibleNavigation || !isEqual(visibleHeaders, user.preferences?.visibleNavigation)) {
          const updatedUser = {
            ...user,
            preferences: {
              ...(user.preferences || {}),
              visibleNavigation: visibleHeaders,
            },
          };
          updateUser(updatedUser);
        }
      }
    }
  }, [filterOptions, user, updateUser]);
};
