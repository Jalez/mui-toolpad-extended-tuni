/** @format */

import { useEffect } from 'react';
import ResizablePanel from '../../Common/Panel/ResizablePanel';
import {
  registerPageToolbarAction,
  unregisterPageToolbarAction,
} from '../../../layout/Toolbars/toolbarRegistry';
import { CourseListVisibilityMenu } from '../../Courses/CourseListVisibilityMenu';
import MovablePanel from '../../Common/Panel/MovablePanel/MovablePanel';
import CourseList from '../../Courses/CourseList';
import ToolsContainer from '../../Common/Panel/PanelTools/ToolsContainer';
import Calendar from './Calendar';
import ResizeToggler from '../../Common/Panel/Resizable/Tools/ResizeToggler';
import MoveToggler from '../../Common/Panel/MovablePanel/MoveToggler';
import { useTheme } from '@mui/material';
import MindMap from './Mindmap';
import useCourseStore from '../../Courses/store/useCourseStore';
import { subjectConfig } from '../../../config/subjectConfig';

// Helper to determine contrast color based on hex background
function getContrast(hexColor: string): string {
  // Remove '#' if present and convert to integer values
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? 'black' : 'white';
}

/**
 * Home component with enhanced layout options.
 *
 * @version 2.1.0
 * @updates
 * - Replaced dummy events with course events
 */
const Home = () => {
  const theme = useTheme();
  const { learningCourses } = useCourseStore();

  useEffect(() => {
    // Unregister actions when component unmounts
    // Register individual actions for the home page
    registerPageToolbarAction('/', MoveToggler);
    registerPageToolbarAction('/', ResizeToggler);
    return () => {
      unregisterPageToolbarAction('/', MoveToggler);
      unregisterPageToolbarAction('/', ResizeToggler);
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

  // // Fallback dummy events for testing (remove “!important”)
  // const dummyEvents = [
  //   {
  //     title: 'Test Event 1',
  //     start: new Date().toISOString(),
  //     end: new Date(Date.now() + 3600000).toISOString(), // +1 hour
  //     backgroundColor: 'white',
  //     borderColor: theme.palette.info.dark,
  //     textColor: 'black',
  //   },
  //   {
  //     title: 'Test Event 2',
  //     start: new Date(Date.now() + 86400000).toISOString(), // +1 day
  //     end: new Date(Date.now() + 90000000).toISOString(),
  //     backgroundColor: 'green',
  //     borderColor: theme.palette.info.dark,
  //     textColor: 'white',
  //   },
  // ];
  // Map course events to Calendar events. Assume course.code is formatted like 'COMP.CS.300'.
  const events = learningCourses.flatMap((course) => {
    return Object.values(course.events)
      .flat()
      .map((event) => {
        console.log('event', event);
        // Extract subject code (first two parts of course.code)
        const subject = course.code.split('.').slice(0, 2).join('.');
        const config = subjectConfig[subject] || {
          baseColor: theme.palette.primary.dark,
          levelShades: {
            basic: theme.palette.primary.light,
            intermediate: theme.palette.primary.main,
            advanced: theme.palette.primary.dark,
          },
        };
        const courseLevel = course.studyModule?.level || 'basic';
        const bgColor = config.levelShades[courseLevel];
        const borderColor = config.baseColor;
        const textColor = getContrast(bgColor);
        return {
          title: event.title,
          start: event.startTime,
          end: event.endTime,
          backgroundColor: bgColor,
          borderColor: borderColor,
          textColor: textColor,
        };
      });
  });

  return (
    <MovablePanel id='home-panels'>
      <ResizablePanel
        id='home-course-selector'
        tools={panelTools}
        defaultWidth={600}
        defaultHeight={400}
        minWidth={300}
        maxWidth={1200}
        minHeight={200}
        maxHeight={800}>
        <CourseList displayMode={'instance'} containerHeight='100%' />
      </ResizablePanel>
      {/* Calendar panel using events from courses */}
      <ResizablePanel
        id='home-calendar'
        defaultWidth={600}
        defaultHeight={400}
        minWidth={300}
        maxWidth={1200}
        minHeight={200}
        maxHeight={800}>
        <Calendar events={events} />
      </ResizablePanel>
      {/* <ResizablePanel
        id='mindmap'
        tools={panelTools}
        defaultWidth={900}
        defaultHeight={200}
        minWidth={300}
        maxWidth={1200}
        minHeight={200}
        maxHeight={800}>
        <MindMap />
      </ResizablePanel> */}
    </MovablePanel>
  );
};

export default Home;
