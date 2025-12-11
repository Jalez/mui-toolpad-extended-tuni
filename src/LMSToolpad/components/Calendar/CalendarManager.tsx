/** @format */

import { useEffect } from "react";
import Calendar from "./Calendar";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { createGridItem, useGridItemContext } from "../Common/GridLayout";
import { registerMicroservice, unregisterMicroservice } from "../Navigation/NavigationRegistry";

const CalendarManager = () => {
  const { registerGridItem, unregisterGridItem } = useGridItemContext();

  // Register microservice on mount
  useEffect(() => {
    registerMicroservice("calendar", Calendar, {
      name: "Calendar",
      description: "Shows events and deadlines in a calendar view",
      category: "planning",
      iconComponent: CalendarMonthIcon,
      metadata: {
        route: {
          path: "calendar",
          element: <Calendar />,
        },
      },
    });

    return () => {
      unregisterMicroservice("calendar");
    };
  }, []);

  // Register grid item on mount
  useEffect(() => {
    // Create grid item with default layout
    // Calendar chooses its own default size: full width (15 cols), 2 rows height
    const gridItemLayout = createGridItem({
      id: "calendar",
      x: 0,
      y: 0,
      w: 15,
      h: 2,
      minW: 1,
      minH: 1,
      maxW: 15,
      maxH: 15,
    });
    registerGridItem("calendar", <Calendar />, gridItemLayout);

    return () => {
      unregisterGridItem("calendar");
    };
  }, [registerGridItem, unregisterGridItem]);

  return null; // This component doesn't render anything
};

export default CalendarManager;
