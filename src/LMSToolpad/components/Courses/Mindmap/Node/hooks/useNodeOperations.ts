import { Node, Edge, useReactFlow } from "@xyflow/react";
import { NodeData } from "../../types";

export const useNodeOperations = (
  nodes: Node<NodeData>[],
  setNodes: (nodes: Node<NodeData>[]) => void,
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>
) => {
  const reactFlowInstance = useReactFlow();

  const addParentNode = (childNode: Node<NodeData>) => {
    const newNodeId = `node-${Date.now()}`;
    const childLevel = childNode.data.level;
    const parentLevel = childLevel - 1;

    // Position directly relative to child, without viewport transformations
    // Place parent 300px to the left of child
    const newPosition = {
      x: childNode.position.x - 300,
      y: childNode.position.y,
    };

    const newParentNode: Node<NodeData> = {
      id: newNodeId,
      type: "custom",
      position: newPosition,
      data: {
        label: "New Concept",
        level: parentLevel,
        nodeLevel: childNode.data.nodeLevel,
        subject: childNode.data.subject,
        details: "Add details about this concept",
      },
    };

    const newEdge: Edge = {
      id: `e-${newNodeId}-${childNode.id}`,
      source: newNodeId,
      target: childNode.id,
    };

    const updatedChildNode = {
      ...childNode,
      data: {
        ...childNode.data,
        parent: newNodeId,
      },
    };

    const updatedNodes = nodes.map((node) =>
      node.id === childNode.id ? updatedChildNode : node
    );
    updatedNodes.push(newParentNode);

    setNodes(updatedNodes);
    setEdges((edges) => [...edges, newEdge]);

    // Focus view on both nodes
    setTimeout(() => {
      reactFlowInstance.fitView({
        nodes: [newParentNode, updatedChildNode],
        duration: 500,
        padding: 0.2,
      });
    }, 100);
  };

  const addChildNode = (parentNode: Node<NodeData>) => {
    const newNodeId = `node-${Date.now()}`;
    const parentLevel = parentNode.data.level;
    const childLevel = parentLevel + 1;

    // Find existing children of this parent
    const existingChildren = nodes
      .filter((node) => node.data.parent === parentNode.id)
      .sort((a, b) => a.position.y - b.position.y);

    // Calculate vertical position
    let newY = parentNode.position.y;
    const VERTICAL_SPACING = 150;

    if (existingChildren.length > 0) {
      // Find a gap between existing children
      let gap = null;
      for (let i = 0; i < existingChildren.length - 1; i++) {
        const currentY = existingChildren[i].position.y;
        const nextY = existingChildren[i + 1].position.y;
        const space = nextY - currentY;

        if (space >= VERTICAL_SPACING * 1.5) {
          gap = currentY + space / 2;
          break;
        }
      }

      if (gap !== null) {
        // Position in the middle of the found gap
        newY = gap;
      } else {
        // Position below the last child with spacing
        newY =
          existingChildren[existingChildren.length - 1].position.y +
          VERTICAL_SPACING;
      }
    }

    // Position directly relative to parent - always 300px to the right
    const newPosition = {
      x: parentNode.position.x + 400,
      y: newY,
    };
    console.log("New child node position:", newPosition);
    console.log("Parent node:", parentNode);

    const newChildNode: Node<NodeData> = {
      id: newNodeId,
      type: "custom",
      position: newPosition,
      data: {
        label: "New Concept",
        level: childLevel,
        parent: parentNode.id,
        nodeLevel: parentNode.data.nodeLevel,
        subject: parentNode.data.subject,
        details: "Add details about this concept",
      },
    };

    const newEdge: Edge = {
      id: `e-${parentNode.id}-${newNodeId}`,
      source: parentNode.id,
      target: newNodeId,
    };

    setNodes([...nodes, newChildNode]);
    setEdges((edges) => [...edges, newEdge]);

    // Focus view on both parent and new child
    setTimeout(() => {
      reactFlowInstance.fitView({
        nodes: [parentNode, newChildNode],
        duration: 500,
        padding: 0.2,
      });
    }, 100);
  };

  const deleteNode = (nodeToDelete: Node<NodeData>) => {
    reactFlowInstance.deleteElements({
      nodes: [nodeToDelete],
    });
  };

  return {
    addParentNode,
    addChildNode,
    deleteNode,
  };
};
