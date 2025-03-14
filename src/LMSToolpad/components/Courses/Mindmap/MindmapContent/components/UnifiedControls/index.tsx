/** @format */
import React from "react";
import { Box, Divider, Paper, useTheme } from "@mui/material";
import { Panel } from "@xyflow/react";

// Import our modular components
import NavigationControls from "./components/NavigationControls";
import ViewSettingsControls from "./components/ViewSettingsControls";
import KeyboardShortcutPanel from "./components/KeyboardShortCutPanel";
import { ControlsProvider, useControls } from "./context/ControlsContext";

interface UnifiedControlsProps {
  onFitView: () => void;
  onCenterSelected: () => void;
  onToggleFullscreen: () => void;
}

/**
 * ControlsContent is the presentation component that uses the context
 * and renders the UI controls
 */
const ControlsContent: React.FC = () => {
  const theme = useTheme();
  const {
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

    // Actions
    fitView,
    centerSelected,
    toggleFullscreen,
  } = useControls();

  return (
    <>
      <Panel position="top-right">
        <Paper
          elevation={3}
          sx={{
            borderRadius: 1,
            backgroundColor: theme.palette.background.paper,
            overflow: "hidden",
          }}
        >
          <Divider />
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2, p: 1 }}>
            {/* Navigation Controls */}
            <Box sx={{ display: "flex", gap: 1 }}>
              <NavigationControls
                onFitView={fitView}
                onCenterSelected={centerSelected}
                onToggleFullscreen={toggleFullscreen}
                onToggleShortcuts={toggleShortcuts}
                showShortcuts={showShortcuts}
              />
            </Box>

            <Divider orientation="vertical" flexItem />

            {/* View Settings */}
            <Box sx={{ display: "flex", gap: 1 }}>
              <ViewSettingsControls
                showGrid={showGrid}
                onToggleGrid={() => setShowGrid(!showGrid)}
                snapToGrid={snapToGrid}
                onToggleSnapToGrid={() => setSnapToGrid(!snapToGrid)}
                showMiniMap={showMiniMap}
                onToggleMiniMap={() => setShowMiniMap(!showMiniMap)}
                touchMode={touchMode}
                onToggleTouchMode={() => setTouchMode(!touchMode)}
              />
            </Box>
          </Box>
        </Paper>
      </Panel>

      {/* Keyboard Shortcuts Panel */}
      {showShortcuts && <KeyboardShortcutPanel />}
    </>
  );
};

/**
 * UnifiedControlsSOLID is the container component that provides the context
 * and renders the content component
 */
const UnifiedControls: React.FC<UnifiedControlsProps> = (props) => {
  return (
    <ControlsProvider
      onFitView={props.onFitView}
      onCenterSelected={props.onCenterSelected}
      onToggleFullscreen={props.onToggleFullscreen}
    >
      <ControlsContent />
    </ControlsProvider>
  );
};

export default UnifiedControls;
