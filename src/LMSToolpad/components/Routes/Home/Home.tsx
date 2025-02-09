/** @format */

import { useEffect } from "react";
import ResizablePanel from "../../Common/Panel/ResizablePanel";
import {
  registerPageToolbarAction,
  unregisterPageToolbarAction,
} from "../../../layout/Toolbars/toolbarRegistry";
import { CourseListVisibilityMenu } from "../../Courses/CourseListVisibilityMenu";
import MovablePanel from "../../Common/Panel/MovablePanel/MovablePanel";
import CourseList from "../../Courses/CourseList";
import ToolsContainer from "../../Common/Panel/PanelTools/ToolsContainer";
import Calendar from "./Calendar";
import ResizeToggler from "../../Common/Panel/Resizable/Tools/ResizeToggler";
import MoveToggler from "../../Common/Panel/MovablePanel/MoveToggler";
import { useTheme } from "@mui/material";

/**
 * Home component with enhanced layout options.
 *
 * @version 2.1.0
 * @updates
 * - Added layout toggle functionality
 * - Enhanced course display modes
 * - Improved responsive design
 * - Added support for instance/direct navigation
 */
const Home = () => {
  const theme = useTheme();

  useEffect(() => {
    // Unregister actions when component unmounts
    // Register individual actions for the home page
    registerPageToolbarAction("/", MoveToggler);
    registerPageToolbarAction("/", ResizeToggler);
    return () => {
      unregisterPageToolbarAction("/", MoveToggler);
      unregisterPageToolbarAction("/", ResizeToggler);
    };
  }, []);

  const panelTools = (
    <ToolsContainer>
      <CourseListVisibilityMenu />
    </ToolsContainer>
  );

  // Map course events to FullCalendar events
  // const courseEvents = courses.flatMap((course) =>
  //   Object.values(course.events)
  //     .flat()
  //     .map((event) => ({
  //       title: event.title,
  //       start: event.startTime,
  //       end: event.endTime,
  //       backgroundColor: theme.palette.primary.main, // Add default colors
  //       borderColor: theme.palette.primary.dark,
  //       textColor: theme.palette.primary.contrastText,
  //       // You can add custom colors based on event type, course, etc.
  //     }))
  // );

  // Fallback dummy events for testing (remove “!important”)
  const dummyEvents = [
    {
      title: "Test Event 1",
      start: new Date().toISOString(),
      end: new Date(Date.now() + 3600000).toISOString(), // +1 hour
      backgroundColor: "white",
      borderColor: theme.palette.info.dark,
      textColor: "black",
    },
    {
      title: "Test Event 2",
      start: new Date(Date.now() + 86400000).toISOString(), // +1 day
      end: new Date(Date.now() + 90000000).toISOString(),
      backgroundColor: "green",
      borderColor: theme.palette.info.dark,
      textColor: "white",
    },
  ];
  const events = dummyEvents;

  return (
    <MovablePanel id="home-panels">
      <ResizablePanel
        id="home-course-selector"
        tools={panelTools}
        defaultWidth={600}
        defaultHeight={400}
        minWidth={300}
        maxWidth={1200}
        minHeight={200}
        maxHeight={800}
      >
        <CourseList displayMode={"instance"} containerHeight="100%" />
      </ResizablePanel>
      {/* New calendar panel using Calendar component */}
      <ResizablePanel
        id="home-calendar"
        defaultWidth={600}
        defaultHeight={400}
        minWidth={300}
        maxWidth={1200}
        minHeight={200}
        maxHeight={800}
      >
        <Calendar events={events} />
      </ResizablePanel>
      {/* <ResizablePanel
        id='home-course-selector-2'
        tools={panelTools}
        defaultWidth={900}
        defaultHeight={200}
        minWidth={300}
        maxWidth={1200}
        minHeight={200}
        maxHeight={800}>
        <CourseList displayMode={'instance'} containerHeight='100%' />
      </ResizablePanel> */}
    </MovablePanel>
  );
};

export default Home;
