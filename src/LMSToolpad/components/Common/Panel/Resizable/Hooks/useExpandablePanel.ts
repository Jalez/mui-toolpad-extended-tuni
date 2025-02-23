/** @format */

import { useCallback } from "react";
import { useExpandablePanelStore } from "../store/useExpandablePanelStore";
import { loadDimensions } from "./usePersistentDimensions";
import { handleDimensionsChangeType } from "./useResizablePanel";

interface UseExpandablePanelProps {
  id: string;
  defaultWidth: number;
  defaultHeight: number;
  handleDimensionsChange: handleDimensionsChangeType;
}

export const useExpandablePanel = ({
  id,
  defaultWidth,
  defaultHeight,
  handleDimensionsChange,
}: UseExpandablePanelProps) => {
  const { expandedPanelId, setExpandedPanelId } = useExpandablePanelStore();

  const toggleExpand = useCallback(() => {
    console.log("toggleExpand", id);
    const pageContent = document.querySelector('[role="main"]');
    if (!pageContent) return;

    const contentRect = pageContent.getBoundingClientRect();

    if (expandedPanelId !== id) {
      console.log("IS EXPANDED");
      setExpandedPanelId(id);
      handleDimensionsChange(
        {
          width: contentRect.width,
          height: contentRect.height,
        },
        true
      );
    } else {
      console.log("IS NOT EXPANDED");
      setExpandedPanelId(null);
      // Restore persisted user dimensions instead of default dimensions.
      const persistedDimensions = loadDimensions(id, {
        width: defaultWidth,
        height: defaultHeight,
      });
      handleDimensionsChange(persistedDimensions, false);
    }
  }, [
    id,
    defaultWidth,
    defaultHeight,
    expandedPanelId,
    setExpandedPanelId,
    handleDimensionsChange,
  ]);

  return {
    expandedPanelId,

    isExpanded: expandedPanelId === id,
    toggleExpand,
  };
};
