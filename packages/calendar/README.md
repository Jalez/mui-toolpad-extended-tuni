# @mui-toolpad-extended-tuni/calendar

Calendar microservice extension for MUI Toolpad Extended TUNI. This package provides calendar functionality, event management, and calendar-related components using FullCalendar.

## Installation

```bash
npm install @mui-toolpad-extended-tuni/calendar
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
- `@fullcalendar/core@^6.0.0`
- `@fullcalendar/daygrid@^6.0.0`
- `@fullcalendar/interaction@^6.0.0`
- `@fullcalendar/react@^6.0.0`
- `@fullcalendar/timegrid@^6.0.0`
- `@emotion/react@^11.0.0`
- `@emotion/styled@^11.0.0`
- `luxon@^3.0.0`

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

## Exports

### Components
- `CalendarMicroservice` - Main microservice component
- `Calendar` - Main calendar component (FullCalendar wrapper)
- `CalendarManager` - Manages calendar registration and grid layout
- `CalendarEventAggregator` - Aggregates and publishes calendar events
- `CalendarHeader` - Calendar header with view controls

### Store
- `useCalendarStore` - Zustand store for calendar management

### Types
- `CalendarEventType` - Calendar event type (lecture, exercise, exam, deadline, other, meeting, maintenance)

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
