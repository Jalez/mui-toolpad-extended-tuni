/** @format */
import create from "zustand";
import { NodeData } from "./types";

interface MindmapState {
  nodes: Array<{ id: string; data: NodeData }>;
  expandedNodes: { [id: string]: boolean };
  setExpandedNodes: (nodes: { [id: string]: boolean }) => void;
  toggleNodeExpansion: (id: string) => void;
  updateNodeData: (id: string, data: Partial<NodeData>) => void;
}

// Initial sample data
const initialNodes: Array<{ id: string; data: NodeData }> = [
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
      parent: "root",
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
      parent: "root",
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

// Initialize expanded state for nodes that have children and are level 1
const initialExpandedState = Object.fromEntries(
  initialNodes
    .filter(
      (node) =>
        node.data.level === 1 &&
        initialNodes.some((n) => n.data.parent === node.id)
    )
    .map((node) => [node.id, true])
);

export const useMindmapStore = create<MindmapState>((set) => ({
  nodes: initialNodes,
  expandedNodes: initialExpandedState,
  setExpandedNodes: (nodes) => set({ expandedNodes: nodes }),
  toggleNodeExpansion: (id) =>
    set((state) => ({
      expandedNodes: {
        ...state.expandedNodes,
        [id]: !state.expandedNodes[id],
      },
    })),
  updateNodeData: (id, data) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    })),
}));
