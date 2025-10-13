import { Node } from "@xyflow/react";
import { NodeData } from "../../types";

/**
 * Creates a template for a new cell node
 *
 * @param params Object containing node creation parameters
 * @returns A new custom node configuration
 */
export const createCellNodeTemplate = (
  params: {
    id: string;
    position: { x: number; y: number };
    parentNode?: Node<NodeData>;
  } & Record<string, any>
): Node<NodeData> => {
  const { id, position, parentNode } = params;

  // Determine the level based on parent node
  const level = parentNode ? parentNode.data.level + 1 : 0;

  console.log("position", position);
  // Create the node with proper structure
  return {
    id,
    type: "cellnode",
    data: {
      label: params.label || "New Concept",
      level,
      parent: parentNode?.id,
      subject: parentNode?.data.subject || "general",
      nodeLevel: params.nodeLevel || "basic",
      details: params.details || "Add details about this concept",
    },
    position,
    parentId: parentNode?.parentId,
    // Add extent property at the node level to match nodesData structure
    extent: parentNode?.parentId ? "parent" : undefined,
    origin: [0.0, 0.5],
  };
};
