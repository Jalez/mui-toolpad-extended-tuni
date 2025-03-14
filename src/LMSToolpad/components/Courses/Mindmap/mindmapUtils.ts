/** @format */
import { Node } from "@xyflow/react";
import { NodeData } from "./types";

// Replace the placeholder with actual test data
export const nodesData: Array<{ id: string; data: NodeData }> = [
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

// Build a mapping (child -> parent) for simulation and grouping
export const parentMap: { [childId: string]: string } = {};
nodesData.forEach((node) => {
  if (node.data.level > 0 && node.data.parent) {
    parentMap[node.id] = node.data.parent;
  }
});

// Helper function to determine if a node has children
export const hasChildren = (id: string) =>
  nodesData.some((n) => n.data.parent === id);

// Default expanded state for nodes
export const defaultExpanded: { [id: string]: boolean } = {};
nodesData.forEach((node) => {
  if (node.data.level === 1 && hasChildren(node.id)) {
    defaultExpanded[node.id] = true;
  }
});

// Initialize nodes with proper spacing
export const initializeNodes = () => {
  return nodesData.map((node) => {
    const level = node.data.level;
    const levelCount = nodesData.filter((n) => n.data.level === level).length;
    const levelIndex = nodesData
      .filter((n) => n.data.level === level)
      .findIndex((n) => n.id === node.id);

    return {
      id: node.id,
      type: "custom",
      data: { ...node.data },
      position: {
        x: 200 + level * 400,
        y: 150 + (levelIndex - (levelCount - 1) / 2) * 200,
      },
    };
  });
};

// Initialize edges
export const initializeEdges = () =>
  nodesData
    .filter((node) => node.data.level > 0 && node.data.parent)
    .map((node) => ({
      id: `e-${node.data.parent}-${node.id}`,
      source: node.data.parent!,
      target: node.id,
    }));

// Memoize collision detection for performance
export const createCollisionDetector = (nodes: Node[], _: number) => {
  const nodesMap = new Map(
    nodes.map((node) => [`${node.position.x},${node.position.y}`, true])
  );

  return (x: number, y: number) => nodesMap.has(`${x},${y}`);
};

// Find non-colliding position for new node
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
    // Use spiral pattern for better position distribution
    angle += Math.PI / 4;
    radius += spiralStep / (2 * Math.PI);
    newX = baseX + radius * Math.cos(angle);
    newY = baseY + radius * Math.sin(angle);
  }

  return { x: newX, y: newY };
};

// Layout functions using React Flow's native positioning
export const applyLayout = (
  nodes: Node[],
  layoutType: "default" | "horizontal" | "vertical" | "radial" = "default",
  options = {
    nodeDistance: 200,
    rankSeparation: 200,
    centerStrength: 0.5,
  }
) => {
  // Create a deep copy of nodes to avoid mutating the input
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

// Horizontal tree layout (left to right)
const applyHorizontalLayout = (
  nodes: Node<NodeData>[],
  options: LayoutOptions
) => {
  // Group nodes by level
  const nodesByLevel = new Map<number, Node<NodeData>[]>();

  nodes.forEach((node) => {
    const level = Number(node.data.level);
    if (!nodesByLevel.has(level)) {
      nodesByLevel.set(level, []);
    }
    nodesByLevel.get(level)?.push(node);
  });

  // Position nodes by level horizontally
  Array.from(nodesByLevel.entries()).forEach(([level, levelNodes]) => {
    levelNodes.forEach((node, index) => {
      node.position = {
        x: level * options.rankSeparation + 100,
        y: (index - (levelNodes.length - 1) / 2) * options.nodeDistance + 300,
      };
    });
  });

  return nodes;
};

// Vertical tree layout (top to bottom)
const applyVerticalLayout = (
  nodes: Node<NodeData>[],
  options: LayoutOptions
) => {
  // Group nodes by level
  const nodesByLevel = new Map<number, Node<NodeData>[]>();

  nodes.forEach((node) => {
    const level = Number(node.data.level);
    if (!nodesByLevel.has(level)) {
      nodesByLevel.set(level, []);
    }
    nodesByLevel.get(level)?.push(node);
  });

  // Position nodes by level vertically
  Array.from(nodesByLevel.entries()).forEach(([level, levelNodes]) => {
    levelNodes.forEach((node, index) => {
      node.position = {
        x: (index - (levelNodes.length - 1) / 2) * options.nodeDistance + 400,
        y: level * options.rankSeparation + 100,
      };
    });
  });

  return nodes;
};

// Radial layout
const applyRadialLayout = (nodes: Node<NodeData>[], options: LayoutOptions) => {
  // Find the root node
  const rootNode = nodes.find((node) => node.data.level === 0);
  const centerX = rootNode?.position.x || 400;
  const centerY = rootNode?.position.y || 300;

  // Position other nodes in circles around the root
  nodes.forEach((node) => {
    if (node.data.level === 0) return; // Skip root node

    const level = Number(node.data.level);
    const nodesAtLevel = nodes.filter((n) => n.data.level === level).length;
    const indexAtLevel = nodes.filter(
      (n) => n.data.level === level && n.id.localeCompare(node.id) < 0
    ).length;

    // Calculate position in a circle
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

// Default layout (slightly spread nodes)
const applyDefaultLayout = (
  nodes: Node<NodeData>[],
  options: LayoutOptions
) => {
  // Find parent-child relationships
  const childrenMap = new Map<string, Node<NodeData>[]>();

  nodes.forEach((node) => {
    const parent = node.data.parent;
    if (parent) {
      if (!childrenMap.has(parent)) {
        childrenMap.set(parent, []);
      }
      childrenMap.get(parent)?.push(node);
    }
  });

  // Position root node
  const rootNode = nodes.find((node) => node.data.level === 0);
  if (rootNode) {
    rootNode.position = { x: 400, y: 300 };
  }

  // Position child nodes relative to their parents
  const positionChildren = (parentId: string, depth: number = 1) => {
    const children = childrenMap.get(parentId) || [];
    const parent = nodes.find((node) => node.id === parentId);
    if (!parent) return;

    const centerX = parent.position.x;
    const centerY = parent.position.y;
    const childCount = children.length;

    children.forEach((child, index) => {
      // Calculate position based on parent and siblings
      const angleStep = Math.PI / (childCount + 1);
      const angle = Math.PI / 2 + (index + 1) * angleStep;
      const distance = options.rankSeparation;

      child.position = {
        x: centerX + distance * Math.cos(angle),
        y: centerY + distance * Math.sin(angle) + depth * 100,
      };

      // Recursively position this node's children
      positionChildren(child.id, depth + 1);
    });
  };

  if (rootNode) {
    positionChildren(rootNode.id);
  }

  return nodes;
};

// Add utility function to find node clusters
export const findNodeClusters = (nodes: Node<NodeData>[]) => {
  const clusters = new Map<string, string[]>();

  nodes.forEach((node) => {
    const parentId = node.data.parent || "root";
    if (!clusters.has(parentId)) {
      clusters.set(parentId, []);
    }
    clusters.get(parentId)?.push(node.id);
  });

  return Object.fromEntries(clusters);
};

// Optimize node overlap resolution
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
