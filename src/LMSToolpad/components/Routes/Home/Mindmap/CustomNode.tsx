/** @format */
import { memo } from "react";
import { Handle, Position } from "reactflow";
import { useTheme } from "@mui/material/styles";
import { Box, Card, Typography } from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { subjectConfig } from "../../../../config/subjectConfig";
import { NodeData } from "./types";

const CustomNode = memo(
  ({
    data,
  }: {
    data: NodeData & {
      isExpanded: boolean;
      onToggleExpand: () => void;
      onEdit?: () => void;
      onAddChild?: () => void;
      onAddParent?: () => void;
    };
  }) => {
    const theme = useTheme();
    const subject = data.subject || "COMP.CS";
    const config = subjectConfig[subject] || subjectConfig["COMP.CS"];
    const level = data.nodeLevel || "basic";
    const courseColor = config.levelShades[level];

    console.log("Rendering node:", data.label);
    return (
      <>
        <Handle
          type="target"
          onDoubleClick={(e) => {
            e.stopPropagation();
            data.onAddParent && data.onAddParent();
          }}
          position={Position.Left}
          style={{
            background: courseColor,
            border: `2px solid ${theme.palette.background.paper}`,
            width: 16,
            height: 16,

          }}
        />
        <Card
          elevation={data.isExpanded ? 2 : 0}
          sx={{
            display: "inline-block",
            width: "fit-content",
            maxWidth: 300,
            backgroundColor: theme.palette.background.paper,
            borderLeft: `4px solid ${courseColor}`,
            overflow: "visible",
            "&:hover": {
              boxShadow: theme.shadows[4],
              "& .react-flow__handle": {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
              },
            },
            userSelect: "none",
            cursor: "grab",
            "&:active": {
              cursor: "grabbing",
            },
            transform: "translate3d(0,0,0)",
            willChange: "transform",
          }}
        >
          <Accordion
            expanded={data.isExpanded ?? false}
            onChange={(_, isExpanded) => data.onToggleExpand()}
            onClick={(e) => e.stopPropagation()}
            disableGutters
            sx={{
              background: "transparent",
              // boxShadow: "none",
              "&:before": { display: "none" },
              "& .MuiAccordionSummary-root": {
                minHeight: 0,
                padding: 0,
              },
              "& .MuiAccordionSummary-content": {
                margin: "8px 0",
              },
              "& .MuiAccordionDetails-root": {
                padding: "0 8px 8px 8px",
              },
            }}
          >
            <AccordionSummary
              expandIcon={
                data.details ? (
                  <ExpandMoreIcon
                    sx={{
                      color: courseColor,
                    }}
                  />
                ) : null
              }
              onClick={(e) => e.stopPropagation()}
              sx={{
                padding: 1,
                backgroundColor: data.isExpanded
                  ? `${courseColor}08`
                  : "transparent",
                transition: theme.transitions.create("background-color"),
                "&:hover": {
                  backgroundColor: `${courseColor}15`,
                },
              }}
            >
              <Box
                sx={{ display: "flex", flexDirection: "column", minWidth: 0 }}
              >
                {data.courseCode && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: courseColor,
                      fontWeight: theme.typography.fontWeightBold,
                    }}
                    noWrap
                  >
                    {data.courseCode}
                  </Typography>
                )}
                <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: theme.typography.fontWeightMedium,
                      color: theme.palette.text.primary,
                    }}
                    noWrap
                  >
                    {data.label}
                  </Typography>
                  {/* <Box
                    sx={{
                      // position: "absolute",
                      top: 4,
                      right: 4,
                      zIndex: 5,
                      pointerEvents: "auto",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      data.onEdit && data.onEdit();
                    }}
                  >
                    <Tooltip title="Edit Node">
                      <EditIcon sx={{ cursor: "pointer" }} />
                    </Tooltip>
                  </Box> */}
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
          position={Position.Right}
          onDoubleClick={(e) => {
            e.stopPropagation();
            data.onAddChild && data.onAddChild();
          }}
          style={{
            background: courseColor,
            border: `2px solid ${theme.palette.background.paper}`,
            width: 16,
            height: 16,
          }}
        />
      </>
    );
  },
  (prev, next) => {
    // Custom comparison to prevent unnecessary re-renders
    return (
      prev.data.isExpanded === next.data.isExpanded &&
      prev.data.label === next.data.label &&
      prev.data.details === next.data.details &&
      prev.data.nodeLevel === next.data.nodeLevel
    );
  }
);

export { CustomNode };
