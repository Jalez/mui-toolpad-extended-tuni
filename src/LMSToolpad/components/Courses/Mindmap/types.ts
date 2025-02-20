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
