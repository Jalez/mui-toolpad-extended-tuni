/** @format */

import useCourseStore from '../../../store/useCourseStore';
import { useUserStore } from '../../../store/useUserStore';
import ResizablePanel from '../../Common/ResizablePanel';
import { registerToolbar } from '../../Toolbars/PageToolbar/toolbarRegistry';
import HomeToolbar from './HomeToolbar';
import { CourseListVisibilityMenu } from '../../Courses/CourseListVisibilityMenu';
import MovablePanel from '../../Common/MovablePanel/MovablePanel';
import CourseList from '../../Courses/CourseList';
import ToolsContainer from '../../Common/PanelTools/ToolsContainer';
import Calendar from './Calendar';
import { useState, useEffect, useRef } from 'react';

registerToolbar('/', HomeToolbar);

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
  const { courses, fetchState } = useCourseStore();
  const { user } = useUserStore();
  const navigationType = user?.preferences?.navigationType || 'direct';
  console.log('Home', { courses, fetchState, navigationType });

  const panelTools = (
    <ToolsContainer>
      <CourseListVisibilityMenu />
    </ToolsContainer>
  );

  // Map course events to FullCalendar events
  const courseEvents = courses.flatMap((course) =>
    Object.values(course.events)
      .flat()
      .map((event) => ({
        title: event.title,
        start: event.startTime,
        end: event.endTime,
        // ...other event mapping if necessary...
      }))
  );

  // Fallback dummy events for testing
  const dummyEvents = [
    {
      title: 'Test Event 1',
      start: new Date().toISOString(),
      end: new Date(Date.now() + 3600000).toISOString(), // +1 hour
    },
    {
      title: 'Test Event 2',
      start: new Date(Date.now() + 86400000).toISOString(), // +1 day
    },
  ];
  const events = courseEvents.length > 0 ? courseEvents : dummyEvents;

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
      {/* New calendar panel using Calendar component */}
      <ResizablePanel
        id='home-calendar'
        tools={panelTools}
        defaultWidth={600}
        defaultHeight={400}
        minWidth={300}
        maxWidth={1200}
        minHeight={200}
        maxHeight={800}>
        <Calendar events={events} />
      </ResizablePanel>
      <div>Test</div>
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
