/** @format */

import React, { useEffect, useState, useCallback, ReactNode } from "react";
import { Box, useTheme } from "@mui/material";
import { Responsive, Layout, WidthProvider } from "react-grid-layout";
import useGridLayout from "./useGridLayout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

//measureBeforeMount as prop to WidthProvider
const ReactGridLayout = WidthProvider(Responsive);
export interface GridItem {
  id: string;
  content: ReactNode;
}

export interface GridLayoutProps {
  items: GridItem[];
  storageKey: string;
  defaultLayouts: { [key: string]: Layout[] };
}

const ResponsiveGridLayout: React.FC<GridLayoutProps> = ({
  items,
  storageKey,
  defaultLayouts,
}) => {
  const panelRef = React.useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentLayouts, setCurrentLayouts] = useState(defaultLayouts);
  const [containerWidth, setContainerWidth] = useState(1200);
  const { editMode } = useGridLayout();

  useEffect(() => {
    try {
      const savedLayouts = localStorage.getItem(storageKey);
      if (savedLayouts) {
        setCurrentLayouts(JSON.parse(savedLayouts));
      }
    } catch (e) {
      console.error("Failed to load layouts:", e);
    }
  }, [storageKey]);

  const onLayoutChange = useCallback(
    (_, allLayouts) => {
      setCurrentLayouts(allLayouts);
      try {
        localStorage.setItem(storageKey, JSON.stringify(allLayouts));
      } catch (e) {
        console.error("Failed to save layouts:", e);
      }
    },
    [storageKey]
  );

  useEffect(() => {
    setMounted(true);
    if (panelRef.current) {
      //   setContainerWidth(panelRef.current.getBoundingClientRect().width);
    }
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <Box
      sx={{ width: "100%", height: "100%", position: "relative" }}
      ref={panelRef}
    >
      {/* Grid lines overlay when editing */}
      {editMode && (
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
            backgroundImage:
              "linear-gradient(to right, rgba(0, 0, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 255, 0.05) 1px, transparent 1px)",
          }}
        />
      )}

      <ReactGridLayout
        className="layout"
        layouts={currentLayouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
        cols={{ lg: 12, md: 12, sm: 12, xs: 12 }}
        rowHeight={10}
        // width={containerWidth}
        margin={[10, 10]}
        containerPadding={[0, 0]}
        isResizable={editMode}
        isDraggable={editMode}
        compactType={null}
        preventCollision={true}
        useCSSTransforms={mounted}
        onLayoutChange={onLayoutChange}
        resizeHandles={["se", "sw", "ne", "nw"]}
      >
        {items.map((item) => (
          <Box
            key={item.id}
            sx={{
              bgcolor: theme.palette.background.default,
              borderRadius: 1,
              boxShadow: 1,
              overflow: "hidden",
              p: 0.5,
              //   height: "100%",
              position: "relative",
              outline: editMode
                ? `2px dashed ${theme.palette.primary.main}`
                : "none",
              "&:hover": {
                outline: editMode
                  ? `2px solid ${theme.palette.primary.main}`
                  : "none",
              },
            }}
          >
            {item.content}
          </Box>
        ))}
      </ReactGridLayout>
    </Box>
  );
};

export default ResponsiveGridLayout;
