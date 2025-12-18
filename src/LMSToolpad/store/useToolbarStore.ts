/** @format */

import { createWithEqualityFn } from 'zustand/traditional';

export type toolbarType = string | null;

type ToolbarState = {
  currentToolbar: toolbarType;
  setCurrentToolbar: (toolbar: toolbarType) => void;
};

const useToolbarStore = createWithEqualityFn<ToolbarState>((set) => ({
  currentToolbar: null,
  setCurrentToolbar: (toolbar) => set({ currentToolbar: toolbar }),
}));

export default useToolbarStore;
