/** @format */
import { useRef, useState, useMemo, useCallback, useEffect } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Edge,
  Node,
  MarkerType,
  NodeTypes,
} from "reactflow";
import "reactflow/dist/style.css";

// Custom hooks
import { useViewportManager } from "./hooks/useViewportManager";
import { useNodeManager } from "./hooks/useNodeManager";

// Components
import { EditNodeDialog } from "./EditNodeDialog";
import { NodeSelectionDialog } from "./NodeSelectionDialog";
import { CustomNode } from "./CustomNode";
import { MindmapControls } from "./components/MindmapControls";
import { FlowContainer } from "./components/FlowContainer";

// Extend Window interface to support our custom property
declare global {
  interface Window {
    lastClickedNodeId: string | null;
  }
}

export function MindmapContent() {
  const flowWrapper = useRef<HTMLDivElement>(null);
  const [editNode, setEditNode] = useState<Node | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [snapToGrid, setSnapToGrid] = useState(true);
  
  // States for node selection dialog
  const [nodeSelectionOpen, setNodeSelectionOpen] = useState(false);
  const [nodeSelectionOptions, setNodeSelectionOptions] = useState<Node[]>([]);
  const [nodeSelectionType, setNodeSelectionType] = useState<'children' | 'parents'>('children');
  const [edgeForSelection, setEdgeForSelection] = useState<Edge | null>(null);
  
  // Use custom hooks for functionality
  const {
    handleWheel,
    centerOnNode,
    initializeViewport,
    initialRender,
    viewport
  } = useViewportManager(flowWrapper);

  const {
    nodes,
    onEdgesChange,
    handleNodesChange,
    onNodeDragStop,
    onConnect,
    handleNodeEdit,
    getVisibleNodes,
    getVisibleEdges,
    applyLayout,
    setSelectedNodeId,
    selectedNodeId
  } = useNodeManager();

  // Initialize the lastClickedNodeId if not set
  useEffect(() => {
    if (window.lastClickedNodeId === undefined) {
      window.lastClickedNodeId = null;
    }
  }, []);

  // Initialize viewport based on nodes
  useEffect(() => {
    if (initialRender) {
      initializeViewport(nodes);
    }
  }, [initialRender, initializeViewport, nodes]);

  // Node type definitions
  const nodeTypes = useMemo<NodeTypes>(
    () => ({
      custom: CustomNode,
    }),
    []
  );

  // Handle node click to select and center
  const handleNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      if (
        (event.target as HTMLElement).classList.contains("react-flow__handle")
      ) {
        return;
      }
      setSelectedNodeId(node.id);
      window.lastClickedNodeId = node.id;
      centerOnNode(node);
    },
    [setSelectedNodeId, centerOnNode]
  );

  // Helper to find connected nodes
  const findConnectedNodes = useCallback(
    (edge: Edge, direction: 'parents' | 'children'): Node[] => {
      const edges = getVisibleEdges();
      
      if (direction === 'parents') {
        // Find all nodes that have edges pointing to the target node
        const sourceNodeId = edge.source;
        const sourceNode = nodes.find(n => n.id === sourceNodeId);
        
        if (!sourceNode) return [];
        
        // Find all parent nodes that have edges to the sourceNode
        const parentEdges = edges.filter(e => e.target === sourceNodeId);
        return parentEdges.map(e => nodes.find(n => n.id === e.source))
          .filter(Boolean) as Node[];
      } else {
        // Find all child nodes that have edges from the source node
        const sourceNodeId = edge.source;
        const childEdges = edges.filter(e => e.source === sourceNodeId);
        return childEdges.map(e => nodes.find(n => n.id === e.target))
          .filter(Boolean) as Node[];
      }
    },
    [nodes, getVisibleEdges]
  );

  // Handle node selection from dialog
  const handleNodeSelection = useCallback(
    (nodeId: string) => {
      setSelectedNodeId(nodeId);
      window.lastClickedNodeId = nodeId;
      const selectedNode = nodes.find(n => n.id === nodeId);
      if (selectedNode) {
        centerOnNode(selectedNode);
      }
      setNodeSelectionOpen(false);
    },
    [nodes, setSelectedNodeId, centerOnNode]
  );

  // Handle edge click to intelligently select nodes based on current selection
  const handleEdgeClick = useCallback(
    (_: React.MouseEvent, edge: Edge) => {
      const sourceNode = nodes.find((n) => n.id === edge.source);
      const targetNode = nodes.find((n) => n.id === edge.target);

      if (!sourceNode || !targetNode) return;

      // Get all edges in the graph
      const edges = getVisibleEdges();

      // Debug logging
      console.log("Edge clicked:", edge);
      console.log("Current selected node:", selectedNodeId);
      console.log("Source node:", sourceNode.id);
      console.log("Target node:", targetNode.id);

      // Create a local variable to track the currently selected node
      // Use this to work around any state issues
      const currentNode = selectedNodeId || null;
      
      // Initialize lastClickedNodeId if not set
      if (window.lastClickedNodeId === undefined) {
        window.lastClickedNodeId = null;
      }

      // Case 1: If no node was previously clicked or neither parent nor target match last clicked
      if (!currentNode || (window.lastClickedNodeId !== sourceNode.id && window.lastClickedNodeId !== targetNode.id)) {
        // Check if source node has multiple children
        const children = findConnectedNodes(edge, 'children');
        if (children.length > 1) {
          setNodeSelectionOptions(children);
          setNodeSelectionType('children');
          setEdgeForSelection(edge);
          setNodeSelectionOpen(true);
          return;
        }
        
        console.log("Case 1: Selecting child node");
        setSelectedNodeId(targetNode.id);
        window.lastClickedNodeId = targetNode.id;
        centerOnNode(targetNode);
      } 
      // Case 2: If target/child was last clicked, select the source/parent
      else if (window.lastClickedNodeId === targetNode.id) {
        // Check if target node has multiple parents
        const parents = findConnectedNodes(edge, 'parents');
        if (parents.length > 1) {
          setNodeSelectionOptions(parents);
          setNodeSelectionType('parents');
          setEdgeForSelection(edge);
          setNodeSelectionOpen(true);
          return;
        }
        
        console.log("Case 2: Child was selected, switching to parent");
        setSelectedNodeId(sourceNode.id);
        window.lastClickedNodeId = sourceNode.id;
        centerOnNode(sourceNode);
      } 
      // Case 3: If source/parent was last clicked, select the target/child
      else if (window.lastClickedNodeId === sourceNode.id) {
        // Check if source node has multiple children
        const children = findConnectedNodes(edge, 'children');
        if (children.length > 1) {
          setNodeSelectionOptions(children);
          setNodeSelectionType('children');
          setEdgeForSelection(edge);
          setNodeSelectionOpen(true);
          return;
        }
        
        console.log("Case 3: Parent was selected, switching to child");
        setSelectedNodeId(targetNode.id);
        window.lastClickedNodeId = targetNode.id;
        centerOnNode(targetNode);
      }
    },
    [nodes, selectedNodeId, setSelectedNodeId, centerOnNode, getVisibleEdges, findConnectedNodes]
  );

  // Get visible nodes and edges
  const visibleNodes = useMemo(() => getVisibleNodes(), [getVisibleNodes]);
  const visibleEdges = useMemo(() => getVisibleEdges(), [getVisibleEdges]);

  // Handle node edit dialog
  const handleSaveNodeEdit = useCallback(
    (label: string, details: string) => {
      if (!editNode) return;
      handleNodeEdit(editNode.id, label, details);
      setEditNode(null);
    },
    [editNode, handleNodeEdit]
  );

  return (
    <FlowContainer ref={flowWrapper} onWheel={handleWheel}>
      <ReactFlow
        nodes={visibleNodes}
        edges={visibleEdges}
        onNodesChange={(changes) => handleNodesChange(changes, snapToGrid)}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        onNodeClick={handleNodeClick}
        snapToGrid={snapToGrid}
        snapGrid={[20, 20]}
        defaultViewport={viewport}
        fitView={false}
        defaultEdgeOptions={{
          type: "smoothstep",
          animated: true,
          markerEnd: { type: MarkerType.ArrowClosed },
        }}
        onEdgeClick={handleEdgeClick}
        onNodeDoubleClick={(_, node) => setEditNode(node)}
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
      >
        {showGrid && (
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
        )}

        <MindmapControls
          showGrid={showGrid}
          setShowGrid={setShowGrid}
          snapToGrid={snapToGrid}
          setSnapToGrid={setSnapToGrid}
          onApplyLayout={(layoutType) => applyLayout(layoutType)}
        />
      </ReactFlow>

      {editNode && (
        <EditNodeDialog
          open={Boolean(editNode)}
          onClose={() => setEditNode(null)}
          onSave={handleSaveNodeEdit}
          initialLabel={editNode.data.label || ""}
          initialDetails={editNode.data.details || ""}
        />
      )}
      
      <NodeSelectionDialog
        open={nodeSelectionOpen}
        onClose={() => setNodeSelectionOpen(false)}
        onSelect={handleNodeSelection}
        nodes={nodeSelectionOptions}
        title={nodeSelectionType === 'children' ? "Select Child Node" : "Select Parent Node"}
        description={`Select which ${nodeSelectionType === 'children' ? 'child' : 'parent'} node you want to navigate to.`}
      />
    </FlowContainer>
  );
}
