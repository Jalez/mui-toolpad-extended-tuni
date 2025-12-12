/** @format */

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PanelState {
  editMode: boolean;
  toggleEditMode: () => void;
  resizeMode: boolean;
  toggleResizeMode: () => void;
  moveMode: boolean;
  toggleMoveMode: () => void;
}

/**
 * Store for managing panel state related to grid layouts.
 *
 * This uses a single editMode that enables both dragging and resizing.
 * It also manages saved layout presets.
 */
export const usePanelStore = create<PanelState>()(
  persist(
    (set) => ({
      editMode: false,
      toggleEditMode: () => set((state) => ({ editMode: !state.editMode })),
      resizeMode: false,
      toggleResizeMode: () =>
        set((state) => ({ resizeMode: !state.resizeMode })),
      moveMode: false,
      toggleMoveMode: () => set((state) => ({ moveMode: !state.moveMode })),
    }),
    {
      name: "grid-layout-storage",
    }
  )
);

export default usePanelStore;
