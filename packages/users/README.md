# @mui-toolpad-extended-tuni/users

Users microservice extension for MUI Toolpad Extended TUNI. This package provides user management functionality, user authentication, user settings, and user-related components.

## Installation

```bash
npm install @mui-toolpad-extended-tuni/users @mui-toolpad-extended-tuni/main @mui-toolpad-extended-tuni/core
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
- `@emotion/react@^11.0.0`
- `@emotion/styled@^11.0.0`
- `axios@^1.7.0`
- `zustand@^4.5.0`

### Installation Example

```bash
npm install @mui-toolpad-extended-tuni/users @mui-toolpad-extended-tuni/main @mui-toolpad-extended-tuni/core \
  react react-dom react-router-dom \
  @mui/material @mui/icons-material \
  @emotion/react @emotion/styled \
  axios zustand
```

## API Configuration

This package uses configurable API endpoints. Each microservice accepts its own `apiEndpoints` prop, allowing you to configure endpoints independently for only the services you use.

### Default Endpoints

If no `apiEndpoints` prop is provided, the package uses these default endpoints:

- `getCurrent: "api/users/current/"` - GET current authenticated user
- `get: "api/users/"` - GET list of users
- `post: "api/users/"` - POST create new user
- `put: "api/users/:id/"` - PUT update user (use `:id` placeholder)
- `delete: "api/users/:id/"` - DELETE user (use `:id` placeholder)
- `logout: "/auth/lti_logout/"` - POST logout user

### Customizing Endpoints

Configure endpoints directly on the `UserMicroservice` component:

```tsx
import { UserMicroservice } from '@mui-toolpad-extended-tuni/users';
import type { UsersApiEndpoints } from '@mui-toolpad-extended-tuni/users';

const usersEndpoints: UsersApiEndpoints = {
  getCurrent: "https://api.example.com/v1/users/me",
  get: "https://api.example.com/v1/users",
  post: "https://api.example.com/v1/users",
  put: "https://api.example.com/v1/users/:id",
  delete: "https://api.example.com/v1/users/:id",
  logout: "https://api.example.com/v1/auth/logout",
};

<UserMicroservice apiEndpoints={usersEndpoints} />
```

**Note**: You can use either full URLs or relative paths. Placeholders like `:id` will be replaced with actual values at runtime.

**Partial Configuration**: You can configure only the endpoints you need to customize. Unspecified endpoints will use defaults:

```tsx
<UserMicroservice apiEndpoints={{
  getCurrent: "api/v2/users/me",  // Only override getCurrent endpoint
  // Other endpoints use defaults
}} />
```

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

## API Endpoints

This package makes the following API calls. All endpoints are configurable via `apiConfig`.

### GET `/api/users/current/` (or configured `getCurrent` endpoint)

Retrieves the currently authenticated user.

**Request**: No body required (uses session/cookies for authentication)

**Response**: `200 OK`
```json
{
  "id": "user-123",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "gender": "male",
  "image": {
    "large": "https://example.com/images/user-large.jpg",
    "medium": "https://example.com/images/user-medium.jpg",
    "thumbnail": "https://example.com/images/user-thumbnail.jpg"
  },
  "department": "Computer Science",
  "platform_roles": ["user", "creator"],
  "privacy_settings": {
    "allow_analytics": true,
    "allow_personalization": true,
    "allow_communications": true,
    "allow_third_party_sharing": false
  },
  "gdpr_consent": {
    "accepted": true,
    "accepted_date": "2024-01-15T10:00:00Z",
    "last_updated": "2024-01-15T10:00:00Z"
  },
  "data_retention": {
    "delete_account_after_inactivity": 365,
    "delete_data_after_account_deletion": 30
  },
  "preferences": {
    "navigation_type": "direct",
    "visible_course_lists": {
      "is_student": true,
      "is_student_old": true,
      "is_teacher": false,
      "is_teacher_old": false,
      "available": true
    },
    "last_visited_courses": ["COMP.CS.100:compcs100-fall-2024"],
    "visible_navigation": ["Courses", "Calendar"]
  }
}
```

**Response Type**: `UserData`

### GET `/api/users/` (or configured `get` endpoint)

Retrieves a list of users. Optionally filtered by course.

**Request Parameters** (query string):
- `course_id` (optional) - Filter users by course ID

**Example**: `GET /api/users/?course_id=course-123`

**Response**: `200 OK`
```json
[
  {
    "id": "user-123",
    "name": "John Doe",
    "email": "john.doe@example.com",
    // ... same structure as getCurrent
  },
  {
    "id": "user-456",
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    // ...
  }
]
```

**Response Type**: `UserData[]`

### POST `/api/users/` (or configured `post` endpoint)

Creates a new user.

**Request Body**: `Partial<UserData>` (snake_case)
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "gender": "male",
  "department": "Computer Science",
  "platform_roles": ["user"],
  "privacy_settings": {
    "allow_analytics": true,
    "allow_personalization": true,
    "allow_communications": true,
    "allow_third_party_sharing": false
  },
  "gdpr_consent": {
    "accepted": true,
    "last_updated": "2024-01-15T10:00:00Z"
  },
  "data_retention": {
    "delete_account_after_inactivity": 365,
    "delete_data_after_account_deletion": 30
  },
  "preferences": {
    "navigation_type": "direct",
    "visible_course_lists": {
      "is_student": true,
      "is_student_old": true,
      "is_teacher": false,
      "is_teacher_old": false,
      "available": true
    },
    "last_visited_courses": [],
    "visible_navigation": ["Courses"]
  }
}
```

**Response**: `201 Created`
```json
{
  "id": "user-123",
  "name": "John Doe",
  // ... full UserData object with generated ID
}
```

**Response Type**: `UserData`

**Note**: The request body should be in snake_case format. The package automatically converts from camelCase.

### PUT `/api/users/:id/` (or configured `put` endpoint)

Updates an existing user.

**Request Parameters**:
- `:id` (path parameter) - User ID

**Request Body**: `UserData` (snake_case, must include `id`)
```json
{
  "id": "user-123",
  "name": "Updated Name",
  "email": "updated.email@example.com",
  // ... all UserData fields
}
```

**Response**: `200 OK`
```json
{
  "id": "user-123",
  "name": "Updated Name",
  // ... updated UserData object
}
```

**Response Type**: `UserData`

### DELETE `/api/users/:id/` (or configured `delete` endpoint)

Deletes a user.

**Request Parameters**:
- `:id` (path parameter) - User ID

**Response**: `200 OK` or `204 No Content`

**Response Type**: `void`

### POST `/auth/lti_logout/` (or configured `logout` endpoint)

Logs out the current user (LTI logout).

**Request**: No body required

**Response**: `200 OK` or `204 No Content`

**Response Type**: `void`

## Data Types

### UserData

Complete user object returned by API.

```typescript
interface UserData {
  id: userId;                      // Unique user ID (string)
  name: string;                   // User's full name
  email: string;                   // User's email address
  gender?: gender;                // "male" | "female" | "other" (optional)
  image?: {                        // User profile images (optional)
    large: string;                // Large image URL
    medium: string;               // Medium image URL
    thumbnail: string;             // Thumbnail image URL
  };
  department?: string;             // User's department (optional)
  platformRoles: PlatformRole[];  // Array of platform roles
  privacySettings: {               // Privacy preferences
    allowAnalytics: boolean;
    allowPersonalization: boolean;
    allowCommunications: boolean;
    allowThirdPartySharing: boolean;
  };
  gdprConsent: {                   // GDPR consent information
    accepted: boolean;
    acceptedDate?: string;         // ISO date string (optional)
    lastUpdated: string;           // ISO date string
  };
  dataRetention: {                 // Data retention settings
    deleteAccountAfterInactivity?: number;  // Days (optional)
    deleteDataAfterAccountDeletion?: number; // Days (optional)
  };
  preferences: {                    // User preferences
    navigationType: navigationTypes; // "direct" | "instances"
    visibleCourseLists: {
      isStudent: boolean;
      isStudentOld: boolean;
      isTeacher: boolean;
      isTeacherOld: boolean;
      available: boolean;
    };
    lastVisitedCourses: string[];   // Array of "code:instance" strings
    visibleNavigation: string[];    // Array of visible navigation items
  };
}
```

### Type Definitions

```typescript
type userId = string;
type navigationTypes = "direct" | "instances";
type gender = "male" | "female" | "other";
type PlatformRole = "admin" | "developer" | "moderator" | "creator" | "user" | "guest";
```

### Request/Response Format

**Important**: The backend API expects and returns data in **snake_case** format (e.g., `platform_roles`, `privacy_settings`). This package automatically converts between camelCase (used in TypeScript) and snake_case (used in API requests/responses).

**Example conversion**:
- TypeScript: `platformRoles` → API: `platform_roles`
- TypeScript: `privacySettings` → API: `privacy_settings`
- TypeScript: `lastVisitedCourses` → API: `last_visited_courses`

## Exports

### Components
- `UserMicroservice` - Main microservice component
- `UserManager` - User manager component (syncs navigation filters)
- `UserSettings` - User settings form component
- `UserEventPublisher` - Publishes user events to EventBus

### Store
- `useUserStore` - Zustand store for user management

### Network Functions
- `getCurrentUser()` - Fetch current authenticated user
- `getUsers(courseId?: string)` - Fetch list of users (optionally filtered by course)
- `createUser(userData: Partial<UserData>)` - Create new user
- `updateUser(userData: UserData)` - Update existing user
- `deleteUser(userId: string)` - Delete user
- `logoutUser()` - Logout current user

### Hooks
- `useUsersApiConfig()` - Hook to access users API endpoint configuration

### Configuration
- `configureUserBus` - Configures UserBus with store methods (called automatically)

### Types
- `UserData` - Complete user data type
- `UsersApiEndpoints` - API endpoint configuration type
- `PlatformRole` - Platform role type
- `navigationTypes` - Navigation types
- `gender` - Gender type
- `userId` - User ID type

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
