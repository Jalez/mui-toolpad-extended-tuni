/** @format */

import { createWithEqualityFn } from "zustand/traditional";

interface ExpandablePanelState {
  expandedPanelId: string | null;
  setExpandedPanelId: (id: string | null) => void;
}

// Using zustand to create a global store that's accessible from anywhere
export const useExpandablePanelStore = createWithEqualityFn<ExpandablePanelState>((set) => ({
  expandedPanelId: null,
  setExpandedPanelId: (id: string | null) => set({ expandedPanelId: id }),
}));
