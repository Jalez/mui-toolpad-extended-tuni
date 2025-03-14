/** @format */
import { useCallback, useState } from "react";
import {
  NodeChange,
  EdgeChange,
  Connection,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Node,
} from "@xyflow/react";
import { NodeData } from "../../types";
import { useMindmapStore } from "../../store";

export const useNodeState = () => {
  const nodes = useMindmapStore((state) => state.nodes);
  const edges = useMindmapStore((state) => state.edges);
  const setNodes = useMindmapStore((state) => state.setNodes);
  const setEdges = useMindmapStore((state) => state.setEdges);

  // Track when a node is being dragged
  const [isDragging, setIsDragging] = useState(false);

  const handleNodesChange = useCallback(
    (changes: NodeChange[], snapToGrid: boolean) => {
      // Check if any of the changes are position changes (drag operations)
      const hasDragOperation = changes.some(
        (change) => change.type === "position"
      );

      if (hasDragOperation) {
        setIsDragging(true);
      } else if (
        isDragging &&
        changes.some((change) => change.type === "select")
      ) {
        // When a select change comes after dragging, we're done dragging
        setIsDragging(false);
      }

      const updatedNodes = applyNodeChanges(changes, nodes);
      const finalNodes = snapToGrid
        ? updatedNodes.map((node) => ({
            ...node,
            position: {
              x: Math.round(node.position.x / 20) * 20,
              y: Math.round(node.position.y / 20) * 20,
            },
          }))
        : updatedNodes;
      setNodes(finalNodes as Node<NodeData>[]);
    },
    [nodes, setNodes, isDragging]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      try {
        // Ensure we're applying changes to an array and returning a new array
        if (!Array.isArray(edges)) {
          console.error("Edges is not an array:", edges);
          setEdges([]); // Reset to empty array if not an array
          return;
        }

        // Safely apply changes
        setEdges((eds) => {
          if (!Array.isArray(eds)) {
            console.error(
              "Edge state is not an array in updater function:",
              eds
            );
            return [];
          }
          return applyEdgeChanges(changes, eds);
        });
      } catch (error) {
        console.error("Error in onEdgesChange:", error);
        setEdges([]); // Recover from errors
      }
    },
    [edges, setEdges]
  );

  const onConnect = useCallback(
    (params: Connection) => {
      try {
        // Defensive check to ensure edges is an array
        if (!Array.isArray(edges)) {
          console.error("Edges is not an array in onConnect:", edges);
          setEdges([
            {
              id: `e-${params.source}-${params.target}`,
              source: params.source || "",
              target: params.target || "",
            },
          ]);
          return;
        }

        const newEdges = addEdge(params, edges);
        setEdges(newEdges);
      } catch (error) {
        console.error("Error in onConnect:", error);
      }
    },
    [edges, setEdges]
  );

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
      setNodes(updatedNodes);
    },
    [nodes, setNodes]
  );

  const getVisibleNodes = useCallback(() => {
    return nodes;
  }, [nodes]);

  const getVisibleEdges = useCallback(() => {
    // Return empty array as fallback if edges is not an array
    return Array.isArray(edges) ? edges : [];
  }, [edges]);

  return {
    nodes,
    edges,
    setNodes,
    setEdges,
    handleNodesChange,
    onEdgesChange,
    onConnect,
    handleNodeEdit,
    getVisibleNodes,
    getVisibleEdges,
    isDragging, // Export drag state
  };
};
