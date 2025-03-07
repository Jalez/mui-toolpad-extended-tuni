/** @format */
import { create } from "zustand";
import { useNavigationStore } from "./useNavigationStore";

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
    filterOptions: {},
    setFilterOptions: (optionsOrUpdater) =>
      set((state) => {
        const newOptions =
          typeof optionsOrUpdater === "function"
            ? optionsOrUpdater(state.filterOptions)
            : optionsOrUpdater;

        // Always ensure "Last 5 visited courses" is visible if it exists
        if ("Last 5 visited courses" in newOptions) {
          newOptions["Last 5 visited courses"] = true;
        }

        return { filterOptions: newOptions };
      }),
    initializeFilters: () => {
      const { sectionOrder } = useNavigationStore.getState();
      const currentFilters = get().filterOptions;

      // Create an object with all sections set to true by default
      const defaultFilters = sectionOrder.reduce(
        (acc, sectionKey) => {
          // Only set if not already set to preserve user preferences
          if (!(sectionKey in currentFilters)) {
            acc[sectionKey] = true;
          }
          return acc;
        },
        {} as Record<string, boolean>
      );

      // Merge with existing filters
      set((state) => ({
        filterOptions: {
          ...state.filterOptions,
          ...defaultFilters,
        },
      }));
    },
  })
);
