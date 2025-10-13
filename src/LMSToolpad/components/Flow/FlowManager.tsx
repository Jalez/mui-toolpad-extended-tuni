/** @format */

import { useEffect } from "react";
import Mindmap from "./index";

import PsychologyIcon from "@mui/icons-material/Psychology";
import { registerWidget, unregisterWidget } from "../Common/GridLayout/WidgetRegistry";
import { createGridItem, useGridItemContext } from "../Common/GridLayout";

const FlowManager = () => {
  const { registerGridItem, unregisterGridItem } = useGridItemContext();

  // Register widget on mount
  useEffect(() => {
    registerWidget("flow", Mindmap, {
      name: "Flow",
      description:
        "Visual representation of course relationships and topics",
      category: "visualization",
      iconComponent: PsychologyIcon,
      metadata: {
        route: {
          path: "flow",
          element: <Mindmap />,
        },
      },
    });

    return () => {
      unregisterWidget("flow");
    };
  }, []);

  // Register grid item on mount
  useEffect(() => {
    const baseConstraints = {
      minW: 1,
      minH: 1,
      maxW: 12,
      maxH: 12,
    };

    // Create grid item with default layout
    const gridItemLayout = createGridItem("flow", 0, 4, 12, 4, baseConstraints);

    registerGridItem("flow", <Mindmap />, gridItemLayout);

    return () => {
      unregisterGridItem("flow");
    };
  }, [registerGridItem, unregisterGridItem]);

  return null; // This component doesn't render anything
};

export default FlowManager;
