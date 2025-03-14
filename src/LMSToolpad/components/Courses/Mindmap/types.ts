/** @format */
// Node data with level and optional parent
export interface NodeData extends Record<string, unknown> {
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
