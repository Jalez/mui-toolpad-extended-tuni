import { HTMLAttributes } from "react";
import { Position, NodeProps, NodeResizeControl } from "@xyflow/react";
import { Box, Typography } from "@mui/material";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import {
  BaseNodeContainer,
  StyledHandle,
  StyledResizeControl,
} from "../common/NodeStyles";

interface CourseNodeData {
  label: string;
  level: number;
  parent?: string;
  courseCode?: string;
  subject?: string;
  nodeLevel?: "basic" | "intermediate" | "advanced";
  details?: string;
  [key: string]: unknown;
}

export type GroupNodeLabelProps = HTMLAttributes<HTMLDivElement>;

const GroupNodeLabel = ({ children }: GroupNodeLabelProps) => {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Typography>{children}</Typography>
    </Box>
  );
};

GroupNodeLabel.displayName = "GroupNodeLabel";

type CustomNodeProps = Omit<NodeProps, "data"> & {
  data: CourseNodeData;
};

const CourseNode = ({ data, selected }: CustomNodeProps) => {
  return (
    <>
      <StyledHandle
        type="target"
        position={Position.Top}
        color={selected ? "primary.main" : "grey.400"}
        style={{ top: -4 }}
      />
      <StyledHandle
        type="source"
        position={Position.Bottom}
        color={selected ? "primary.main" : "grey.400"}
        style={{ bottom: -4 }}
      />
      <BaseNodeContainer
        selected={selected}
        color="primary.main"
        sx={{
          minHeight: 200,
          border: "0.5em solid",
          borderColor: selected ? "primary.main" : "divider",
          p: 2.5,
        }}
      >
        <GroupNodeLabel>{data.label}</GroupNodeLabel>
        <NodeResizeControl minWidth={200} minHeight={100}>
          <StyledResizeControl selected={selected} color="primary.main">
            <OpenWithIcon sx={{ fontSize: 16, transform: "rotate(45deg)" }} />
          </StyledResizeControl>
        </NodeResizeControl>
      </BaseNodeContainer>
    </>
  );
};

export { CourseNode, GroupNodeLabel };
