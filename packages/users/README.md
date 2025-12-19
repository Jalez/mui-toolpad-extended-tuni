# @mui-toolpad-extended-tuni/users

Users microservice extension for MUI Toolpad Extended TUNI. This package provides user management functionality, user authentication, user settings, and user-related components.

## Installation

```bash
npm install @mui-toolpad-extended-tuni/users
```

**Note**: This package requires `mui-toolpad-extended-tuni@^3.0.0` as a peer dependency.

## Peer Dependencies

- `mui-toolpad-extended-tuni@^3.0.0`
- `react@^19.0.0`
- `react-dom@^19.0.0`
- `react-router-dom@^7.0.0`
- `@mui/material@^7.0.0`
- `@mui/icons-material@^7.0.0`
- `@emotion/react@^11.0.0`
- `@emotion/styled@^11.0.0`
- `axios@^1.7.0`
- `zustand@^4.5.0`

## Usage

### Basic Setup

The users microservice automatically configures the UserBus when imported:

```tsx
import { BrowserRouter } from 'react-router-dom';
import { ToolpadProvider, Microservices } from 'mui-toolpad-extended-tuni';
import { UserMicroservice } from '@mui-toolpad-extended-tuni/users';

function App() {
  return (
    <BrowserRouter>
      <ToolpadProvider>
        <Microservices>
          <UserMicroservice />
          {/* Other microservices */}
        </Microservices>
      </ToolpadProvider>
    </BrowserRouter>
  );
}
```

### Using User Store

```tsx
import { useUserStore } from '@mui-toolpad-extended-tuni/users';

function MyComponent() {
  const { user, users, getUser, getUsers, updateUser } = useUserStore();
  
  useEffect(() => {
    getUser();
    getUsers();
  }, [getUser, getUsers]);
  
  return (
    <div>
      {user && <div>Welcome, {user.name}</div>}
    </div>
  );
}
```

### User Settings Component

```tsx
import { UserSettings } from '@mui-toolpad-extended-tuni/users';

function SettingsPage() {
  return <UserSettings />;
}
```

### User Manager

```tsx
import { UserManager } from '@mui-toolpad-extended-tuni/users';

function App() {
  return (
    <>
      <UserManager />
      {/* Rest of your app */}
    </>
  );
}
```

## Exports

### Components
- `UserMicroservice` - Main microservice component
- `UserManager` - User manager component (syncs navigation filters)
- `UserSettings` - User settings form component
- `UserEventPublisher` - Publishes user events to EventBus

### Store
- `useUserStore` - Zustand store for user management

### Configuration
- `configureUserBus` - Configures UserBus with store methods (called automatically)

### Types
- `UserData` - User data type (re-exported from main package)
- `PlatformRole` - Platform role type (re-exported from main package)
- `navigationTypes` - Navigation types (re-exported from main package)
- `gender` - Gender type (re-exported from main package)
- `userId` - User ID type (re-exported from main package)

## Features

- User management and CRUD operations
- User authentication and session handling
- User preferences management
- User settings UI
- UserBus integration (automatic configuration)
- User event publishing
- Course user management
- GDPR consent handling
- Data retention settings

## UserBus Integration

This package automatically configures the UserBus from the main package when imported. The UserBus provides a centralized way for other microservices to interact with user data without direct dependencies.

## License

MIT
