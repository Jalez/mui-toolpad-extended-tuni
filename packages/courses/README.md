# @mui-toolpad-extended-tuni/courses

Courses microservice extension for MUI Toolpad Extended TUNI. This package provides course management functionality, course routing, course tools, and course-related components.

## Installation

```bash
npm install @mui-toolpad-extended-tuni/courses @mui-toolpad-extended-tuni/main @mui-toolpad-extended-tuni/core
```

**Important**: You must also install `@mui-toolpad-extended-tuni/main` and `@mui-toolpad-extended-tuni/core` as they are required peer dependencies.

## Required Peer Dependencies

This package requires the following peer dependencies to be installed:

### Required Packages
- **`@mui-toolpad-extended-tuni/main`**: ^3.4.0 - **MUST be installed separately**
- **`@mui-toolpad-extended-tuni/core`**: ^3.2.0 - **MUST be installed separately** (also required by main)

### React & UI Framework
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

### Installation Example

```bash
npm install @mui-toolpad-extended-tuni/courses @mui-toolpad-extended-tuni/main @mui-toolpad-extended-tuni/core \
  react react-dom react-router-dom \
  @mui/material @mui/icons-material @mui/x-date-pickers \
  @emotion/react @emotion/styled \
  axios zustand
```

## API Configuration

This package uses configurable API endpoints. Each microservice accepts its own `apiEndpoints` prop, allowing you to configure endpoints independently for only the services you use.

### Default Endpoints

If no `apiEndpoints` prop is provided, the package uses these default endpoints:

- `get: "api/courses/"` - GET list of courses
- `getById: "api/courses/:id"` - GET course by ID (use `:id` placeholder)
- `getByUrl: "api/courses/?encoded_url=:encodedUrl"` - GET course by URL (use `:encodedUrl` placeholder)
- `post: "api/courses/"` - POST create new course
- `put: "api/courses/:id/"` - PUT update course (use `:id` placeholder)
- `delete: "api/chat/courses/:id"` - DELETE course (use `:id` placeholder)

### Customizing Endpoints

Configure endpoints directly on the `CourseMicroservice` component:

```tsx
import { CourseMicroservice } from '@mui-toolpad-extended-tuni/courses';
import type { CoursesApiEndpoints } from '@mui-toolpad-extended-tuni/courses';

const coursesEndpoints: CoursesApiEndpoints = {
  get: "https://api.example.com/v1/courses",
  getById: "https://api.example.com/v1/courses/:id",
  getByUrl: "https://api.example.com/v1/courses?url=:encodedUrl",
  post: "https://api.example.com/v1/courses",
  put: "https://api.example.com/v1/courses/:id",
  delete: "https://api.example.com/v1/courses/:id",
};

<CourseMicroservice apiEndpoints={coursesEndpoints}>
  {/* Your course microservices */}
</CourseMicroservice>
```

**Note**: You can use either full URLs (`https://api.example.com/courses`) or relative paths (`api/courses/`). Placeholders like `:id` will be replaced with actual values at runtime.

**Partial Configuration**: You can configure only the endpoints you need to customize. Unspecified endpoints will use defaults:

```tsx
<CourseMicroservice apiEndpoints={{
  get: "api/v2/courses",  // Only override GET endpoint
  // Other endpoints use defaults
}}>
  {/* Your course microservices */}
</CourseMicroservice>
```

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

## API Endpoints

This package makes the following API calls. All endpoints are configurable via `apiConfig`.

### GET `/api/courses/` (or configured `get` endpoint)

Retrieves a list of all courses.

**Request**: No body required

**Response**: `200 OK`
```json
[
  {
    "id": "course-123",
    "title": "Introduction to Computer Science",
    "description": "Basic CS concepts",
    "code": "COMP.CS.100",
    "instance": "compcs100-fall-2024",
    "start_date": "2024-09-01T00:00:00Z",
    "end_date": "2024-12-15T23:59:59Z",
    "created_at": "2024-08-01T10:00:00Z",
    "updated_at": "2024-08-15T14:30:00Z",
    "visibility": {
      "mode": "public",
      "start_date": null,
      "end_date": null
    },
    "events": {
      "lecture": [],
      "exercise": [],
      "exam": [],
      "deadline": [],
      "other": []
    },
    "data_processing": {
      "purposes": ["course_delivery", "assessment"],
      "retention": 365,
      "third_party_processors": [],
      "special_categories": false,
      "legal_basis": "consent"
    }
  }
]
```

**Response Type**: `Course[]` (array of Course objects)

### GET `/api/courses/:id` (or configured `getById` endpoint)

Retrieves a single course by ID.

**Request Parameters**:
- `:id` (path parameter) - Course ID

**Response**: `200 OK`
```json
{
  "id": "course-123",
  "title": "Introduction to Computer Science",
  "description": "Basic CS concepts",
  "code": "COMP.CS.100",
  "instance": "compcs100-fall-2024",
  // ... same structure as list endpoint
}
```

**Response Type**: `Course`

### GET `/api/courses/?encoded_url=:encodedUrl` (or configured `getByUrl` endpoint)

Retrieves a course by URL (base64-encoded).

**Request Parameters**:
- `encoded_url` (query parameter) - Base64-encoded course URL

**Response**: `200 OK` (array with single course)
```json
[
  {
    "id": "course-123",
    // ... course object
  }
]
```

**Response Type**: `Course[]` (array with one Course)

### POST `/api/courses/` (or configured `post` endpoint)

Creates a new course.

**Request Body**: `CourseRaw` (snake_case)
```json
{
  "title": "Introduction to Computer Science",
  "description": "Basic CS concepts",
  "code": "COMP.CS.100",
  "instance": "compcs100-fall-2024",
  "start_date": "2024-09-01T00:00:00Z",
  "end_date": "2024-12-15T23:59:59Z",
  "visibility": {
    "mode": "public",
    "start_date": null,
    "end_date": null
  },
  "events": {
    "lecture": [],
    "exercise": [],
    "exam": [],
    "deadline": [],
    "other": []
  },
  "data_processing": {
    "purposes": ["course_delivery", "assessment"],
    "retention": 365,
    "third_party_processors": [],
    "special_categories": false,
    "legal_basis": "consent"
  }
}
```

**Response**: `201 Created`
```json
{
  "id": "course-123",
  "title": "Introduction to Computer Science",
  // ... full Course object with generated ID and timestamps
  "created_at": "2024-08-01T10:00:00Z",
  "updated_at": "2024-08-01T10:00:00Z"
}
```

**Response Type**: `Course`

**Note**: The request body should be in snake_case format. The package automatically converts from camelCase.

### PUT `/api/courses/:id/` (or configured `put` endpoint)

Updates an existing course.

**Request Parameters**:
- `:id` (path parameter) - Course ID

**Request Body**: `Course` (snake_case, must include `id`)
```json
{
  "id": "course-123",
  "title": "Updated Course Title",
  "description": "Updated description",
  // ... all Course fields
}
```

**Response**: `200 OK`
```json
{
  "id": "course-123",
  "title": "Updated Course Title",
  // ... updated Course object
  "updated_at": "2024-08-15T14:30:00Z"
}
```

**Response Type**: `Course`

### DELETE `/api/chat/courses/:id` (or configured `delete` endpoint)

Deletes a course.

**Request Parameters**:
- `:id` (path parameter) - Course ID

**Response**: `200 OK`
```json
{
  "id": "course-123",
  // ... deleted Course object
}
```

**Response Type**: `Course`

## Data Types

### Course

Complete course object returned by API (includes `id`, `createdAt`, `updatedAt`).

```typescript
interface Course extends CourseRaw {
  id: string;                    // Unique course ID
  createdAt: string;             // ISO date string - when course was created
  updatedAt: string;             // ISO date string - when course was last updated
}
```

### CourseRaw

Course data for creating/updating courses (request body format).

```typescript
interface CourseRaw {
  title: string;                  // Course title (required)
  description: string;            // Course description (required)
  code: string;                  // Course code, e.g., "COMP.CS.300" (required)
  instance: string;               // Instance identifier, e.g., "compcs300-october-2024" (required)
  ltiLoginUrl?: string;           // LTI login URL (optional)
  services?: string[];            // List of services used (optional)
  image?: {                       // Course images (optional)
    large: string;                // 1200x800px image URL
    medium: string;               // 600x400px image URL
    thumbnail: string;            // 300x200px image URL
  };
  startDate: string | null;       // ISO date string - course start date
  endDate: string | null;         // ISO date string - course end date
  visibility: {                   // Visibility settings
    mode: "public" | "enrolled" | "private";
    startDate: string | null;     // When course becomes visible
    endDate: string | null;       // When visibility ends
  };
  events: {                        // Course events by type
    lecture: CourseEvent[];
    exercise: CourseEvent[];
    exam: CourseEvent[];
    deadline: CourseEvent[];
    other: CourseEvent[];
  };
  tags?: string[];                 // Course tags for categorization
  language?: string;              // ISO 639-1 language code
  dataProcessing: {                // GDPR data processing info
    purposes: string[];            // What data is used for
    retention: number;             // Retention period in days
    thirdPartyProcessors: Array<{
      name: string;
      purpose: string;
      dataShared: string[];
    }>;
    specialCategories: boolean;   // Special categories of personal data
    legalBasis: "consent" | "contract" | "legal_obligation" | "legitimate_interests";
  };
  enrollment?: {                    // Enrollment settings
    startDate: string | null;      // Enrollment opens
    endDate: string | null;        // Enrollment closes
    status: {
      open: boolean;              // Whether new enrollments accepted
      maxStudents?: number;       // Maximum students (optional)
    };
  };
  relationships?: {                 // Course relationships
    prerequisites: CourseRelation[];
    continuations: CourseRelation[];
    alternatives: CourseRelation[];
    related: CourseRelation[];
  };
  studyModule?: {                   // Study module info
    name: string;                  // Module name
    order?: number;                 // Order within module
    credits: number;                // Credit points
    level: "basic" | "intermediate" | "advanced";
  };
}
```

### CourseEvent

Individual course event (lecture, exercise, exam, etc.).

```typescript
interface CourseEvent {
  id: string;                      // Event ID
  type: "lecture" | "exercise" | "exam" | "deadline" | "other";
  title: string;                   // Event title
  description?: string;             // Event description
  startTime: string;                // ISO date string - event start
  endTime?: string;                 // ISO date string - event end
  location?: string;                // Physical or virtual location
  teachers?: EnrollmentData[];      // Array of teachers
  recurring?: {                      // Recurring event settings
    frequency: "daily" | "weekly" | "biweekly";
    until: string;                  // ISO date string - when recurrence ends
    exceptions?: string[];           // ISO date strings - cancelled dates
  };
  maxParticipants?: number;          // Maximum participants
  requiresRegistration?: boolean;   // Whether registration required
}
```

### EnrollmentData

User enrollment information for a course.

```typescript
interface EnrollmentData {
  courseId: string;                 // Course ID
  userId: string;                   // User ID
  name: string;                     // User name
  email: string;                    // User email
  role: "student" | "teacher" | "guest";
  status: "enrolled" | "pending" | "rejected";
}
```

### CourseRelation

Relationship between courses (prerequisites, continuations, etc.).

```typescript
interface CourseRelation {
  code: string;                     // Related course code
  type: "prerequisite" | "recommended" | "parallel" | "continues_from" | 
        "alternative_to" | "part_of" | "prepares_for";
  description?: string;              // Why courses are related
  required?: boolean;                // Hard requirement or suggestion
}
```

### Type Definitions

```typescript
type courseRole = "student" | "teacher" | "guest";
type visibilityMode = "public" | "enrolled" | "private";
type courseEventType = "lecture" | "exercise" | "exam" | "deadline" | "other";
type courseEventFrequency = "daily" | "weekly" | "biweekly";
type legalBasis = "consent" | "contract" | "legal_obligation" | "legitimate_interests";
type enrollmentStatus = "enrolled" | "pending" | "rejected";
type courseLevel = "basic" | "intermediate" | "advanced";
type courseRelationType = "prerequisite" | "recommended" | "parallel" | 
                          "continues_from" | "alternative_to" | "part_of" | "prepares_for";
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
- `useCoursesApiConfig` - Hook to access courses API endpoint configuration

### Store
- `useCourseStore` - Zustand store for course management

### Network Functions
- `getCourses()` - Fetch all courses
- `getCourseById(courseId: string)` - Fetch course by ID
- `getCourseByUrl(url: string)` - Fetch course by URL
- `addCourse(courseData: CourseRaw)` - Create new course
- `updateCourse(course: Course)` - Update existing course
- `deleteCourse(courseId: string)` - Delete course

### Types
- `Course` - Complete course object (with id, timestamps)
- `CourseRaw` - Course data for create/update requests
- `CourseEvent` - Individual course event
- `EnrollmentData` - User enrollment information
- `CourseRelation` - Course relationship
- `CoursesApiEndpoints` - API endpoint configuration type
- `courseRole` - Course role type
- `courseLevel` - Course level type
- `courseEventType` - Course event type
- `enrollmentStatus` - Enrollment status type
- `visibilityMode` - Visibility mode type
- `courseEventFrequency` - Event frequency type
- `legalBasis` - Legal basis for data processing
- `courseRelationType` - Course relation type

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
