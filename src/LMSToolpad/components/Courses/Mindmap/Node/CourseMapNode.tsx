/** @format */
import { useState, useEffect, useCallback, memo } from "react";
import { Handle, Position, NodeProps, Node } from "@xyflow/react";
import { useTheme } from "@mui/material/styles";
import { Box, Card, Typography } from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NodeData } from "../types";
import { subjectConfig } from "../../config/subjectConfig";
import { useNodeOperations } from "./hooks/useNodeOperations";
import { NodeContextMenu } from "./NodeContextMenu";
import { useMindmapStore } from "../store";

// Extract styles to improve readability
const getNodeStyles = (theme: any, selected: boolean, courseColor: string) => ({
  display: "inline-block",
  width: "fit-content",
  maxWidth: 400,
  backgroundColor: theme.palette.background.paper,
  borderLeft: `4px solid ${courseColor}`,
  overflow: "visible",
  boxShadow: selected
    ? `0 0 0 2px ${theme.palette.primary.main}, 0 0 10px 2px ${theme.palette.primary.main}`
    : "none",
  "&:hover": {
    boxShadow: selected
      ? `0 0 0 2px ${theme.palette.primary.main}, 0 0 10px 2px ${theme.palette.primary.main}`
      : theme.shadows[4],
    "& .react-flow__handle": {
      opacity: 1,
      backgroundColor: theme.palette.primary.main,
      // Dont allow it to move
    },
  },
  transition: "box-shadow 0.3s ease",
  userSelect: "none",
  cursor: "grab",
  "&:active": {
    cursor: "grabbing",
  },
  // transform: "translate3d(0,0,0)",
  willChange: "transform",
});

// Extract handle styles for reuse
const getHandleStyles = (theme: any, courseColor: string) => ({
  background: courseColor,
  border: `2px solid ${theme.palette.background.paper}`,
  width: 16,
  height: 16,
  opacity: 0.8, // Make handles slightly visible by default
  transition: "all 0.2s ease",
  "&:hover": {
    opacity: 1,
    transform: "scale(1.1)",
  },
});

interface CourseMapNodeProps
  extends Required<
    Pick<
      NodeProps,
      | "type"
      | "dragging"
      | "zIndex"
      | "selectable"
      | "deletable"
      | "selected"
      | "draggable"
    >
  > {
  id: string;
  data: NodeData;
  xPos?: number;
  yPos?: number;
}

const CourseMapNodeComponent = ({
  data,
  id,
  selected,
  //Get xPos from react flow
  xPos = 0,
  yPos = 0,
  type = "custom",
  dragging = false,
  zIndex = 0,
  selectable = true,
  deletable = true,
  draggable = true,
}: CourseMapNodeProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contextMenuAnchor, setContextMenuAnchor] =
    useState<HTMLElement | null>(null);

  const theme = useTheme();
  const subject = data.subject || "COMP.CS";
  const config = subjectConfig[subject] || subjectConfig["COMP.CS"];
  const level = data.nodeLevel || "basic";
  const courseColor =
    config.levelShades[level as keyof typeof config.levelShades];

  const { nodes, setNodes, setEdges } = useMindmapStore();
  const { addChildNode, addParentNode, deleteNode } = useNodeOperations(
    nodes,
    setNodes,
    setEdges
  );
  const realNode = nodes.find((n) => n.id === id);
  const nodeForOperations = realNode || {
    id,
    type,
    position: { x: xPos, y: yPos },
    data,
  };

  const handleStyles = getHandleStyles(theme, courseColor);

  const handleExpandIconClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  const handleAddParentClick = useCallback(
    (event?: React.MouseEvent) => {
      if (event) {
        event.stopPropagation();
        event.preventDefault();
      }
      if (data.onAddParent) {
        data.onAddParent();
      }
      addParentNode(nodeForOperations);
    },
    [data, nodeForOperations, addParentNode]
  );

  const handleAddChildClick = useCallback(
    (event?: React.MouseEvent) => {
      if (event) {
        event.stopPropagation();
        event.preventDefault();
      }
      addChildNode(nodeForOperations);
    },
    [nodeForOperations, addChildNode]
  );

  const handleDelete = useCallback(() => {
    deleteNode(nodeForOperations);
  }, [deleteNode, nodeForOperations]);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenuAnchor(event.currentTarget as HTMLElement);
  };

  // Handle keyboard events
  useEffect(() => {
    if (!selected) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Delete" || event.key === "Backspace") {
        handleDelete();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selected, handleDelete]);

  return (
    <>
      <Handle
        type="target"
        id="target-handle"
        position={Position.Left}
        style={handleStyles}
        className="target-handle"
        isConnectable={true}
        onClick={handleAddParentClick}
      />
      <Card
        elevation={isExpanded ? 2 : 0}
        sx={getNodeStyles(theme, Boolean(selected), courseColor)}
        onContextMenu={handleContextMenu}
      >
        <Accordion
          expanded={isExpanded}
          disableGutters
          sx={{
            background: "transparent",
            "&:before": { display: "none" },
            "& .MuiAccordionSummary-root": {
              minHeight: 0,
              padding: 0,
            },
            "& .MuiAccordionSummary-content": {
              margin: "8px 0",
            },
          }}
        >
          <AccordionSummary
            expandIcon={
              data.details ? (
                <Box
                  onClick={handleExpandIconClick}
                  sx={{ display: "flex", alignItems: "center" }}
                  role="button"
                  aria-label="Toggle details"
                >
                  <ExpandMoreIcon sx={{ color: courseColor }} />
                </Box>
              ) : null
            }
            sx={{
              padding: 1,
              backgroundColor: isExpanded
                ? `${courseColor}08`
                : selected
                  ? `${courseColor}20`
                  : "transparent",
              transition: theme.transitions.create(["background-color"]),
              "&:hover": {
                backgroundColor: `${courseColor}15`,
              },
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
              {data?.courseCode && (
                <Typography
                  variant="caption"
                  sx={{
                    color: courseColor,
                    fontWeight: theme.typography.fontWeightBold,
                  }}
                  noWrap
                >
                  {data?.courseCode}
                </Typography>
              )}
              <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: theme.typography.fontWeightMedium,
                    color: theme.palette.text.primary,
                  }}
                >
                  {data?.label}
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          {data.details && (
            <AccordionDetails
              sx={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  borderTop: `1px solid ${theme.palette.divider}`,
                  pt: 1,
                }}
              >
                {data.details}
              </Typography>
              <Box
                component="img"
                className="subject-icon"
                src={config.icon}
                alt={subject}
                sx={{
                  position: "absolute",
                  right: 4,
                  bottom: 4,
                  width: "30px",
                  height: "30px",
                  opacity: 0.08,
                  transition: theme.transitions.create("all"),
                  filter: `drop-shadow(0 0 1px ${courseColor})`,
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />
            </AccordionDetails>
          )}
        </Accordion>
      </Card>
      <Handle
        type="source"
        id="source-handle"
        position={Position.Right}
        style={handleStyles}
        className="source-handle"
        isConnectable={true}
        onClick={handleAddChildClick}
      />
      <NodeContextMenu
        anchorEl={contextMenuAnchor}
        onClose={() => setContextMenuAnchor(null)}
        onAddParent={handleAddParentClick}
        onAddChild={handleAddChildClick}
        onDelete={handleDelete}
      />
    </>
  );
};

// Custom memo comparison function
const areEqual = (
  prevProps: CourseMapNodeProps,
  nextProps: CourseMapNodeProps
) => {
  return (
    prevProps.id === nextProps.id &&
    prevProps.selected === nextProps.selected &&
    prevProps.xPos === nextProps.xPos &&
    prevProps.yPos === nextProps.yPos &&
    prevProps.data?.label === nextProps.data?.label &&
    prevProps.data?.details === nextProps.data?.details &&
    prevProps.data?.nodeLevel === nextProps.data?.nodeLevel &&
    prevProps.data?.subject === nextProps.data?.subject
  );
};

export const CourseMapNode = memo(CourseMapNodeComponent, areEqual);
