/** @format */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Node } from "@xyflow/react";
import { NodeData } from "../../types";
import { initializeNodes } from "../../mindmapUtils";

export interface NodeStoreState {
  // Keep both data structures
  nodes: Node<NodeData>[]; // For React Flow rendering
  nodeMap: Map<string, Node<NodeData>>; // For O(1) lookups
  nodeParentMap: Map<string, Node<NodeData>[]>; // For O(1) parent lookups

  // Operations
  setNodes: (nodes: Node<NodeData>[]) => void;
  addNodeToStore: (node: Node<NodeData>) => void;
  removeNode: (nodeId: string) => void;
  getNode: (id: string) => Node<NodeData> | undefined;
  updateNode: (node: Node<NodeData>) => void;
  updateNodeData: (nodeId: string, label: string, details: string) => void;
  updateNodes: (nodes: Node<NodeData>[]) => void;
  expandedNodes: Record<string, boolean>;
  toggleNodeExpansion: (nodeId: string) => void;
}

// Initialize both structures
const initialNodes = initializeNodes();
const createInitialNodeMap = () => {
  const map = new Map<string, Node<NodeData>>();
  initialNodes.forEach((node) => map.set(node.id, node));
  return map;
};

// Create a parent map for efficient parent lookups
const createInitialNodeParentMap = () => {
  const map = new Map<string, Node<NodeData>[]>();
  initialNodes.forEach((node) => {
    if (node.parentId) {
      if (!map.has(node.parentId)) {
        map.set(node.parentId, []);
      }
      map.get(node.parentId)?.push(node);
    }
  });
  return map;
};

export const useNodeStore = create<NodeStoreState>()(
  persist(
    (set, get) => ({
      nodes: initialNodes,
      nodeMap: createInitialNodeMap(),
      nodeParentMap: createInitialNodeParentMap(),

      // Efficient node lookup
      getNode: (id: string) => get().nodeMap.get(id),

      // Keep both structures in sync when updating
      setNodes: (nodes) => {
        if (!Array.isArray(nodes)) {
          console.error("Invalid nodes value:", nodes);
          // set({ nodes: [], nodeMap: new Map() });
          return;
        }

        // Update both array and map simultaneously
        const nodeMap = new Map<string, Node<NodeData>>();
        const nodeParentMap = new Map<string, Node<NodeData>[]>();
        nodes.forEach((node) => {
          nodeMap.set(node.id, node);
          if (node.parentId) {
            if (!nodeParentMap.has(node.parentId)) {
              nodeParentMap.set(node.parentId, []);
            }
            nodeParentMap.get(node.parentId)?.push(node);
          }
        });
        set({ nodes, nodeMap });
      },
      addNodeToStore: (node) => {
        set((state) => {
          const newNodes = [...state.nodes, node];

          // Create new map reference too
          const newNodeMap = new Map(state.nodeMap);
          newNodeMap.set(node.id, node);

          // Update parent map if needed
          const newNodeParentMap = new Map(state.nodeParentMap);
          if (node.data.parent) {
            const parentChildren =
              state.nodeParentMap.get(node.data.parent) || [];
            newNodeParentMap.set(node.data.parent, [...parentChildren, node]);
          }
          console.log("Adding new node to store", node);
          return {
            nodes: newNodes,
            nodeMap: newNodeMap,
            nodeParentMap: newNodeParentMap,
          };
        });
      },
      updateNode: (node) => {
        set((state) => {
          const updatedNodes = state.nodes.map((n) =>
            n.id === node.id ? node : n
          );
          const updatedMap = new Map(state.nodeMap);
          const updatedParentMap = new Map(state.nodeParentMap);

          // Remove from old parent's children if parent changed
          const oldNode = state.nodeMap.get(node.id);
          if (oldNode?.parentId) {
            const oldParentChildren = updatedParentMap.get(oldNode.parentId);
            if (oldParentChildren) {
              updatedParentMap.set(
                oldNode.parentId,
                oldParentChildren.filter((child) => child.id !== node.id)
              );
            }
          }

          // Add to new parent's children
          updatedMap.set(node.id, node);
          if (node.parentId) {
            if (!updatedParentMap.has(node.parentId)) {
              updatedParentMap.set(node.parentId, []);
            }
            updatedParentMap.get(node.parentId)?.push(node);
          }

          return {
            nodes: updatedNodes,
            nodeMap: updatedMap,
            nodeParentMap: updatedParentMap,
          };
        });
      },
      updateNodes: (nodes) => {
        set((state) => {
          const updatedMap = new Map(state.nodeMap);
          const updatedParentMap = new Map(state.nodeParentMap);

          nodes.forEach((node) => {
            updatedMap.set(node.id, node);
            if (node.parentId) {
              if (!updatedParentMap.has(node.parentId)) {
                updatedParentMap.set(node.parentId, []);
              }
              updatedParentMap.get(node.parentId)?.push(node);
            }
          });

          return {
            nodes,
            nodeMap: updatedMap,
            nodeParentMap: updatedParentMap,
          };
        });
      },
      removeNode: (nodeId) => {
        set((state) => {
          const nodeToRemove = state.nodeMap.get(nodeId);
          const updatedNodes = state.nodes.filter((node) => node.id !== nodeId);
          const updatedMap = new Map(state.nodeMap);
          const updatedParentMap = new Map(state.nodeParentMap);

          // Remove the node from its parent's children
          if (nodeToRemove?.parentId) {
            const parentChildren = updatedParentMap.get(nodeToRemove.parentId);
            if (parentChildren) {
              updatedParentMap.set(
                nodeToRemove.parentId,
                parentChildren.filter((child) => child.id !== nodeId)
              );
            }
          }

          // Remove the node's own entry from the maps
          updatedMap.delete(nodeId);
          updatedParentMap.delete(nodeId);

          return {
            nodes: updatedNodes,
            nodeMap: updatedMap,
            nodeParentMap: updatedParentMap,
          };
        });
      },

      updateNodeData: (nodeId, label, details) =>
        set((state) => {
          const updatedNodes = state.nodes.map((node) =>
            node.id === nodeId
              ? { ...node, data: { ...node.data, label, details } }
              : node
          );

          const updatedMap = new Map(state.nodeMap);
          const nodeToUpdate = updatedMap.get(nodeId);
          if (nodeToUpdate) {
            const updatedNode = {
              ...nodeToUpdate,
              data: { ...nodeToUpdate.data, label, details },
            };
            updatedMap.set(nodeId, updatedNode);

            // Update the node in parent's children array
            if (nodeToUpdate.parentId) {
              const parentChildren = state.nodeParentMap.get(
                nodeToUpdate.parentId
              );
              if (parentChildren) {
                const updatedParentMap = new Map(state.nodeParentMap);
                updatedParentMap.set(
                  nodeToUpdate.parentId,
                  parentChildren.map((child) =>
                    child.id === nodeId ? updatedNode : child
                  )
                );
                return {
                  nodes: updatedNodes,
                  nodeMap: updatedMap,
                  nodeParentMap: updatedParentMap,
                };
              }
            }
          }

          return {
            nodes: updatedNodes,
            nodeMap: updatedMap,
            nodeParentMap: state.nodeParentMap,
          };
        }),

      expandedNodes: {},
      toggleNodeExpansion: (nodeId) =>
        set((state) => ({
          expandedNodes: {
            ...state.expandedNodes,
            [nodeId]: !state.expandedNodes[nodeId],
          },
        })),
    }),

    {
      name: "node-storage",
      partialize: (state) => ({
        nodes: state.nodes,
        expandedNodes: state.expandedNodes,
        // We don't need to persist the map since it's derived
      }),
    }
  )
);
