/** @format */

import { usePanelStore } from "./store/usePanelStore";

/**
 * Simple hook that provides access to grid layout state
 */
const useGridLayout = () => {
  const { editMode, toggleEditMode } = usePanelStore();

  return {
    editMode,
    toggleEditMode,
  };
};

export default useGridLayout;
