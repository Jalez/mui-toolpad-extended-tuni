/** @format */

import { registerNodeType } from "../Node/registry/nodeTypeRegistry";
import { CellNode } from "./CellNode/CellNode";
import { CourseNode } from "./CourseNode/CourseNode";
import { createCourseNodeTemplate } from "./CourseNode/createCourseNodeTemplate";
import { createCellNodeTemplate } from "./CellNode/createCellNodeTemplate";
import { ModuleNode } from "./ModuleNode/ModuleNode";
import { createModuleNodeTemplate } from "./ModuleNode/createModuleNodeTemplate";

/**
 * Initialize the node type registry with default node types
 *
 * This function should be called once when the application starts
 */
export function initializeNodeTypeRegistry(): void {
  // Register the custom node type
  registerNodeType("cellnode", CellNode, createCellNodeTemplate);

  // Register the group node type
  registerNodeType("coursenode", CourseNode, createCourseNodeTemplate);

  // Register the module node type
  registerNodeType("modulenode", ModuleNode, createModuleNodeTemplate);

  // Additional node types can be registered here
}

/**
 * Call this function to ensure node types are registered
 */
export function ensureNodeTypesRegistered(): void {
  // Only initialize once
  if (!nodeTypesInitialized) {
    initializeNodeTypeRegistry();
    nodeTypesInitialized = true;
  }
}

// Track initialization state
let nodeTypesInitialized = false;
