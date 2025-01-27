/** @format */

import React, { createContext, useContext, useState } from 'react';

interface SnapDimensions {
  width: number;
  height: number;
}

interface ItemCounts {
  horizontal: number;
  vertical: number;
}

interface ResizeContextType {
  snapDimensions: SnapDimensions;
  setSnapDimensions: (dimensions: SnapDimensions) => void;
  itemCounts: ItemCounts;
  setItemCounts: (counts: ItemCounts) => void;
}

const ResizeContext = createContext<ResizeContextType | undefined>(undefined);

export const ResizeProvider = ({ children }: { children: React.ReactNode }) => {
  const [snapDimensions, setSnapDimensions] = useState<SnapDimensions>({
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
      }}>
      {children}
    </ResizeContext.Provider>
  );
};

export const useResizeContext = () => {
  const context = useContext(ResizeContext);
  if (!context) {
    throw new Error('useResizeContext must be used within a ResizeProvider');
  }
  return context;
};

export const useSetSnapDimensions = () => {
  const { setSnapDimensions } = useResizeContext();
  return setSnapDimensions;
};

export const useItemCounts = () => {
  const context = useResizeContext();
  return {
    itemCounts: context.itemCounts,
    setItemCounts: context.setItemCounts,
  };
};
