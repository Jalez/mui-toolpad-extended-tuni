/** @format */
import {
  forceSimulation,
  forceManyBody,
  forceCollide,
  forceLink,
  forceCenter,
  forceRadial,
} from "d3-force";
import { Node } from "reactflow";
import { NodeData, MySimNode } from "./types";

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

// Enhanced force simulation with better node spacing
export const runForceSimulation = (
  nodes: Node[],
  layoutType: "default" | "horizontal" | "vertical" | "radial" = "default"
) => {
  const simulationNodes: MySimNode[] = nodes.map((n) => ({
    id: n.id,
    x: n.position.x,
    y: n.position.y,
    r: 80,
  }));

  // Create links based on parent-child relationships
  const links = nodes
    .filter((node) => node.data.parent)
    .map((node) => ({
      source: node.data.parent!,
      target: node.id,
      distance: 200,
    }));

  const simulation = forceSimulation(simulationNodes)
    .force("charge", forceManyBody().strength(-800))
    .force(
      "collide",
      forceCollide<MySimNode>()
        .radius((d) => d.r)
        .strength(0.8)
    )
    .force("center", forceCenter(0, 0).strength(0.05))
    .force(
      "link",
      forceLink(links)
        .id((d: any) => d.id)
        .distance((d: any) => d.distance)
        .strength(1)
    );

  // Add layout-specific forces
  switch (layoutType) {
    case "horizontal":
      simulation.force("x", (alpha: number) => {
        simulationNodes.forEach((d) => {
          const node = nodes.find((n) => n.id === d.id);
          if (node && typeof d.x === "number" && d.vx !== undefined) {
            const targetX = (node.data.level || 0) * 300;
            d.vx += (targetX - d.x) * alpha;
          }
        });
      });
      break;
    case "vertical":
      simulation.force("y", (alpha: number) => {
        simulationNodes.forEach((d) => {
          const node = nodes.find((n) => n.id === d.id);
          if (node && typeof d.y === "number" && d.vy !== undefined) {
            const targetY = (node.data.level || 0) * 300;
            d.vy += (targetY - d.y) * alpha;
          }
        });
      });
      break;
    case "radial":
      simulation.force(
        "radial",
        forceRadial<MySimNode>(
          (d) => {
            const node = nodes.find((n) => n.id === d.id);
            return ((node?.data.level || 0) + 1) * 200;
          },
          0,
          0
        ).strength(1)
      );
      break;
  }

  // Run simulation
  simulation.tick(300);

  return simulationNodes;
};

// Add utility function to find node clusters
export const findNodeClusters = (nodes: Node[]) => {
  const clusters: { [key: string]: string[] } = {};

  nodes.forEach((node) => {
    const parentId = node.data.parent || "root";
    if (!clusters[parentId]) {
      clusters[parentId] = [];
    }
    clusters[parentId].push(node.id);
  });

  return clusters;
};

// Add automatic overlap detection and resolution
export const resolveNodeOverlap = (nodes: Node[], padding: number = 20) => {
  const nodesCopy = [...nodes];
  let hasOverlap = true;
  const iterations = 0;
  const maxIterations = 100;

  while (hasOverlap && iterations < maxIterations) {
    hasOverlap = false;
    for (let i = 0; i < nodesCopy.length; i++) {
      for (let j = i + 1; j < nodesCopy.length; j++) {
        const nodeA = nodesCopy[i];
        const nodeB = nodesCopy[j];

        const dx = nodeB.position.x - nodeA.position.x;
        const dy = nodeB.position.y - nodeA.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 160 + padding) {
          // 160 is approximate node width
          hasOverlap = true;
          const angle = Math.atan2(dy, dx);
          const moveDistance = (160 + padding - distance) / 2;

          nodeB.position.x += Math.cos(angle) * moveDistance;
          nodeB.position.y += Math.sin(angle) * moveDistance;
          nodeA.position.x -= Math.cos(angle) * moveDistance;
          nodeA.position.y -= Math.sin(angle) * moveDistance;
        }
      }
    }
  }

  return nodesCopy;
};
