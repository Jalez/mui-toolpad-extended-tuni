/** @format */
import { useEffect, useState, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Connection,
  OnConnect,
  OnNodesChange,
  applyNodeChanges,
  Edge,
} from 'reactflow';
import {
  forceSimulation,
  forceManyBody,
  forceCollide,
  forceCenter,
  SimulationNodeDatum,
} from 'd3-force';
import 'reactflow/dist/style.css';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { MarkerType } from 'reactflow';

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
}

// Sample hierarchical data (smaller set for clarity).
const nodesData: Array<{ id: string; data: NodeData }> = [
  { id: 'root', data: { label: 'Testing Cases', level: 0 } },
  { id: 'section1', data: { label: '1. Introduction', level: 1 } },
  {
    id: 'section1-b1',
    data: { label: 'Dynamic testing is key', level: 2, parent: 'section1' },
  },
  {
    id: 'section1-b2',
    data: { label: 'Quality matters', level: 2, parent: 'section1' },
  },
  { id: 'section2', data: { label: '2. What is a Test Case?', level: 1 } },
  {
    id: 'section2-b1',
    data: {
      label: 'Definition: Evaluate behavior',
      level: 2,
      parent: 'section2',
    },
  },
  {
    id: 'section2-b2',
    data: {
      label: 'Components: objective, input, expected result',
      level: 2,
      parent: 'section2',
    },
  },
];

// Build initial nodes (positions based on level and index).
const allNodes = nodesData.map((node, index) => ({
  id: node.id,
  data: { ...node.data },
  position: { x: 100 + node.data.level * 150, y: 50 + index * 60 },
}));

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

function MindMap() {
  const theme = useTheme();
  // Maintain the complete node and edge lists.
  const [flowNodes, setFlowNodes] = useState(allNodes);
  const [flowEdges, setFlowEdges] = useState<Edge[]>(allEdges);
  const [expanded, setExpanded] = useState<{ [id: string]: boolean }>(
    defaultExpanded
  );

  // Progressive disclosure: visible nodes.
  const visibleEnhancedNodes = flowNodes
    .map((n) => ({
      ...n,
      // Render a custom label for section headers.
      data: {
        ...n.data,
        label:
          n.data.level === 1 && hasChildren(n.id) ? (
            <Box
              onClick={() => toggleExpand(n.id)}
              // style={{ cursor: 'pointer', color: theme.palette.primary.main }}
            >
              {n.data.label} {expanded[n.id] ? '[-]' : '[+]'}
            </Box>
          ) : (
            <Box
              sx={{
                color: theme.palette.text.primary,
                bgcolor: 'red',
              }}>
              {n.data.label}
            </Box>
          ),
      },
    }))
    .filter((node) => {
      // Always show level 0 and 1 nodes.
      if (node.data.level <= 1) return true;
      // For deeper nodes, only show if their parent is expanded.
      return expanded[node.data.parent!];
    });

  // Filter edges so that both endpoints are visible.
  const visibleEdges = flowEdges.filter(
    (edge) =>
      visibleEnhancedNodes.find((n) => n.id === edge.source) &&
      visibleEnhancedNodes.find((n) => n.id === edge.target)
  );

  // Toggle collapse/expand for a parent node.
  const toggleExpand = useCallback((id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  // Interactivity: allow nodes to be dragged.
  const onNodesChange: OnNodesChange = useCallback((changes) => {
    setFlowNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  // Interactivity: allow drawing connections.
  const onConnect: OnConnect = useCallback((params: Connection) => {
    setFlowEdges((eds) => addEdge(params, eds));
  }, []);

  // Run a force simulation on mount to reduce overlaps and gently arrange children around parents.
  useEffect(() => {
    const simulationNodes: MySimNode[] = flowNodes.map((n) => ({
      id: n.id,
      x: n.position.x,
      y: n.position.y,
      r: 40,
    }));

    // Custom force: For nodes with a parent, pull them toward a circle (radius = 80) around their parent's position.
    function forceRadialFromParent(alpha: number) {
      simulationNodes.forEach((d) => {
        const parentId = parentMap[d.id];
        if (parentId) {
          const parent = simulationNodes.find((p) => p.id === parentId);
          if (
            parent &&
            typeof parent.x === 'number' &&
            typeof parent.y === 'number'
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

    const simulation = forceSimulation(simulationNodes)
      .force('charge', forceManyBody().strength(-200))
      .force('center', forceCenter(300, 300))
      .force(
        'collide',
        forceCollide<MySimNode>()
          .radius((d) => d.r + 10)
          .iterations(2)
      )
      .force('radialFromParent', forceRadialFromParent)
      .stop();

    simulation.tick(100);

    setFlowNodes((prevNodes) =>
      prevNodes.map((n) => {
        const simNode = simulationNodes.find((s) => s.id === n.id)!;
        return { ...n, position: { x: simNode.x!, y: simNode.y! } };
      })
    );
  }, []);

  // Sidebar: allow adding a new section header.
  const addNode = useCallback(() => {
    const label = prompt('Enter section header label:');
    if (!label) return;
    const newId = `node-${Date.now()}`;
    const newNode = {
      id: newId,
      data: { label, level: 1 },
      position: { x: 100 + 150, y: 50 + flowNodes.length * 60 },
    };
    setFlowNodes((prev) => [...prev, newNode]);
    setExpanded((prev) => ({ ...prev, [newId]: true }));
  }, [flowNodes]);

  // Animate edges to indicate flow direction using a colored stroke and arrow marker.
  const coloredEdges = visibleEdges.map((edge) => ({
    ...edge,
    animated: true,
    style: { stroke: theme.palette.primary.main, strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: theme.palette.primary.main,
    },
  }));

  return (
    <ReactFlowProvider>
      <Box display='flex' height='100%'>
        {/* Sidebar */}
        <Box
          width={200}
          p={2}
          bgcolor={theme.palette.background.paper}
          borderRight={`1px solid ${theme.palette.divider}`}>
          <Button variant='contained' onClick={addNode} fullWidth>
            Add Section
          </Button>
        </Box>
        {/* React Flow container */}
        <Box flex={1}>
          <ReactFlow
            nodes={visibleEnhancedNodes}
            edges={coloredEdges}
            onConnect={onConnect}
            onNodesChange={onNodesChange}
            fitView
          />
        </Box>
      </Box>
    </ReactFlowProvider>
  );
}

export default MindMap;
