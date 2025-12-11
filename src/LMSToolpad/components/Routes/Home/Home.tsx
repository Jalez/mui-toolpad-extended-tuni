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
  // #region agent log
  useEffect(() => {
    fetch('http://127.0.0.1:7242/ingest/30a7b8ff-4a46-48a8-8e84-a3a483543b74',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Home.tsx:35',message:'All grid items retrieved',data:{dynamicGridItemsCount:dynamicGridItems.length,dynamicGridItems:dynamicGridItems.map(i=>({id:i.id,hasLayout:!!i.layout,layout:i.layout}))},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'D'})}).catch(()=>{});
  }, [dynamicGridItems]);
  // #endregion
  
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
