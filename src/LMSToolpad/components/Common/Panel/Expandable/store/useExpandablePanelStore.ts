/** @format */

import { create } from "zustand";

interface ExpandablePanelState {
  expandedPanelId: string | null;
  setExpandedPanelId: (id: string | null) => void;
}

export const useExpandablePanelStore = create<ExpandablePanelState>((set) => ({
  expandedPanelId: null,
  setExpandedPanelId: (id) => set({ expandedPanelId: id }),
}));
