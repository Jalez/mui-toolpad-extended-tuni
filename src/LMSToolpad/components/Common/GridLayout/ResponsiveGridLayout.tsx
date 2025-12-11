/** @format */

import React, { useEffect, useState, useCallback, ReactNode } from "react";
import { Box, useTheme } from "@mui/material";
import { Responsive, Layout, WidthProvider, Layouts } from "react-grid-layout";
import useGridLayout from "./useGridLayout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { alpha } from "@mui/material/styles";

//measureBeforeMount as prop to WidthProvider
const ReactGridLayout = WidthProvider(Responsive);
export interface GridItem {
  id: string;
  content: ReactNode;
  layout?: Layout;
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

  // #region agent log
  useEffect(() => {
    fetch('http://127.0.0.1:7242/ingest/30a7b8ff-4a46-48a8-8e84-a3a483543b74',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ResponsiveGridLayout.tsx:36',message:'Items received',data:{itemIds:items.map(i=>i.id),itemsWithLayouts:items.filter(i=>i.layout).map(i=>({id:i.id,layout:i.layout}))},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  }, [items]);
  // #endregion

  // Merge registered item layouts into layouts, using saved layouts when available
  useEffect(() => {
    try {
      const savedLayouts = localStorage.getItem(storageKey);
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/30a7b8ff-4a46-48a8-8e84-a3a483543b74',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ResponsiveGridLayout.tsx:42',message:'Loading saved layouts',data:{storageKey,hasSavedLayouts:!!savedLayouts,savedLayouts:savedLayouts?JSON.parse(savedLayouts):null},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      
      const breakpoints = ['lg', 'md', 'sm', 'xs'];
      const mergedLayouts: Layouts = { lg: [], md: [], sm: [], xs: [] };
      
      // Start with saved layouts if they exist, otherwise use defaultLayouts
      let baseLayouts: Layouts = defaultLayouts;
      if (savedLayouts) {
        try {
          baseLayouts = JSON.parse(savedLayouts);
        } catch (e) {
          console.error("Failed to parse saved layouts:", e);
        }
      }
      
      // For each breakpoint, merge saved/default layouts with registered item layouts
      for (const breakpoint of breakpoints) {
        const savedBreakpointLayouts = baseLayouts[breakpoint] || [];
        const savedLayoutMap = new Map(savedBreakpointLayouts.map(l => [l.i, l]));
        
        // Process each item
        items.forEach(item => {
          const savedLayout = savedLayoutMap.get(item.id);
          
          if (savedLayout) {
            // Item has saved layout - check if it's unreasonably small (w:1, h:1)
            // If so and we have a registered layout, use the registered layout instead
            if (savedLayout.w === 1 && savedLayout.h === 1 && item.layout) {
              // Replace unreasonably small saved layout with registered layout
              mergedLayouts[breakpoint].push({ ...item.layout });
              // #region agent log
              fetch('http://127.0.0.1:7242/ingest/30a7b8ff-4a46-48a8-8e84-a3a483543b74',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ResponsiveGridLayout.tsx:65',message:'Replacing small saved layout with registered layout',data:{breakpoint,itemId:item.id,savedLayout,registeredLayout:item.layout},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'C'})}).catch(()=>{});
              // #endregion
            } else {
              // Use saved layout (preserves user customizations)
              mergedLayouts[breakpoint].push({ ...savedLayout });
            }
          } else if (item.layout) {
            // Item has registered layout and no saved layout - use registered layout
            // The component that registered this item chose its default size
            mergedLayouts[breakpoint].push({ ...item.layout });
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/30a7b8ff-4a46-48a8-8e84-a3a483543b74',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ResponsiveGridLayout.tsx:87',message:'Using registered layout for item',data:{breakpoint,itemId:item.id,layout:item.layout},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'C'})}).catch(()=>{});
            // #endregion
          } else {
            // Item has no layout - this should not happen if components register properly
            // Log warning but don't create automatic defaults (components should register with layouts)
            console.warn(`Grid item "${item.id}" has no registered layout. Components should register with default sizes via registerGridItem().`);
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/30a7b8ff-4a46-48a8-8e84-a3a483543b74',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ResponsiveGridLayout.tsx:93',message:'Item missing registered layout',data:{breakpoint,itemId:item.id},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'C'})}).catch(()=>{});
            // #endregion
          }
        });
      }
      
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/30a7b8ff-4a46-48a8-8e84-a3a483543b74',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ResponsiveGridLayout.tsx:85',message:'Setting merged layouts',data:{mergedLayouts},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      setCurrentLayouts(mergedLayouts);
    } catch (e) {
      console.error("Failed to load layouts:", e);
    }
  }, [storageKey, items, defaultLayouts]);

  const onLayoutChange = useCallback(
    (_: Layout[], allLayouts: Layouts) => {
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
      // Set container width for proper layout (was commented out)
      setContainerWidth(panelRef.current.getBoundingClientRect().width);
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
        className="layout"
        layouts={currentLayouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
        cols={{ lg: 15, md: 15, sm: 15, xs: 15 }}
        rowHeight={200} // changed from 10 to 30 for proper height resizing
        
        width={containerWidth} // using container width for layout calculations
        containerPadding={[0, 0]}
        isResizable={editMode}
        isDraggable={editMode}
        compactType={null}
        preventCollision={true}
        useCSSTransforms={mounted}
        onLayoutChange={onLayoutChange}
        resizeHandles={["se", "sw", "ne", "nw"]}
      >
        {/* #region agent log */}
        {(() => {
          fetch('http://127.0.0.1:7242/ingest/30a7b8ff-4a46-48a8-8e84-a3a483543b74',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ResponsiveGridLayout.tsx:114',message:'Rendering items with currentLayouts',data:{currentLayouts,itemIds:items.map(i=>i.id),itemsWithLayouts:items.filter(i=>i.layout).map(i=>({id:i.id,layout:i.layout}))},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
          return null;
        })()}
        {/* #endregion */}
        {items.map((item) => (
          <Box
            key={item.id}
            sx={{
              borderRadius: 1,
              overflow: "hidden",
              //   p: 0.5,
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
            <Box
              sx={{
                // p: 1,
                pointerEvents: editMode ? "none" : "auto",
                overflow: "hidden",
                position: "relative",
                height: "100%",
                width: "100%",
              }}
            >
              {item.content}
            </Box>
          </Box>
        ))}
      </ReactGridLayout>
    </Box>
  );
};

export default ResponsiveGridLayout;
