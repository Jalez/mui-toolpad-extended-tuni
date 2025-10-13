/** @format */
import {
  Background,
  BackgroundVariant,
  ReactFlowProvider,
  useReactFlow,
} from "@xyflow/react";
import { SelectProvider } from "./Select/contexts/SelectContext";
import { useTheme } from "@mui/material";
import { useCallback, useRef } from "react";
import { useViewPreferencesStore } from "./stores";
import { useViewportManager } from "./Flow/hooks/useViewportManager";
import { GRID_SETTINGS, VIEWPORT_CONSTRAINTS } from "./constants";
import { FlowContainer } from "./Flow/FlowContainer";
import Flow from "./Flow/Flow";
import UnifiedControls from "./Controls";
import SelectLogic from "./Select/SelectLogic";
import Minimap from "./Minimap/Minimap";
//  Please import '@xyflow/react/dist/style.css'
import "@xyflow/react/dist/style.css"; // Ensure to import the styles for React Flow

export function MindmapContent() {
  const theme = useTheme();
  const flowWrapper = useRef<HTMLDivElement>(null);
  const { showGrid } = useViewPreferencesStore();
  const reactFlowInstance = useReactFlow();

  // Use custom hooks for functionality
  const { handleWheel } = useViewportManager(flowWrapper);

  // Viewport control functions
  const fitView = useCallback(() => {
    reactFlowInstance?.fitView({
      padding: VIEWPORT_CONSTRAINTS.FIT_VIEW_PADDING,
      includeHiddenNodes: false,
      duration: VIEWPORT_CONSTRAINTS.CENTER_ANIMATION_DURATION,
    });
  }, [reactFlowInstance]);

  return (
    <FlowContainer ref={flowWrapper} onWheel={handleWheel}>
      <Flow>
        <UnifiedControls
          onFitView={fitView}
          onToggleFullscreen={() => {
            if (!document.fullscreenElement) {
              flowWrapper.current?.requestFullscreen();
            } else {
              document.exitFullscreen();
            }
          }}
        />
        {showGrid && (
          <Background
            variant={BackgroundVariant.Lines}
            gap={GRID_SETTINGS.BACKGROUND_GAP}
            size={GRID_SETTINGS.BACKGROUND_SIZE}
            color={theme.palette.divider}
          />
        )}

        <SelectLogic />

        <Minimap />

        {/* {editNode && (
        <EditNodeDialog
        open={Boolean(editNode)}
        onClose={() => setEditNode(null)}
        onSave={handleSaveNodeEdit}
        nodeData={editNode.data as NodeData}
        />
        )} */}
      </Flow>
    </FlowContainer>
  );
}

const Mindmap = () => (
  <ReactFlowProvider>
    <SelectProvider>
      <MindmapContent />
    </SelectProvider>
  </ReactFlowProvider>
);

export default Mindmap;

// Export FlowManager for backward compatibility
export { default as FlowManager } from './FlowManager';
