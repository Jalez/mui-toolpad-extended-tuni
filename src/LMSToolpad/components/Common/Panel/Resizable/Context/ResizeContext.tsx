/** @format */

import React, { createContext, useContext, useState } from "react";

export interface PanelDimensions {
  width: number;
  height: number;
}

interface ItemCounts {
  horizontal: number;
  vertical: number;
}

interface ResizeContextType {
  snapDimensions: PanelDimensions;
  setSnapDimensions: (dimensions: PanelDimensions) => void;
  itemCounts: ItemCounts;
  setItemCounts: (counts: ItemCounts) => void;
}

export const ResizeContext = createContext<ResizeContextType>({
  snapDimensions: { width: 200, height: 200 },
  setSnapDimensions: () => {},
  itemCounts: { horizontal: 1, vertical: 1 },
  setItemCounts: () => {},
});

export const ResizeProvider = ({ children }: { children: React.ReactNode }) => {
  const [snapDimensions, setSnapDimensions] = useState<PanelDimensions>({
    width: 200,
    height: 200,
  });
  const [itemCounts, setItemCounts] = useState<ItemCounts>({
    horizontal: 1,
    vertical: 1,
  });

  return (
    <ResizeContext.Provider
      value={{
        snapDimensions,
        setSnapDimensions,
        itemCounts,
        setItemCounts,
      }}
    >
      {children}
    </ResizeContext.Provider>
  );
};

export const useResizeContext = () => {
  const context = useContext(ResizeContext);
  if (!context) {
    throw new Error("useResizeContext must be used within a ResizeProvider");
  }
  return context;
};
