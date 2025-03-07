/** @format */

import React, { useEffect, useState, useRef } from "react";
import { Box, useTheme, GlobalStyles, alpha } from "@mui/material";
import { Responsive, Layout, WidthProvider, Layouts } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import usePanelStore from "./store/usePanelStore";
import GridItem from "./GridItem";
import {
  GRID_BREAKPOINTS,
  GRID_COLS,
  GRID_ROW_HEIGHT,
  GRID_MARGIN,
  GRID_CONTAINER_PADDING,
  GRID_RESIZE_HANDLES,
} from "../../../constants";

// Apply width provider to Responsive componentsss
const ReactGridLayout = WidthProvider(Responsive);

interface GridLayoutProps {
  defaultLayouts: Layouts;
  layouts?: Layouts;
  onLayoutChange?: (layout: Layout[], allLayouts: Layouts) => void;
  isEditable?: boolean;
  previewBreakpoint?: string;
  onRemoveItem?: (id: string) => void;
}

const ResponsiveGridLayout: React.FC<GridLayoutProps> = ({
  defaultLayouts,
  layouts,
  onLayoutChange,
  isEditable = false,
  previewBreakpoint,
  onRemoveItem,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);
  const { editMode } = usePanelStore();
  const [aboutToRemove, setAboutToRemove] = useState(false);

  const isGridEditable = isEditable || editMode;
  const currentBreakpoint = previewBreakpoint || "lg";

  // Memoize values that shouldn't change often
  const activeLayouts = layouts || defaultLayouts;
  const currentLayout = activeLayouts[currentBreakpoint] || ([] as Layout[]);

  const handleAboutToRemove = (value: boolean) => {
    setAboutToRemove(value);
  };

  // Setup resize observer only once on mount
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  // Custom styles for the grid placeholder
  const placeholderStyles = {
    ".custom-grid .react-grid-placeholder": {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      border: `2px dashed ${theme.palette.primary.main}`,
      borderRadius: theme.shape.borderRadius,
      transition: theme.transitions.create(["border", "background-color"]),
      opacity: 1,
    },
  };

  return (
    <Box
      sx={{ width: "100%", height: "100%", position: "relative" }}
      ref={panelRef}
    >
      <GlobalStyles styles={placeholderStyles} />

      {isGridEditable && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            pointerEvents: "none",
            backgroundSize: "30px 30px",
            backgroundImage: `linear-gradient(to right, ${alpha(
              theme.palette.primary.main,
              0.05
            )} 1px, transparent 1px), linear-gradient(to bottom, ${alpha(
              theme.palette.primary.main,
              0.05
            )} 1px, transparent 1px)`,
          }}
        />
      )}

      <ReactGridLayout
        className="layout custom-grid"
        layouts={activeLayouts}
        breakpoints={GRID_BREAKPOINTS}
        cols={GRID_COLS}
        rowHeight={GRID_ROW_HEIGHT}
        margin={[GRID_MARGIN[0], GRID_MARGIN[1]]}
        containerPadding={[
          GRID_CONTAINER_PADDING[0],
          GRID_CONTAINER_PADDING[1],
        ]}
        isResizable={isGridEditable}
        isDraggable={isGridEditable && !aboutToRemove}
        compactType={null}
        preventCollision={true}
        useCSSTransforms={true}
        resizeHandles={GRID_RESIZE_HANDLES}
        breakpoint={previewBreakpoint}
        onLayoutChange={onLayoutChange}
      >
        {currentLayout.map((layoutItem) => (
          <Box key={layoutItem.i}>
            <GridItem
              id={layoutItem.i}
              isEditable={isGridEditable}
              onRemove={onRemoveItem ? onRemoveItem : undefined}
              handleAboutToRemove={handleAboutToRemove}
            />
          </Box>
        ))}
      </ReactGridLayout>
    </Box>
  );
};

export default React.memo(ResponsiveGridLayout);
