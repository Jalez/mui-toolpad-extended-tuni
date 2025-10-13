import { MarkerType, ReactFlow, SelectionMode } from "@xyflow/react";
import { memo, useEffect, useMemo } from "react";
import { useNodeState } from "./hooks/useNodeState";
import { useEdgeState } from "./hooks/useEdgeState";
import useNodeSelection from "./hooks/useNodeSelect";
import { useEdgeSelect } from "./hooks/useEdgeSelect";
import { VIEWPORT_CONSTRAINTS } from "../constants";
import { useConnectionOperations } from "../Node/hooks/useConnectionOperations";
import {
  useNodeTypeRegistryStore,
  getAllNodeTypes,
} from "../Node/registry/nodeTypeRegistry";
import { ensureNodeTypesRegistered } from "../Nodes/registerBasicNodeTypes";

function Flow({ children }: { children?: React.ReactNode }) {
  const { edges, onEdgesChange, getVisibleEdges } = useEdgeState();
  const {
    displayedNodes,
    onNodesChange,
    onNodeDragStart,
    onNodeDragStop,
    getVisibleNodes,
    isDragging,
  } = useNodeState();

  const { onConnect, onConnectEnd } = useConnectionOperations();
  const { DetermineNodeClickFunction, handleSelectionEnd } = useNodeSelection({
    nodes: displayedNodes,
    isDragging,
  });
  const { DetermineEdgeClickFunction } = useEdgeSelect({
    nodes: displayedNodes,
    edges,
  });

  // Subscribe to registry version to trigger re-renders on changes
  const { version } = useNodeTypeRegistryStore();

  // Ensure node types are registered on component mount
  useEffect(() => {
    ensureNodeTypesRegistered();
  }, []);

  // Get all registered node types from the registry
  const nodeTypes = useMemo(() => {
    return getAllNodeTypes();
  }, [version]); // Re-compute when registry version changes

  // Force re-render when nodes or edges change
  const visibleNodes = useMemo(() => getVisibleNodes(), [getVisibleNodes]);
  const visibleEdges = useMemo(() => getVisibleEdges(), [getVisibleEdges]);

  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      defaultEdgeOptions={{
        type: "default",
        animated: true,
        markerEnd: { type: MarkerType.ArrowClosed },
      }}
      nodes={visibleNodes}
      onNodesChange={onNodesChange}
      onNodeDragStart={onNodeDragStart}
      onNodeDragStop={onNodeDragStop}
      onNodeClick={DetermineNodeClickFunction}
      onNodeDoubleClick={DetermineNodeClickFunction}
      edges={visibleEdges}
      onEdgesChange={onEdgesChange}
      onEdgeClick={DetermineEdgeClickFunction}
      onEdgeDoubleClick={DetermineEdgeClickFunction}
      onConnect={onConnect}
      onConnectEnd={onConnectEnd}
      // Enable node functionality
      nodesFocusable={true}
      nodesConnectable={true}
      nodesDraggable={true}
      elementsSelectable={true}
      selectionMode={SelectionMode.Partial}
      selectNodesOnDrag={true}
      onSelectionEnd={handleSelectionEnd}
      multiSelectionKeyCode="Shift"
      fitView
      zoomOnScroll={true}
      zoomOnPinch={true}
      minZoom={VIEWPORT_CONSTRAINTS.MIN_ZOOM}
      maxZoom={VIEWPORT_CONSTRAINTS.MAX_ZOOM}
      panOnDrag={true}
      panOnScroll={false}
    >
      {children}
    </ReactFlow>
  );
}

export default memo(Flow);
