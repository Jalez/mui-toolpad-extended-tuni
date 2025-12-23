/** @format */

import React, { ReactNode, useEffect } from "react";
import CalendarManager from "./CalendarManager";
import CalendarEventAggregator from "./CalendarEventAggregator";
import { registerApiEndpoints } from "@mui-toolpad-extended-tuni/core";
import type { CalendarApiEndpoints } from "@mui-toolpad-extended-tuni/core";

export interface CalendarMicroserviceProps {
  children?: ReactNode;
  /** API endpoint configuration for the calendar microservice (for future use) */
  apiEndpoints?: CalendarApiEndpoints;
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
const CalendarMicroservice: React.FC<CalendarMicroserviceProps> = ({ children, apiEndpoints }) => {
  // Register API endpoints when component mounts or endpoints change
  // (Currently calendar doesn't use API, but registered for future-proofing)
  // Always register (either user-provided or empty to get defaults)
  useEffect(() => {
    registerApiEndpoints('calendar', apiEndpoints || {});
  }, [apiEndpoints]);

  return (
    <>
      <CalendarManager />
      <CalendarEventAggregator />
      {children}
    </>
  );
};

export default CalendarMicroservice;
