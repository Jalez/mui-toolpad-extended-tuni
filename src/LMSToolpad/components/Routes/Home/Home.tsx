/** @format */

import { useEffect } from "react";
import ResizablePanel from "../../Common/Panel/TBR/ResizablePanel";
import {
  registerPageToolbarAction,
  unregisterPageToolbarAction,
} from "../../../layout/Toolbars/toolbarRegistry";
import { CourseListVisibilityMenu } from "../../Courses/CourseListVisibilityMenu";
import MovablePanel from "../../Common/Panel/Movable/MovablePanel";
import CourseList from "../../Courses/CourseList";
import ToolsContainer from "../../Common/Panel/Main/tools/ToolsContainer";
import Calendar from "../../Courses/Calendar/Calendar";
import ResizeToggler from "../../Common/Panel/Resizable/Tools/ResizeToggler";
import MoveToggler from "../../Common/Panel/Movable/MoveToggler";
import { ContextMindmap } from "../../Courses/Mindmap";
import Panel from "../../Common/Panel/Main/Panel";

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
      <Panel
        key="home-course-selector"
        id="home-course-selector"
        additionaltools={[panelTools]}
        minHeight={200}
        defaultHeight={200}
        maxHeight={800}
        minWidth={300}
        defaultWidth={300}
        maxWidth={1200}
        expandable={true}
        scrollable={true}
        resizable={true}
      >
        <CourseList displayMode={"instance"} containerHeight="100%" />
      </Panel>

      <Panel
        key="home-calendar"
        id="home-calendar"
        defaultWidth={600}
        defaultHeight={400}
        minWidth={300}
        maxWidth={1200}
        minHeight={200}
        maxHeight={800}
        expandable={true}
        scrollable={true}
        resizable={true}
      >
        <Calendar />
      </Panel>
      {/* <ResizablePanel
        id="mindmap"
        defaultWidth={600}
        defaultHeight={200}
        minWidth={300}
        maxWidth={1200}
        minHeight={200}
        maxHeight={800}
        expandable={true}
      >
        <ContextMindmap />
      </ResizablePanel> */}
    </MovablePanel>
  );
};

export default Home;
