/** @format */
import { useEffect, useState } from "react";
import {
  registerPageToolbarAction,
  unregisterPageToolbarAction,
} from "../../../layout/Toolbars/toolbarRegistry";
import CourseList from "../../Courses/CourseList";
import Calendar from "../../Courses/Calendar/Calendar";
import EditModeToggler from "../../Common/GridLayout/Tools/EditModeToggler";
import LayoutSelector from "../../Common/GridLayout/Tools/LayoutSelector";
import { Box } from "@mui/material";
import { ResponsiveGridLayout, createGridItem } from "../../Common/GridLayout";
import Mindmap from "../../Courses/Mindmap";

// Storage key for layouts
const STORAGE_KEY = "home-layout-v2";

// Use smaller minimum constraints to allow more flexibility
const baseConstraints = {
  minW: 1, // Allow smaller width (1 column)
  minH: 1, // Allow smaller height (1 row)
  maxW: 12, // Maximum width (12 columns)
  maxH: 12, // Maximum height (12 rows)
};

// Initial layouts preset
const initialLayouts = {
  lg: [
    createGridItem("course-list", 0, 0, 6, 4, baseConstraints),
    createGridItem("calendar", 6, 0, 6, 4, baseConstraints),
    createGridItem("mindmap", 0, 4, 12, 4, baseConstraints),
  ],
  md: [
    createGridItem("course-list", 0, 0, 6, 4, baseConstraints),
    createGridItem("calendar", 6, 0, 6, 4, baseConstraints),
    createGridItem("mindmap", 0, 4, 12, 4, baseConstraints),
  ],
  sm: [
    createGridItem("course-list", 0, 0, 12, 4, baseConstraints),
    createGridItem("calendar", 0, 4, 12, 4, baseConstraints),
    createGridItem("mindmap", 0, 8, 12, 4, baseConstraints),
  ],
  xs: [
    createGridItem("course-list", 0, 0, 12, 4, baseConstraints),
    createGridItem("calendar", 0, 4, 12, 4, baseConstraints),
    createGridItem("mindmap", 0, 8, 12, 4, baseConstraints),
  ],
};

const Home = () => {
  const [layouts, setLayouts] = useState(initialLayouts);

  // Create grid items for ResponsiveGridLayout
  const gridItems = [
    {
      id: "course-list",
      content: <CourseList displayMode="instance" containerHeight="100%" />,
    },
    {
      id: "calendar",
      content: <Calendar />,
    },
    {
      id: "mindmap",
      content: <Mindmap />,
    },
  ];

  useEffect(() => {
    // Register both the EditModeToggler and LayoutSelector.
    registerPageToolbarAction("/", EditModeToggler);
    registerPageToolbarAction("/", () => (
      <LayoutSelector
        storageKey={STORAGE_KEY}
        onPresetChange={(newLayouts) =>
          setLayouts(newLayouts as typeof initialLayouts)
        }
      />
    ));

    return () => {
      unregisterPageToolbarAction("/", EditModeToggler);
      unregisterPageToolbarAction("/", LayoutSelector);
    };
  }, []);

  return (
    <Box sx={{ width: "100%", height: "100%", p: 1 }}>
      <ResponsiveGridLayout
        storageKey={STORAGE_KEY}
        defaultLayouts={layouts}
        items={gridItems}
      />
    </Box>
  );
};

export default Home;
