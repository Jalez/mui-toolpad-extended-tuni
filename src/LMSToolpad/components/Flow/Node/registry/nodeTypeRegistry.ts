/** @format */

import { ComponentType } from "react";
import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { Node } from "@xyflow/react";
import { NodeData } from "../../types";

/**
 * Node Type Registry System
 *
 * @version 1.0.0
 *
 * A flexible system for registering and managing node types and their templates.
 * Supports dynamic registration, unregistration, and automatic re-rendering.
 *
 * @example
 * ```tsx
 * // Register a node type
 * registerNodeType('custom', CourseMapNode, createCustomNodeTemplate);
 *
 * // Clean up when component unmounts
 * useEffect(() => {
 *   registerNodeType('custom', CourseMapNode, createCustomNodeTemplate);
 *   return () => unregisterNodeType('custom');
 * }, []);
 * ```
 */

/**
 * Function type for creating node templates
 */
export type NodeTemplateCreator = (
  params: {
    id: string;
    position: { x: number; y: number };
    parentNode?: Node<NodeData>;
  } & Record<string, any>
) => Node<NodeData>;

/**
 * Node type entry containing both the component and template creator
 */
export interface NodeTypeEntry {
  Component: ComponentType<any>;
  createTemplate: NodeTemplateCreator;
}

/**
 * Internal store to manage node type registry state and trigger re-renders.
 * @internal
 */
interface NodeTypeRegistryStore {
  version: number;
  incrementVersion: () => void;
}

// Add debounce to version updates
let debounceTimer: number | null = null;
const debouncedIncrementVersion = (store: NodeTypeRegistryStore) => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  debounceTimer = window.setTimeout(() => {
    store.incrementVersion();
  }, 100);
};

// Create the registry store
const useNodeTypeRegistryStoreRaw = create<NodeTypeRegistryStore>((set) => ({
  version: 0,
  incrementVersion: () => set((state) => ({ version: state.version + 1 })),
}));

// Node type registry
const nodeTypeRegistry = new Map<string, NodeTypeEntry>();

/**
 * Register a new node type with its component and template creator
 *
 * @param type - The unique identifier for the node type
 * @param Component - The React component to render for this node type
 * @param createTemplate - The function that creates a template for new nodes of this type
 *
 * @example
 * registerNodeType('custom', CourseMapNode, createCustomNodeTemplate);
 */
export function registerNodeType(
  type: string,
  Component: ComponentType<any>,
  createTemplate: NodeTemplateCreator
) {
  nodeTypeRegistry.set(type, { Component, createTemplate });
  debouncedIncrementVersion(useNodeTypeRegistryStoreRaw.getState());
}

/**
 * Unregister a node type
 *
 * @param type - The unique identifier for the node type to remove
 *
 * @example
 * unregisterNodeType('custom');
 */
export function unregisterNodeType(type: string) {
  if (nodeTypeRegistry.delete(type)) {
    debouncedIncrementVersion(useNodeTypeRegistryStoreRaw.getState());
  }
}

/**
 * Get a node type component by its identifier
 *
 * @param type - The node type identifier
 * @returns The registered component or undefined if not found
 */
export function getNodeTypeComponent(
  type: string
): ComponentType<any> | undefined {
  return nodeTypeRegistry.get(type)?.Component;
}

/**
 * Get a node template creator by type
 *
 * @param type - The node type identifier
 * @returns The template creator function or undefined if not found
 */
export function getNodeTemplateCreator(
  type: string
): NodeTemplateCreator | undefined {
  return nodeTypeRegistry.get(type)?.createTemplate;
}

/**
 * Get all registered node types
 *
 * @returns A record of node type identifiers to their components
 */
export function getAllNodeTypes(): Record<string, ComponentType<any>> {
  const types: Record<string, ComponentType<any>> = {};
  nodeTypeRegistry.forEach((entry, key) => {
    types[key] = entry.Component;
  });
  return types;
}

/**
 * Create a new node using the registered template creator
 *
 * @param type - The node type identifier
 * @param params - Parameters for creating the node
 * @returns A new node instance or undefined if type not found
 */
export function createNodeFromTemplate(
  type: string,
  params: {
    id: string;
    position: { x: number; y: number };
    parentNode?: Node<NodeData>;
  } & Record<string, any>
): Node<NodeData> | undefined {
  const creator = getNodeTemplateCreator(type);
  if (!creator) return undefined;
  return creator(params);
}

// Export store hook with shallow comparison
export const useNodeTypeRegistryStore = () =>
  useNodeTypeRegistryStoreRaw((state) => ({ version: state.version }), shallow);
