/** @format */
import { useEffect } from "react";
import {
  registerPageToolbarAction,
  unregisterPageToolbarAction,
} from "../../../layout/Toolbars/toolbarRegistry";
import EditModeToggler from "../../Common/GridLayout/Tools/EditModeToggler";
import { Box } from "@mui/material";
import { ResponsiveGridLayout, useGridItemContext } from "../../Common/GridLayout";

// Storage key for layouts
const STORAGE_KEY = "home-layout-v2";



const HomeContent = () => {
  const { getAllGridItems } = useGridItemContext();

  // Get dynamically registered grid items (course-list is registered by CourseManager)
  const dynamicGridItems = getAllGridItems();
  const gridItems = dynamicGridItems;

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
