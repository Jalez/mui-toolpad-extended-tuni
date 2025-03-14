/** @format */
import { useCallback, useState } from "react";
import { Edge, Node, useReactFlow } from "@xyflow/react";
import { NodeData } from "../../types";

interface EdgeNavigationProps {
  nodes: Node<NodeData>[];
  centerOnNode: (node: Node, options?: CenterOptions) => void;
  getVisibleEdges: () => Edge[];
}

interface CenterOptions {
  force?: boolean;
  zoom?: number;
  duration?: number;
}

interface EdgeNavigationResult {
  handleEdgeClick: (event: React.MouseEvent, edge: Edge) => void;
  findConnectedNodes: (edge: Edge, direction: "parents" | "children") => Node[];
}

/**
 * Hook to manage edge navigation and related node selection
 */
export function useEdgeNavigation({
  nodes,
  centerOnNode,
  getVisibleEdges,
}: EdgeNavigationProps): EdgeNavigationResult {
  const reactFlowInstance = useReactFlow();

  // State for node selection dialog

  const [isNavigating, setIsNavigating] = useState(false);

  /**
   * Find connected nodes in the specified direction
   */
  const findConnectedNodes = useCallback(
    (edge: Edge, direction: "parents" | "children"): Node[] => {
      const edges = getVisibleEdges();
      if (direction === "parents") {
        const sourceNodeId = edge.source;
        const parentEdges = edges.filter((e) => e.target === sourceNodeId);
        return parentEdges
          .map((e) => nodes.find((n) => n.id === e.source))
          .filter(Boolean) as Node[];
      } else {
        const sourceNodeId = edge.source;
        const childEdges = edges.filter((e) => e.source === sourceNodeId);
        return childEdges
          .map((e) => nodes.find((n) => n.id === e.target))
          .filter(Boolean) as Node[];
      }
    },
    [nodes, getVisibleEdges]
  );

  /**
   * Navigate to and select a node
   */
  const navigateToNode = useCallback(
    (nodeId: string) => {
      setIsNavigating(true);

      // Update @xyflow/react's selection state
      reactFlowInstance.setNodes((nds) =>
        nds.map((node) => ({
          ...node,
          selected: node.id === nodeId,
        }))
      );

      // Get the node object for centering
      const selectedNode = nodes.find((n) => n.id === nodeId);
      if (selectedNode) {
        requestAnimationFrame(() => {
          centerOnNode(selectedNode, { force: true });
          setTimeout(() => setIsNavigating(false), 1000);
        });
      }
    },
    [nodes, reactFlowInstance, centerOnNode]
  );

  /**
   * Handle edge click with intelligent navigation
   */
  const handleEdgeClick = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      try {
        event.stopPropagation();

        // Don't process clicks while navigating
        if (isNavigating) return;

        const sourceNode = nodes.find((n) => n.id === edge.source);
        const targetNode = nodes.find((n) => n.id === edge.target);

        if (!sourceNode || !targetNode) return;

        // Get currently selected node
        const selectedNode = nodes.find((n) => n.selected);

        // CASE 1: No node is selected or unrelated node is selected - select target
        if (
          !selectedNode ||
          (selectedNode.id !== edge.source && selectedNode.id !== edge.target)
        ) {
          navigateToNode(targetNode.id);
          return;
        }

        // CASE 2: Child node is selected - select parent
        if (selectedNode.id === edge.target) {
          navigateToNode(sourceNode.id);
          return;
        }

        // CASE 3: Parent node is selected - select child
        if (selectedNode.id === edge.source) {
          navigateToNode(targetNode.id);
          return;
        }
      } catch (error) {
        console.error("Error in handleEdgeClick:", error);
      }
    },
    [nodes, findConnectedNodes, navigateToNode, isNavigating]
  );

  return {
    handleEdgeClick,
    findConnectedNodes,
  };
}
