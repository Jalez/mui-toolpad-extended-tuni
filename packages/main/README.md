# @mui-toolpad-extended-tuni/main

Main package for MUI Toolpad Extended TUNI - provides ToolpadProvider, LMS components, and platform features.

## Installation

```bash
npm install @mui-toolpad-extended-tuni/main @mui-toolpad-extended-tuni/core
```

**Important**: You must also install `@mui-toolpad-extended-tuni/core` as it is a required peer dependency.

## Required Peer Dependencies

This package requires the following peer dependencies to be installed:

### Required Package
- **`@mui-toolpad-extended-tuni/core`**: ^3.2.0 - **MUST be installed separately**

### React & UI Framework
- `@emotion/react`: ^11.0.0
- `@emotion/styled`: ^11.0.0
- `@mui/icons-material`: ^7.0.0
- `@mui/material`: ^7.0.0
- `@mui/x-date-pickers`: ^7.0.0
- `react`: ^19.0.0
- `react-dom`: ^19.0.0
- `react-router-dom`: ^7.0.0
- `zustand`: ^4.5.0

### Installation Example

```bash
npm install @mui-toolpad-extended-tuni/main @mui-toolpad-extended-tuni/core \
  @emotion/react @emotion/styled \
  @mui/icons-material @mui/material @mui/x-date-pickers \
  react react-dom react-router-dom zustand
```

## Optional Extension Packages

Install extension packages only if you need their functionality:

```bash
# Calendar microservice
npm install @mui-toolpad-extended-tuni/calendar

# Courses microservice
npm install @mui-toolpad-extended-tuni/courses

# Users microservice
npm install @mui-toolpad-extended-tuni/users
```

**Note**: Extension packages require `@mui-toolpad-extended-tuni/main` as a peer dependency and will automatically register themselves when imported.

## Basic Usage

1. Setup your application with `ToolpadProvider` and routing:

```tsx
import { BrowserRouter } from 'react-router-dom';
import { ToolpadProvider } from '@mui-toolpad-extended-tuni/main';

function App() {
  return (
    <BrowserRouter>
      <ToolpadProvider>{/* Your application content */}</ToolpadProvider>
    </BrowserRouter>
  );
}
```

2. Use components and hooks from the package:

```tsx
import {
  ToolpadProvider,
  Microservices,
  useNavigationStore,
  useCurrentUser,
  Notifications,
  Dialogs,
} from '@mui-toolpad-extended-tuni/main';
```

## API Configuration

Each microservice accepts its own `apiEndpoints` prop, allowing you to configure endpoints independently. This modular approach means you only configure endpoints for the microservices you actually use.

### Basic Configuration

Configure endpoints directly on each microservice component:

```tsx
import { CourseMicroservice } from '@mui-toolpad-extended-tuni/courses';
import { UserMicroservice } from '@mui-toolpad-extended-tuni/users';
import type { CoursesApiEndpoints, UsersApiEndpoints } from '@mui-toolpad-extended-tuni/core';

const coursesEndpoints: CoursesApiEndpoints = {
  get: "https://api.example.com/v1/courses",
  getById: "https://api.example.com/v1/courses/:id",
  post: "https://api.example.com/v1/courses",
  put: "https://api.example.com/v1/courses/:id",
  delete: "https://api.example.com/v1/courses/:id",
};

const usersEndpoints: UsersApiEndpoints = {
  getCurrent: "https://api.example.com/v1/users/me",
  get: "https://api.example.com/v1/users",
  post: "https://api.example.com/v1/users",
  put: "https://api.example.com/v1/users/:id",
  delete: "https://api.example.com/v1/users/:id",
  logout: "https://api.example.com/v1/auth/logout",
};

<ToolpadProvider>
  <Microservices>
    <CourseMicroservice apiEndpoints={coursesEndpoints}>
      {/* Your course microservices */}
    </CourseMicroservice>
    <UserMicroservice apiEndpoints={usersEndpoints} />
  </Microservices>
</ToolpadProvider>
```

### URL Format Guidelines

You can use either:

1. **Full URLs**: `"https://api.example.com/v1/courses"`
   - Use when your API is on a different domain
   - Supports both HTTP and HTTPS

2. **Relative Paths**: `"api/courses/"` or `"/api/courses/"`
   - Use when your API is on the same domain
   - Relative paths are resolved against the base URL (defaults to `/`)

### Placeholder Support

Endpoints can include placeholders that are replaced at runtime:

- `:id` - Replaced with the actual resource ID
- `:courseId` - Replaced with course ID
- `:encodedUrl` - Replaced with base64-encoded URL (for courses)

**Example**:
```tsx
<CourseMicroservice apiEndpoints={{
  getById: "api/courses/:id",  // :id will be replaced with actual course ID
  put: "api/courses/:id/",     // Same placeholder support
}}>
  {/* Your course microservices */}
</CourseMicroservice>
```

### Default Endpoints

If no `apiEndpoints` prop is provided, each microservice uses its default endpoints. See each microservice's README for their default endpoint values.

### Partial Configuration

You can configure only the endpoints you need to customize. Unspecified endpoints will use defaults:

```tsx
<CourseMicroservice apiEndpoints={{
  get: "https://custom-api.com/courses",  // Only override GET
  // Other endpoints use defaults
}}>
  {/* Your course microservices */}
</CourseMicroservice>
```

### Accessing Configuration

Each microservice provides its own hook for accessing configuration. No need to know service keys:

```tsx
import { useCoursesApiConfig } from '@mui-toolpad-extended-tuni/courses';
import { useUsersApiConfig } from '@mui-toolpad-extended-tuni/users';

function MyComponent() {
  const coursesConfig = useCoursesApiConfig();
  const usersConfig = useUsersApiConfig();
  const coursesEndpoint = coursesConfig?.get; // "api/courses/" or custom value
  const usersEndpoint = usersConfig?.getCurrent; // "api/users/current/" or custom value
}
```

Each microservice package exports its own hook - developers never need to know internal service keys!

## Features

### ToolpadProvider
Main provider component that sets up authentication, navigation, theme, and other platform features.

### Components
- **Microservices**: Main microservice container component
- **Home**: Default home page component
- **Dialogs**: Dialog system (DialogOpener, FormDialog, ExtendedDialog)
- **Notifications**: Notification system
- **Editable Components**: Form components (EditableText, EditableSwitch, etc.)
- **ErrorBoundary**: Error boundary component
- **ThemeToggle**: Theme switching component

### Stores & Hooks
- Navigation stores and hooks
- User management hooks (from core)
- Dialog store
- Platform store
- Theme store
- Toolbar store

### Utilities
- Axios configuration
- Theme utilities
- Cookie utilities (from core)
- Case conversion utilities (from core)
- Date parsing utilities (from core)

## Migration from mui-toolpad-extended-tuni

If you're migrating from the deprecated `mui-toolpad-extended-tuni` package:

1. Update your `package.json`:
   ```json
   {
     "dependencies": {
       "@mui-toolpad-extended-tuni/main": "^3.4.0"
     }
   }
   ```

2. Update all imports:
   ```typescript
   // Old (deprecated)
   import { ToolpadProvider } from 'mui-toolpad-extended-tuni';
   
   // New
   import { ToolpadProvider } from '@mui-toolpad-extended-tuni/main';
   ```

## License

MIT
