/** @format */
import { useEffect, useState } from "react";
import {
  registerPageToolbarAction,
  unregisterPageToolbarAction,
} from "../../../layout/Toolbars/toolbarRegistry";
import CourseList from "../../Courses/CourseList";
import EditModeToggler from "../../Common/GridLayout/Tools/EditModeToggler";
import { Box } from "@mui/material";
import { ResponsiveGridLayout, createGridItem, useGridItemContext } from "../../Common/GridLayout";

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
    createGridItem("flow", 0, 4, 12, 4, baseConstraints),
  ],
  md: [
    createGridItem("course-list", 0, 0, 6, 4, baseConstraints),
    createGridItem("calendar", 6, 0, 6, 4, baseConstraints),
    createGridItem("flow", 0, 4, 12, 4, baseConstraints),
  ],
  sm: [
    createGridItem("course-list", 0, 0, 12, 4, baseConstraints),
    createGridItem("calendar", 0, 4, 12, 4, baseConstraints),
    createGridItem("flow", 0, 8, 12, 4, baseConstraints),
  ],
  xs: [
    createGridItem("course-list", 0, 0, 12, 4, baseConstraints),
    createGridItem("calendar", 0, 4, 12, 4, baseConstraints),
    createGridItem("flow", 0, 8, 12, 4, baseConstraints),
  ],
};

const HomeContent = () => {
  const { getAllGridItems } = useGridItemContext();
  const [layouts, setLayouts] = useState(initialLayouts);

  // Create a named component for the LayoutSelector wrapper to ensure proper registration/unregistration

  // Get dynamically registered grid items and add the hardcoded course-list
  const dynamicGridItems = getAllGridItems();
  const gridItems = [
    {
      id: "course-list",
      content: <CourseList displayMode="instance" containerHeight="100%" />,
    },
    ...dynamicGridItems,
  ];

  useEffect(() => {
    // Register both the EditModeToggler and LayoutSelector.
    registerPageToolbarAction("/", EditModeToggler);

    return () => {
      unregisterPageToolbarAction("/", EditModeToggler);
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

const Home = () => {
  return <HomeContent />;
};

export default Home;
