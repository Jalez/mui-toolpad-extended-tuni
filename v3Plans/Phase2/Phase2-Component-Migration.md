# Phase 2: Component Migration & Course Logic Extraction

## Overview

Phase 2 focuses on migrating components and extracting course-specific logic from the main application routing. This involves:

1. **Extract course routing** from `Microservices.tsx` to dedicated course components
2. **Enhance existing Courses folder** components for better microservice management
3. **Create CourseRouter** for organized course routing (preserves existing `:code` path structure)
4. **Update component responsibilities** for clearer separation of concerns

## Current State Analysis

### Existing Components
- **Microservices.tsx**: Currently handles both app-level and course-level routing (lines 86-155 contain course logic)
- **Courses/CourseTools.tsx**: Already exists and manages course microservices
- **Courses/Navigation/**: Already contains course navigation components
- **Courses/store/useCourseStore.ts**: Already manages course state

### Course Routing Currently in Microservices.tsx (Lines 86-155)
```typescript
<Route path=":code" element={<CourseCodeLoader />}>
  <Route index element={<CourseInstanceSelector />} />
  <Route path=":instance" element={<CourseInstanceLoader />}>
    <Route
      index
      element={
        <CourseTools microservices={allMicroserviceNavigation} />
      }
    />
    {allMicroserviceNavigation.map((nav) => (
      <Route key={nav.segment} path={nav.segment}>
        {/* Complex nested routing for microservices */}
      </Route>
    ))}
  </Route>
</Route>
```

## Files to be Modified

### 1. Create New Components

#### `Courses/CourseRouter.tsx`
**Purpose**: Main router for all course-related routes (handles routes relative to `:code` captured by LMSRoutes)

```typescript
// BEFORE: Course routing scattered in Microservices.tsx

// AFTER: CourseRouter contains the nested route structure
const CourseRouter = () => {
  return (
    <Routes>
      <Route index element={<CourseInstanceSelector />} />
      <Route path=":instance" element={<CourseInstanceLoader />}>
        <Route index element={<CourseTools />} />
        <Route path=":microservice/*" element={<CourseMicroserviceRouter />} />
      </Route>
    </Routes>
  );
};
```

#### `Courses/CourseMicroserviceRouter.tsx`
**Purpose**: Handle individual microservice routing within courses

```typescript
const CourseMicroserviceRouter = () => {
  const { microservice } = useParams();
  const { allMicroserviceNavigation } = useNavigationStore();

  const currentMicroservice = allMicroserviceNavigation.find(
    (ms) => ms.segment === microservice
  );

  if (!currentMicroservice) {
    return <div>Microservice not found</div>;
  }

  return (
    <>
      {currentMicroservice.title && (
        <PageHeader title={currentMicroservice.title} />
      )}
      {currentMicroservice.children && (
        <SubSections children={currentMicroservice.children} />
      )}
      {currentMicroservice.view && <currentMicroservice.view />}
    </>
  );
};
```

### 2. Modify Existing Components

#### `Microservices.tsx` (becomes `LMSRoutes.tsx`)
**Remove course routing logic (lines 86-155)**

**Note**: CourseCodeLoader will need to be modified to accept `children` prop and render them instead of `<Outlet />` to support this new structure.

```typescript
// BEFORE: Contains course routing
<Route path=":code" element={<CourseCodeLoader />}>
  {/* Complex course routing logic */}
</Route>

// AFTER: Only app-level routing
<Routes>
  <Route path="" element={<Home />} index />
  <Route path="help" element={<div>Help</div>} />
  <Route path="contact" element={<div>Contact</div>} />
  {/* Dynamic microservice routes */}
  {microserviceRoutes}
  {/* Course routing with CourseCodeLoader providing context */}
  <Route path=":code" element={<CourseCodeLoader />}>
    <CourseRouter />
  </Route>
</Routes>
```

#### `Courses/CourseCodeLoader.tsx`
**Modify to accept children prop for new routing structure**

```typescript
// BEFORE: Renders Outlet for nested routes
if (fetchState === "loading") return <LoadingScreen />;
return <Outlet />;

// AFTER: Renders children (CourseRouter) for new structure
interface CourseCodeLoaderProps {
  children?: React.ReactNode;
}

const CourseCodeLoader = ({ children }: CourseCodeLoaderProps) => {
  // ... existing logic
  if (fetchState === "loading") return <LoadingScreen />;
  return <>{children}</>;
};
```

#### `Courses/CourseTools.tsx`
**Enhance for better microservice filtering**

```typescript
// BEFORE: Basic microservice handling
const { allMicroserviceNavigation } = useNavigationStore();

// AFTER: Context-aware microservice filtering
const { getMicroservicesForContext } = useNavigationStore();
const courseMicroservices = getMicroservicesForContext('course');

// Filter based on course configuration
const enabledMicroservices = courseMicroservices.filter(ms =>
  currentCourse?.services?.includes(ms.segment)
);
```

### 3. Update Navigation Integration

#### `Courses/Navigation/CourseNavigationBuilder.tsx`
**Enhance for course-specific navigation**

```typescript
// BEFORE: Basic course navigation
const courseNavItems = getCourseNavigationItems();

// AFTER: Context-aware course navigation
const courseNavItems = getMicroservicesForContext('course').filter(ms =>
  isRelevantForCourse(ms, currentCourse)
);
```

## Project Structure After Phase 2

```
src/LMSToolpad/components/
├── LMSRoutes.tsx                    (renamed from Microservices.tsx)
├── Courses/
│   ├── CourseRouter.tsx             (NEW - main course router)
│   ├── CourseMicroserviceRouter.tsx (NEW - individual microservice router)
│   ├── CourseTools.tsx              (enhanced for microservice filtering)
│   └── Navigation/                  (existing course navigation)
└── Navigation/
    └── store/
        └── useNavigationStore.ts    (unchanged in this phase)
```

## Component Responsibilities After Phase 2

| **Component** | **Responsibility** | **Routes Handled** |
|---------------|-------------------|-------------------|
| **LMSRoutes** | Top-level app routing | `/`, `/help`, `/contact`, dynamic app routes |
| **CourseRouter** | Course routing coordination | Routes relative to `:code` (/:instance, /:instance/:microservice/*) |
| **CourseMicroserviceRouter** | Individual microservice routing | `/:instance/:microservice/*` |
| **CourseTools** | Course microservice management | `/:instance` |

## Validation Checklist

- [ ] Course routing extracted from LMSRoutes to CourseRouter
- [ ] CourseRouter handles routes relative to `:code` parameter (/:instance, /:instance/:microservice/*)
- [ ] CourseMicroserviceRouter handles individual microservice routing
- [ ] CourseTools enhanced for context-aware microservice filtering
- [ ] All existing course routes work correctly (`/:code/:instance/:microservice`)
- [ ] No breaking changes to existing functionality
- [ ] Project builds successfully after migration

## Impact Assessment

**Breaking Changes:** Minimal - route structure preserved, only component organization changed
**Functionality:** All existing course routing preserved
**Performance:** No impact expected
**Testing:** Route testing recommended to ensure all paths work correctly

This phase establishes clear component boundaries while maintaining backward compatibility with existing course routes.
