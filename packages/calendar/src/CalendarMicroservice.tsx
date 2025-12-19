/** @format */

import React, { ReactNode } from "react";
import CalendarManager from "./CalendarManager";
import CalendarEventAggregator from "./CalendarEventAggregator";

interface CalendarMicroserviceProps {
  children?: ReactNode;
}

/**
 * CalendarMicroservice Component
 *
 * @version 1.0.0
 *
 * Self-contained microservice that handles all calendar-related functionality:
 * - Calendar grid item registration (via CalendarManager)
 * - Calendar microservice registration with NavigationRegistry
 * - Event aggregation from EventBus (via CalendarEventAggregator)
 *
 * Calendar receives events from EventBus, not directly from Courses.
 * Courses publishes events via CourseEventPublisher, Calendar subscribes via CalendarEventAggregator.
 *
 * This component should be used in App.tsx, not ToolpadProvider.tsx, to maintain
 * proper separation of concerns and avoid tight coupling.
 *
 * @example
 * ```tsx
 * <Microservices>
 *   <CalendarMicroservice />
 *   <CourseMicroservice>
 *     <EduTest />
 *   </CourseMicroservice>
 * </Microservices>
 * ```
 */
const CalendarMicroservice: React.FC<CalendarMicroserviceProps> = ({ children }) => {
  return (
    <>
      <CalendarManager />
      <CalendarEventAggregator />
      {children}
    </>
  );
};

export default CalendarMicroservice;
