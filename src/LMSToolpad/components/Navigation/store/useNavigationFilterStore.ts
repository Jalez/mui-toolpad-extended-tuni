/** @format */
import { create } from "zustand";

export interface NavigationFilterState {
  filterOptions: Record<string, boolean>;
  setFilterOptions: (options: Record<string, boolean>) => void;
}

export const useNavigationFilterStore = create<NavigationFilterState>(
  (set) => ({
    filterOptions: {},
    setFilterOptions: (options) => set({ filterOptions: options }),
  })
);
