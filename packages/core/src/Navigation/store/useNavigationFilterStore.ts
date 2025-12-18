/** @format */
import { create } from "zustand";
import { useNavigationStore } from "./useNavigationStore";

const NAVIGATION_FILTER_STORAGE_KEY = "navigation-filter-preferences";

/**
 * Load filter preferences from localStorage
 * Returns null if no saved preferences exist or if localStorage is unavailable
 */
const loadFromLocalStorage = (): Record<string, boolean> | null => {
  try {
    const saved = localStorage.getItem(NAVIGATION_FILTER_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.warn("Failed to load navigation filter preferences from localStorage:", error);
  }
  return null;
};

/**
 * Save filter preferences to localStorage
 * Handles errors gracefully if localStorage is unavailable
 */
const saveToLocalStorage = (filterOptions: Record<string, boolean>): void => {
  try {
    localStorage.setItem(NAVIGATION_FILTER_STORAGE_KEY, JSON.stringify(filterOptions));
  } catch (error) {
    console.warn("Failed to save navigation filter preferences to localStorage:", error);
    // Handle quota exceeded error specifically
    if (error instanceof DOMException && error.code === 22) {
      console.error("localStorage quota exceeded. Consider clearing old data.");
    }
  }
};

export interface NavigationFilterState {
  filterOptions: Record<string, boolean>;
  setFilterOptions: (
    optionsOrUpdater:
      | Record<string, boolean>
      | ((prev: Record<string, boolean>) => Record<string, boolean>)
  ) => void;
  initializeFilters: () => void;
}

export const useNavigationFilterStore = create<NavigationFilterState>(
  (set, get) => ({
    // Initialize filterOptions from localStorage if available
    filterOptions: loadFromLocalStorage() || {},
    setFilterOptions: (optionsOrUpdater) =>
      set((state) => {
        const newOptions =
          typeof optionsOrUpdater === "function"
            ? optionsOrUpdater(state.filterOptions)
            : optionsOrUpdater;

        // Save to localStorage whenever filter options change
        saveToLocalStorage(newOptions);

        return { filterOptions: newOptions };
      }),
    initializeFilters: () => {
      const { sectionOrder } = useNavigationStore.getState();
      const currentFilters = get().filterOptions;
      
      // Use current filters if they exist (they were loaded from localStorage on store init)
      // Only load from localStorage if currentFilters is empty (fresh initialization)
      const filtersToUse = Object.keys(currentFilters).length > 0 
        ? currentFilters 
        : (loadFromLocalStorage() || {});

      // Create an object with sections set to their default visibility
      // Default: "Courses" = true, all other sections = false
      // Only apply defaults for sections that don't already have a value
      const defaultFilters = sectionOrder.reduce(
        (acc, sectionKey) => {
          // Only set if not already set to preserve user preferences
          if (!(sectionKey in filtersToUse)) {
            // "Courses" defaults to true (visible), all others default to false (hidden)
            acc[sectionKey] = sectionKey === "Courses";
          }
          return acc;
        },
        {} as Record<string, boolean>
      );

      // Merge existing filters with defaults (defaults only apply to missing sections)
      const mergedFilters = {
        ...filtersToUse,
        ...defaultFilters,
      };

      // Only update if there are actual changes (new defaults applied)
      const hasChanges = Object.keys(defaultFilters).length > 0;
      if (hasChanges) {
        set({ filterOptions: mergedFilters });
        saveToLocalStorage(mergedFilters);
      }
    },
  })
);
