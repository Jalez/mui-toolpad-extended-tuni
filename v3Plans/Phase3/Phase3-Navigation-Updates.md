# Phase 3: Navigation Store Context-Aware Updates

## Overview

Phase 3 enhances the navigation store with context-aware methods for better separation between app-level and course-level microservices. This builds on the existing navigation infrastructure while adding context awareness for cleaner microservice management.

**Future Vision**: This phase lays the groundwork for eventually separating the current unified navigation store into two distinct APIs:
- **Routes API**: Handles URL routing and navigation patterns
- **Navigation API**: Handles microservice registration and display logic

Currently, both concerns are mixed in the single `useNavigationStore`. The context-aware enhancements in this phase prepare for this future separation.

## Current Navigation Store Analysis

### Existing Navigation Store (`useNavigationStore.ts`)
- **Current state**: Has `allMicroserviceNavigation` array for all navigation items
- **Current methods**: `addMicroserviceNavigation()`, `updateMicroserviceNavigationForSections()`
- **Current usage**: Used by both app-level components and course components
- **Current limitation**: No context separation between app and course microservices

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

### 1. Enhanced Navigation Store Interface

#### `useNavigationStore.ts` - Interface Updates
**Add context-aware methods to existing ViewStore interface**

```typescript
// BEFORE: Basic microservice navigation
interface ViewStore {
  allMicroserviceNavigation: NavigationPageStoreItem[];
  addMicroserviceNavigation: (item: NavigationPageStoreItem) => void;
  updateMicroserviceNavigationForSections: () => void;
  // ... other existing methods
}

// AFTER: Context-aware navigation
interface ViewStore {
  allMicroserviceNavigation: NavigationPageStoreItem[];

  // Context-aware methods (NEW)
  addAppMicroserviceNavigation: (item: NavigationPageStoreItem) => void;
  addCourseMicroserviceNavigation: (item: NavigationPageStoreItem) => void;
  getMicroservicesForContext: (context: 'app' | 'course') => NavigationPageStoreItem[];
  updateMicroserviceNavigationForSections: (context?: 'app' | 'course') => void;

  // Existing methods (enhanced for context awareness)
  addMicroserviceNavigation: (item: NavigationPageStoreItem) => void; // Now context-aware internally
  // ... other existing methods
}
```

### 2. Implementation of Context-Aware Methods

#### `useNavigationStore.ts` - Context Storage
**Add context tracking to store state**

```typescript
// BEFORE: Single array for all microservices
allMicroserviceNavigation: [],

// AFTER: Context-aware storage
microserviceContexts: {
  app: NavigationPageStoreItem[];
  course: NavigationPageStoreItem[];
},
allMicroserviceNavigation: NavigationPageStoreItem[], // Kept for backward compatibility
```

#### `useNavigationStore.ts` - Context-Aware Registration
**Enhanced addMicroserviceNavigation method**

```typescript
// BEFORE: Simple array append
addMicroserviceNavigation: (item) =>
  set((state) => {
    const exists = state.allMicroserviceNavigation.find(
      (ms) => ms.segment === item.segment
    );
    if (!exists) {
      return {
        allMicroserviceNavigation: [...state.allMicroserviceNavigation, item],
      };
    }
    return state;
  }),

// AFTER: Context-aware registration
addMicroserviceNavigation: (item) =>
  set((state) => {
    // Determine context from metadata or component registration
    const context = item.metadata?.context || 'app';

    const contextArray = state.microserviceContexts[context] || [];
    const exists = contextArray.find((ms) => ms.segment === item.segment);

    if (!exists) {
      const newContexts = {
        ...state.microserviceContexts,
        [context]: [...contextArray, item],
      };

      // Update unified array for backward compatibility
      const allMicroservices = [
        ...newContexts.app,
        ...newContexts.course,
      ];

      return {
        microserviceContexts: newContexts,
        allMicroserviceNavigation: allMicroservices,
      };
    }
    return state;
  }),
```

#### `useNavigationStore.ts` - Context Retrieval Method
**New getMicroservicesForContext method**

```typescript
getMicroservicesForContext: (context: 'app' | 'course') => {
  const state = get();
  return state.microserviceContexts[context] || [];
},
```

#### `useNavigationStore.ts` - Context-Aware Section Updates
**Enhanced updateMicroserviceNavigationForSections method**

```typescript
// BEFORE: Updates all sections without context
updateMicroserviceNavigationForSections: () => { /* updates all */ }

// AFTER: Context-aware section updates
updateMicroserviceNavigationForSections: (context?: 'app' | 'course') => {
  const state = get();
  const contextsToUpdate = context ? [context] : ['app', 'course'];

  // Update only specified contexts or all contexts
  contextsToUpdate.forEach(ctx => {
    const microservices = state.microserviceContexts[ctx] || [];
    // Update sections for this context only
  });
},
```

### 3. Update Dependent Components

#### `CourseTools.tsx` - Context-Aware Usage
**Update to use context-aware methods**

```typescript
// BEFORE: Gets all microservices
const { allMicroserviceNavigation } = useNavigationStore();

// AFTER: Gets only course microservices
const { getMicroservicesForContext } = useNavigationStore();
const courseMicroservices = getMicroservicesForContext('course');

// Filter based on course configuration
const enabledMicroservices = courseMicroservices.filter(ms =>
  currentCourse?.services?.includes(ms.segment)
);
```

#### `Courses/CourseMicroserviceRouter.tsx` - Context Filtering
**Add context filtering for course microservices**

```typescript
const CourseMicroserviceRouter = () => {
  const { microservice } = useParams();
  const { getMicroservicesForContext } = useNavigationStore();

  const courseMicroservices = getMicroservicesForContext('course');
  const currentMicroservice = courseMicroservices.find(
    (ms) => ms.segment === microservice
  );

  // ... rest of component
};
```

### 4. Update Microservice Registration

#### `NavigationRegistry.tsx` - Context-Aware Registration
**Update registerMicroservice to support context**

```typescript
export function registerMicroservice(
  id: string,
  Component: ComponentType<any>,
  options?: {
    context?: 'app' | 'course'; // NEW: Context specification
    // ... other existing options
  }
) {
  const entry: MicroserviceEntry = {
    Component,
    props: options?.props,
    name: options?.name || id,
    description: options?.description,
    category: options?.category,
    iconComponent: options?.iconComponent,
    metadata: {
      ...options?.metadata,
      context: options?.context || 'app', // Default to app context
    },
  };

  useMicroserviceRegistryStoreRaw.getState().registerMicroservice(id, entry);
}
```

## Project Structure After Phase 3

```
src/LMSToolpad/components/Navigation/
└── store/
    └── useNavigationStore.ts    (enhanced with context-aware methods)

src/LMSToolpad/components/Courses/
├── CourseTools.tsx              (updated for context-aware filtering)
└── CourseMicroserviceRouter.tsx (updated for context filtering)

src/LMSToolpad/components/
└── NavigationRegistry.tsx       (updated for context-aware registration)
```

## Navigation Context Separation

| **Context** | **Purpose** | **Storage** | **Usage** |
|-------------|-------------|-------------|-----------|
| **App** | Global application microservices | `microserviceContexts.app` | LMSRoutes, global navigation |
| **Course** | Course-specific microservices | `microserviceContexts.course` | CourseTools, course routing |

## Validation Checklist

- [ ] Context-aware methods added to navigation store
- [ ] `getMicroservicesForContext()` method works correctly
- [ ] `addAppMicroserviceNavigation()` and `addCourseMicroserviceNavigation()` methods work
- [ ] Existing `allMicroserviceNavigation` preserved for backward compatibility
- [ ] CourseTools updated to use context-aware filtering
- [ ] Microservice registration supports context specification
- [ ] Project builds successfully after changes
- [ ] No TypeScript errors introduced

## Impact Assessment

**Breaking Changes:** None - all existing methods preserved, new methods added
**Functionality:** Enhanced with context awareness while maintaining backward compatibility
**Performance:** Minimal impact - additional array operations for context separation
**Testing:** Context filtering and method functionality testing recommended

This phase adds context awareness to the navigation system while maintaining full backward compatibility with existing code.

**Note**: The context-aware enhancements prepare the foundation for a future architectural improvement where the current unified `useNavigationStore` could be split into separate:
- **Routes Store**: Managing URL routing and navigation patterns
- **Microservice Registry Store**: Managing component registration and display logic

This separation would provide cleaner separation of concerns but is beyond the scope of the current refactor phases.
