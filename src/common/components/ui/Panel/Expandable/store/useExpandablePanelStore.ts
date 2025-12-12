/** @format */

import { create } from "zustand";

interface ExpandablePanelState {
  expandedPanelId: string | null;
  setExpandedPanelId: (id: string | null) => void;
}

// Using zustand to create a global store that's accessible from anywhere
export const useExpandablePanelStore = create<ExpandablePanelState>((set) => ({
  expandedPanelId: null,
  setExpandedPanelId: (id: string | null) => set({ expandedPanelId: id }),
}));
