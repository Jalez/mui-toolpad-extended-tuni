/** @format */
import React, { createContext, useContext, useState, useCallback } from "react";
import { useMindmapStore } from "../../../../store";

// Define the context interface
interface ControlsContextValue {
  // View Settings
  showGrid: boolean;
  setShowGrid: (show: boolean) => void;
  snapToGrid: boolean;
  setSnapToGrid: (snap: boolean) => void;
  showMiniMap: boolean;
  setShowMiniMap: (show: boolean) => void;
  touchMode: boolean;
  setTouchMode: (enabled: boolean) => void;

  // UI Controls
  showShortcuts: boolean;
  toggleShortcuts: () => void;

  // Layout controls

  // Navigation
  fitView: () => void;
  centerSelected: () => void;
  toggleFullscreen: () => void;
}

// Create the context with default values
const ControlsContext = createContext<ControlsContextValue | undefined>(
  undefined
);

interface ControlsProviderProps {
  children: React.ReactNode;
  onFitView: () => void;
  onCenterSelected: () => void;
  onToggleFullscreen: () => void;
}

/**
 * Provider component that manages the mindmap controls state
 */
export const ControlsProvider: React.FC<ControlsProviderProps> = ({
  children,
  onFitView,
  onCenterSelected,
  onToggleFullscreen,
}) => {
  // Local UI state
  const [showShortcuts, setShowShortcuts] = useState(false);

  // Access Zustand store state and actions
  const {
    showGrid,
    setShowGrid,
    snapToGrid,
    setSnapToGrid,
    showMiniMap,
    setShowMiniMap,
    touchMode,
    setTouchMode,
  } = useMindmapStore();

  // UI action handlers
  const toggleShortcuts = useCallback(() => {
    setShowShortcuts((prev) => !prev);
  }, []);

  // Create context value
  const value: ControlsContextValue = {
    // View settings
    showGrid,
    setShowGrid,
    snapToGrid,
    setSnapToGrid,
    showMiniMap,
    setShowMiniMap,
    touchMode,
    setTouchMode,

    // UI controls
    showShortcuts,
    toggleShortcuts,

    // Navigation
    fitView: onFitView,
    centerSelected: onCenterSelected,
    toggleFullscreen: onToggleFullscreen,
  };

  return (
    <ControlsContext.Provider value={value}>
      {children}
    </ControlsContext.Provider>
  );
};

/**
 * Custom hook to consume the controls context
 */
export const useControls = (): ControlsContextValue => {
  const context = useContext(ControlsContext);
  if (context === undefined) {
    throw new Error("useControls must be used within a ControlsProvider");
  }
  return context;
};
