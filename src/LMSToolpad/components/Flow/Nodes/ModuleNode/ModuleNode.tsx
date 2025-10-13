import { NodeProps, Position, NodeResizeControl } from "@xyflow/react";
import { Box, Typography } from "@mui/material";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import {
  BaseNodeContainer,
  StyledHandle,
  StyledTitle,
  StyledResizeControl,
} from "../common/NodeStyles";

interface ModuleNodeData {
  label: string;
  details?: string;
  nodeLevel?: "basic" | "intermediate" | "advanced";
  level: number;
  parent?: string;
  courseCode?: string;
  subject?: string;
}

type CustomNodeProps = Omit<NodeProps, "data"> & {
  data: ModuleNodeData;
};

export const ModuleNode = ({ data, selected }: CustomNodeProps) => {
  const getModuleColor = (nodeLevel: ModuleNodeData["nodeLevel"]) => {
    const level = nodeLevel || "intermediate";
    switch (level) {
      case "basic":
        return "#1976d2"; // blue
      case "intermediate":
        return "#9c27b0"; // purple
      case "advanced":
        return "#dc004e"; // red
      default:
        return "#1976d2"; // default blue
    }
  };

  const moduleColor = getModuleColor(data.nodeLevel);

  return (
    <BaseNodeContainer selected={selected} color={moduleColor}>
      <StyledHandle type="target" position={Position.Top} color={moduleColor} />
      <Box sx={{ mb: 1, p: 1.25 }}>
        <StyledTitle variant="h6" color={moduleColor}>
          {data.label}
        </StyledTitle>
        {data.details && (
          <Typography variant="body2" color="text.secondary">
            {data.details}
          </Typography>
        )}
      </Box>
      <StyledHandle
        type="source"
        position={Position.Bottom}
        color={moduleColor}
      />
      <NodeResizeControl minWidth={200} minHeight={100}>
        <StyledResizeControl selected={selected} color={moduleColor}>
          <OpenWithIcon sx={{ fontSize: 16, transform: "rotate(45deg)" }} />
        </StyledResizeControl>
      </NodeResizeControl>
    </BaseNodeContainer>
  );
};

export default ModuleNode;
