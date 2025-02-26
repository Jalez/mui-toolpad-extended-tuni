/** @format */

import React, { createContext, useContext, useRef, useState } from "react";
import {
  loadDimensions,
  saveDimensions,
} from "../hooks/usePersistentDimensions";

export interface PanelDimensions {
  width: number;
  height: number;
}

interface PanelContextType {
  id: string;
  defaultWidth: number;
  defaultHeight: number;
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  expandable?: boolean;
  resizable?: boolean;
  scrollable?: boolean;
  panelRef: React.RefObject<HTMLDivElement | null>;
  extendedStyle: React.CSSProperties;
  setExtendedStyle: (style: React.CSSProperties) => void;
  tools: React.ReactNode[];
  setTools: (tools: React.ReactNode[]) => void;
  addTool: (tool: React.ReactNode) => void;
  removeTool: (tool: React.ReactNode) => void;
  dimensions: PanelDimensions;
  setDimensions: (dimensions: PanelDimensions) => void;
  handleDimensionsChange: (
    newDimensions: PanelDimensions,
    isTemporary?: boolean
  ) => void;
  dimensionsWereTemporary: boolean;
}

export const PanelContext = createContext<PanelContextType>({
  id: "",
  defaultWidth: 200,
  defaultHeight: 200,
  minWidth: 100,
  maxWidth: 500,
  minHeight: 100,
  maxHeight: 500,
  panelRef: { current: null },
  extendedStyle: {},
  setExtendedStyle: () => {},
  tools: [],
  setTools: () => {},
  addTool: () => {},
  removeTool: () => {},
  dimensions: { width: 200, height: 200 },
  setDimensions: () => {},
  handleDimensionsChange: () => {},
  dimensionsWereTemporary: false,
});

export interface PanelProps {
  children: React.ReactNode;
  id: string;
  additionaltools?: React.ReactNode[];
  minHeight?: number;
  maxHeight?: number;
  minWidth?: number;
  maxWidth?: number;
  defaultHeight?: number;
  defaultWidth?: number;
  expandable?: boolean;
  resizable?: boolean;
  scrollable?: boolean;
}

export const PanelProvider = ({
  children,
  id,
  additionaltools,
  defaultWidth = 200,
  defaultHeight = 200,
  minWidth = 100,
  maxWidth = 500,
  minHeight = 100,
  maxHeight = 500,
  expandable,
  resizable,
  scrollable,
}: PanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [extendedStyle, setExtendedStyle] = useState<React.CSSProperties>({});
  const [tools, setTools] = useState<React.ReactNode[]>(additionaltools || []);

  // Load initial dimensions from localStorage
  const [dimensions, setDimensions] = useState<PanelDimensions>(() => {
    const saved = loadDimensions(id, {
      width: defaultWidth,
      height: defaultHeight,
    });
    return saved;
  });
  const [dimensionsWereTemporary, setDimensionsWereTemporary] =
    useState<boolean>(false);

  const addTool = (tool: React.ReactNode) => {
    setTools((prevTools) => [...prevTools, tool]);
  };

  const removeTool = (tool: React.ReactNode) => {
    setTools((prevTools) =>
      (prevTools as React.ReactNode[]).filter((t) => t !== tool)
    );
  };

  const handleDimensionsChange = (
    newDimensions: PanelDimensions,
    isTemporary = false
  ) => {
    console.log("handleDimensionsChange", newDimensions);
    setDimensions(newDimensions);
    setDimensionsWereTemporary(isTemporary);

    if (!isTemporary) {
      console.log("Saving dimensions", newDimensions);
      saveDimensions(id, newDimensions);
    }
  };

  // // Effect to save non-temporary dimensions
  // useEffect(() => {
  //   if (!dimensionsWereTemporary) {
  //     console.log("Saving dimensions", dimensions);
  //     saveDimensions(id, dimensions);
  //   }
  // }, [id, dimensions, dimensionsWereTemporary]);

  return (
    <PanelContext.Provider
      value={{
        id,
        defaultWidth,
        defaultHeight,
        minWidth,
        maxWidth,
        minHeight,
        maxHeight,
        expandable,
        resizable,
        scrollable,
        panelRef,
        extendedStyle,
        setExtendedStyle,
        tools,
        setTools,
        addTool,
        removeTool,
        dimensions,
        setDimensions,
        handleDimensionsChange,
        dimensionsWereTemporary,
      }}
    >
      {children}
    </PanelContext.Provider>
  );
};

export const usePanelContext = () => {
  const context = useContext(PanelContext);
  if (!context) {
    throw new Error("usePanelContext must be used within a PanelProvider");
  }
  return context;
};
