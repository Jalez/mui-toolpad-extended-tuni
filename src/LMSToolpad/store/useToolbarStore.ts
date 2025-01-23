/** @format */

import { create } from 'zustand';

export type toolbarType = string | null;

type ToolbarState = {
  currentToolbar: toolbarType;
  setCurrentToolbar: (toolbar: toolbarType) => void;
};

const useToolbarStore = create<ToolbarState>((set) => ({
  currentToolbar: null,
  setCurrentToolbar: (toolbar) => set({ currentToolbar: toolbar }),
}));

export default useToolbarStore;
