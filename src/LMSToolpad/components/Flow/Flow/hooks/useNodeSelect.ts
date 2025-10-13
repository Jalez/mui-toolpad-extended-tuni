/** @format */
import { useCallback, useState } from "react";
import { Node, useReactFlow } from "@xyflow/react";
import { NodeData } from "../../types";

interface UseNodeSelectionProps {
  nodes: Node<NodeData>[];
  isDragging: boolean;
}

/**
 * Custom hook for handling node selection in a mindmap
 */
const useNodeSelection = ({ nodes, isDragging }: UseNodeSelectionProps) => {
  const { setNodes, fitView } = useReactFlow();
  const [previousSelectionBox, setPreviousSelectionBox] =
    useState<DOMRect | null>(null);

  /**
   * Handle node selection with touch/click
   */
  const handleNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      // If we're dragging, don't process the click
      if (isDragging) return;

      // For multi-selection with Shift key, preserve existing selection
      if (event.shiftKey) {
        setNodes((nds) =>
          nds.map((n) => ({
            ...n,
            selected: n.id === node.id ? !n.selected : n.selected,
          }))
        );
        return;
      }

      // Check if this is a click on an already selected node
      if (node.selected && !event.shiftKey) {
        // Deselect this node by updating all nodes
        setNodes((nds) =>
          nds.map((n) => ({
            ...n,
            selected: n.id === node.id ? false : n.selected,
          }))
        );
        // Don't center on deselection
        return;
      }

      // Reset selection box state when clicking a node
      setPreviousSelectionBox(null);
    },
    [setNodes, isDragging, setPreviousSelectionBox]
  );

  /**
   * Get the currently selected node
   */
  const getSelectedNode = useCallback(() => {
    return nodes.find((node) => node.selected);
  }, [nodes]);

  const handleNodeDoubleClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      // Get all child nodes recursively
      const getAllChildNodes = (nodeId: string): Node[] => {
        const children = nodes.filter((n) => n.data.parent === nodeId);
        return [
          ...children,
          ...children.flatMap((child) => getAllChildNodes(child.id)),
        ];
      };

      // Get all children of the double-clicked node
      const childNodes = getAllChildNodes(node.id);

      // Include the clicked node and all its children in the viewport
      fitView({
        nodes: [node, ...childNodes],
        duration: 800,
        padding: 0.1,
      });
    },
    [nodes, fitView]
  );

  const DetermineNodeClickFunction = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.stopPropagation();

      //If its a right button click, ignore it
      if (event.button === 2) return;

      // If it's a double click, handle it with handleNodeDoubleClick
      if (event.detail === 2) {
        handleNodeDoubleClick(event, node);
      } else {
        // Otherwise, handle it with handleNodeClick
        handleNodeClick(event, node);
      }
    },
    [handleNodeClick, handleNodeDoubleClick]
  );

  // Handler for when selection operation ends (selection rect is released)
  const handleSelectionEnd = useCallback(() => {
    // Reset selection box state when selection ends
    setPreviousSelectionBox(null);
  }, [setPreviousSelectionBox]);

  return {
    handleNodeClick,
    DetermineNodeClickFunction,
    getSelectedNode,
    isDragging,
    handleNodeDoubleClick,
    handleSelectionEnd,
    previousSelectionBox,
    setPreviousSelectionBox,
  };
};

export default useNodeSelection;
