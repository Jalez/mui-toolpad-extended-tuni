/** @format */
import { memo } from "react";
import { Handle, Position } from "reactflow";
import { useTheme } from "@mui/material/styles";
import { Box, Card, Typography } from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NodeData } from "./types";
import { subjectConfig } from "../config/subjectConfig";

const CustomNode = memo(
  ({
    data,
    selected,
  }: {
    data: NodeData & {
      isExpanded: boolean;
      onToggleExpand: () => void;
      onEdit?: () => void;
      onAddChild?: () => void;
      onAddParent?: () => void;
    };
    selected: boolean;
  }) => {
    const theme = useTheme();
    const subject = data.subject || "COMP.CS";
    const config = subjectConfig[subject] || subjectConfig["COMP.CS"];
    const level = data.nodeLevel || "basic";
    const courseColor = config.levelShades[level];

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
            maxWidth: 400,
            backgroundColor: theme.palette.background.paper,
            borderLeft: `4px solid ${courseColor}`,
            overflow: "visible",
            boxShadow: selected
              ? `0 0 0 2px ${theme.palette.primary.main}, 0 0 10px 2px ${theme.palette.primary.main}`
              : data.isExpanded
                ? theme.shadows[2]
                : "none",
            "&:hover": {
              boxShadow: selected
                ? `0 0 0 2px ${theme.palette.primary.main}, 0 0 10px 2px ${theme.palette.primary.main}`
                : theme.shadows[4],
              "& .react-flow__handle": {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
              },
            },
            transition: "box-shadow 0.3s ease",
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
            onChange={(e, expanded) => {
              e.stopPropagation();
              data.onToggleExpand();
            }}
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
                pointerEvents: "none",
              },
              "& .MuiAccordionSummary-expandIconWrapper": {
                pointerEvents: "auto",
                zIndex: 1,
                position: "relative",
              },
              "& .MuiAccordionDetails-root": {
                padding: "0 8px 8px 8px",
                pointerEvents: "none",
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
              sx={{
                padding: 1,
                backgroundColor: data.isExpanded
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
                  >
                    {data.label}
                  </Typography>
                </Box>
              </Box>
            </AccordionSummary>
            {data.details && (
              <AccordionDetails
                onClick={(e) => e.stopPropagation()}
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
    return (
      prev.data.isExpanded === next.data.isExpanded &&
      prev.data.label === next.data.label &&
      prev.data.details === next.data.details &&
      prev.data.nodeLevel === next.data.nodeLevel &&
      prev.selected === next.selected
    );
  }
);

export { CustomNode };
