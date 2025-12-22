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
- **`@mui-toolpad-extended-tuni/core`**: ^3.1.0 - **MUST be installed separately**

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
       "@mui-toolpad-extended-tuni/main": "^3.3.0"
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
