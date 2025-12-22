/** @format */

import { useEffect } from "react";
import useCourseStore from "./store/useCourseStore";
import { eventBus, Event } from '@mui-toolpad-extended-tuni/main';

/**
 * CourseEventPublisher publishes course events to the EventBus.
 * This component converts course data to generic events and publishes them.
 * It maintains separation by only knowing about courses and the EventBus API.
 */
const CourseEventPublisher: React.FC = () => {
  const { learningCourses } = useCourseStore();

  useEffect(() => {
    if (learningCourses && learningCourses.length > 0) {
      const courseEvents: Event[] = [];

      learningCourses.forEach(course => {
        Object.entries(course.events || {}).forEach(([eventType, courseEventsArray]: [string, any[]]) => {
          courseEventsArray.forEach(event => {
            courseEvents.push({
              id: event.id || `${course.code}-${eventType}-${Math.random()}`,
              title: event.title || `${course.title} - ${eventType}`,
              start: event.startTime,
              end: event.endTime || event.startTime,
              metadata: {
                source: 'courses',
                courseCode: course.code,
                courseTitle: course.title,
                subject: course.code?.split(".")[0] || 'UNKNOWN',
                courseLevel: course.studyModule?.level || "basic",
                type: eventType,
                description: event.description,
                location: event.location,
                // Include any other course-specific data
              },
            });
          });
        });
      });

      // Publish course events to the EventBus
      eventBus.publish('courses', courseEvents);
    } else {
      // Remove all course events when no courses are available
      eventBus.removeSource('courses');
    }
  }, [learningCourses]);

  return null; // This component doesn't render anything
};

export default CourseEventPublisher;
