/** @format */
import { Node } from "@xyflow/react";
import { NodeData } from "../../types";

/**
 * Creates a template for a new course node
 *
 * @param params Object containing node creation parameters
 * @returns A new course node configuration
 */
export const createCourseNodeTemplate = (
  params: {
    id: string;
    position: { x: number; y: number };
    parentNode?: Node<NodeData>;
    courseCode?: string;
  } & Record<string, any>
): Node<NodeData> => {
  const { id, position, parentNode, courseCode } = params;

  // Determine the level based on parent node
  const level = parentNode ? parentNode.data.level + 1 : 0;

  return {
    id,
    type: "coursenode",
    data: {
      label: params.label || `${courseCode || "COMP.CS.XXX"}: Course Title`,
      level,
      parent: parentNode?.id,
      subject: parentNode?.data.subject || "COMP.CS",
      nodeLevel: params.nodeLevel || "basic",
      details: params.details || "Add course details",
      courseCode: courseCode || "COMP.CS.XXX", // Add courseCode field for course nodes
    },
    position,
    parentId: parentNode?.parentId,
    // Add extent property at the node level to match nodesData structure
    extent: parentNode ? "parent" : undefined,
  };
};
