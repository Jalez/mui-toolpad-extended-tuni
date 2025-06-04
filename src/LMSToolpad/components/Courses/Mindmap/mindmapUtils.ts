/** @format */
import { Node } from "@xyflow/react";
import { NodeData } from "./types";
import { LAYOUT_OPTIONS, NODE_POSITION } from "./constants";
import { nodesData } from "./test/nodesData";

// Build a mapping (child -> parent) using the new `parentId` property
export const parentMap: { [childId: string]: string } = {};
nodesData.forEach((node) => {
  if (node.data.level > 0 && node.parentId) {
    parentMap[node.id] = node.parentId;
  }
});

// Helper function to check for children
export const hasChildren = (id: string) =>
  nodesData.some((n) => n.parentId === id);

// Default expanded state for nodes
export const defaultExpanded: { [id: string]: boolean } = {};
nodesData.forEach((node) => {
  if (node.data.level === 1 && hasChildren(node.id)) {
    defaultExpanded[node.id] = true;
  }
});

// Initialize nodes with proper spacing while preserving custom positions & types
export const initializeNodes = () => {
  return nodesData.map((node) => {
    const level = node.data.level;
    const levelCount = nodesData.filter((n) => n.data.level === level).length;
    const levelIndex = nodesData
      .filter((n) => n.data.level === level)
      .findIndex((n) => n.id === node.id);

    // Add source and target handles based on node level
    const targetHandle = level > 0; // All nodes except root can be targets
    const sourceHandle = level < 2; // Only level 0 and 1 nodes can be sources

    return {
      id: node.id,
      type: node.type ? node.type : "cellnode",
      data: {
        ...node.data,
        // Add handle configuration to node data
        hasSourceHandle: sourceHandle,
        hasTargetHandle: targetHandle,
      },
      position: node.position || {
        x: NODE_POSITION.LEVEL_X_OFFSET * level + 100,
        y:
          NODE_POSITION.LEVEL_Y_OFFSET * (levelIndex - (levelCount - 1) / 2) +
          300,
      },
      style: node.style,
      parentId: node.parentId,
      extent: node.extent,
    };
  });
};

export const createCollisionDetector = (nodes: Node[], _: number) => {
  const nodesMap = new Map(
    nodes.map((node) => [`${node.position.x},${node.position.y}`, true])
  );
  return (x: number, y: number) => nodesMap.has(`${x},${y}`);
};

export const findNonCollidingPosition = (
  baseX: number,
  baseY: number,
  threshold: number,
  isColliding: (x: number, y: number) => boolean
): { x: number; y: number } => {
  let newX = baseX;
  let newY = baseY;
  const spiralStep = threshold;
  let angle = 0;
  let radius = 0;
  while (isColliding(newX, newY)) {
    angle += Math.PI / 4;
    radius += spiralStep / (2 * Math.PI);
    newX = baseX + radius * Math.cos(angle);
    newY = baseY + radius * Math.sin(angle);
  }
  return { x: newX, y: newY };
};

export const applyLayout = (
  nodes: Node[],
  layoutType: "default" | "horizontal" | "vertical" | "radial" = "default",
  options: LayoutOptions = {
    nodeDistance: LAYOUT_OPTIONS.NODE_DISTANCE,
    rankSeparation: LAYOUT_OPTIONS.RANK_SEPARATION,
    centerStrength: LAYOUT_OPTIONS.CENTER_STRENGTH,
  }
) => {
  const positionedNodes = JSON.parse(JSON.stringify(nodes));
  switch (layoutType) {
    case "horizontal":
      return applyHorizontalLayout(positionedNodes, options);
    case "vertical":
      return applyVerticalLayout(positionedNodes, options);
    case "radial":
      return applyRadialLayout(positionedNodes, options);
    default:
      return applyDefaultLayout(positionedNodes, options);
  }
};

interface LayoutOptions {
  nodeDistance: number;
  rankSeparation: number;
  centerStrength: number;
}

const applyHorizontalLayout = (
  nodes: Node<NodeData>[],
  options: LayoutOptions
) => {
  const nodesByLevel = new Map<number, Node<NodeData>[]>();
  nodes.forEach((node) => {
    const level = Number(node.data.level);
    if (!nodesByLevel.has(level)) nodesByLevel.set(level, []);
    nodesByLevel.get(level)?.push(node);
  });
  Array.from(nodesByLevel.entries()).forEach(([level, levelNodes]) => {
    levelNodes.forEach((node, index) => {
      node.position = {
        x: level * options.rankSeparation + NODE_POSITION.LEVEL_X_OFFSET,
        y:
          (index - (levelNodes.length - 1) / 2) * options.nodeDistance +
          NODE_POSITION.DEFAULT_ROOT_Y,
      };
    });
  });
  return nodes;
};

const applyVerticalLayout = (
  nodes: Node<NodeData>[],
  options: LayoutOptions
) => {
  const nodesByLevel = new Map<number, Node<NodeData>[]>();
  nodes.forEach((node) => {
    const level = Number(node.data.level);
    if (!nodesByLevel.has(level)) nodesByLevel.set(level, []);
    nodesByLevel.get(level)?.push(node);
  });
  Array.from(nodesByLevel.entries()).forEach(([level, levelNodes]) => {
    levelNodes.forEach((node, index) => {
      node.position = {
        x:
          (index - (levelNodes.length - 1) / 2) * options.nodeDistance +
          NODE_POSITION.DEFAULT_ROOT_X,
        y: level * options.rankSeparation + NODE_POSITION.LEVEL_Y_OFFSET,
      };
    });
  });
  return nodes;
};

const applyRadialLayout = (nodes: Node<NodeData>[], options: LayoutOptions) => {
  const rootNode = nodes.find((node) => node.data.level === 0);
  const centerX = rootNode?.position.x || NODE_POSITION.DEFAULT_ROOT_X;
  const centerY = rootNode?.position.y || NODE_POSITION.DEFAULT_ROOT_Y;
  nodes.forEach((node) => {
    if (node.data.level === 0) return;
    const level = Number(node.data.level);
    const nodesAtLevel = nodes.filter((n) => n.data.level === level).length;
    const indexAtLevel = nodes.filter(
      (n) => n.data.level === level && n.id.localeCompare(node.id) < 0
    ).length;
    const radius = level * options.rankSeparation;
    const angleStep = (2 * Math.PI) / nodesAtLevel;
    const angle = indexAtLevel * angleStep;
    node.position = {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  });
  return nodes;
};

const applyDefaultLayout = (
  nodes: Node<NodeData>[],
  options: LayoutOptions
) => {
  const childrenMap = new Map<string, Node<NodeData>[]>();
  nodes.forEach((node) => {
    const parent = node.parentId;
    if (parent) {
      if (!childrenMap.has(parent)) childrenMap.set(parent, []);
      childrenMap.get(parent)?.push(node);
    }
  });
  const rootNode = nodes.find((node) => node.data.level === 0);
  if (rootNode)
    rootNode.position = {
      x: NODE_POSITION.DEFAULT_ROOT_X,
      y: NODE_POSITION.DEFAULT_ROOT_Y,
    };
  const positionChildren = (parentId: string, depth: number = 1) => {
    const children = childrenMap.get(parentId) || [];
    const parent = nodes.find((node) => node.id === parentId);
    if (!parent) return;
    const centerX = parent.position.x;
    const centerY = parent.position.y;
    const childCount = children.length;
    children.forEach((child, index) => {
      const angleStep = Math.PI / (childCount + 1);
      const angle = Math.PI / 2 + (index + 1) * angleStep;
      const distance = options.rankSeparation;
      child.position = {
        x: centerX + distance * Math.cos(angle),
        y:
          centerY +
          distance * Math.sin(angle) +
          depth * NODE_POSITION.LEVEL_Y_OFFSET,
      };
      positionChildren(child.id, depth + 1);
    });
  };
  if (rootNode) positionChildren(rootNode.id);
  return nodes;
};

export const findNodeClusters = (nodes: Node<NodeData>[]) => {
  const clusters = new Map<string, string[]>();
  nodes.forEach((node) => {
    const parentId = node.parentId || "root";
    if (!clusters.has(parentId)) clusters.set(parentId, []);
    clusters.get(parentId)?.push(node.id);
  });
  return Object.fromEntries(clusters);
};

export const resolveNodeOverlap = (nodes: Node[], padding: number = 20) => {
  const quadtree = new Map<string, Node>();
  const getQuadKey = (x: number, y: number) =>
    `${Math.floor(x / 160)},${Math.floor(y / 160)}`;
  return nodes.map((node) => {
    const key = getQuadKey(node.position.x, node.position.y);
    if (quadtree.has(key)) {
      const existingNode = quadtree.get(key)!;
      const angle = Math.random() * 2 * Math.PI;
      node.position.x =
        existingNode.position.x + (160 + padding) * Math.cos(angle);
      node.position.y =
        existingNode.position.y + (160 + padding) * Math.sin(angle);
    }
    quadtree.set(key, node);
    return node;
  });
};
