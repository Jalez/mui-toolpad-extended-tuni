/** @format */
import { create } from "zustand";
import { NodeData } from "./types";
import { Viewport, Node } from "reactflow";
import { persist } from "zustand/middleware";
import { initializeNodes, initializeEdges } from "./mindmapUtils";

interface MindmapState {
  nodes: Node[];
  edges: any[];
  expandedNodes: { [id: string]: boolean };
  clusters: { [key: string]: string[] };
  activeCluster: string | null;
  viewport: Viewport;
  selectedNodeId: string | null;
  setExpandedNodes: (nodes: { [id: string]: boolean }) => void;
  toggleNodeExpansion: (id: string) => void;
  updateNodeData: (id: string, data: Partial<NodeData>) => void;
  setClusters: (clusters: { [key: string]: string[] }) => void;
  setActiveCluster: (clusterId: string | null) => void;
  setViewport: (viewport: Viewport) => void;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: any[]) => void;
  setSelectedNodeId: (nodeId: string | null) => void;
}

// Initial expanded state for nodes that have children and are level 1
const initialNodesData = initializeNodes();
const initialExpandedState = Object.fromEntries(
  initialNodesData
    .filter(
      (node) =>
        node.data.level === 1 &&
        initialNodesData.some((n) => n.data.parent === node.id)
    )
    .map((node) => [node.id, true])
);

// Calculate initial viewport based on root node position
const calculateInitialViewport = () => {
  const rootNode = initialNodesData.find((node) => node.id === "root");
  if (rootNode) {
    return {
      x: -rootNode.position.x + 400, // Add offset to center horizontally
      y: -rootNode.position.y + 300, // Add offset to center vertically
      zoom: 1.5,
    };
  }
  return { x: 0, y: 0, zoom: 1.5 };
};

const initialViewport = calculateInitialViewport();

export const useMindmapStore = create<MindmapState>()(
  persist(
    (set) => ({
      nodes: initialNodesData,
      edges: initializeEdges(),
      expandedNodes: initialExpandedState,
      clusters: {},
      activeCluster: null,
      viewport: initialViewport,
      selectedNodeId: "root", // Set root node as default selected node
      setExpandedNodes: (nodes) => set({ expandedNodes: nodes }),
      toggleNodeExpansion: (id) =>
        set((state) => ({
          expandedNodes: {
            ...state.expandedNodes,
            [id]: !state.expandedNodes[id],
          },
        })),
      updateNodeData: (id, data) =>
        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === id
              ? {
                  ...node,
                  data: { ...node.data, ...data },
                }
              : node
          ),
        })),
      setClusters: (clusters) => set({ clusters }),
      setActiveCluster: (clusterId) => set({ activeCluster: clusterId }),
      setViewport: (viewport) => set({ viewport }),
      setNodes: (nodes) => set({ nodes }),
      setEdges: (edges) => set({ edges }),
      setSelectedNodeId: (nodeId) => {
        // When setting a new selected node, also update the viewport to match
        set((state) => {
          const selectedNode = state.nodes.find((n) => n.id === nodeId);
          if (selectedNode) {
            return {
              selectedNodeId: nodeId,
              viewport: {
                x: -selectedNode.position.x + 400,
                y: -selectedNode.position.y + 300,
                zoom: state.viewport.zoom,
              },
            };
          }
          return { selectedNodeId: nodeId };
        });
      },
    }),
    {
      name: "mindmap-storage",
      partialize: (state) => ({
        expandedNodes: state.expandedNodes,
        viewport: state.viewport,
        selectedNodeId: state.selectedNodeId,
        nodes: state.nodes.map((node) => ({
          id: node.id,
          type: node.type || "custom",
          data: node.data,
          position: node.position,
        })),
        edges: state.edges,
      }),
      // Make sure we're merging default nodes with stored nodes properly
      merge: (persistedState: any, currentState: MindmapState) => {
        // If there are no persisted nodes, use the default nodes and edges
        if (!persistedState.nodes || persistedState.nodes.length === 0) {
          return {
            ...currentState,
            ...persistedState,
            nodes: initialNodesData,
            edges: initializeEdges(),
            selectedNodeId: "root",
            viewport: initialViewport,
          };
        }
        return {
          ...currentState,
          ...persistedState,
          selectedNodeId: persistedState.selectedNodeId || "root",
          viewport: persistedState.viewport || initialViewport,
        };
      },
    }
  )
);
