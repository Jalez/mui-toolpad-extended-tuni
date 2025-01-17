<!-- @format -->

# MUI Toolpad Extended Library (TUNI)

A React library extending MUI Toolpad functionality with additional features for educational applications. This library provides components and tools for building interactive educational interfaces.

## Version 2.1.0

### Recent Changes

- Enhanced course navigation structure with support for course instances
- Improved MicroserviceRoutes component with better TypeScript support
- Added new CourseInstanceSelector and CourseCodeLoader components
- Updated navigation store with better course instance handling
- Introduced new course filtering utilities
- Improved sidebar footer with responsive design

### Breaking Changes

- Navigation structure now requires course code and instance properties
- MicroserviceRoutes configuration requires updated navigation builder function
- Course data structure updated to include code and instance fields

## Breaking Changes in v2.0.0

1. Renamed `EduMLProvider` to `LMSProvider` (EduMLProvider is now deprecated)
2. All routing components must now be imported from this package
3. State management is now centralized through the package

## Prerequisites

This library requires the following peer dependencies:

- React ≥18.0.0
- React DOM ≥18.0.0
- @mui/material ≥6.0.0
- @mui/icons-material ≥6.0.0
- @emotion/react ≥11.0.0
- @emotion/styled ≥11.0.0

## Installation

```bash
npm install mui-toolpad-extended-tuni
```

## Basic Usage

1. Setup your application with `LMSProvider` and routing:

```tsx
import { BrowserRouter } from 'react-router-dom';
import { LMSProvider } from 'mui-toolpad-extended-tuni';

function App() {
  return (
    <BrowserRouter>
      <LMSProvider>{/* Your application content */}</LMSProvider>
    </BrowserRouter>
  );
}
```

2. Use the included stores and components:

```tsx
import {
  useUserStore,
  useCourseStore,
  useNavigationStore,
} from 'mui-toolpad-extended-tuni';

function MyComponent() {
  const { user } = useUserStore();
  const { currentCourse } = useCourseStore();

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <p>Current course: {currentCourse?.title}</p>
    </div>
  );
}
```

## Core Components

### LMSProvider

The main provider component that sets up the application context:

```tsx
import { LMSProvider, BrowserRouter } from 'mui-toolpad-extended-tuni';

function App() {
  return (
    <BrowserRouter>
      <LMSProvider>
        <YourComponents />
      </LMSProvider>
    </BrowserRouter>
  );
}
```

### LoadingScreen

A customizable loading indicator with animations:

```tsx
import { LoadingScreen } from 'mui-toolpad-extended-tuni';

function MyComponent() {
  return isLoading ? <LoadingScreen /> : <YourContent />;
}
```

### Notifications

Built-in notification system using notistack:

```tsx
import { useNotificationStore } from 'mui-toolpad-extended-tuni';

function MyComponent() {
  const { addNotificationData } = useNotificationStore();

  const showNotification = () => {
    addNotificationData({
      type: 'success',
      message: 'Operation completed successfully',
      singular: true, // Optional: show only once
    });
  };
}
```

### ExtendedDialog

A responsive dialog component:

```tsx
import { ExtendedDialog } from 'mui-toolpad-extended-tuni';

function MyComponent() {
  const [open, setOpen] = useState(false);

  return (
    <ExtendedDialog open={open} onClose={() => setOpen(false)}>
      <DialogContent>Your content here</DialogContent>
    </ExtendedDialog>
  );
}
```

### Course Management Components

#### CourseSelector

A component for listing and selecting courses:

```tsx
import { CourseSelector } from 'mui-toolpad-extended-tuni';

function MyComponent() {
  return <CourseSelector />;
}
```

#### CourseTools

Manages course-specific tools and LTI configuration:

```tsx
import { CourseTools } from 'mui-toolpad-extended-tuni';

function MyComponent() {
  return <CourseTools />;
}
```

#### LTI Login Configuration

For teachers to set up course authentication:

```tsx
import { LtiLoginUrlForm } from 'mui-toolpad-extended-tuni';

function MyComponent() {
  return <LtiLoginUrlForm />;
}
```

### Error Handling Components

#### ErrorBoundary

Catches and handles React component errors:

```tsx
import { ErrorBoundary } from 'mui-toolpad-extended-tuni';

function App() {
  return (
    <ErrorBoundary>
      <YourComponents />
    </ErrorBoundary>
  );
}
```

#### NullStateWarning

Detects and displays warnings for null states:

```tsx
import { NullStateWarning } from 'mui-toolpad-extended-tuni';

function MyComponent() {
  const states = [{ user: currentUser }, { course: currentCourse }];

  return (
    <NullStateWarning states={states}>
      <YourContent />
    </NullStateWarning>
  );
}
```

## Development Tools

When running in development mode (localhost), the library provides additional tools:

- User Switcher: Easily switch between different user roles (student/teacher/guest)
- Development Toolbar: Additional debugging and testing features

## Features

- User authentication and management
- Course handling and navigation
- Notification system
- Custom dialog management
- Role-based navigation filtering
- LTI integration support
- Customizable theme

## Available Stores

### useUserStore

```tsx
const {
  user, // Current user data
  getUser, // Fetch user data
  changeRole, // Switch user role
  logout, // Logout current user
} = useUserStore();
```

### useCourseStore

```tsx
const {
  currentCourse, // Current active course
  courses, // List of available courses
  getCourses, // Fetch all courses
  getCourseByUrl, // Get course by URL
} = useCourseStore();
```

### useNavigationStore

```tsx
const {
  navigation, // Current navigation structure
  updateSection, // Update navigation section
  setNavigation, // Set entire navigation
} = useNavigationStore();
```

### useNotificationStore

```tsx
const {
  addNotificationData, // Add new notification
  removeNotificationData, // Remove notification
} = useNotificationStore();
```

## Utility Functions

### String Manipulation

```tsx
import {
  slugify,
  camelCaseToUnderscore,
  underscoreToCamelCase,
} from 'mui-toolpad-extended-tuni';

// Convert strings to URL-friendly format
const slug = slugify('My Course Title'); // 'my-course-title'

// Convert between case styles
const underscore = camelCaseToUnderscore('myVariable'); // 'my_variable'
const camelCase = underscoreToCamelCase('my_variable'); // 'myVariable'
```

### Object Key Conversion

```tsx
import {
  convertObjectKeysToCamelCase,
  convertObjectKeysToUnderscore,
} from 'mui-toolpad-extended-tuni';

// Convert API responses
const camelCaseData = convertObjectKeysToCamelCase(apiResponse);
const underscoreData = convertObjectKeysToUnderscore(requestData);
```

## Network Configuration

The library includes pre-configured Axios instance for API communications:

```tsx
import { axiosInstance } from 'mui-toolpad-extended-tuni';

// Handles CSRF tokens and base URL automatically
const response = await axiosInstance.get('/api/endpoint');
```

## Course Types and Interfaces

```tsx
interface Course {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  ltiLoginUrl: string;
  updatedAt: string;
}

// Course creation payload
interface CourseRaw {
  title: string;
  description: string;
}
```

## Theme Customization

The library includes a customizable Material-UI theme:

```tsx
import { EduMLTheme } from 'mui-toolpad-extended-tuni';

// Theme includes predefined:
// - Color schemes (light/dark)
// - Typography scales
// - Component style overrides
// - Transition effects
// - Z-index hierarchy
```

## Current Limitations

1. **Authentication:**

   - LTI login URL must be configured per course
   - Only supports single active session
   - Development mode uses mock authentication

2. **Course Management:**

   - Limited to predefined course structure
   - No bulk operations support
   - Course tools must follow specific navigation structure

3. **State Management:**

   - No persistence between page reloads
   - Limited offline support
   - State updates are synchronous

4. **Network:**

   - Base URL is fixed to '/'
   - CSRF token handling is mandatory
   - No request caching implementation

5. **Browser Support:**
   - Requires modern browser features
   - Limited mobile responsiveness
   - No IE11 support

## Types and Interfaces

### Common Types

```typescript
type fetchState = 'idle' | 'loading' | 'error' | 'success';

interface NavigationStoreItem {
  kind: 'header' | 'page';
  title: string;
  segment?: string;
  children?: NavigationStoreItem[];
}
```

## License

MIT License - See LICENSE file for details.

## Contributing

When contributing, please note:

- All components must implement error boundaries
- State management should use Zustand stores
- Network requests must use the provided axios instance
- Theme modifications should extend EduMLTheme
- Components should handle null states appropriately

## Support

For issues and feature requests, please use the GitHub issue tracker.
