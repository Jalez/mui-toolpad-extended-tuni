/** @format */
import { useCallback, useState } from "react";
import { NodeChange, applyNodeChanges, Node } from "@xyflow/react";
import { NodeData } from "../../types";
import { useNodeStore } from "../../stores";

export const useNodeState = () => {
  const nodes = useNodeStore((state) => state.nodes);
  const setNodes = useNodeStore((state) => state.setNodes);
  const updateNodes = useNodeStore((state) => state.updateNodes);
  const [isDragging, setIsDragging] = useState(false);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const updatedNodes = applyNodeChanges(changes, nodes) as Node<NodeData>[];
      updateNodes(updatedNodes);
    },
    [nodes, updateNodes, isDragging]
  );

  const onNodeDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const onNodeDragStop = useCallback(() => {
    setIsDragging(false);
    updateNodes(nodes);
  }, [nodes, updateNodes]);

  const handleNodeEdit = useCallback(
    (nodeId: string, label: string, details: string) => {
      const updatedNodes = nodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                label,
                details,
              },
            }
          : node
      );
      updateNodes(updatedNodes);
    },
    [nodes, updateNodes]
  );

  const getVisibleNodes = useCallback(() => {
    //TODO: Implement logic to get visible nodes based on zoom level and viewport
    return nodes;
  }, [nodes]);

  return {
    displayedNodes: nodes, // Directly use nodes from store instead of local state
    nodes,
    setNodes,
    onNodesChange,
    handleNodeEdit,
    getVisibleNodes,
    isDragging,
    onNodeDragStop,
    onNodeDragStart,
  };
};
