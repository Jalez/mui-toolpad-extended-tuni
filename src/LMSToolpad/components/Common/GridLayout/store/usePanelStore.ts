/** @format */

import { create } from "zustand";

interface PanelState {
  editMode: boolean;
  toggleEditMode: () => void;
}

/**
 * Store for managing panel state related to grid layouts.
 *
 * This uses a single editMode that enables both dragging and resizing.
 */
export const usePanelStore = create<PanelState>((set) => ({
  editMode: false,
  toggleEditMode: () => set((state) => ({ editMode: !state.editMode })),
}));

export default usePanelStore;
