<!-- @format -->

# MUI Toolpad Extended Library (TUNI)

A React library extending MUI Toolpad functionality with additional features for educational applications. This library provides components and tools for building interactive educational interfaces.

## Version 3.0.0

### Recent Changes

- **Modular Architecture**: Calendar, Courses, and Users are now optional extension packages
- **Standalone Core**: Main package (`mui-toolpad-extended-tuni`) is fully functional without extensions
- **Extension Packages**: Install only the microservices you need:
  - `@mui-toolpad-extended-tuni/calendar` - Calendar microservice
  - `@mui-toolpad-extended-tuni/courses` - Courses microservice  
  - `@mui-toolpad-extended-tuni/users` - Users microservice
- Enhanced course navigation structure with support for course instances
- Improved MicroserviceRoutes component with better TypeScript support
- Added new CourseInstanceSelector and CourseCodeLoader components
- Updated navigation store with better course instance handling
- Introduced new course filtering utilities
- Improved sidebar footer with responsive design
- Fixed axios configuration to use configured instance with baseURL
- Fixed user.platformRoles undefined error with optional chaining

### Breaking Changes in v3.0.0

- **Renamed `LMSProvider` to `ToolpadProvider`**: Update all imports and usage from `LMSProvider` to `ToolpadProvider`
- **Extension Packages**: Calendar, Courses, and Users are no longer included in the main package
- **Optional Extensions**: These microservices must be installed separately if needed
- **Peer Dependencies**: Extension packages require `mui-toolpad-extended-tuni` as a peer dependency
- Navigation structure now requires course code and instance properties
- MicroserviceRoutes configuration requires updated navigation builder function
- Course data structure updated to include code and instance fields

### Breaking Changes in v2.1.0

- Navigation structure now requires course code and instance properties
- MicroserviceRoutes configuration requires updated navigation builder function
- Course data structure updated to include code and instance fields

## Breaking Changes in v2.0.0

1. Renamed `EduMLProvider` to `LMSProvider` (EduMLProvider is now deprecated)
   - **Note**: In v3.0.0, `LMSProvider` was renamed to `ToolpadProvider`
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

### Core Package (Required)

```bash
npm install mui-toolpad-extended-tuni
```

### Optional Extension Packages

The main package is fully functional standalone. Install extension packages only if you need their functionality:

```bash
# Calendar microservice
npm install @mui-toolpad-extended-tuni/calendar

# Courses microservice
npm install @mui-toolpad-extended-tuni/courses

# Users microservice
npm install @mui-toolpad-extended-tuni/users
```

**Note**: Extension packages require `mui-toolpad-extended-tuni` as a peer dependency and will automatically register themselves when imported.

## Basic Usage

1. Setup your application with `ToolpadProvider` and routing:

```tsx
import { BrowserRouter } from 'react-router-dom';
import { ToolpadProvider } from 'mui-toolpad-extended-tuni';

function App() {
  return (
    <BrowserRouter>
      <ToolpadProvider>{/* Your application content */}</ToolpadProvider>
    </BrowserRouter>
  );
}
```

2. Use the included stores and components:

```tsx
import {
  useNavigationStore,
  useNotificationStore,
} from 'mui-toolpad-extended-tuni';

function MyComponent() {
  const { navigation } = useNavigationStore();
  const { addNotificationData } = useNotificationStore();

  return (
    <div>
      <h1>Welcome!</h1>
      {/* Your content */}
    </div>
  );
}
```

### Using Extension Packages

If you've installed extension packages, import and use them as microservices:

```tsx
import { ToolpadProvider, Microservices } from 'mui-toolpad-extended-tuni';
import { CourseMicroservice } from '@mui-toolpad-extended-tuni/courses';
import { UserMicroservice } from '@mui-toolpad-extended-tuni/users';
import { CalendarMicroservice } from '@mui-toolpad-extended-tuni/calendar';

function App() {
  return (
    <BrowserRouter>
      <ToolpadProvider>
        <Microservices>
          {/* Optionally include extension microservices */}
          <CourseMicroservice>
            {/* Your course microservices */}
          </CourseMicroservice>
          <UserMicroservice />
          <CalendarMicroservice />
        </Microservices>
      </ToolpadProvider>
    </BrowserRouter>
  );
}
```

**Note**: Extension packages auto-register themselves when imported. You don't need to manually register them.

## Core Components

### ToolpadProvider

The main provider component that sets up the application context:

```tsx
import { ToolpadProvider, BrowserRouter } from 'mui-toolpad-extended-tuni';

function App() {
  return (
    <BrowserRouter>
      <ToolpadProvider>
        <YourComponents />
      </ToolpadProvider>
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

**Note**: Course management components are available in the `@mui-toolpad-extended-tuni/courses` extension package.

#### CourseSelector

A component for listing and selecting courses:

```tsx
import { CourseSelector } from '@mui-toolpad-extended-tuni/courses';

function MyComponent() {
  return <CourseSelector />;
}
```

#### CourseTools

Manages course-specific tools and LTI configuration:

```tsx
import { CourseTools } from '@mui-toolpad-extended-tuni/courses';

function MyComponent() {
  return <CourseTools />;
}
```

#### LTI Login Configuration

For teachers to set up course authentication:

```tsx
import { LtiLoginUrlForm } from '@mui-toolpad-extended-tuni/courses';

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

### Core Stores (Main Package)

The following stores are available in the main package:

### useNavigationStore

```tsx
const {
  navigation, // Current navigation structure
  addSection, // Add a new section with optional header
  removeSection, // Remove a section and its header if last section
  addMicroserviceNavigation, // Add microservice navigation items
  setNavigation, // Set entire navigation
} = useNavigationStore();
```

### Extension Package Stores

**Note**: User and Course stores are available in their respective extension packages:

#### useUserStore (`@mui-toolpad-extended-tuni/users`)

```tsx
import { useUserStore } from '@mui-toolpad-extended-tuni/users';

const {
  user, // Current user data
  getUser, // Fetch user data
  changeRole, // Switch user role
  logout, // Logout current user
} = useUserStore();
```

#### useCourseStore (`@mui-toolpad-extended-tuni/courses`)

```tsx
import { useCourseStore } from '@mui-toolpad-extended-tuni/courses';

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
  addSection, // Add a new section with optional header
  removeSection, // Remove a section and its header if last section
  addMicroserviceNavigation, // Add microservice navigation items
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

The library includes a pre-configured Axios instance for API communications:

```tsx
import { axios } from 'mui-toolpad-extended-tuni';

// Handles CSRF tokens and base URL automatically
const response = await axios.get('/api/endpoint');
```

**Important**: Extension packages should use the configured axios instance from the main package to ensure consistent baseURL and CSRF token handling:

```tsx
// In extension packages
import { axios } from 'mui-toolpad-extended-tuni';

// This ensures correct API path resolution
const response = await axios.get('api/users/current/');
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

**Note**: The theme is provided by the main package and is available to all extension packages automatically.

## Package Architecture

### Main Package (`mui-toolpad-extended-tuni`)

The core package provides:
- ToolpadProvider and routing infrastructure
- Navigation system
- Notification system
- Dialog management
- Theme customization
- Utility functions
- Configured axios instance
- Common components and layouts

### Extension Packages

Extension packages are optional microservices that can be installed separately:

- **`@mui-toolpad-extended-tuni/calendar`**: Calendar functionality
- **`@mui-toolpad-extended-tuni/courses`**: Course management, routing, and tools
- **`@mui-toolpad-extended-tuni/users`**: User management and authentication

Each extension:
- Depends on `mui-toolpad-extended-tuni` as a peer dependency
- Auto-registers itself when imported
- Can be used independently or together
- Uses the configured axios instance from the main package

## Current Limitations

1. **Authentication:**

   - LTI login URL must be configured per course (requires Courses extension)
   - Only supports single active session
   - Development mode uses mock authentication

2. **Course Management:**

   - Requires `@mui-toolpad-extended-tuni/courses` extension package
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
   - Extension packages must use the configured axios instance

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
- State management should use Zustand stores with `createWithEqualityFn` from `zustand/traditional`
- Network requests must use the configured axios instance from the main package (`import { axios } from 'mui-toolpad-extended-tuni'`)
- Extension packages should depend on `mui-toolpad-extended-tuni` as a peer dependency
- Extension packages should auto-register themselves when imported
- Theme modifications should extend EduMLTheme
- Components should handle null states appropriately
- Use optional chaining for potentially undefined properties (e.g., `user?.platformRoles?.includes(...)`)

## Support

For issues and feature requests, please use the GitHub issue tracker.
