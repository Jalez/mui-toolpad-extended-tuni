/** @format */
import { useRef, useState, useMemo, useCallback } from "react";
import {
  Background,
  BackgroundVariant,
  MarkerType,
  NodeTypes,
  MiniMap,
  useReactFlow,
  Node,
  NodeChange,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTheme } from "@mui/material";
import { NodeData } from "../types";
import { useMindmapStore } from "../store";
// Custom hooks
import { useViewportManager } from "./hooks/useViewportManager";
import { useNodeState } from "./hooks/useNodeState";
import useNodeSelection from "./hooks/useNodeSelection";
import { useEdgeNavigation } from "./hooks/useEdgeNavigation";
// General Components
import { EditNodeDialog } from "../Node/EditNodeDialog";
import { FlowContainer } from "./components/FlowContainer";
import UnifiedControls from "./components/UnifiedControls";
import { CourseMapNode } from "../Node/CourseMapNode";

export function MindmapContent() {
  const theme = useTheme();
  const flowWrapper = useRef<HTMLDivElement>(null);
  const [editNode, setEditNode] = useState<Node | null>(null);
  const { showGrid, snapToGrid, showMiniMap, updateNodeData } =
    useMindmapStore();
  const reactFlowInstance = useReactFlow();

  // Use custom hooks for functionality
  const { handleWheel, centerOnNode, viewport } =
    useViewportManager(flowWrapper);

  const {
    nodes,
    handleNodesChange,
    onConnect,
    getVisibleNodes,
    getVisibleEdges,
  } = useNodeState();

  const { getSelectedNode, handleNodeClick, isDragging, setDraggingState } =
    useNodeSelection({
      nodes,
      centerOnNode,
    });

  // Edge navigation setup
  const { handleEdgeClick } = useEdgeNavigation({
    nodes,
    centerOnNode,
    getVisibleEdges,
  });

  // Handle node changes including drag operations
  const handleNodesChangeWrapped = useCallback(
    (changes: NodeChange[]) => {
      // Detect drag operations
      const hasDragOperation = changes.some(
        (change) => change.type === "position"
      );
      const hasSelectionChange = changes.some(
        (change) => change.type === "select"
      );

      if (hasDragOperation) {
        setDraggingState(true);
      } else if (hasSelectionChange && isDragging) {
        // End of drag operation
        setDraggingState(false);
      }

      handleNodesChange(changes, snapToGrid);
    },
    [handleNodesChange, snapToGrid, setDraggingState, isDragging]
  );

  // Memoize node types
  const nodeTypes = useMemo<NodeTypes>(
    () => ({
      custom: CourseMapNode as any, // temporary type assertion while we fix the node types
    }),
    []
  );

  // Viewport control functions
  const fitView = useCallback(() => {
    reactFlowInstance?.fitView({
      padding: 0.2,
      includeHiddenNodes: false,
      duration: 800,
    });
  }, [reactFlowInstance]);

  const centerOnSelected = useCallback(() => {
    const selectedNode = getSelectedNode();
    if (selectedNode) {
      centerOnNode(selectedNode, { force: true });
    }
  }, [getSelectedNode, centerOnNode]);

  // Handle node editing
  const handleSaveNodeEdit = useCallback(
    (updates: Partial<NodeData>) => {
      if (!editNode) return;
      updateNodeData(editNode.id, updates.label || "", updates.details || "");
      setEditNode(null);
    },
    [editNode, updateNodeData]
  );

  // Memoize MiniMap component
  const miniMapComponent = useMemo(
    () =>
      showMiniMap ? (
        <MiniMap
          nodeStrokeWidth={4}
          nodeStrokeColor={(node) =>
            node.selected ? theme.palette.primary.main : theme.palette.divider
          }
          nodeColor={(node) =>
            node.selected
              ? theme.palette.primary.light
              : theme.palette.background.paper
          }
          maskColor={`${theme.palette.background.default}CC`}
          maskStrokeColor={theme.palette.divider}
          style={{
            backgroundColor: theme.palette.background.default,
            border: `1px solid ${theme.palette.divider}`,
          }}
          zoomable
          pannable
        />
      ) : null,
    [showMiniMap, theme.palette]
  );

  const visibleNodes = useMemo(() => {
    const nodes = getVisibleNodes();
    return Array.isArray(nodes) ? nodes : [];
  }, [getVisibleNodes]);

  const visibleEdges = useMemo(() => {
    const edges = getVisibleEdges();
    return Array.isArray(edges) ? edges : [];
  }, [getVisibleEdges]);

  return (
    <FlowContainer ref={flowWrapper} onWheel={handleWheel}>
      <ReactFlow
        nodes={visibleNodes}
        edges={visibleEdges}
        onNodesChange={handleNodesChangeWrapped}
        // onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        snapToGrid={snapToGrid}
        snapGrid={[20, 20]}
        defaultViewport={viewport}
        fitView={false}
        defaultEdgeOptions={{
          type: "default",
          animated: true,
          markerEnd: { type: MarkerType.ArrowClosed },
        }}
        onNodeDoubleClick={(_: React.MouseEvent, node: Node<NodeData>) =>
          setEditNode(node)
        }
        nodeTypes={nodeTypes}
        zoomOnScroll={true}
        zoomOnPinch={true}
        minZoom={0.2}
        maxZoom={4}
        nodesDraggable={true}
        elementsSelectable={true}
        selectNodesOnDrag={false}
        translateExtent={[
          [-2000, -2000],
          [4000, 4000],
        ]}
        panOnDrag={true}
        panOnScroll={false}
        onEdgeClick={handleEdgeClick}
      >
        {showGrid && (
          <Background
            variant={BackgroundVariant.Lines}
            gap={30}
            size={1}
            color={theme.palette.divider}
          />
        )}

        {miniMapComponent}

        <UnifiedControls
          onFitView={fitView}
          onCenterSelected={centerOnSelected}
          onToggleFullscreen={() => {
            if (!document.fullscreenElement) {
              flowWrapper.current?.requestFullscreen();
            } else {
              document.exitFullscreen();
            }
          }}
        />
      </ReactFlow>

      {editNode && (
        <EditNodeDialog
          open={Boolean(editNode)}
          onClose={() => setEditNode(null)}
          onSave={handleSaveNodeEdit}
          nodeData={editNode.data as NodeData}
        />
      )}
    </FlowContainer>
  );
}
