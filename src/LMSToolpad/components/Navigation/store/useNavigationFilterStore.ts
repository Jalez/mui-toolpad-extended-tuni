/** @format */
import { create } from "zustand";

export interface NavigationFilterState {
  filterOptions: Record<string, boolean>;
  setFilterOptions: (
    optionsOrUpdater:
      | Record<string, boolean>
      | ((prev: Record<string, boolean>) => Record<string, boolean>)
  ) => void;
}

export const useNavigationFilterStore = create<NavigationFilterState>(
  (set) => ({
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
  })
);
