/** @format */
import { SimulationNodeDatum } from "d3-force";

// Extend d3's SimulationNodeDatum to include our custom collision radius
export interface MySimNode extends SimulationNodeDatum {
  id: string;
  r: number;
}

// Node data with level and optional parent
export interface NodeData {
  label: string;
  level: number;
  parent?: string;
  courseCode?: string;
  subject?: string;
  nodeLevel?: "basic" | "intermediate" | "advanced";
  details?: string;
  // Added property to support parent creation callback
  onAddParent?: () => void;
}

export interface EditNodeDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (label: string, details: string) => void;
  initialLabel: string;
  initialDetails: string;
}

// Interface for mindmap state
export interface MindmapState {
  nodes: any[];
  edges: any[];
  expandedNodes: { [id: string]: boolean };
  clusters: { [key: string]: string[] };
  activeCluster: string | null;
  viewport: { x: number; y: number; zoom: number };
  selectedNodeId: string | null;
  setExpandedNodes: (nodes: { [id: string]: boolean }) => void;
  toggleNodeExpansion: (id: string) => void;
  updateNodeData: (id: string, data: Partial<NodeData>) => void;
  setClusters: (clusters: { [key: string]: string[] }) => void;
  setActiveCluster: (clusterId: string | null) => void;
  setViewport: (viewport: { x: number; y: number; zoom: number }) => void;
  setNodes: (nodes: any[]) => void;
  setEdges: (edges: any[]) => void;
  setSelectedNodeId: (nodeId: string | null) => void;
}
