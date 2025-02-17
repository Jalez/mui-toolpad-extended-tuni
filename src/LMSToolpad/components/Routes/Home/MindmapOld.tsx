/** @format */
import { useEffect, useState, useCallback, useRef } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Edge,
  Node,
  useEdgesState,
  useNodesState,
  NodeChange,
  applyNodeChanges,
  Connection,
  addEdge,
  Background,
  Controls,
  Handle,
  Position,
  useReactFlow,
} from "reactflow";
import {
  forceSimulation,
  forceManyBody,
  forceCollide,
  forceCenter,
  SimulationNodeDatum,
} from "d3-force";
import "reactflow/dist/style.css";

import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { MarkerType } from "reactflow";
import { Card, Typography } from "@mui/material";
import { subjectConfig } from "../../../config/subjectConfig";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useSetSnapDimensions } from "../../Common/Panel/Resizable/Context/ResizeContext";

// Extend d3's SimulationNodeDatum to include our custom collision radius.
interface MySimNode extends SimulationNodeDatum {
  id: string;
  r: number;
}

// Extend our node data with level and optional parent.
interface NodeData {
  label: string;
  level: number;
  parent?: string;
  courseCode?: string;
  subject?: string;
  nodeLevel?: "basic" | "intermediate" | "advanced";
  details?: string; // Add details for accordion content
}

// Sample data with detailed content
const nodesData: Array<{ id: string; data: NodeData }> = [
  {
    id: "root",
    data: {
      label: "Testing Cases",
      level: 0,
      details:
        "Overview of software testing methodologies and best practices in modern software development. Testing ensures reliability, performance, and user satisfaction.",
      nodeLevel: "intermediate",
      subject: "COMP.CS",
      courseCode: "COMP.CS.100",
    },
  },
  {
    id: "section1",
    data: {
      label: "1. Introduction",
      level: 1,
      details:
        "Basic concepts and importance of software testing in development lifecycle. Covers test planning, execution strategies, and quality assurance fundamentals.",
      nodeLevel: "basic",
      subject: "COMP.CS",
    },
  },
  {
    id: "section1-b1",
    data: {
      label: "Dynamic testing is key",
      level: 2,
      parent: "section1",
      details:
        "Dynamic testing involves executing the actual code to verify its behavior. This includes unit tests, integration tests, and system tests.",
      nodeLevel: "basic",
      subject: "COMP.CS",
    },
  },
  {
    id: "section1-b2",
    data: {
      label: "Quality matters",
      level: 2,
      parent: "section1",
      details:
        "Quality assurance practices ensure software meets requirements and industry standards. Focus on code reviews, testing standards, and automated testing.",
      nodeLevel: "intermediate",
      subject: "COMP.CS",
    },
  },
  {
    id: "section2",
    data: {
      label: "2. What is a Test Case?",
      level: 1,
      details:
        "Learn about test case design, documentation, and execution. Understanding different types of test cases and their applications.",
      nodeLevel: "basic",
      subject: "COMP.CS",
    },
  },
  {
    id: "section2-b1",
    data: {
      label: "Definition: Evaluate behavior",
      level: 2,
      parent: "section2",
      details:
        "A test case is a set of conditions used to determine if a system or one of its features is working correctly. Includes inputs, execution steps, and expected results.",
      nodeLevel: "basic",
      subject: "COMP.CS",
    },
  },
  {
    id: "section2-b2",
    data: {
      label: "Components: objective, input, expected result",
      level: 2,
      parent: "section2",
      details:
        "Key components of a test case include: test objective, test data (input), test steps, expected results, and actual results. Good test cases are clear, repeatable, and maintainable.",
      nodeLevel: "intermediate",
      subject: "COMP.CS",
    },
  },
];

interface EditNodeDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (label: string, details: string) => void;
  initialLabel: string;
  initialDetails: string;
}

const EditNodeDialog = ({
  open,
  onClose,
  onSave,
  initialLabel,
  initialDetails,
}: EditNodeDialogProps) => {
  const [label, setLabel] = useState(initialLabel);
  const [details, setDetails] = useState(initialDetails);

  useEffect(() => {
    setLabel(initialLabel);
    setDetails(initialDetails);
  }, [initialLabel, initialDetails]);

  const handleSave = () => {
    onSave(label, details);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Node</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Label"
          fullWidth
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Details"
          fullWidth
          multiline
          rows={4}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Custom Node component
const CustomNode = ({ data }: { data: NodeData }) => {
  const theme = useTheme();
  const subject = data.subject || "COMP.CS";
  const config = subjectConfig[subject] || subjectConfig["COMP.CS"];
  const level = data.nodeLevel || "basic";
  const courseColor = config.levelShades[level];
  const [expanded, setExpanded] = useState(false);
  const [showEditHint, setShowEditHint] = useState(false);

  const handleAccordionClick = (e: React.MouseEvent) => {
    // Prevent node dragging when clicking accordion
    e.stopPropagation();
  };

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: courseColor,
          border: `2px solid ${theme.palette.background.paper}`,
          width: 16, // Even larger handle size
          height: 16,
          borderRadius: 8,
          opacity: 0.8,
          cursor: "crosshair",
          left: -10, // Move handle slightly outward
          transform: "translateX(-50%)",
          transition: theme.transitions.create(
            ["transform", "opacity", "background-color"],
            {
              duration: theme.transitions.duration.shorter,
            }
          ),
        }}
      />
      <Card
        elevation={expanded ? 2 : 0}
        sx={{
          position: "relative",
          width: "auto",
          maxWidth: expanded ? 350 : 250,
          backgroundColor: theme.palette.background.paper,
          borderLeft: `4px solid ${courseColor}`,
          transition: theme.transitions.create(
            ["background-color", "box-shadow", "transform", "max-width"],
            {
              duration: theme.transitions.duration.standard,
            }
          ),
          overflow: "visible", // Allow expansion outside card bounds
          "&:hover": {
            backgroundColor: `${courseColor}08`,
            boxShadow: theme.shadows[4],
            transform: "translateY(-2px)",
            "& .subject-icon": {
              opacity: 0.15,
              transform: "scale(1.1)",
            },
            "& .react-flow__handle": {
              opacity: 1,
              transform: "scale(1.2) translateX(-50%)",
              backgroundColor: theme.palette.primary.main,
            },
            "& .edit-hint": {
              opacity: 1,
            },
          },
          userSelect: "none", // Prevent text selection while dragging
          cursor: "grab", // Show grab cursor
          "&:active": {
            cursor: "grabbing", // Show grabbing cursor while dragging
          },
        }}
        onMouseEnter={() => setShowEditHint(true)}
        onMouseLeave={() => setShowEditHint(false)}
      >
        <Box
          className="edit-hint"
          sx={{
            position: "absolute",
            top: 4,
            right: 4,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            opacity: 0,
            transition: "opacity 0.2s ease-in-out",
            color: theme.palette.text.secondary,
            fontSize: "0.75rem",
            zIndex: 10,
          }}
        >
          <EditIcon sx={{ fontSize: "0.875rem" }} />
          Double-click to edit
        </Box>
        <Accordion
          expanded={expanded}
          onChange={(_, isExpanded) => setExpanded(isExpanded)}
          onClick={handleAccordionClick}
          disableGutters
          sx={{
            background: "transparent",
            boxShadow: "none",
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
                    marginRight: -1, // Adjust icon position
                  }}
                />
              ) : null
            }
            sx={{
              padding: 1,
              backgroundColor: expanded ? `${courseColor}08` : "transparent",
              transition: theme.transitions.create("background-color"),
              "&:hover": {
                backgroundColor: `${courseColor}15`,
              },
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
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
            </Box>
          </AccordionSummary>
          {data.details && (
            <AccordionDetails>
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
            </AccordionDetails>
          )}
        </Accordion>
        <Box
          component="img"
          className="subject-icon"
          src={config.icon}
          alt={subject}
          sx={{
            position: "absolute",
            right: -10,
            bottom: -10,
            width: "80px",
            height: "80px",
            opacity: 0.08,
            transition: theme.transitions.create("all"),
            filter: `drop-shadow(0 0 1px ${courseColor})`,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      </Card>
      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: courseColor,
          border: `2px solid ${theme.palette.background.paper}`,
          width: 16, // Even larger handle size
          height: 16,
          borderRadius: 8,
          opacity: 0.8,
          cursor: "crosshair",
          right: -10, // Move handle slightly outward
          transform: "translateX(50%)",
          transition: theme.transitions.create(
            ["transform", "opacity", "background-color"],
            {
              duration: theme.transitions.duration.shorter,
            }
          ),
        }}
      />
    </>
  );
};

// Build nodes with proper type and styling - improved initial positioning with better spacing
const allNodes = nodesData.map((node, index) => {
  const level = node.data.level;
  const levelCount = nodesData.filter((n) => n.data.level === level).length;
  const levelIndex = nodesData
    .filter((n) => n.data.level === level)
    .findIndex((n) => n.id === node.id);

  return {
    id: node.id,
    type: "custom",
    data: { ...node.data },
    // More space between nodes and levels
    position: {
      x: 200 + level * 400, // Increased horizontal spacing
      y: 150 + (levelIndex - (levelCount - 1) / 2) * 200, // Increased vertical spacing
    },
  };
});

// Build edges: connect each non-root node to its defined parent.
const allEdges = nodesData
  .filter((node) => node.data.level > 0 && node.data.parent)
  .map((node) => ({
    id: `e-${node.data.parent}-${node.id}`,
    source: node.data.parent!,
    target: node.id,
  }));

// Build a mapping (child -> parent) for simulation and grouping.
const parentMap: { [childId: string]: string } = {};
nodesData.forEach((node) => {
  if (node.data.level > 0 && node.data.parent) {
    parentMap[node.id] = node.data.parent;
  }
});

// Determine which nodes have children.
const hasChildren = (id: string) => nodesData.some((n) => n.data.parent === id);

// Default expanded state: for level 1 nodes that have children, start expanded.
const defaultExpanded: { [id: string]: boolean } = {};
nodesData.forEach((node) => {
  if (node.data.level === 1 && hasChildren(node.id)) {
    defaultExpanded[node.id] = true;
  }
});

function MindmapContent() {
  const theme = useTheme();
  const [nodes, setNodes] = useNodesState(allNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(allEdges);
  const reactFlowInstance = useReactFlow();
  const [expanded, setExpanded] = useState<{ [id: string]: boolean }>(
    defaultExpanded
  );
  const [editNode, setEditNode] = useState<Node | null>(null);
  const flowWrapper = useRef<HTMLDivElement>(null);
  const setSnapDimensions = useSetSnapDimensions();

  // Set initial snap dimensions for the panel
  useEffect(() => {
    setSnapDimensions({
      width: 900, // Match defaultWidth from ResizablePanel
      height: 200, // Match defaultHeight from ResizablePanel
    });
  }, [setSnapDimensions]);

  // Handle resize and reflow
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (reactFlowInstance) {
        // Instead of immediately fitting view, wait a frame to let the ResizeContext update
        requestAnimationFrame(() => {
          reactFlowInstance.fitView({
            padding: 0.2,
            duration: 200, // Add smooth animation
            includeHiddenNodes: false, // Only consider visible nodes
          });
        });
      }
    });

    if (flowWrapper.current) {
      resizeObserver.observe(flowWrapper.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [reactFlowInstance]);

  // Progressive disclosure: visible nodes.
  const visibleEnhancedNodes = nodes
    .map((n) => ({
      ...n,
      data: {
        ...n.data,
        label:
          n.data.level === 1 && hasChildren(n.id) ? (
            <Box
              onClick={() => toggleExpand(n.id)}
              sx={{ cursor: "pointer", color: theme.palette.primary.main }}
            >
              {n.data.label} {expanded[n.id] ? "[-]" : "[+]"}
            </Box>
          ) : (
            <Box sx={{ color: theme.palette.text.primary }}>{n.data.label}</Box>
          ),
      },
    }))
    .filter((node) => {
      if (node.data.level <= 1) return true;
      return expanded[node.data.parent!];
    });

  // Filter edges so that both endpoints are visible.
  const visibleEdges = edges.filter(
    (edge) =>
      visibleEnhancedNodes.find((n) => n.id === edge.source) &&
      visibleEnhancedNodes.find((n) => n.id === edge.target)
  );

  // Toggle collapse/expand for a parent node.
  const toggleExpand = useCallback((id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  // Handle edge double click to create new node
  const handleEdgeDoubleClick = useCallback(
    (_: React.MouseEvent, edge: Edge) => {
      const sourceNode = nodes.find((n) => n.id === edge.source);
      const targetNode = nodes.find((n) => n.id === edge.target);

      if (!sourceNode || !targetNode) return;

      const midX = (sourceNode.position.x + targetNode.position.x) / 2;
      const midY = (sourceNode.position.y + targetNode.position.y) / 2;

      const newNodeId = `node-${Date.now()}`;
      const newNode: Node = {
        id: newNodeId,
        type: "custom",
        position: { x: midX, y: midY },
        data: {
          label: "New concept",
          level: Math.min(sourceNode.data.level, targetNode.data.level) + 1,
          nodeLevel: "basic",
          subject: sourceNode.data.subject,
        },
      };

      setNodes((nds) => [...nds, newNode]);
      setEdges((eds) => [
        ...eds,
        {
          id: `e-${edge.source}-${newNodeId}`,
          source: edge.source,
          target: newNodeId,
          type: "smoothstep",
          animated: true,
          style: { stroke: theme.palette.primary.main },
          markerEnd: { type: MarkerType.ArrowClosed },
        },
        {
          id: `e-${newNodeId}-${edge.target}`,
          source: newNodeId,
          target: edge.target,
          type: "smoothstep",
          animated: true,
          style: { stroke: theme.palette.primary.main },
          markerEnd: { type: MarkerType.ArrowClosed },
        },
      ]);

      // Remove the original edge
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    },
    [nodes, theme.palette.primary.main]
  );

  // Handle new connections
  const onConnect = useCallback(
    (params: Connection) => {
      // Create a new edge with our default styling
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "smoothstep",
            animated: true,
            style: { stroke: theme.palette.primary.main },
            markerEnd: { type: MarkerType.ArrowClosed },
          },
          eds
        )
      );
    },
    [setEdges, theme.palette.primary.main]
  );

  // Style edges
  const defaultEdgeOptions = {
    type: "smoothstep",
    animated: true,
    style: { stroke: theme.palette.primary.main },
    markerEnd: { type: MarkerType.ArrowClosed },
  };

  // Handle node changes with proper type annotation
  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );

  // Handle edge click to focus on target node
  const handleEdgeClick = useCallback(
    (_: React.MouseEvent, edge: Edge) => {
      const targetNode = nodes.find((n) => n.id === edge.target);
      if (targetNode) {
        // Center view on target node with animation and proper padding
        requestAnimationFrame(() => {
          reactFlowInstance.setCenter(
            targetNode.position.x,
            targetNode.position.y,
            {
              duration: 800,
              zoom: 1.5, // Slightly zoom in for better visibility
            }
          );
          // After centering, ensure the node is fully visible
          setTimeout(() => {
            reactFlowInstance.fitView({
              padding: 0.5,
              duration: 300,
              nodes: [targetNode],
            });
          }, 850);
        });
      }
    },
    [nodes, reactFlowInstance]
  );

  // Handle node double click
  const onNodeDoubleClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.stopPropagation();
      setEditNode(node);
    },
    []
  );

  // Handle node edit save
  const handleNodeEdit = useCallback(
    (label: string, details: string) => {
      if (!editNode) return;

      // Trim whitespace but preserve newlines in details
      const trimmedLabel = label.trim();
      const trimmedDetails = details
        .split("\n")
        .map((line) => line.trim())
        .join("\n")
        .trim();

      if (!trimmedLabel) return; // Don't allow empty labels

      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === editNode.id) {
            return {
              ...node,
              data: {
                ...node.data,
                label: trimmedLabel,
                details: trimmedDetails,
              },
            };
          }
          return node;
        })
      );
    },
    [editNode, setNodes]
  );

  // Add keyboard shortcut handling
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && editNode) {
        setEditNode(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [editNode]);

  // Run force simulation with improved spacing
  useEffect(() => {
    const simulationNodes: MySimNode[] = nodes.map((n) => ({
      id: n.id,
      x: n.position.x,
      y: n.position.y,
      r: 125, // Increased collision radius to account for expanded nodes
    }));

    // Custom force: For nodes with a parent, pull them toward a circle (radius = 80) around their parent's position.
    function forceRadialFromParent(alpha: number) {
      simulationNodes.forEach((d) => {
        const parentId = parentMap[d.id];
        if (parentId) {
          const parent = simulationNodes.find((p) => p.id === parentId);
          if (
            parent &&
            typeof parent.x === "number" &&
            typeof parent.y === "number"
          ) {
            const desiredRadius = 80;
            const dx = d.x! - parent.x;
            const dy = d.y! - parent.y;
            const currentRadius = Math.sqrt(dx * dx + dy * dy) || 1;
            const delta = desiredRadius - currentRadius;
            const k = 0.1 * alpha;
            if (d.vx !== undefined && d.vy !== undefined) {
              d.vx += (dx / currentRadius) * delta * k;
              d.vy += (dy / currentRadius) * delta * k;
            }
          }
        }
      });
    }

    // Custom force: Align nodes horizontally within their level with more spacing
    function forceLevelAlignment(alpha: number) {
      simulationNodes.forEach((d) => {
        const node = nodesData.find((n) => n.id === d.id);
        if (node && typeof d.x === "number") {
          const targetX = 200 + node.data.level * 400;
          const dx = targetX - d.x;
          if (d.vx !== undefined) {
            d.vx += dx * alpha * 0.5; // Increased strength
          }
        }
      });
    }

    const simulation = forceSimulation(simulationNodes)
      .force("charge", forceManyBody().strength(-800)) // Stronger repulsion
      .force("levelAlign", forceLevelAlignment)
      .force(
        "collide",
        forceCollide<MySimNode>()
          .radius((d) => d.r)
          .strength(0.8) // Increased collision strength
          .iterations(4)
      )
      .stop();

    simulation.tick(300); // More ticks for better layout

    setNodes((prevNodes) =>
      prevNodes.map((n) => {
        const simNode = simulationNodes.find((s) => s.id === n.id)!;
        return {
          ...n,
          position: {
            x: simNode.x!,
            y: simNode.y!,
          },
        };
      })
    );
  }, []); // Only run on mount

  return (
    <Box
      ref={flowWrapper}
      sx={{
        height: "100%",
        width: "100%",
        bgcolor: theme.palette.background.paper,
        position: "relative", // Ensure proper stacking context
        overflow: "hidden", // Prevent content overflow during resize
        "& .react-flow__attribution": {
          display: "none",
        },
        // Enhanced handle interaction
        "& .react-flow__handle": {
          transition: theme.transitions.create([
            "transform",
            "background-color",
            "opacity",
          ]),
          "&:hover": {
            transform: "scale(1.4) translateX(-50%)",
            backgroundColor: theme.palette.primary.main,
          },
        },
        // Enhanced connection lines
        "& .react-flow__connection-path": {
          stroke: theme.palette.primary.main,
          strokeWidth: 3,
          filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
        },
        // Enhanced edge paths
        "& .react-flow__edge-path": {
          stroke: theme.palette.primary.main,
          strokeWidth: 2,
          cursor: "pointer",
          filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
          transition: theme.transitions.create(["stroke-width", "filter"]),
          "&:hover": {
            strokeWidth: 3,
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
          },
        },
        // Enhanced node dragging
        "& .react-flow__node": {
          transition: theme.transitions.create(["transform", "box-shadow"]),
          "&.dragging": {
            zIndex: 1000,
            cursor: "grabbing",
            transform: "scale(1.02)",
            boxShadow: theme.shadows[8],
          },
          // Add padding around nodes to prevent content clipping
          padding: 1,
        },
      }}
    >
      <ReactFlow
        nodes={visibleEnhancedNodes}
        edges={visibleEdges}
        onNodesChange={handleNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        defaultEdgeOptions={defaultEdgeOptions}
        onEdgeDoubleClick={handleEdgeDoubleClick}
        onEdgeClick={handleEdgeClick}
        onNodeDoubleClick={onNodeDoubleClick}
        nodeTypes={{ custom: CustomNode }}
        fitView
        fitViewOptions={{
          padding: 0.5,
          duration: 200,
          includeHiddenNodes: false,
        }}
        // Enable mousewheel zoom when holding Ctrl/Cmd
        zoomOnScroll={false}
        zoomOnPinch={true}
        onWheel={(event) => {
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            const delta = event.deltaY;
            reactFlowInstance.zoomTo(
              reactFlowInstance.getZoom() * (1 - delta * 0.001),
              {
                duration: 100,
              }
            );
          }
        }}
        defaultViewport={{ x: 0, y: 0, zoom: 1.5 }}
        minZoom={0.5}
        maxZoom={2}
      >
        <Background size={2} gap={20} />
        <Controls showInteractive={true} />
      </ReactFlow>

      <EditNodeDialog
        open={Boolean(editNode)}
        onClose={() => setEditNode(null)}
        onSave={handleNodeEdit}
        initialLabel={editNode?.data.label || ""}
        initialDetails={editNode?.data.details || ""}
      />
    </Box>
  );
}

// Wrapper component that provides ReactFlow context
function Mindmap() {
  return (
    <ReactFlowProvider>
      <MindmapContent />
    </ReactFlowProvider>
  );
}

export default Mindmap;
