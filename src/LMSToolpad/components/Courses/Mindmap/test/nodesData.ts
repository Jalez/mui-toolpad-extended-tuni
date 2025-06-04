import { CoordinateExtent } from "@xyflow/react";
import { NodeData } from "../types";

// Nodes for a course group with modules and topics
export const nodesData: Array<{
  id: string;
  type?: string;
  data: NodeData;
  position: { x: number; y: number };
  style?: Record<string, any>;
  parentId?: string;
  extent?: "parent" | CoordinateExtent;
}> = [
  // Course Group (Level 0)
  {
    id: "course-1",
    type: "coursenode",
    data: {
      label: "COMP.CS.100: Software Testing Fundamentals",
      level: 0,
      details: "Course overview for Software Testing.",
      nodeLevel: "advanced",
      subject: "COMP.CS",
      courseCode: "COMP.CS.100",

      // handleId: "default", // for rendering a handle
    },
    position: { x: 50, y: 50 },
  },
  // Module 1 (Level 1) - Child of Course Group
  {
    id: "module1",
    type: "modulenode",
    data: {
      label: "Module 1: Introduction to Testing",
      level: 1,
      details: "Basics and fundamentals of testing.",
      nodeLevel: "basic",
      subject: "COMP.CS",
      // handleId: "default",
    },
    position: { x: 100, y: 100 },
    parentId: "course-1",
    extent: "parent",
  },
  // Topics for Module 1 (Level 2) - Children of Module 1
  {
    id: "module1-topic1",
    data: {
      label: "What is Testing?",
      level: 2,
      details: "Definition and importance of testing.",
      nodeLevel: "basic",
      subject: "COMP.CS",
    },
    position: { x: 120, y: 120 },
    parentId: "module1",
    extent: "parent",
  },
  {
    id: "module1-topic2",
    data: {
      label: "Static vs Dynamic Testing",
      level: 2,
      details: "Differences between static and dynamic testing.",
      nodeLevel: "intermediate",
      subject: "COMP.CS",
    },
    position: { x: 120, y: 200 },
    parentId: "module1",
    extent: "parent" as const,
  },
  {
    id: "module1-topic3",
    data: {
      label: "Tools for Testing",
      level: 2,
      details: "Overview of testing tools and frameworks.",
      nodeLevel: "intermediate",
      subject: "COMP.CS",
    },
    position: { x: 120, y: 280 },
    parentId: "module1",
    extent: "parent" as const,
  },
  // Module 2 (Level 1) - Child of Course Group
  {
    id: "module2",
    type: "modulenode",
    data: {
      label: "Module 2: Advanced Testing Techniques",
      level: 1,
      details: "Deep dive into advanced testing methods.",
      nodeLevel: "advanced",
      subject: "COMP.CS",
      // handleId: "default",
    },
    position: { x: 550, y: 100 },
    parentId: "course-1",
    extent: "parent",
  },
  // Topics for Module 2 (Level 2) - Children of Module 2
  {
    id: "module2-topic1",
    data: {
      label: "Test Planning",
      level: 2,
      details: "Creating effective test plans.",
      nodeLevel: "advanced",
      subject: "COMP.CS",
    },
    position: { x: 570, y: 120 },
    parentId: "module2",
    extent: "parent" as const,
  },
  {
    id: "module2-topic2",
    data: {
      label: "Test Execution",
      level: 2,
      details: "Strategies for executing tests.",
      nodeLevel: "advanced",
      subject: "COMP.CS",
    },
    position: { x: 570, y: 200 },
    parentId: "module2",
    extent: "parent" as const,
  },
  {
    id: "module2-topic3",
    data: {
      label: "Test Reporting",
      level: 2,
      details: "Documenting and reporting test results.",
      nodeLevel: "advanced",
      subject: "COMP.CS",
    },
    position: { x: 570, y: 280 },
    parentId: "module2",
    extent: "parent" as const,
  },
  {
    //moduless topic
    id: "topic4",
    data: {
      label: "Test Automation",
      level: 2,
      details: "Introduction to test automation.",
      nodeLevel: "advanced",
      subject: "COMP.CS",
    },
    position: { x: 570, y: 360 },
  },
];
