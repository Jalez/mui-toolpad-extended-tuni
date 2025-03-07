/** @format */
import {
  useEffect,
  useCallback,
  useRef,
  useMemo,
  useState,
  useLayoutEffect,
} from "react";
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
  Background,
  BackgroundVariant,
  Viewport,
} from "reactflow";
import "reactflow/dist/style.css";
import { Box, IconButton, Tooltip, Menu, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import GridOnIcon from "@mui/icons-material/GridOn";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import { EditNodeDialog } from "./EditNodeDialog";
import { CustomNode } from "./CustomNode";
import {
  initializeNodes,
  initializeEdges,
  runForceSimulation,
} from "./mindmapUtils";
import { useMindmapStore } from "./store";

// Debounce utility function
function debounce<F extends (...args: any[]) => any>(fn: F, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<F>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export function MindmapContent() {
  const theme = useTheme();
  const {
    expandedNodes,
    toggleNodeExpansion,
    updateNodeData,
    viewport,
    setViewport,
    nodes: storedNodes,
    setNodes: setStoredNodes,
    edges: storedEdges,
    setEdges: setStoredEdges,
    selectedNodeId,
    setSelectedNodeId,
  } = useMindmapStore();

  // Initialize with stored nodes or default nodes if store is empty
  const [nodes, setNodes] = useNodesState(() => {
    if (storedNodes && storedNodes.length > 0) {
      return storedNodes;
    }
    return initializeNodes();
  });

  // Initialize with stored edges or default edges if store is empty
  const [edges, setEdges, onEdgesChange] = useEdgesState(() => {
    if (storedEdges && storedEdges.length > 0) {
      return storedEdges;
    }
    return initializeEdges();
  });

  const reactFlowInstance = useReactFlow();
  const [editNode, setEditNode] = useState<Node | null>(null);
  const flowWrapper = useRef<HTMLDivElement>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [layoutMenuAnchor, setLayoutMenuAnchor] = useState<null | HTMLElement>(
    null
  );
  const [currentLayout, setCurrentLayout] = useState<
    "default" | "horizontal" | "vertical" | "radial"
  >("default");
  const [initialRender, setInitialRender] = useState(true);
  const initialViewportSet = useRef(false);

  // Sync nodes with store whenever they change
  useEffect(() => {
    setStoredNodes(nodes);
  }, [nodes, setStoredNodes]);

  // Sync edges with store whenever they change
  useEffect(() => {
    setStoredEdges(edges);
  }, [edges, setStoredEdges]);

  // Set up viewport on initial render and focus on selected node if one exists
  useLayoutEffect(() => {
    if (initialRender && !initialViewportSet.current) {
      if (selectedNodeId) {
        const selectedNode = nodes.find((node) => node.id === selectedNodeId);
        if (selectedNode) {
          // Set viewport directly without animation
          const newViewport = {
            x:
              -(selectedNode.position.x * viewport.zoom) +
              (flowWrapper.current?.clientWidth || 0) / 2,
            y:
              -(selectedNode.position.y * viewport.zoom) +
              (flowWrapper.current?.clientHeight || 0) / 2,
            zoom: viewport.zoom,
          };
          reactFlowInstance.setViewport(newViewport, { duration: 0 });
          setViewport(newViewport);
        }
      } else {
        // If no selected node, just set the stored viewport
        reactFlowInstance.setViewport(viewport, { duration: 0 });
      }
      initialViewportSet.current = true;
      setInitialRender(false);
    }
  }, [
    initialRender,
    viewport,
    selectedNodeId,
    nodes,
    reactFlowInstance,
    setViewport,
  ]);

  // Handle node selection
  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      // Only prevent selection if clicking directly on a handle
      if (
        (event.target as HTMLElement).classList.contains("react-flow__handle")
      ) {
        return;
      }

      // Set as selected node in store
      setSelectedNodeId(node.id);

      // Center on the selected node
      reactFlowInstance.setCenter(node.position.x, node.position.y, {
        duration: 800,
        zoom: reactFlowInstance.getZoom(),
      });
    },
    [setSelectedNodeId, reactFlowInstance]
  );

  // Handle viewport change with debounce to avoid too many updates
  const handleViewportChange = useCallback(
    debounce((viewport: Viewport) => {
      if (!initialRender) {
        setViewport(viewport);
      }
    }, 200),
    [setViewport, initialRender]
  );

  // Better wheel handling for zoom
  const handleWheel = useCallback(
    (event: React.WheelEvent) => {
      // Check if ctrl/cmd key is pressed for zoom behavior
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();

        // Get the current viewport
        const { zoom, x, y } = reactFlowInstance.getViewport();

        // Calculate the position where the mouse is pointing in the viewport
        const rect = event.currentTarget.getBoundingClientRect();
        const clientX = event.clientX - rect.left;
        const clientY = event.clientY - rect.top;

        // Calculate the point in the canvas where the mouse is
        const pointInCanvas = {
          x: (clientX - x) / zoom,
          y: (clientY - y) / zoom,
        };

        // Calculate new zoom level
        const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;
        const newZoom = Math.min(4, Math.max(0.1, zoom * zoomFactor));

        // Calculate new position to keep the point under the mouse
        const newX = clientX - pointInCanvas.x * newZoom;
        const newY = clientY - pointInCanvas.y * newZoom;

        // Set the new viewport
        reactFlowInstance.setViewport(
          { x: newX, y: newY, zoom: newZoom },
          { duration: 0 }
        );

        // Update the viewport in store for persistence
        setViewport({ x: newX, y: newY, zoom: newZoom });
      } else {
        // Regular scrolling behavior - pan vertically
        const { zoom, x, y } = reactFlowInstance.getViewport();
        reactFlowInstance.setViewport(
          { x, y: y - event.deltaY, zoom },
          { duration: 0 }
        );
        setViewport({ x, y: y - event.deltaY, zoom });
      }
    },
    [reactFlowInstance, setViewport]
  );

  // Use force simulation only on initial empty state
  useEffect(() => {
    if (storedNodes.length === 0 && nodes.length > 0) {
      const simulationNodes = runForceSimulation(nodes);
      setNodes((prevNodes) =>
        prevNodes.map((n) => {
          const simNode = simulationNodes.find((s) => s.id === n.id)!;
          return {
            ...n,
            position: {
              x: simNode?.x ?? n.position.x,
              y: simNode?.y ?? n.position.y,
            },
          };
        })
      );
    }
  }, []);

  // Persist node positions on drag end
  const onNodeDragStop = useCallback(
    (event: React.MouseEvent, node: Node) => {
      setNodes((nds) => {
        return nds.map((n) => {
          if (n.id === node.id) {
            return {
              ...n,
              position: node.position,
            };
          }
          return n;
        });
      });
    },
    [setNodes]
  );

  // Progressive disclosure: visible nodes
  const visibleEnhancedNodes = nodes
    .map((n) => ({
      ...n,
      selected: selectedNodeId === n.id,
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
      if (snapToGrid) {
        changes = changes.map((change) => {
          if (change.type === "position" && change.position) {
            return {
              ...change,
              position: {
                x: Math.round(change.position.x / 20) * 20,
                y: Math.round(change.position.y / 20) * 20,
              },
            };
          }
          return change;
        });
      }
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes, snapToGrid]
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

  // Add layout management functions
  const applyLayout = useCallback(
    (layoutType: "default" | "horizontal" | "vertical" | "radial") => {
      setCurrentLayout(layoutType);
      const nodeSpacing = 200;
      const levelSpacing = 200;

      setNodes((nds) => {
        return nds.map((node) => {
          const level = node.data.level || 0;
          const nodesAtLevel = nds.filter((n) => n.data.level === level).length;
          const nodeIndex = nds
            .filter((n) => n.data.level === level)
            .findIndex((n) => n.id === node.id);

          let x = 0;
          let y = 0;

          switch (layoutType) {
            case "horizontal":
              x = level * levelSpacing;
              y = (nodeIndex - (nodesAtLevel - 1) / 2) * nodeSpacing;
              break;
            case "vertical":
              x = (nodeIndex - (nodesAtLevel - 1) / 2) * nodeSpacing;
              y = level * levelSpacing;
              break;
            case "radial":
              const angle = (2 * Math.PI * nodeIndex) / nodesAtLevel;
              const radius = level * levelSpacing;
              x = Math.cos(angle) * radius;
              y = Math.sin(angle) * radius;
              break;
            default:
              // Use force-directed layout (handled by existing simulation)
              return node;
          }

          return {
            ...node,
            position: { x, y },
          };
        });
      });

      // Fit view after layout change
      setTimeout(() => {
        reactFlowInstance.fitView({ padding: 0.5, duration: 800 });
      }, 50);

      setLayoutMenuAnchor(null);
    },
    [reactFlowInstance, setNodes]
  );

  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

  return (
    <Box
      ref={flowWrapper}
      sx={{
        bgcolor: theme.palette.background.default,
        border: `0.5em solid ${theme.palette.divider}`,

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
      onWheel={handleWheel}
    >
      <ReactFlow
        nodes={visibleEnhancedNodes}
        edges={visibleEdges}
        onNodesChange={handleNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        onNodeClick={onNodeClick}
        snapToGrid={snapToGrid}
        snapGrid={[20, 20]}
        defaultViewport={viewport}
        onViewportChange={handleViewportChange}
        fitView={false} // Disable automatic fit view since we're using stored viewport
        defaultEdgeOptions={{
          type: "smoothstep",
          animated: true,
          style: { stroke: theme.palette.primary.main },
          markerEnd: { type: MarkerType.ArrowClosed },
        }}
        onEdgeClick={handleEdgeClick}
        onNodeDoubleClick={(_, node) => setEditNode(node)}
        nodeTypes={nodeTypes}
        zoomOnScroll={true}
        zoomOnPinch={true}
        minZoom={0.2}
        maxZoom={4}
        nodesDraggable={true}
        elementsSelectable={true}
        selectNodesOnDrag={false}
        translateExtent={[
          [-2000, -2000],
          [4000, 4000],
        ]}
      >
        {showGrid && (
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color={theme.palette.divider}
          />
        )}
        <Controls showInteractive={true}>
          <Tooltip title="Toggle Grid">
            <IconButton
              onClick={() => setShowGrid(!showGrid)}
              size="small"
              sx={{
                backgroundColor: theme.palette.background.paper,
                color: showGrid
                  ? theme.palette.primary.main
                  : theme.palette.text.secondary,
              }}
            >
              <GridOnIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Change Layout">
            <IconButton
              onClick={(e) => setLayoutMenuAnchor(e.currentTarget)}
              size="small"
              sx={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.secondary,
              }}
            >
              <ViewQuiltIcon />
            </IconButton>
          </Tooltip>
        </Controls>
      </ReactFlow>

      <Menu
        anchorEl={layoutMenuAnchor}
        open={Boolean(layoutMenuAnchor)}
        onClose={() => setLayoutMenuAnchor(null)}
      >
        <MenuItem onClick={() => applyLayout("default")}>
          Force-Directed
        </MenuItem>
        <MenuItem onClick={() => applyLayout("horizontal")}>
          Horizontal Tree
        </MenuItem>
        <MenuItem onClick={() => applyLayout("vertical")}>
          Vertical Tree
        </MenuItem>
        <MenuItem onClick={() => applyLayout("radial")}>Radial</MenuItem>
        <MenuItem onClick={() => setSnapToGrid(!snapToGrid)}>
          {snapToGrid ? "✓ Snap to Grid" : "Snap to Grid"}
        </MenuItem>
      </Menu>

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
