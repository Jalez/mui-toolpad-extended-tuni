/** @format */
import { useEffect, useCallback, useRef, useMemo } from "react";
import ReactFlow, {
  useEdgesState,
  useNodesState,
  NodeChange,
  applyNodeChanges,
  Connection,
  addEdge,
  Controls,
  Edge,
  Node,
  useReactFlow,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { EditNodeDialog } from "./EditNodeDialog";
import { CustomNode } from "./CustomNode";
import {
  initializeNodes,
  initializeEdges,
  runForceSimulation,
} from "./mindmapUtils";
import { useMindmapStore } from "./store";
import { useState } from "react";

export function MindmapContent() {
  const theme = useTheme();
  const [nodes, setNodes] = useNodesState(initializeNodes());
  const [edges, setEdges, onEdgesChange] = useEdgesState(initializeEdges());
  const reactFlowInstance = useReactFlow();
  const [editNode, setEditNode] = useState<Node | null>(null);
  const flowWrapper = useRef<HTMLDivElement>(null);

  // Use mindmap store for expansion state
  const { expandedNodes, toggleNodeExpansion, updateNodeData } =
    useMindmapStore();

  // Set initial snap dimensions for the panel

  // Handle resize and reflow with better padding
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (reactFlowInstance) {
        requestAnimationFrame(() => {
          reactFlowInstance.fitView({
            padding: 0.5, // Increased padding
            duration: 300,
            includeHiddenNodes: false,
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

  // Progressive disclosure: visible nodes
  const visibleEnhancedNodes = nodes
    .map((n) => ({
      ...n,
      data: {
        ...n.data,
        isExpanded: expandedNodes[n.id] ?? false,
        onToggleExpand: () => toggleNodeExpansion(n.id),
        onEdit: () => setEditNode(n),
        onAddChild: () => {
          const newId = `${n.id}-${Date.now()}`;
          let newX = n.position.x + 200;
          let newY = n.position.y;
          const threshold = 50;
          // Check for collisions with any existing node positions
          const isColliding = (x: number, y: number) =>
            nodes.some((node) => {
              const dx = node.position.x - x;
              const dy = node.position.y - y;
              return Math.sqrt(dx * dx + dy * dy) < threshold;
            });
          while (isColliding(newX, newY)) {
            newY += threshold;
          }
          const newNode = {
            id: newId,
            type: "custom",
            data: {
              label: "New Node",
              level: (n.data.level || 0) + 1,
              parent: n.id,
              nodeLevel: "basic" as "basic",
              details: "",
            },
            position: { x: newX, y: newY },
          };
          setNodes((nds) => [...nds, newNode]);
          setEdges((eds) => [
            ...eds,
            { id: `e-${n.id}-${newId}`, source: n.id, target: newId },
          ]);
        },
        onAddParent: () => {
          // Prevent adding a parent to a root node.
          if ((n.data.level || 0) === 0) return;
          const newParentId = `${n.id}-parent-${Date.now()}`;
          const newParentLevel = Math.max(0, (n.data.level || 0) - 1);
          let newX = n.position.x - 200;
          let newY = n.position.y;
          const threshold = 50;
          const isColliding = (x: number, y: number) =>
            nodes.some((node) => {
              const dx = node.position.x - x;
              const dy = node.position.y - y;
              return Math.sqrt(dx * dx + dy * dy) < threshold;
            });
          while (isColliding(newX, newY)) {
            newY += threshold;
          }
          const newParentNode = {
            id: newParentId,
            type: "custom",
            data: {
              label: "New Parent Node",
              level: newParentLevel,
              parent: undefined,
              nodeLevel: "basic" as "basic",
              details: "",
              subject: n.data.subject,
            },
            position: { x: newX, y: newY },
          };
          // Update the current node to have the new parent and adjusted level.
          setNodes((nds) =>
            nds.map((node) =>
              node.id === n.id
                ? {
                    ...node,
                    data: {
                      ...node.data,
                      parent: newParentId,
                      level: newParentLevel + 1,
                    },
                  }
                : node
            )
          );
          setNodes((nds) => [...nds, newParentNode]);
          setEdges((eds) => [
            ...eds,
            {
              id: `e-${newParentId}-${n.id}`,
              source: newParentId,
              target: n.id,
            },
          ]);
        },
      },
    }))
    .filter((node) => {
      if (node.data.level <= 1) return true;
      return expandedNodes[node.data.parent!];
    });

  // Filter edges for visible nodes
  const visibleEdges = edges.filter(
    (edge) =>
      visibleEnhancedNodes.find((n) => n.id === edge.source) &&
      visibleEnhancedNodes.find((n) => n.id === edge.target)
  );

  // Handle node edit
  const handleNodeEdit = useCallback(
    (label: string, details: string) => {
      if (!editNode) return;

      const trimmedLabel = label.trim();
      const trimmedDetails = details
        .split("\n")
        .map((line) => line.trim())
        .join("\n")
        .trim();

      if (!trimmedLabel) return;

      updateNodeData(editNode.id, {
        label: trimmedLabel,
        details: trimmedDetails,
      });

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
    [editNode, setNodes, updateNodeData]
  );

  // Handle edge click to focus with better view fitting
  const handleEdgeClick = useCallback(
    (_: React.MouseEvent, edge: Edge) => {
      const targetNode = nodes.find((n) => n.id === edge.target);
      if (targetNode) {
        requestAnimationFrame(() => {
          // First zoom out slightly
          reactFlowInstance.zoomTo(1.2, { duration: 400 });

          // Then center on the node
          setTimeout(() => {
            reactFlowInstance.setCenter(
              targetNode.position.x,
              targetNode.position.y,
              { duration: 600 }
            );

            // Finally, ensure the node is fully visible
            setTimeout(() => {
              reactFlowInstance.fitView({
                padding: 1,
                duration: 300,
                nodes: [targetNode],
                minZoom: 1.2,
                maxZoom: 1.5,
              });
            }, 650);
          }, 450);
        });
      }
    },
    [nodes, reactFlowInstance]
  );

  // Handle node changes
  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );

  // Handle new connections
  const onConnect = useCallback(
    (params: Connection) => {
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

  // Run force simulation
  useEffect(() => {
    const simulationNodes = runForceSimulation(nodes);
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
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && editNode) {
        setEditNode(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [editNode]);

  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

  return (
    <Box
      ref={flowWrapper}
      sx={{
        height: "100%",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        "& .react-flow__renderer": {
          willChange: "transform",
        },
        "& .react-flow__viewport": {
          transform: "translate3d(0,0,0)",
          backfaceVisibility: "hidden",
          perspective: 1000,
        },
        "& .react-flow__attribution": {
          display: "none",
        },
        "& .react-flow__handle": {
          "&:hover": {
            transform: "scale(1.4) translateX(-50%)",
            backgroundColor: theme.palette.primary.main,
          },
        },
        "& .react-flow__connection-path": {
          stroke: theme.palette.primary.main,
          strokeWidth: 3,
          filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
        },
        "& .react-flow__edge-path": {
          stroke: theme.palette.primary.main,
          strokeWidth: 2,
          cursor: "pointer",
          filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
          "&:hover": {
            strokeWidth: 3,
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
          },
        },
        "& .react-flow__node": {
          "&.dragging": {
            zIndex: 1000,
            cursor: "grabbing",
            transform: "translate3d(0,0,0)",
          },
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
        defaultEdgeOptions={{
          type: "smoothstep",
          animated: true,
          style: { stroke: theme.palette.primary.main },
          markerEnd: { type: MarkerType.ArrowClosed },
        }}
        onEdgeClick={handleEdgeClick}
        onNodeDoubleClick={(_, node) => setEditNode(node)}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{
          padding: 1,
          duration: 200,
          includeHiddenNodes: false,
        }}
        zoomOnScroll={false}
        zoomOnPinch={true}
        onWheel={(event) => {
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            const delta = event.deltaY;
            reactFlowInstance.zoomTo(
              reactFlowInstance.getZoom() * (1 - delta * 0.001),
              { duration: 100 }
            );
          }
        }}
        defaultViewport={{ x: 0, y: 0, zoom: 1.5 }}
        minZoom={0.5}
        maxZoom={2}
        nodesDraggable={true}
        elementsSelectable={true}
        selectNodesOnDrag={false}
        translateExtent={[
          [-1000, -1000],
          [2000, 2000],
        ]}
      >
        {/* <Background size={2} gap={20} /> */}
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
