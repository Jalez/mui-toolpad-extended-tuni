/** @format */

import { usePanelStore } from "./store/usePanelStore";

/**
 * Hook to manage grid layout state
 *
 * @returns Object containing grid layout state and actions
 */
const useGridLayout = () => {
  const { editMode, toggleEditMode } = usePanelStore();

  return {
    editMode,
    toggleEditMode,
  };
};

export default useGridLayout;
