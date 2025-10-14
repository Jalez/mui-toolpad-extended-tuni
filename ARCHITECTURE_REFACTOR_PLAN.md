# Architecture Refactor Plan: Microservices and Routing Separation

## Executive Summary

The current architecture has naming confusion and tight coupling between course-specific logic and general application routing. This document outlines a comprehensive plan to separate concerns, clarify terminology, and establish a more modular architecture.

## Current Architecture Issues

### 1. Naming Confusion
- **Issue**: EduTest and EduTest2 are labeled as "Microservices" in App.tsx, but they're actually course-level microservices
- **Issue**: `allMicroserviceNavigation` contains only course microservices, not general app microservices
- **Issue**: Widgets are actually app-level microservices but use different terminology
- **Issue**: Microservices.tsx handles both application routing and course microservices

### 2. Tight Coupling
- **Issue**: Microservices.tsx is tightly coupled with course-specific routing logic
- **Issue**: Course navigation, tools, and general app routing are mixed together
- **Issue**: No clear separation between course microservices and app-level microservices

### 3. Route Structure Problems
- **Issue**: Course routes are at root level (`/:code/:instance`) instead of under `/courses`
- **Issue**: Navigation logic needs changes to support proper route hierarchy

## Proposed Architecture

### 1. Clear Terminology
- **Microservices**: All application services (both app-level and course-level)
- **App Microservices**: Global application services that appear in main navigation
- **Course Microservices**: Services that run within a course context (EduTest, EduTest2, etc.)
- **LMSRoutes**: Handles top-level routing and layout
- **Courses**: A microservice that contains course-specific routing and microservices

### 2. Component Structure
```
App.tsx
├── LMSRoutes
    ├── App Microservices (global services)
    └── Courses (course microservice)
        ├── EduTest
        └── EduTest2
```

### 3. File Organization
```
src/LMSToolpad/components/
├── Microservices/           (renamed to LMSRoutes)
├── Courses/                 (contains ALL course logic)
│   ├── CourseRouter.tsx     (handles /courses/* routing)
│   ├── CourseInstanceRouter.tsx
│   ├── CourseMicroservices/ (EduTest, EduTest2, etc.)
│   ├── CourseTools.tsx
│   └── ...
└── ...
```

### 4. Route Structure
```
/                     → Home
/help                 → Help
/contact              → Contact
/courses              → CourseRouter (course microservice)
/courses/:code        → CourseInstanceSelector
/courses/:code/:instance → CourseTools
/courses/:code/:instance/:microservice → Course Microservice
```

**Note**: `/courses` prefix is specifically for course-routes with `:code` parameter. This ensures all course-related functionality is properly namespaced.

## Implementation Plan

### Phase 1: File Organization & Infrastructure Setup

1. **Restructure directories for modularity:**
   - Move ALL course-specific logic into `src/LMSToolpad/components/Courses/`
   - Create `CourseMicroservices/` subfolder within Courses
   - Move EduTest and EduTest2 into `Courses/CourseMicroservices/`

2. **Create new routing components:**
   - `LMSRoutes.tsx` (renamed from Microservices.tsx)
   - `Courses/CourseRouter.tsx` (handles /courses/* routing)
   - `Courses/CourseInstanceRouter.tsx` (handles course instances)

3. **Create service registries:**
   - `Courses/CourseMicroserviceRegistry.tsx` (within Courses folder)
   - Update existing widget registry to be called AppMicroserviceRegistry

4. **Update store structure:**
   - Separate course microservices from app microservices in navigation store
   - Move course-related store logic into Courses folder

### Phase 2: Component Migration
1. **Rename and refactor Microservices.tsx:**
   - Remove course-specific routing logic
   - Keep only application-level routing
   - Rename to `LMSRoutes.tsx`

2. **Extract course routing into Courses folder:**
   - Create `Courses/CourseRouter.tsx` for `/courses/*` routes
   - Create `Courses/CourseInstanceRouter.tsx` for course instance routing
   - Move all course-related components into Courses folder

3. **Create Courses microservice:**
   - Create `Courses/index.tsx` as the main course microservice component
   - Move EduTest and EduTest2 into `Courses/CourseMicroservices/`
   - Update their registration to use course microservice registry

### Phase 3: Navigation Updates
1. **Update navigation store:**
   - Separate `allCourseMicroserviceNavigation` from `allAppMicroserviceNavigation`
   - Update `updateMicroserviceNavigationForSections` to handle course context

2. **Update route generation:**
   - Modify `useWidgetRoutes` for app microservices
   - Create `useCourseMicroserviceRoutes` for course context

3. **Update App.tsx:**
   - Replace Microservices with LMSRoutes
   - Add CourseRouter as separate route
   - Clarify component purposes

### Phase 4: Testing and Validation
1. **Update tests:** Verify all routes work correctly
2. **Update documentation:** Reflect new architecture
3. **Validate navigation:** Ensure breadcrumbs and back navigation work

## Detailed Component Specifications

### LMSRoutes (formerly Microservices)
**Responsibilities:**
- Handle top-level application routing
- Manage app microservices
- Provide layout for all pages
- Handle static routes (help, contact, home)
- Contain the Courses microservice

**Props:**
- `children`: App microservices and Courses component

**Routes:**
- `/` → Home
- `/help` → Help
- `/contact` → Contact
- `/courses/*` → Courses microservice (nested)
- Dynamic app microservice routes

### Courses (new microservice in Courses folder)
**Responsibilities:**
- Act as a microservice container for all course-related functionality
- Handle course-specific routing under `/courses`
- Manage course navigation state
- Contain EduTest, EduTest2, and other course microservices

**Props:**
- `children`: Course microservice components (EduTest, EduTest2, etc.)

**Routes (handled internally):**
- `/courses` → CourseSelector
- `/courses/:code` → CourseInstanceSelector
- `/courses/:code/:instance` → CourseTools
- `/courses/:code/:instance/:microservice/*` → Course microservices

### CourseRouter (within Courses folder)
**Responsibilities:**
- Handle course routing coordination
- Delegate to appropriate sub-components based on route

**Routes:**
- Index (`/courses`) → CourseSelector
- `/:code` → CourseInstanceSelector
- `/:code/:instance/*` → CourseInstanceRouter

## Store Updates

### Navigation Store Changes
```typescript
interface ViewStore {
  // Existing
  navigation: NavigationStoreItem[];
  sections: Record<string, NavigationSection>;
  sectionOrder: string[];
  visibleSections: Record<string, boolean>;

  // New separation
  allCourseMicroserviceNavigation: NavigationPageStoreItem[];
  allAppMicroserviceNavigation: NavigationPageStoreItem[]; // widgets

  // Updated methods
  addCourseMicroserviceNavigation: (item: NavigationPageStoreItem) => void;
  addAppMicroserviceNavigation: (item: NavigationPageStoreItem) => void;
  updateCourseMicroserviceNavigationForSections: () => void;
}
```

### New Course Microservice Registry
```typescript
interface CourseMicroserviceRegistry {
  registerCourseMicroservice: (id: string, config: CourseMicroserviceConfig) => void;
  unregisterCourseMicroservice: (id: string) => void;
  getCourseMicroservices: () => Map<string, CourseMicroserviceConfig>;
}
```

## Migration Steps

### Step 1: Create New Components
1. Create `LMSRoutes.tsx` as copy of `Microservices.tsx`
2. Create `CourseRouter.tsx` with basic structure
3. Create `CourseInstanceRouter.tsx` with basic structure

### Step 2: Extract Course Logic
1. Move course-related routes from `LMSRoutes` to `CourseRouter`
2. Move course microservice logic to `CourseInstanceRouter`
3. Update imports and dependencies

### Step 3: Update Service Registration
1. Update EduTest/EduTest2 to use course microservice registration
2. Update navigation store to handle separated microservices
3. Update CourseTools to use course microservice registry

### Step 4: Update App.tsx
```typescript
const App = () => {
  return (
    <BrowserRouter>
      <LMSProvider>
        <LMSRoutes>
          {/* App-level microservices */}
          <SomeAppMicroservice />
          <AnotherAppMicroservice />
          {/* Courses microservice containing course-specific logic */}
          <Courses>
            <EduTest />
            <EduTest2 />
          </Courses>
        </LMSRoutes>
      </LMSProvider>
    </BrowserRouter>
  );
};
```

### Step 5: Update Route Structure
1. Change internal navigation to use `/courses` prefix
2. Update breadcrumb generation
3. Update back navigation logic

## Risk Assessment

### High Risk
- Route changes may break existing navigation
- Store separation may cause state management issues
- Component coupling may be harder to separate than expected

### Medium Risk
- Naming changes may cause confusion during transition
- Widget system integration with new routing
- Course microservice registration API changes

### Low Risk
- Component renaming (minimal breaking changes)
- Registry pattern implementation
- Static route handling

## Success Criteria

1. **Modular Course Logic:** All course-specific logic is contained within the `Courses` folder
2. **Clear Component Hierarchy:** LMSRoutes contains app microservices and Courses microservice
3. **Proper Route Namespacing:** `/courses` prefix exclusively used for `:code` course routes
4. **Unified Terminology:** All services called "microservices" regardless of scope
5. **Clean App Structure:** App.tsx clearly shows LMSRoutes → [App Microservices, Courses → [EduTest, EduTest2]]
6. **Proper Routing:** All routes work under new structure with no breaking changes
7. **Improved Maintainability:** Components have single responsibilities and clear boundaries

## Timeline Estimate

- **Phase 1:** 2-3 days (infrastructure)
- **Phase 2:** 3-4 days (component migration)
- **Phase 3:** 2-3 days (navigation updates)
- **Phase 4:** 1-2 days (testing and validation)

Total: 8-12 days for complete implementation.

## Alternative Approaches Considered

### Option 1: Keep Current Structure with Naming Fixes
- Pros: Less disruptive, faster implementation
- Cons: Doesn't solve coupling issues, naming confusion persists

### Option 2: Full Microservice Architecture Overhaul
- Pros: More scalable long-term architecture
- Cons: Much more complex, longer timeline, higher risk

### Option 3: Gradual Migration (Chosen Approach)
- Pros: Balances risk and improvement, allows incremental changes
- Cons: Temporary complexity during migration

## Conclusion

This refactor addresses the core architectural issues by:

1. **Ensuring Modularity**: All course-specific logic is contained within the `Courses` folder
2. **Clear Component Hierarchy**: LMSRoutes contains both app microservices and the Courses microservice
3. **Proper Route Namespacing**: `/courses` prefix is exclusively for course routes with `:code` parameter
4. **Unified Microservice Concept**: All services are called "microservices" regardless of scope
5. **Clean App Structure**: App.tsx clearly shows the relationship between LMSRoutes, app microservices, and the Courses microservice

The phased approach minimizes risk while delivering substantial architectural improvements and better separation of concerns.
