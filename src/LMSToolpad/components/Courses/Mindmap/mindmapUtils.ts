/** @format */
import { forceSimulation, forceManyBody, forceCollide } from "d3-force";
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

// Custom forces for the simulation
const forceLevelAlignment = (alpha: number, simulationNodes: MySimNode[]) => {
  simulationNodes.forEach((d) => {
    const node = nodesData.find((n) => n.id === d.id);
    if (node && typeof d.x === "number") {
      const targetX = 200 + node.data.level * 400;
      const dx = targetX - d.x;
      if (d.vx !== undefined) {
        d.vx += dx * alpha * 0.5;
      }
    }
  });
};

const forceRadialFromParent = (alpha: number, simulationNodes: MySimNode[]) => {
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
};

// Run force simulation on nodes
export const runForceSimulation = (nodes: Node[]) => {
  const simulationNodes: MySimNode[] = nodes.map((n) => ({
    id: n.id,
    x: n.position.x,
    y: n.position.y,
    r: 80, // Reduced collision radius
  }));

  const simulation = forceSimulation(simulationNodes)
    .force("charge", forceManyBody().strength(-400)) // Reduced strength
    .force("levelAlign", (alpha) =>
      forceLevelAlignment(alpha * 0.5, simulationNodes)
    ) // Reduced alpha
    .force(
      "collide",
      forceCollide<MySimNode>()
        .radius((d) => d.r)
        .strength(0.5) // Reduced collision strength
        .iterations(2) // Reduced iterations
    )
    .force(
      "radialFromParent",
      (alpha) => forceRadialFromParent(alpha * 0.3, simulationNodes) // Reduced alpha
    )
    .stop();

  // Reduced simulation ticks
  simulation.tick(100);

  return simulationNodes;
};
