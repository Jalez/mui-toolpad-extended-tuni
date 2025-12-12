/** @format */

import { createContext, ReactNode, useContext, useState } from "react";

export interface ItemCounts {
  horizontal: number;
  vertical: number;
}

interface ScrollerContextType {
  itemCounts: ItemCounts;
  setItemCounts: (counts: ItemCounts) => void;
}

export const ScrollContext = createContext<ScrollerContextType>({
  itemCounts: { horizontal: 1, vertical: 1 },
  setItemCounts: () => {},
});

export const ScrollerProvider = ({ children }: { children: ReactNode }) => {
  const [itemCounts, setItemCounts] = useState<ItemCounts>({
    horizontal: 1,
    vertical: 1,
  });

  return (
    <ScrollContext.Provider
      value={{
        itemCounts,
        setItemCounts,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useResizeContext must be used within a ResizeProvider");
  }
  return context;
};
