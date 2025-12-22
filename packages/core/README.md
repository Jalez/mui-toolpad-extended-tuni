# @mui-toolpad-extended-tuni/core

Core shared package for MUI Toolpad Extended TUNI microservices.

This package contains shared dependencies used by all microservices in the MUI Toolpad Extended TUNI ecosystem.

## Installation

```bash
npm install @mui-toolpad-extended-tuni/core
```

**Note**: This package is typically installed as a peer dependency of `@mui-toolpad-extended-tuni/main` or other extension packages. You usually don't need to install it directly unless you're using it standalone.

## Required Peer Dependencies

This package requires the following peer dependencies to be installed:

### React & UI Framework
- `@emotion/react`: ^11.0.0
- `@emotion/styled`: ^11.0.0
- `@mui/icons-material`: ^7.0.0
- `@mui/material`: ^7.0.0
- `@mui/x-date-pickers`: ^7.0.0
- `@toolpad/core`: ^0.16.0
- `react`: ^19.0.0
- `react-dom`: ^19.0.0
- `react-router-dom`: ^7.0.0
- `zustand`: ^4.5.0

### Installation Example

```bash
npm install @mui-toolpad-extended-tuni/core \
  @emotion/react @emotion/styled \
  @mui/icons-material @mui/material @mui/x-date-pickers \
  @toolpad/core \
  react react-dom react-router-dom zustand
```

## Features

### Events
- **EventBus**: Global event bus for application-wide communication
- **UserBus**: User-specific event bus with hooks for user management
- Hooks: `useCurrentUser`, `useUserActions`, `useUserPreferences`

### Navigation
- **NavigationRegistry**: Microservice registration and routing
- Navigation stores and hooks for managing application navigation
- Hooks: `useMicroserviceRoutes`, `useMicroserviceNavigation`, `useNavigationSectionManager`, `useSyncNavigationFilters`

### Common UI Components
- GridLayout components and utilities
- Panel system (Expandable, Movable, Resizable, Scrollable)
- Scroller component
- LoadingScreen, CenteredHeading, CollapsingButtons, CompoundPanel
- SpeedDialButton

### Dialogs
- DialogOpener, FormDialog, ExtendedDialog
- Dialog registry system

### Notifications
- Notification component and store
- Integration with notistack

### Utilities
- Case conversion utilities
- Date parsing utilities
- Cookie utilities
- API prefix utilities
- String utilities (slugify)

## Usage

```typescript
import {
  // Events
  EventBus,
  eventBus,
  userBus,
  useCurrentUser,
  
  // Navigation
  registerMicroservice,
  useMicroserviceNavigation,
  useNavigationStore,
  
  // Components
  GridItemProvider,
  ResponsiveGridLayout,
  Panel,
  
  // Dialogs
  DialogOpener,
  FormDialog,
  
  // Notifications
  Notifications,
  useNotificationStore,
  
  // Utils
  parseDate,
  slugify,
  getCookie,
} from '@mui-toolpad-extended-tuni/core';
```

## License

MIT
