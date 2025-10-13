/** @format */
import { Node } from "@xyflow/react";
import { NodeData } from "../../types";

/**
 * Creates a template for a new module node
 *
 * @param params Object containing node creation parameters
 * @returns A new module node configuration
 */
export const createModuleNodeTemplate = (
  params: {
    id: string;
    position: { x: number; y: number };
    parentNode?: Node<NodeData>;
    moduleNumber?: number;
  } & Record<string, any>
): Node<NodeData> => {
  const { id, position, parentNode, moduleNumber = 1 } = params;

  // Determine the level based on parent node
  const level = parentNode ? parentNode.data.level + 1 : 1;

  return {
    id,
    type: "modulenode",
    data: {
      label: params.label || `Module ${moduleNumber}: Module Title`,
      level,
      parent: parentNode?.id,
      subject: parentNode?.data.subject || "COMP.CS",
      nodeLevel: params.nodeLevel || "basic",
      details: params.details || "Module description and content.",
    },
    position,
    parentId: parentNode?.parentId,
    // Add extent property at the node level to match nodesData structure exactly as shown in example
    extent: "parent",
  };
};
