/** @format */
import { useEffect, useCallback, useMemo, useState } from "react";
import {
  registerPageToolbarAction,
  unregisterPageToolbarAction,
} from "../../../layout/Toolbars/toolbarRegistry";
import EditModeToggler from "../../Common/GridLayout/Tools/EditModeToggler";
import { Box } from "@mui/material";

import { ResponsiveGridLayout } from "../../Common/GridLayout";
import { homePresetLayouts } from "../../Common/GridLayout/presetLayouts";
import { useGridLayoutManagement } from "../../Common/GridLayout/hooks/useGridLayoutManagement";
import { getAllWidgets } from "../../Common/GridLayout/WidgetRegistry";
import { usePlatformStore } from "../../../store/usePlatformStore";
import type { Layouts } from "react-grid-layout";
import usePanelStore from "../../Common/GridLayout/store/usePanelStore";
import { createGridItem } from "../../Common/GridLayout/layoutUtils";
import WidgetSelector from "../../Common/GridLayout/WidgetSelector";

const STORAGE_KEY = "home-layout";

// Simple component to add widgets
const Home = () => {
  const { platform, updatePlatform } = usePlatformStore();
  const { editMode } = usePanelStore();

  // Get all available widgets
  const [availableWidgets, setAvailableWidgets] = useState<string[]>([]);

  // Memoize initial layouts to prevent unnecessary re-renders
  const initialLayouts = useMemo(
    () => platform.interface.layout || homePresetLayouts.default,
    [] // Only on mount
  );

  // Update platform state with new layouts
  const handleLayoutChange = useCallback(
    (newLayouts: Layouts) => {
      updatePlatform({
        ...platform,
        interface: {
          ...platform.interface,
          layout: newLayouts,
        },
      });
    },
    [platform, updatePlatform]
  );

  const { layouts, onLayoutChange, applyLayout } = useGridLayoutManagement({
    storageKey: STORAGE_KEY,
    defaultLayouts: initialLayouts,
    onLayoutChangeCallback: handleLayoutChange,
  });

  // Update available widgets when layouts change or edit mode changes
  useEffect(() => {
    if (!layouts) return;

    // Get all registered widget IDs
    const allWidgetIds = Array.from(getAllWidgets().keys());

    // Get widget IDs already in the layout
    const currentWidgetIds = layouts.lg ? layouts.lg.map((item) => item.i) : [];

    // Find widgets that aren't already in the layout
    setAvailableWidgets(
      allWidgetIds.filter((id) => !currentWidgetIds.includes(id))
    );
  }, [layouts, editMode]);

  // Function to remove a widget from the layout
  const handleRemoveWidget = useCallback(
    (id: string) => {
      if (!layouts) return;

      // Create new layouts object with the widget removed from all breakpoints
      const updatedLayouts = { ...layouts };

      Object.keys(updatedLayouts).forEach((breakpoint) => {
        if (updatedLayouts[breakpoint]) {
          updatedLayouts[breakpoint] = updatedLayouts[breakpoint].filter(
            (item) => item.i !== id
          );
        }
      });

      // Update layouts with the widget removed
      applyLayout(updatedLayouts);
    },
    [layouts, applyLayout]
  );

  // Function to add a widget to the layout
  const handleAddWidget = (id: string) => {
    if (!layouts) return;

    // Create a new grid item for all breakpoints
    const updatedLayouts = { ...layouts };

    // Find the lowest y position to place the new widget below existing ones
    const findLowestY = (breakpoint: string): number => {
      if (!updatedLayouts[breakpoint] || !updatedLayouts[breakpoint].length)
        return 0;
      return Math.max(
        ...updatedLayouts[breakpoint].map((item) => item.y + item.h)
      );
    };

    // Add the widget to each breakpoint
    Object.keys(updatedLayouts).forEach((breakpoint) => {
      if (!updatedLayouts[breakpoint]) {
        updatedLayouts[breakpoint] = [];
      }
      const lowestY = findLowestY(breakpoint);

      // Add the new item at the bottom
      updatedLayouts[breakpoint].push(
        createGridItem(id, 0, lowestY, breakpoint === "xs" ? 12 : 6, 3)
      );
    });

    // Update layouts
    applyLayout(updatedLayouts);
  };

  // Register toolbar actions
  useEffect(() => {
    registerPageToolbarAction("/", EditModeToggler);

    return () => {
      unregisterPageToolbarAction("/", EditModeToggler);
    };
  }, []);

  return (
    <Box sx={{ width: "100%", height: "100%", p: 1 }}>
      <ResponsiveGridLayout
        defaultLayouts={initialLayouts}
        layouts={layouts}
        onLayoutChange={onLayoutChange}
        onRemoveItem={handleRemoveWidget}
      />

      {editMode && (
        <WidgetSelector
          onSelect={handleAddWidget}
          availableWidgets={availableWidgets}
        />
      )}
    </Box>
  );
};

export default Home;
