/** @format */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Node, Edge, Viewport } from "@xyflow/react";
import { NodeData } from "../types";
import { initializeEdges, initializeNodes } from "../mindmapUtils";

export interface MindmapState {
  // Node and edge management
  nodes: Node<NodeData>[];
  edges: Edge[];
  setNodes: (nodes: Node<NodeData>[]) => void;
  setEdges: (edges: Edge[] | ((eds: Edge[]) => Edge[])) => void;
  updateNodeData: (nodeId: string, label: string, details: string) => void;

  // View state management
  showGrid: boolean;
  setShowGrid: (show: boolean) => void;
  snapToGrid: boolean;
  setSnapToGrid: (snap: boolean) => void;
  showMiniMap: boolean;
  setShowMiniMap: (show: boolean) => void;
  touchMode: boolean;
  setTouchMode: (enabled: boolean) => void;

  // Viewport management
  viewport: Viewport;
  setViewport: (viewport: Viewport) => void;

  // Node expansion state
  expandedNodes: Record<string, boolean>;
  toggleNodeExpansion: (nodeId: string) => void;

  // Layout management
  layoutType: "default" | "horizontal" | "vertical" | "radial";
  setLayoutType: (
    type: "default" | "horizontal" | "vertical" | "radial"
  ) => void;
}

// Use persist middleware to save state to localStorage
export const useMindmapStore = create<MindmapState>()(
  persist(
    (set) => ({
      // Initial node and edge state
      nodes: initializeNodes(),
      edges: initializeEdges(),
      setNodes: (nodes) => {
        if (!Array.isArray(nodes)) {
          console.error("Attempted to set nodes with non-array value:", nodes);
          return;
        }
        set({ nodes });
      },
      setEdges: (edgesOrFn) =>
        set((state) => {
          // Handle both direct array updates and function updates
          if (typeof edgesOrFn === "function") {
            try {
              const newEdges = edgesOrFn(state.edges);
              // Validate result is an array
              if (!Array.isArray(newEdges)) {
                console.error(
                  "Edge updater function returned non-array:",
                  newEdges
                );
                return { edges: [] };
              }
              return { edges: newEdges };
            } catch (error) {
              console.error("Error in edge updater function:", error);
              return { edges: [] }; // Return empty array on error
            }
          } else if (Array.isArray(edgesOrFn)) {
            return { edges: edgesOrFn };
          } else {
            console.error("Invalid edges value:", edgesOrFn);
            return { edges: [] }; // Return empty array for invalid input
          }
        }),
      updateNodeData: (nodeId, label, details) =>
        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === nodeId
              ? { ...node, data: { ...node.data, label, details } }
              : node
          ),
        })),

      // View preferences with defaults
      showGrid: true,
      setShowGrid: (show) => set({ showGrid: show }),
      snapToGrid: false,
      setSnapToGrid: (snap) => set({ snapToGrid: snap }),
      showMiniMap: true,
      setShowMiniMap: (show) => set({ showMiniMap: show }),
      touchMode: false,
      setTouchMode: (enabled) => set({ touchMode: enabled }),

      // Viewport state
      viewport: { x: 0, y: 0, zoom: 1 },
      setViewport: (viewport) => set({ viewport }),

      // Node expansion state
      expandedNodes: {},
      toggleNodeExpansion: (nodeId) =>
        set((state) => ({
          expandedNodes: {
            ...state.expandedNodes,
            [nodeId]: !state.expandedNodes[nodeId],
          },
        })),

      // Layout state
      layoutType: "default",
      setLayoutType: (layoutType) => set({ layoutType }),
    }),
    {
      name: "mindmap-storage", // Unique name for the localStorage key
      partialize: (state) => ({
        // Only persist these parts of the state to avoid excessive storage
        nodes: state.nodes,
        edges: state.edges,
        viewport: state.viewport,
        showGrid: state.showGrid,
        snapToGrid: state.snapToGrid,
        showMiniMap: state.showMiniMap,
        expandedNodes: state.expandedNodes,
        layoutType: state.layoutType,
      }),
    }
  )
);
