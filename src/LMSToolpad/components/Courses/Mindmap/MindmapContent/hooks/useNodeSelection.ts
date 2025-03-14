/** @format */
import { useCallback, useState } from "react";
import { Node } from "@xyflow/react";
import { NodeData } from "../../types";

interface UseNodeSelectionProps {
  nodes: Node<NodeData>[];
  centerOnNode: (node: Node) => void;
}

/**
 * Custom hook for handling node selection in a mindmap
 */
const useNodeSelection = ({ nodes, centerOnNode }: UseNodeSelectionProps) => {
  const [isDragging, setIsDragging] = useState(false);

  /**
   * Handle node selection with touch/click
   */
  const handleNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      // Stop event propagation to prevent any parent handlers
      event.stopPropagation();
      if (!isDragging) {
        centerOnNode(node);
      }
    },
    [centerOnNode, isDragging]
  );

  /**
   * Get the currently selected node
   */
  const getSelectedNode = useCallback(() => {
    return nodes.find((node) => node.selected);
  }, [nodes]);

  /**
   * Clear selection when clicking on the canvas
   */
  const handlePaneClick = useCallback(() => {
    // Nothing needed here as React Flow handles selection internally
  }, []);

  /**
   * Select a node programmatically
   */
  const selectNode = useCallback(() => {
    // Nothing needed here as React Flow handles selection internally
  }, []);

  return {
    handleNodeClick,
    handlePaneClick,
    selectNode,
    getSelectedNode,
    isDragging,
    setDraggingState: setIsDragging,
  };
};

export default useNodeSelection;
