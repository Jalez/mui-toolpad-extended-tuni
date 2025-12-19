# @mui-toolpad-extended-tuni/courses

Courses microservice extension for MUI Toolpad Extended TUNI. This package provides course management functionality, course routing, course tools, and course-related components.

## Installation

```bash
npm install @mui-toolpad-extended-tuni/courses
```

**Note**: This package requires `mui-toolpad-extended-tuni@^3.0.0` as a peer dependency.

## Peer Dependencies

- `mui-toolpad-extended-tuni@^3.0.0`
- `react@^19.0.0`
- `react-dom@^19.0.0`
- `react-router-dom@^7.0.0`
- `@mui/material@^7.0.0`
- `@mui/icons-material@^7.0.0`
- `@mui/x-date-pickers@^7.0.0`
- `@emotion/react@^11.0.0`
- `@emotion/styled@^11.0.0`
- `axios@^1.7.0`
- `zustand@^4.5.0`

## Usage

### Basic Setup

The courses microservice automatically registers itself when imported:

```tsx
import { BrowserRouter } from 'react-router-dom';
import { ToolpadProvider, Microservices } from 'mui-toolpad-extended-tuni';
import { CourseMicroservice } from '@mui-toolpad-extended-tuni/courses';

function App() {
  return (
    <BrowserRouter>
      <ToolpadProvider>
        <Microservices>
          <CourseMicroservice />
          {/* Other microservices */}
        </Microservices>
      </ToolpadProvider>
    </BrowserRouter>
  );
}
```

### Using Course Store

```tsx
import { useCourseStore } from '@mui-toolpad-extended-tuni/courses';

function MyComponent() {
  const { courses, learningCourses, teachingCourses, getCourses } = useCourseStore();
  
  useEffect(() => {
    getCourses();
  }, [getCourses]);
  
  return (
    <div>
      {learningCourses.map(course => (
        <div key={course.id}>{course.title}</div>
      ))}
    </div>
  );
}
```

### Course Components

```tsx
import { CourseList, CourseItem, CourseTools } from '@mui-toolpad-extended-tuni/courses';

function CoursesPage() {
  return (
    <CourseList displayMode="course" />
  );
}
```

### Course Navigation Builder

```tsx
import { CourseNavigationBuilder } from '@mui-toolpad-extended-tuni/courses';

function Navigation() {
  return <CourseNavigationBuilder />;
}
```

### Creating Custom Course Microservices

You can create custom microservices that integrate with the course system. Here's a complete example:

```tsx
import ScienceIcon from "@mui/icons-material/Science";
import { useMemo, useEffect } from "react";
import { NavigationPageStoreItem } from "mui-toolpad-extended-tuni";
import { useCourseMicroserviceRegistration } from '@mui-toolpad-extended-tuni/courses';

/**
 * Example: EduTest Course Microservice
 * 
 * This demonstrates how to create a self-contained tool that integrates
 * with the Course system. Must be rendered as a child of CourseMicroservice.
 */
const EduTest = () => {
  const {
    registerCourseMicroservice,
    unregisterCourseMicroservice,
  } = useCourseMicroserviceRegistration();

  // Define navigation structure with nested routes
  const eduTestNavigation: NavigationPageStoreItem = useMemo(
    () => ({
      kind: "page",
      segment: "edutest",
      title: "EduTest",
      iconFC: ScienceIcon,
      metadata: {
        description: "EduTest is a microservice for testing",
        forRoles: ["teacher", "student"],
        isRootTool: true,
      },
      children: [
        {
          kind: "page",
          segment: "dashboard",
          title: "Dashboard",
          view: DashboardView,
          metadata: {
            description: "Dashboard for EduTest",
            forRoles: ["teacher", "student"],
          },
          children: [
            {
              kind: "page",
              segment: "subdashboard",
              title: "SubDashboard",
              showTitle: false, // Hide title in UI
              view: SubDashboardView,
              metadata: {
                description: "SubDashboard for EduTest",
                forRoles: ["teacher", "student"],
              },
            },
          ],
        },
        {
          kind: "page",
          segment: "assignments",
          title: "Assignments",
          view: AssignmentsView,
          metadata: {
            description: "Assignments for EduTest",
            forRoles: ["teacher", "student"],
          },
        },
      ],
    }),
    []
  );

  useEffect(() => {
    registerCourseMicroservice(eduTestNavigation);
    return () => {
      unregisterCourseMicroservice(eduTestNavigation.segment);
    };
  }, [registerCourseMicroservice, unregisterCourseMicroservice, eduTestNavigation]);

  return null; // This component doesn't render anything
};

// Your view components
const DashboardView = () => <div>Dashboard View</div>;
const AssignmentsView = () => <div>Assignments View</div>;
const SubDashboardView = () => <div>SubDashboard View</div>;

export default EduTest;
```

**Usage in your app:**

```tsx
import { CourseMicroservice } from '@mui-toolpad-extended-tuni/courses';
import EduTest from './EduTest';

function App() {
  return (
    <CourseMicroservice>
      <EduTest />
      {/* Other course microservices */}
    </CourseMicroservice>
  );
}
```

This creates routes like:
- `/courses/:courseCode/:instance/edutest` - Shows tool selector
- `/courses/:courseCode/:instance/edutest/dashboard` - Shows Dashboard view
- `/courses/:courseCode/:instance/edutest/dashboard/subdashboard` - Shows SubDashboard view
- `/courses/:courseCode/:instance/edutest/assignments` - Shows Assignments view

## EventBus Integration with Calendar Package

The courses package automatically publishes course events to the EventBus, which the calendar package can consume for automatic calendar integration. **This integration is automatic** - no additional setup needed!

### How It Works

1. **Courses Package** includes `CourseEventPublisher` (automatically included in `CourseMicroservice`) which:
   - Monitors course data from `useCourseStore`
   - Converts course events (lectures, exercises, exams, deadlines) to generic calendar events
   - Publishes them to the EventBus via `eventBus.publish('courses', events)`

2. **Calendar Package** includes `CalendarEventAggregator` (automatically included in `CalendarMicroservice`) which:
   - Subscribes to EventBus events
   - Converts generic events to calendar events with proper colors
   - Updates the calendar display automatically

### Setup for EventBus Integration

Simply include both microservices - the integration happens automatically:

```tsx
import { BrowserRouter } from 'react-router-dom';
import { ToolpadProvider, Microservices } from 'mui-toolpad-extended-tuni';
import { CourseMicroservice } from '@mui-toolpad-extended-tuni/courses';
import { CalendarMicroservice } from '@mui-toolpad-extended-tuni/calendar';

function App() {
  return (
    <BrowserRouter>
      <ToolpadProvider>
        <Microservices>
          {/* CourseEventPublisher is automatically included */}
          <CourseMicroservice />
          
          {/* CalendarEventAggregator is automatically included */}
          <CalendarMicroservice />
        </Microservices>
      </ToolpadProvider>
    </BrowserRouter>
  );
}
```

**That's it!** When both packages are installed:
- ✅ Course events (lectures, exercises, exams, deadlines) are automatically published to the EventBus
- ✅ The calendar automatically receives and displays these events
- ✅ Events are color-coded by course subject and level
- ✅ No additional configuration needed - it works automatically!

### Event Structure

Course events are published with this structure:

```typescript
{
  id: string;
  title: string;
  start: string; // ISO date string
  end: string; // ISO date string
  metadata: {
    source: 'courses',
    courseCode: string;
    courseTitle: string;
    subject: string;
    courseLevel: 'basic' | 'intermediate' | 'advanced';
    type: 'lecture' | 'exercise' | 'exam' | 'deadline' | 'other';
    description?: string;
    location?: string;
  }
}
```

## Exports

### Components
- `CourseMicroservice` - Main microservice component
- `CourseList` - List of courses
- `CourseItem` - Individual course item
- `CourseTools` - Course tools displayer
- `CourseNavigationBuilder` - Navigation builder for courses
- `CourseCodeLoader` - Loader for course code routes
- `CourseInstanceLoader` - Loader for course instance routes
- `CourseInstanceSelector` - Selector for course instances
- `LtiLoginUrlForm` - LTI login URL form

### Hooks
- `useCourseMicroserviceRegistration` - Hook for registering custom course microservices (must be used within `CourseMicroservice` context)

### Store
- `useCourseStore` - Zustand store for course management

### Types
- `Course` - Course type
- `CourseRaw` - Raw course data type
- `courseRole` - Course role type
- `courseLevel` - Course level type
- `courseEventType` - Course event type
- `enrollmentStatus` - Enrollment status type

## Features

- Course management and CRUD operations
- Course enrollment handling
- Course navigation integration
- Course tools and microservices
- Course filtering and grouping
- Course instance support
- LTI integration support

## License

MIT
