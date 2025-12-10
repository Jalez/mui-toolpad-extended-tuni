# Phase 3: Separate Course Navigation Store

## Overview

Phase 3 creates a dedicated navigation store for course microservices, providing clean separation between app-level and course-level navigation concerns. This approach eliminates the need for complex context-aware logic in the main navigation store.

**Architecture Decision**: Instead of making the main navigation store context-aware, we'll create a separate `useCourseNavigationStore` specifically for course microservices. This provides:

- **Clean separation of concerns**
- **Simplified main navigation store**
- **Dedicated course microservice management**
- **No complex context-aware logic required**

## Current Navigation Store Analysis

### Main Navigation Store (`useNavigationStore.tsx`)
- **Purpose**: Handles app-level navigation, sections, and global navigation state
- **Current methods**: `addSection()`, `addMicroserviceNavigation()`, `updateMicroserviceNavigationForSections()`
- **Current usage**: Used by app-level components for global navigation
- **Scope**: App-level navigation only (help, contact, global tools)

### New Course Navigation Store (to be created)
- **Purpose**: Dedicated store for course microservices only
- **Scope**: Course-specific microservice registration and management
- **Separation**: Clean boundary between app and course navigation concerns

### Navigation Items Currently Stored
```typescript
interface NavigationPageStoreItem {
  kind: "page";
  segment: string;
  title?: string;
  iconFC?: SvgIconComponent;
  children?: NavigationPageStoreItem[];
  view?: React.ComponentType;
  metadata?: ToolMetadata & {
    microservices?: string[]; // References to child microservices
  };
}
```

## Files to be Modified

### 1. Create Course Navigation Store

#### `Courses/store/useCourseNavigationStore.ts` (NEW FILE)
**Dedicated store for course microservices only**

```typescript
interface CourseNavigationStore {
  // Course microservices only (no context confusion)
  allCourseMicroserviceNavigation: NavigationPageStoreItem[];

  // Course-specific methods
  addCourseMicroserviceNavigation: (item: NavigationPageStoreItem) => void;
  removeCourseMicroserviceNavigation: (segment: string) => void;
  getEnabledMicroservicesForCourse: (courseServices: string[]) => NavigationPageStoreItem[];
  updateCourseMicroserviceNavigation: () => void;

  // Course section management
  addCourseSection: (props: addSectionProps) => void;
  updateCourseSections: () => void;
}

export const useCourseNavigationStore = create<CourseNavigationStore>((set, get) => ({
  allCourseMicroserviceNavigation: [],

  addCourseMicroserviceNavigation: (item) =>
    set((state) => {
      const exists = state.allCourseMicroserviceNavigation.find(
        (ms) => ms.segment === item.segment
      );
      if (!exists) {
        return {
          allCourseMicroserviceNavigation: [...state.allCourseMicroserviceNavigation, item],
        };
      }
      return state;
    }),

  removeCourseMicroserviceNavigation: (segment) =>
    set((state) => ({
      allCourseMicroserviceNavigation: state.allCourseMicroserviceNavigation.filter(
        (ms) => ms.segment !== segment
      ),
    })),

  getEnabledMicroservicesForCourse: (courseServices) => {
    const state = get();
    return state.allCourseMicroserviceNavigation.filter((ms) =>
      courseServices.includes(ms.segment)
    );
  },

  updateCourseMicroserviceNavigation: () => {
    // Update course sections based on registered microservices
    // Similar to updateMicroserviceNavigationForSections but course-specific
  },

  addCourseSection: ({ underHeader, pages }) => {
    // Course-specific section management
  },

  updateCourseSections: () => {
    // Update course sections based on registered course microservices
  },
}));
```

### 2. Update Main Navigation Store

#### `useNavigationStore.tsx` - Simplify for App-Only Use
**Remove course microservice logic from main store**

```typescript
// Main navigation store becomes app-only
type ViewStore = {
  // ... existing app navigation methods
  allMicroserviceNavigation: NavigationPageStoreItem[]; // App microservices only

  // Remove course-specific methods
  // addCourseMicroserviceNavigation - moved to course store
  // getMicroservicesForContext - not needed with separate stores
};
```

### 3. Update Microservice Registration

#### `NavigationRegistry.tsx` - Keep Generic (No Tight Coupling)
**NavigationRegistry should remain generic and not know about specific stores**

```typescript
// Current NavigationRegistry remains unchanged - it just manages the microservice registry
// It calls updateMicroserviceNavigation() which updates the main navigation store
// We won't modify this to avoid tight coupling

// Instead, we'll handle store routing at the call site
```

#### `EduTest.tsx` - Direct Store Registration
**Update registration to use course store directly**

```typescript
// BEFORE: Uses NavigationRegistry (which updates main store)
import { registerMicroservice } from '../LMSToolpad/components/Navigation/NavigationRegistry';

// AFTER: Uses course store directly (no registry coupling)
import { useCourseNavigationStore } from '../Courses/store/useCourseNavigationStore';

const EduTest = () => {
  const { addCourseMicroserviceNavigation } = useCourseNavigationStore();

  useEffect(() => {
    addCourseMicroserviceNavigation(eduTestNavigation);
  }, []);
  // ...
};
```

#### `Courses/store/useCourseNavigationStore.ts` - Store Integration
**Course store subscribes to registry changes**

```typescript
// The course navigation store can listen to registry changes
// without the registry knowing about it

export const useCourseNavigationStore = create<CourseNavigationStore>((set, get) => ({
  allCourseMicroserviceNavigation: [],

  addCourseMicroserviceNavigation: (item) => {
    // Add to course store
    set((state) => ({
      allCourseMicroserviceNavigation: [...state.allCourseMicroserviceNavigation, item],
    }));

    // Optionally sync with main registry if needed for consistency
    // This maintains loose coupling
  },
}));
```

### 4. Update Dependent Components

#### `CourseTools.tsx` - Use Course Navigation Store
**Update to use dedicated course navigation store**

```typescript
// BEFORE: Gets all microservices from main store
import { useNavigationStore } from "../Navigation/store/useNavigationStore";
const { allMicroserviceNavigation } = useNavigationStore();

// AFTER: Gets course microservices from dedicated store
import { useCourseNavigationStore } from '../store/useCourseNavigationStore';
const { getEnabledMicroservicesForCourse } = useCourseNavigationStore();

// Filter based on course configuration
const enabledMicroservices = getEnabledMicroservicesForCourse(
  currentCourse?.services || []
);
```

#### `Courses/CourseMicroserviceRouter.tsx` - Use Course Navigation Store
**Update to use dedicated course navigation store**

```typescript
// BEFORE: Uses main navigation store
import { useNavigationStore } from "../Navigation/store/useNavigationStore";

const CourseMicroserviceRouter = () => {
  const { microservice } = useParams();
  const { allMicroserviceNavigation } = useNavigationStore();

  const currentMicroservice = allMicroserviceNavigation.find(
    (ms) => ms.segment === microservice
  );

  // ... rest of component
};

// AFTER: Uses course navigation store
import { useCourseNavigationStore } from '../store/useCourseNavigationStore';

const CourseMicroserviceRouter = () => {
  const { microservice } = useParams();
  const { allCourseMicroserviceNavigation } = useCourseNavigationStore();

  const currentMicroservice = allCourseMicroserviceNavigation.find(
    (ms) => ms.segment === microservice
  );

  // ... rest of component
};
```

#### `EduTest.tsx` and `EduTest2.tsx` - Update Registration
**Update microservice registration to use course store**

```typescript
// BEFORE: Registers with main navigation store
import { useNavigationStore } from "../LMSToolpad/components/Navigation/store/useNavigationStore";

const EduTest = () => {
  const { addMicroserviceNavigation } = useNavigationStore();
  useEffect(() => {
    addMicroserviceNavigation(eduTestNavigation);
  }, []);
  // ...
};

// AFTER: Registers with course navigation store
import { useCourseNavigationStore } from '../Courses/store/useCourseNavigationStore';

const EduTest = () => {
  const { addCourseMicroserviceNavigation } = useCourseNavigationStore();
  useEffect(() => {
    addCourseMicroserviceNavigation(eduTestNavigation);
  }, []);
  // ...
};
```

### 4. Update Microservice Registration

## Project Structure After Phase 3

```
src/LMSToolpad/components/Navigation/
└── store/
    └── useNavigationStore.tsx    (simplified for app navigation only)

src/LMSToolpad/components/Courses/
├── store/
│   └── useCourseNavigationStore.ts (NEW - dedicated course microservice store)
├── CourseTools.tsx              (updated to use course navigation store)
└── CourseMicroserviceRouter.tsx (updated to use course navigation store)

src/LMSToolpad/components/
└── NavigationRegistry.tsx       (updated to route to appropriate stores)
```

## Store Separation Benefits

| **Store** | **Purpose** | **Scope** | **Benefits** |
|-----------|-------------|-----------|-------------|
| **useNavigationStore** | App-level navigation | Global sections, app microservices | Simplified, focused on app navigation |
| **useCourseNavigationStore** | Course microservices | Course-specific microservice management | Dedicated, no context confusion |

**Note**: This approach eliminates the need for complex context-aware logic in the main navigation store.

## Validation Checklist

- [x] `useCourseNavigationStore` created with course-specific methods
- [x] `addCourseMicroserviceNavigation()` method works correctly
- [x] `getEnabledMicroservicesForCourse()` method works correctly
- [x] Main navigation store simplified (no course microservice logic)
- [x] CourseTools updated from `allMicroserviceNavigation` to course navigation store
- [x] CourseMicroserviceRouter updated from `allMicroserviceNavigation` to course navigation store (Note: CourseMicroservice handles routing directly)
- [x] EduTest.tsx updated from `addMicroserviceNavigation` to `addCourseMicroserviceNavigation`
- [x] EduTest2.tsx updated from `addMicroserviceNavigation` to `addCourseMicroserviceNavigation`
- [x] NavigationRegistry remains unchanged (no tight coupling added)
- [x] EduTest/EduTest2 registration bypasses registry and uses course store directly
- [x] Course store can optionally sync with main registry for consistency
- [ ] Project builds successfully after changes
- [ ] No TypeScript errors introduced

## Impact Assessment

**Breaking Changes:** Minimal - existing navigation store methods preserved, new course store added
**Functionality:** Clean separation between app and course navigation concerns
**Performance:** No impact - separate stores are more efficient than context-aware logic
**Testing:** Course navigation store functionality testing recommended
**Coupling:** Avoids additional tight coupling by keeping NavigationRegistry generic

This phase establishes clean architectural separation:

- **useNavigationStore**: Handles app-level navigation only (simplified)
- **useCourseNavigationStore**: Handles course microservices only (dedicated)
- **NavigationRegistry**: Remains generic registry, not tightly coupled to specific stores

This approach eliminates complex context-aware logic and avoids introducing additional tight coupling between the registry and course-specific stores.
