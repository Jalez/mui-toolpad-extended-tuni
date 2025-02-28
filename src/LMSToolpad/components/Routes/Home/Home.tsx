/** @format */

import { useEffect } from "react";
import {
  registerPageToolbarAction,
  unregisterPageToolbarAction,
} from "../../../layout/Toolbars/toolbarRegistry";
import CourseList from "../../Courses/CourseList";
import Calendar from "../../Courses/Calendar/Calendar";
import EditModeToggler from "../../Common/GridLayout/Tools/EditModeToggler";
import { Box } from "@mui/material";
import { ResponsiveGridLayout, createGridItem } from "../../Common/GridLayout";

const STORAGE_KEY = "home-layout-v2";

// Use smaller minimum constraints to allow more flexibility
const baseConstraints = {
  minW: 1, // Allow smaller width (1 column)
  minH: 1, // Allow smaller height (1 row)
  maxW: 12, // Maximum width (12 columns)
  maxH: 12, // Maximum height (12 rows)
};

const layouts = {
  lg: [
    createGridItem("course-list", 0, 0, 1, 1, baseConstraints),
    createGridItem("calendar", 1, 0, 1, 1, baseConstraints),
  ],
  md: [
    createGridItem("course-list", 0, 0, 1, 1, baseConstraints),
    createGridItem("calendar", 6, 0, 6, 8, baseConstraints),
  ],
  sm: [
    createGridItem("course-list", 0, 0, 1, 1, baseConstraints),
    createGridItem("calendar", 0, 6, 12, 8, baseConstraints),
  ],
  xs: [
    createGridItem("course-list", 0, 0, 1, 1, baseConstraints),
    createGridItem("calendar", 0, 6, 12, 8, baseConstraints),
  ],
};

const Home = () => {
  useEffect(() => {
    // Register the single EditModeToggler instead of separate togglers
    registerPageToolbarAction("/", EditModeToggler);
    return () => {
      unregisterPageToolbarAction("/", EditModeToggler);
    };
  }, []);

  const gridItems = [
    {
      id: "course-list",
      content: <CourseList displayMode="instance" containerHeight="100%" />,
    },
    {
      id: "calendar",
      content: <Calendar />,
    },
  ];

  return (
    <Box sx={{ width: "100%", height: "100%", p: 1 }}>
      <ResponsiveGridLayout
        items={gridItems}
        storageKey={STORAGE_KEY}
        defaultLayouts={layouts}
      />
    </Box>
  );
};

export default Home;
