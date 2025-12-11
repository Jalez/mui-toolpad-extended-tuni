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

        return { filterOptions: newOptions };
      }),
    initializeFilters: () => {
      const { sectionOrder } = useNavigationStore.getState();
      const currentFilters = get().filterOptions;

      // Create an object with sections set to their default visibility
      const defaultFilters = sectionOrder.reduce(
        (acc, sectionKey) => {
          // Only set if not already set to preserve user preferences
          // All sections default to true (visible)
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
