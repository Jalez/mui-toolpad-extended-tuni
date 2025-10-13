/** @format */

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Layout } from "react-grid-layout";

export interface GridItem {
  id: string;
  content: ReactNode;
  layout?: Layout;
}

export interface GridItemEntry {
  id: string;
  content: ReactNode;
  layout?: Layout;
}

interface GridItemContextType {
  gridItems: GridItemEntry[];
  registerGridItem: (id: string, content: ReactNode, layout?: Layout) => void;
  unregisterGridItem: (id: string) => void;
  getGridItem: (id: string) => GridItemEntry | undefined;
  getAllGridItems: () => GridItemEntry[];
}

const GridItemContext = createContext<GridItemContextType | undefined>(undefined);

export const useGridItemContext = () => {
  const context = useContext(GridItemContext);
  if (!context) {
    throw new Error("useGridItemContext must be used within a GridItemProvider");
  }
  return context;
};

interface GridItemProviderProps {
  children: ReactNode;
}

export const GridItemProvider: React.FC<GridItemProviderProps> = ({ children }) => {
  const [gridItems, setGridItems] = useState<GridItemEntry[]>([]);

  const registerGridItem = useCallback((id: string, content: ReactNode, layout?: Layout) => {
    setGridItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === id);
      const newItem: GridItemEntry = { id, content, layout };

      if (existingIndex >= 0) {
        // Update existing item
        const updated = [...prev];
        updated[existingIndex] = newItem;
        return updated;
      } else {
        // Add new item
        return [...prev, newItem];
      }
    });
  }, []);

  const unregisterGridItem = useCallback((id: string) => {
    setGridItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const getGridItem = useCallback((id: string) => {
    return gridItems.find(item => item.id === id);
  }, [gridItems]);

  const getAllGridItems = useCallback(() => {
    return gridItems;
  }, [gridItems]);

  const contextValue: GridItemContextType = {
    gridItems,
    registerGridItem,
    unregisterGridItem,
    getGridItem,
    getAllGridItems,
  };

  return (
    <GridItemContext.Provider value={contextValue}>
      {children}
    </GridItemContext.Provider>
  );
};

export default GridItemContext;
