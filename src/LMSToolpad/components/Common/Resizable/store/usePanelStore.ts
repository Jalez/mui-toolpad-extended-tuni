/** @format */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PanelState {
  resizeMode: boolean;
  moveMode: boolean;
  toggleResizeMode: () => void;
  toggleMoveMode: () => void;
}

export const usePanelStore = create<PanelState>()(
  persist(
    (set) => ({
      resizeMode: false,
      moveMode: false,
      toggleResizeMode: () =>
        set((state) => ({
          resizeMode: !state.resizeMode,
          moveMode: false, // Disable move mode when resize mode is toggled
        })),
      toggleMoveMode: () =>
        set((state) => ({
          moveMode: !state.moveMode,
          resizeMode: false, // Disable resize mode when move mode is toggled
        })),
    }),
    {
      name: 'panel-settings',
    }
  )
);
