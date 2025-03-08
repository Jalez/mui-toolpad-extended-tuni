/** @format */
import { useCallback, useEffect } from "react";
import {
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  useNodesState,
  useEdgesState,
  applyNodeChanges,
  addEdge,
  useReactFlow,
  MarkerType,
} from "reactflow";
import { useMindmapStore } from "../store";
import {
  initializeNodes,
  initializeEdges,
  runForceSimulation,
} from "../mindmapUtils";
import { useTheme } from "@mui/material/styles";
import { useNodeOperations } from "./useNodeOperations";

type NodeManagerResult = {
  nodes: Node[];
  edges: Edge[];
  onEdgesChange: (changes: EdgeChange[]) => void;
  handleNodesChange: (changes: NodeChange[], snapToGrid?: boolean) => void;
  onNodeDragStop: (event: React.MouseEvent, node: Node) => void;
  onConnect: (params: Connection) => void;
  handleNodeEdit: (nodeId: string, label: string, details: string) => void;
  getVisibleNodes: () => Node[];
  getVisibleEdges: () => Edge[];
  applyLayout: (
    layoutType: "default" | "horizontal" | "vertical" | "radial"
  ) => void;
  setSelectedNodeId: (nodeId: string | null) => void;
  selectedNodeId: string | null; // Added selectedNodeId to the return type
};

export function useNodeManager(): NodeManagerResult {
  const theme = useTheme();
  const {
    expandedNodes,
    toggleNodeExpansion,
    updateNodeData,
    nodes: storedNodes,
    setNodes: setStoredNodes,
    edges: storedEdges,
    setEdges: setStoredEdges,
    selectedNodeId,
    setSelectedNodeId,
  } = useMindmapStore();

  const reactFlowInstance = useReactFlow();

  // Fix typing issues by properly initializing with concrete arrays
  const initialNodes =
    storedNodes && storedNodes.length > 0 ? storedNodes : initializeNodes();

  const initialEdges =
    storedEdges && storedEdges.length > 0 ? storedEdges : initializeEdges();

  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Extract node operation helpers
  const { addChildNode, addParentNode } = useNodeOperations(
    nodes,
    setNodes,
    setEdges
  );

  // Sync nodes with store whenever they change
  useEffect(() => {
    setStoredNodes(nodes);
  }, [nodes, setStoredNodes]);

  // Sync edges with store whenever they change
  useEffect(() => {
    setStoredEdges(edges);
  }, [edges, setStoredEdges]);

  // Run force simulation for new mindmaps
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

  // Handle node changes with optional snap to grid
  const handleNodesChange = useCallback(
    (changes: NodeChange[], snapToGrid: boolean = false) => {
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
    [setNodes]
  );

  // Persist node positions on drag end
  const onNodeDragStop = useCallback(
    (_: React.MouseEvent, node: Node) => {
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

  // Handle connections between nodes
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

  // Get visible nodes (taking into account expanded state)
  const getVisibleNodes = useCallback(() => {
    return nodes
      .map((n) => ({
        ...n,
        selected: selectedNodeId === n.id,
        data: {
          ...n.data,
          isExpanded: expandedNodes[n.id] ?? false,
          onToggleExpand: () => toggleNodeExpansion(n.id),
          onAddChild: () => addChildNode(n),
          onAddParent: () => addParentNode(n),
        },
      }))
      .filter((node) => {
        if (node.data.level <= 1) return true;
        return expandedNodes[node.data.parent!];
      });
  }, [
    nodes,
    selectedNodeId,
    expandedNodes,
    toggleNodeExpansion,
    addChildNode,
    addParentNode,
  ]);

  // Get visible edges based on visible nodes
  const getVisibleEdges = useCallback(() => {
    const visibleNodes = getVisibleNodes();
    return edges.filter(
      (edge) =>
        visibleNodes.find((n) => n.id === edge.source) &&
        visibleNodes.find((n) => n.id === edge.target)
    );
  }, [edges, getVisibleNodes]);

  // Update node data (used when editing nodes)
  const handleNodeEdit = useCallback(
    (nodeId: string, label: string, details: string) => {
      const trimmedLabel = label.trim();
      const trimmedDetails = details
        .split("\n")
        .map((line) => line.trim())
        .join("\n")
        .trim();

      if (!trimmedLabel) return;

      updateNodeData(nodeId, {
        label: trimmedLabel,
        details: trimmedDetails,
      });

      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
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
    [setNodes, updateNodeData]
  );

  // Apply a layout algorithm to the nodes
  const applyLayout = useCallback(
    (layoutType: "default" | "horizontal" | "vertical" | "radial") => {
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
              const simulationNodes = runForceSimulation(nds, layoutType);
              const simNode = simulationNodes.find((s) => s.id === node.id);
              return {
                ...node,
                position: {
                  x: simNode?.x ?? node.position.x,
                  y: simNode?.y ?? node.position.y,
                },
              };
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
    },
    [reactFlowInstance, setNodes]
  );

  return {
    nodes,
    edges,
    onEdgesChange,
    handleNodesChange,
    onNodeDragStop,
    onConnect,
    handleNodeEdit,
    getVisibleNodes,
    getVisibleEdges,
    applyLayout,
    setSelectedNodeId,
    selectedNodeId,
  };
}
