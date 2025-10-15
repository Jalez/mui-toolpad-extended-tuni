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
    const baseConstraints = {
      minW: 1,
      minH: 1,
      maxW: 12,
      maxH: 12,
    };

    // Create grid item with default layout
    const gridItemLayout = createGridItem("calendar", 6, 0, 6, 4, baseConstraints);

    registerGridItem("calendar", <Calendar />, gridItemLayout);

    return () => {
      unregisterGridItem("calendar");
    };
  }, [registerGridItem, unregisterGridItem]);

  return null; // This component doesn't render anything
};

export default CalendarManager;
