/** @format */
import { useCallback } from "react";
import { Node, Edge } from "reactflow";

/**
 * Hook for node creation and manipulation operations
 */
export function useNodeOperations(
  nodes: Node[],
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>,
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>
) {
  /**
   * Add a child node to the specified parent node
   */
  const addChildNode = useCallback(
    (parentNode: Node) => {
      const newId = `${parentNode.id}-${Date.now()}`;
      let newX = parentNode.position.x + 200;
      let newY = parentNode.position.y;
      const threshold = 50;

      // Check for collisions with existing nodes
      const isColliding = (x: number, y: number) =>
        nodes.some((node) => {
          const dx = node.position.x - x;
          const dy = node.position.y - y;
          return Math.sqrt(dx * dx + dy * dy) < threshold;
        });

      // Adjust position if there's a collision
      while (isColliding(newX, newY)) {
        newY += threshold;
      }

      // Create the new node
      const newNode = {
        id: newId,
        type: "custom",
        data: {
          label: "New Node",
          level: (parentNode.data.level || 0) + 1,
          parent: parentNode.id,
          nodeLevel: "basic" as "basic",
          details: "",
        },
        position: { x: newX, y: newY },
      };

      // Add the node and its connecting edge
      setNodes((nds) => [...nds, newNode]);
      setEdges((eds) => [
        ...eds,
        {
          id: `e-${parentNode.id}-${newId}`,
          source: parentNode.id,
          target: newId,
        },
      ]);
    },
    [nodes, setNodes, setEdges]
  );

  /**
   * Add a parent node to the specified child node
   */
  const addParentNode = useCallback(
    (childNode: Node) => {
      // Prevent adding a parent to the root node
      if ((childNode.data.level || 0) === 0) return;

      const newParentId = `${childNode.id}-parent-${Date.now()}`;
      const newParentLevel = Math.max(0, (childNode.data.level || 0) - 1);
      let newX = childNode.position.x - 200;
      let newY = childNode.position.y;
      const threshold = 50;

      // Check for collisions
      const isColliding = (x: number, y: number) =>
        nodes.some((node) => {
          const dx = node.position.x - x;
          const dy = node.position.y - y;
          return Math.sqrt(dx * dx + dy * dy) < threshold;
        });

      // Adjust position if there's a collision
      while (isColliding(newX, newY)) {
        newY += threshold;
      }

      // Create the new parent node
      const newParentNode = {
        id: newParentId,
        type: "custom",
        data: {
          label: "New Parent Node",
          level: newParentLevel,
          parent: undefined,
          nodeLevel: "basic" as "basic",
          details: "",
          subject: childNode.data.subject,
        },
        position: { x: newX, y: newY },
      };

      // Update current node to have the new parent
      setNodes((nds) =>
        nds.map((node) =>
          node.id === childNode.id
            ? {
                ...node,
                data: {
                  ...node.data,
                  parent: newParentId,
                  level: newParentLevel + 1,
                },
              }
            : node
        )
      );

      // Add the new parent node and connect it to the child
      setNodes((nds) => [...nds, newParentNode]);
      setEdges((eds) => [
        ...eds,
        {
          id: `e-${newParentId}-${childNode.id}`,
          source: newParentId,
          target: childNode.id,
        },
      ]);
    },
    [nodes, setNodes, setEdges]
  );

  return {
    addChildNode,
    addParentNode,
  };
}
