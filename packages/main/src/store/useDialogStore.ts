/** @format */

import { createWithEqualityFn } from 'zustand/traditional';

export type dialogType = string | null;

type DialogState = {
  openDialog: dialogType;
  setOpenDialog: (dialog: dialogType | null) => void;
  closeDialog: () => void;
};

const useDialogStore = createWithEqualityFn<DialogState>((set) => ({
  openDialog: null,
  setOpenDialog: (dialog) => set({ openDialog: dialog }),
  closeDialog: () => set({ openDialog: null }),
}));

export default useDialogStore;
