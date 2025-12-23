# @mui-toolpad-extended-tuni/calendar

Calendar microservice extension for MUI Toolpad Extended TUNI. This package provides calendar functionality, event management, and calendar-related components using FullCalendar.

## Installation

```bash
npm install @mui-toolpad-extended-tuni/calendar @mui-toolpad-extended-tuni/main @mui-toolpad-extended-tuni/core
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

### Calendar Dependencies
- `@fullcalendar/core@^6.0.0`
- `@fullcalendar/daygrid@^6.0.0`
- `@fullcalendar/interaction@^6.0.0`
- `@fullcalendar/react@^6.0.0`
- `@fullcalendar/timegrid@^6.0.0`
- `luxon@^3.0.0`

### Installation Example

```bash
npm install @mui-toolpad-extended-tuni/calendar @mui-toolpad-extended-tuni/main @mui-toolpad-extended-tuni/core \
  react react-dom react-router-dom \
  @mui/material @mui/icons-material @mui/x-date-pickers \
  @emotion/react @emotion/styled \
  @fullcalendar/core @fullcalendar/daygrid @fullcalendar/interaction @fullcalendar/react @fullcalendar/timegrid \
  luxon
```

## API Configuration

**Note**: The calendar package does not make direct API calls. It receives events through the EventBus system from other microservices (primarily the courses package). However, you can configure calendar endpoints via the `apiEndpoints` prop if you plan to add direct API integration in the future.

### Default Endpoints

If you need to configure calendar endpoints for future API integration:

- `get: "api/calendar/"` - GET list of calendar events
- `getById: "api/calendar/:id"` - GET event by ID
- `post: "api/calendar/"` - POST create new event
- `put: "api/calendar/:id/"` - PUT update event
- `delete: "api/calendar/:id/"` - DELETE event

### Customizing Endpoints

```tsx
import { CalendarMicroservice } from '@mui-toolpad-extended-tuni/calendar';
import type { CalendarApiEndpoints } from '@mui-toolpad-extended-tuni/calendar';

const calendarEndpoints: CalendarApiEndpoints = {
  get: "https://api.example.com/v1/calendar",
  getById: "https://api.example.com/v1/calendar/:id",
  post: "https://api.example.com/v1/calendar",
  put: "https://api.example.com/v1/calendar/:id",
  delete: "https://api.example.com/v1/calendar/:id",
};

<CalendarMicroservice apiEndpoints={calendarEndpoints} />
```

**Current Implementation**: The calendar currently uses EventBus to receive events from other microservices. Direct API endpoints are reserved for future use.

## Usage

### Basic Setup

The calendar microservice automatically registers itself when imported:

```tsx
import { BrowserRouter } from 'react-router-dom';
import { ToolpadProvider, Microservices } from 'mui-toolpad-extended-tuni';
import { CalendarMicroservice } from '@mui-toolpad-extended-tuni/calendar';

function App() {
  return (
    <BrowserRouter>
      <ToolpadProvider>
        <Microservices>
          <CalendarMicroservice />
          {/* Other microservices */}
        </Microservices>
      </ToolpadProvider>
    </BrowserRouter>
  );
}
```

### Using Calendar Store

```tsx
import { useCalendarStore } from '@mui-toolpad-extended-tuni/calendar';

function MyComponent() {
  const { events, getEvents, addEvent } = useCalendarStore();
  
  useEffect(() => {
    getEvents();
  }, [getEvents]);
  
  return (
    <div>
      {events.map(event => (
        <div key={event.id}>{event.title}</div>
      ))}
    </div>
  );
}
```

### Calendar Components

```tsx
import { Calendar, CalendarManager } from '@mui-toolpad-extended-tuni/calendar';

function CalendarPage() {
  return (
    <>
      <CalendarManager />
      <Calendar />
    </>
  );
}
```

### Calendar Event Aggregator

The `CalendarEventAggregator` component (included in `CalendarMicroservice`) automatically subscribes to events from the EventBus and displays them in the calendar.

```tsx
import { CalendarEventAggregator } from '@mui-toolpad-extended-tuni/calendar';

function App() {
  return (
    <>
      <CalendarEventAggregator />
      {/* Rest of your app */}
    </>
  );
}
```

## EventBus Integration with Courses Package

The calendar package automatically integrates with the courses package through the EventBus system. **This integration is automatic** - when both packages are installed, course events are automatically displayed in the calendar!

### How It Works

1. **Courses Package** (`CourseMicroservice` includes `CourseEventPublisher`):
   - Automatically monitors course data from the course store
   - Converts course events (lectures, exercises, exams, deadlines) to generic EventBus events
   - Publishes them via `eventBus.publish('courses', events)`

2. **Calendar Package** (`CalendarMicroservice` includes `CalendarEventAggregator`):
   - Automatically subscribes to EventBus events
   - Converts generic events to calendar events with proper colors based on course subject and level
   - Updates the calendar display in real-time

3. **Event Color Coding**:
   - Events are automatically color-coded by course subject (COMP.CS = blue, MATH = green, etc.)
   - Different shades for course levels (basic = light, intermediate = medium, advanced = dark)
   - Distinct styling for different event types

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
          {/* CourseEventPublisher automatically publishes course events */}
          <CourseMicroservice />
          
          {/* CalendarEventAggregator automatically subscribes and displays events */}
          <CalendarMicroservice />
        </Microservices>
      </ToolpadProvider>
    </BrowserRouter>
  );
}
```

**That's it!** No additional configuration needed. Course events will automatically appear in the calendar with proper colors and styling.

### Event Sources

The calendar aggregates events from multiple sources:
- **Courses** (`'courses'` source) - Automatically from `@mui-toolpad-extended-tuni/courses`
- **Custom events** - You can publish your own events to the EventBus

### Publishing Custom Events

You can also publish custom events that will appear in the calendar:

```tsx
import { eventBus, Event } from 'mui-toolpad-extended-tuni';

function publishCustomEvent() {
  const customEvent: Event = {
    id: 'custom-1',
    title: 'Custom Event',
    start: '2024-01-15T10:00:00Z',
    end: '2024-01-15T11:00:00Z',
    metadata: {
      source: 'custom',
      type: 'meeting',
      description: 'Custom meeting event',
    },
  };

  eventBus.publish('custom', [customEvent]);
}
```

### Event Color Coding

Events from courses are automatically color-coded:
- **By Subject**: Each subject (COMP.CS, MATH, PHYS, etc.) has a base color
- **By Level**: Basic (light), Intermediate (medium), Advanced (dark) shades
- **By Type**: Different event types (lecture, exercise, exam, etc.) have distinct styling

## Data Types

### CalendarEvent

Calendar event object displayed in the calendar.

```typescript
interface CalendarEvent {
  id: string;                      // Unique event ID
  title: string;                   // Event title
  start: Date | string;            // Event start date/time (ISO string or Date)
  end?: Date | string;             // Event end date/time (optional)
  backgroundColor?: string;        // Background color (hex)
  borderColor?: string;            // Border color (hex)
  textColor?: string;             // Text color (hex)
  extendedProps?: {                // Additional event metadata
    courseCode?: string;           // Course code (if from courses package)
    courseTitle?: string;          // Course title
    type?: string;                 // Event type
    description?: string;          // Event description
    location?: string;             // Event location
    [key: string]: any;            // Additional custom properties
  };
}
```

### CalendarEventType

Type of calendar event.

```typescript
type CalendarEventType = 
  | "lecture"      // Lecture events
  | "exercise"     // Exercise sessions
  | "exam"         // Examinations
  | "deadline"     // Assignment deadlines
  | "other"        // Other events
  | "meeting"      // Meetings
  | "maintenance"; // Maintenance windows
```

### EventBus Event Format

Events received from EventBus (e.g., from courses package) follow this structure:

```typescript
interface Event {
  id: string;
  title: string;
  start: string;                   // ISO date string
  end: string;                      // ISO date string
  metadata: {
    source: string;                 // Event source (e.g., "courses")
    type?: CalendarEventType;       // Event type
    courseCode?: string;            // Course code
    courseTitle?: string;           // Course title
    subject?: string;               // Course subject
    courseLevel?: "basic" | "intermediate" | "advanced";
    description?: string;
    location?: string;
    [key: string]: any;             // Additional metadata
  };
}
```

## Exports

### Components
- `CalendarMicroservice` - Main microservice component
- `Calendar` - Main calendar component (FullCalendar wrapper)
- `CalendarManager` - Manages calendar registration and grid layout
- `CalendarEventAggregator` - Aggregates and publishes calendar events
- `CalendarHeader` - Calendar header with view controls

### Store
- `useCalendarStore` - Zustand store for calendar management
- `createCalendarEvent` - Helper function to create calendar events
- `getContrastColor` - Helper function to get contrasting text color

### Hooks
- `useCalendarApiConfig()` - Hook to access calendar API endpoint configuration (for future use)

### Types
- `CalendarEvent` - Calendar event interface
- `CalendarEventType` - Calendar event type enumeration
- `CalendarApiEndpoints` - API endpoint configuration type (for future use)

## Features

- FullCalendar integration
- Multiple calendar views (month, week, day)
- Event management and CRUD operations
- Event aggregation from course events
- EventBus integration for event publishing
- Grid layout integration
- Responsive calendar design
- Event type customization
- Course color integration

## Event Types

The calendar supports the following event types:
- `lecture` - Lecture events
- `exercise` - Exercise sessions
- `exam` - Examinations
- `deadline` - Assignment deadlines
- `other` - Other events
- `meeting` - Meetings
- `maintenance` - Maintenance windows

## License

MIT
