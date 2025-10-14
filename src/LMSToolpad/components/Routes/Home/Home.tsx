/** @format */
import { useEffect } from "react";
import {
  registerPageToolbarAction,
  unregisterPageToolbarAction,
} from "../../../layout/Toolbars/toolbarRegistry";
import CourseList from "../../Courses/CourseList";
import EditModeToggler from "../../Common/GridLayout/Tools/EditModeToggler";
import { Box } from "@mui/material";
import { ResponsiveGridLayout, useGridItemContext } from "../../Common/GridLayout";

// Storage key for layouts
const STORAGE_KEY = "home-layout-v2";



const HomeContent = () => {
  const { getAllGridItems } = useGridItemContext();

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
        defaultLayouts={{
          lg: [],
          md: [],
          sm: [],
          xs: [],
        }}
        items={gridItems}
      />
    </Box>
  );
};

const Home = () => {
  return <HomeContent />;
};

export default Home;
