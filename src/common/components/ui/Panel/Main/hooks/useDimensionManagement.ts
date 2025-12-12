/** @format */

import { useRef } from "react";
import { loadDimensions } from "./usePersistentDimensions";
import { PanelDimensions } from "../Context/PanelContextProvider";

interface UseDimensionManagementProps {
  id: string;
  dimensions: PanelDimensions;
  handleDimensionsChange: handleDimensionsChangeType;
}
export type handleDimensionsChangeType = (
  dimensions: PanelDimensions,
  isTemporary: boolean
) => void;

export const useDimensionManagement = ({
  id,
  dimensions,
  handleDimensionsChange,
}: UseDimensionManagementProps) => {
  const isUserResizingRef = useRef(false);
  const userChosenDimensionsRef = useRef(loadDimensions(id, dimensions));

  const wrappedHandleDimensionsChange = (newDim: PanelDimensions) => {
    console.log("WRAPPED HANDLE DIMENSIONS CHANGE", newDim);
    if (isUserResizingRef.current) {
      userChosenDimensionsRef.current.width = newDim.width;
      userChosenDimensionsRef.current.height = newDim.height;
    }

    handleDimensionsChange(newDim, true);
  };

  return {
    isUserResizingRef,
    userChosenDimensionsRef,
    wrappedHandleDimensionsChange,
  };
};
