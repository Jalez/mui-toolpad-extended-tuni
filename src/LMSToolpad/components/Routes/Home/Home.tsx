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
import Calendar from "../../Courses/Calendar/Calendar";
import ResizeToggler from "../../Common/Panel/Resizable/Tools/ResizeToggler";
import MoveToggler from "../../Common/Panel/MovablePanel/MoveToggler";
import { ResizeContextMindmap } from "../../Courses/Mindmap";

/**
 * Home component with enhanced layout options.
 *
 * @version 2.1.0
 * @updates
 * - Replaced dummy events with course events
 */
const Home = () => {
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

      <ResizablePanel
        id="home-calendar"
        defaultWidth={600}
        defaultHeight={400}
        minWidth={300}
        maxWidth={1200}
        minHeight={200}
        maxHeight={800}
      >
        <Calendar />
      </ResizablePanel>
      <ResizablePanel
        id="mindmap"
        tools={panelTools}
        defaultWidth={600}
        defaultHeight={200}
        minWidth={300}
        maxWidth={1200}
        minHeight={200}
        maxHeight={800}
      >
        <ResizeContextMindmap />
      </ResizablePanel>
    </MovablePanel>
  );
};

export default Home;
