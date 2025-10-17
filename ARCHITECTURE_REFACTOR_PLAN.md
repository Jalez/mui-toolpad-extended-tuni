# Architecture Refactor Plan: Microservices and Routing Separation

## 📋 Implementation Phases

This refactor is organized into 4 detailed phases with comprehensive documentation:

### [Phase 1: Widget → Microservice Terminology Cleanup](./v3Plans/Phase1/Phase1-Terminology-Cleanup.md)
- **Focus**: Rename widget terminology to microservice for consistency
- **Scope**: Component registration system only
- **Impact**: Introduces breaking changes requiring code updates

### [Phase 2: Component Migration & Course Logic Extraction](./v3Plans/Phase2/Phase2-Component-Migration.md)
- **Focus**: Extract course routing logic and enhance course components
- **Scope**: Create CourseRouter, enhance existing Courses/ folder
- **Impact**: Component organization, backward compatibility maintained

### [Phase 3: Navigation Store Context-Aware Updates](./v3Plans/Phase3/Phase3-Navigation-Updates.md)
- **Focus**: Add context awareness to navigation store
- **Scope**: Context-aware methods for app vs course microservices
- **Impact**: Enhanced functionality, backward compatibility preserved

### [Phase 4: Testing and Validation](./v3Plans/Phase4/Phase4-Testing-Validation.md)
- **Focus**: Comprehensive testing of refactored architecture
- **Scope**: Route testing, navigation validation, microservice functionality
- **Impact**: Production readiness validation

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
    └── Courses (course microservice container)
        ├── CourseRouter (manages course routing)
        └── CourseTools (displays enabled microservices for course)
```

**Important**: EduTest and EduTest2 remain as independent microservices in their current locations and are NOT moved into the Courses folder.

### 3. File Organization
```
src/
├── test/                    (existing independent microservices)
│   ├── EduTest.tsx         (remains independent microservice)
│   └── EduTest2.tsx        (remains independent microservice)
└── LMSToolpad/components/
    ├── Microservices/       (renamed to LMSRoutes)
    ├── Courses/             (existing course routing & management)
    │   ├── CourseTools.tsx  (enhanced for microservice filtering)
    │   └── Navigation/      (existing course navigation components)
    ├── Navigation/          (existing navigation system)
    │   ├── hooks/
    │   │   ├── useWidgetRoutes.tsx → useMicroserviceRoutes.tsx
    │   │   └── useWidgetNavigation.ts → useMicroserviceNavigation.ts
    │   └── NavigationRegistry.tsx (widget → microservice terminology)
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

### Phase 1: Terminology & Infrastructure Setup
**See detailed plan: [Phase1-Terminology-Cleanup.md](./v3Plans/Phase1/Phase1-Terminology-Cleanup.md)**

1. **Rename widget terminology to microservice** (component registration system only)
2. **Preserve existing navigation store terminology** (no changes to existing microservice navigation)
3. **Conservative approach** - focus on terminology consistency without architectural changes
4. **Prepare foundation** for subsequent phases

### Phase 2: Component Migration & Course Logic Extraction
**See detailed plan: [Phase2-Component-Migration.md](./v3Plans/Phase2/Phase2-Component-Migration.md)**

1. **Extract course routing** from `Microservices.tsx` to dedicated course components
2. **Create CourseRouter** for organized course routing under `/courses/*`
3. **Enhance existing Courses folder** components for better microservice management
4. **Maintain backward compatibility** with existing route patterns

### Phase 3: Separate Course Navigation Store
**See detailed plan: [Phase3-Navigation-Updates.md](./v3Plans/Phase3/Phase3-Navigation-Updates.md)**

1. **Create dedicated course navigation store** for course microservices only
2. **Simplify main navigation store** to handle app-level navigation only
3. **Eliminate complex context-aware logic** in favor of clean store separation
4. **Prepare foundation for future Routes/Navigation API separation**

### Phase 4: Testing and Validation
**See detailed plan: [Phase4-Testing-Validation.md](./v3Plans/Phase4/Phase4-Testing-Validation.md)**

1. **Comprehensive route testing** for all navigation patterns
2. **Context-aware navigation validation** for app vs course separation
3. **Microservice registration and filtering verification**
4. **Production readiness validation** with rollback plan

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

### Unified Navigation Store (Shared API)
A single NavigationStore serves as the common API for both app and course navigation:
```typescript
interface ViewStore {
  // Existing - unified navigation structure
  navigation: NavigationStoreItem[];
  sections: Record<string, NavigationSection>;
  sectionOrder: string[];
  visibleSections: Record<string, boolean>;

  // Unified microservice registry (context-aware)
  allMicroserviceNavigation: NavigationPageStoreItem[];

  // Context-aware methods
  addAppMicroserviceNavigation: (item: NavigationPageStoreItem) => void;
  addCourseMicroserviceNavigation: (item: NavigationPageStoreItem) => void;
  getMicroservicesForContext: (context: 'app' | 'course') => NavigationPageStoreItem[];
  updateMicroserviceNavigationForSections: (context?: 'app' | 'course') => void;

  // Section management (sections can represent different contexts)
  addAppSection: (props: addSectionProps) => void;
  addCourseSection: (props: addSectionProps) => void;
}
```

This approach provides:
- **Single API**: One NavigationStore handles all navigation logic
- **Context Separation**: App and course navigation are logically separated through sections/contexts
- **No Duplication**: Shared navigation patterns and utilities
- **Clean Interface**: Context-aware methods prevent coupling while maintaining shared functionality

## Migration Steps

### Step 1: Rename Files and Update Terminology
1. Rename `useWidgetRoutes.tsx` → `useMicroserviceRoutes.tsx`
2. Rename `useWidgetNavigation.ts` → `useMicroserviceNavigation.ts`
3. Update `NavigationRegistry.tsx` to use microservice terminology
4. Rename `registerWidget` → `registerMicroservice`

### Step 2: Extract Course Logic from Microservices.tsx
1. Copy `Microservices.tsx` to `LMSRoutes.tsx` (keep app-level routing only)
2. Move course routing logic (lines 86-155) from `Microservices.tsx` to existing `Courses/` components
3. Update existing `Courses/CourseTools.tsx` to use context-aware microservice filtering

### Step 3: Update Service Registration
1. Update navigation store to support context-aware operations
2. Update EduTest/EduTest2 (in `src/test/`) to register as course microservices
3. Update existing `Courses/CourseTools.tsx` to use `getMicroservicesForContext('course')`
4. Maintain logical separation through section naming conventions

### Step 4: Update App.tsx
```typescript
const App = () => {
  return (
    <BrowserRouter>
      <LMSProvider>
        <LMSRoutes>
          {/* EduTest and EduTest2 register themselves as course microservices */}
          <EduTest />
          <EduTest2 />
          {/* App-level microservices can be added here */}
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
- Route changes may break existing navigation (Phase 2)
- Store separation may cause state management issues (Phase 3)
- Component coupling may be harder to separate than expected (Phase 2)

### Medium Risk
- **Phase 1 breaking changes** require systematic migration across codebase
- Naming changes may cause confusion during transition
- Widget system integration with new routing (Phase 2)
- Course microservice registration API changes (Phase 3)

### Low Risk
- Component renaming (managed through systematic migration)
- Registry pattern implementation
- Static route handling

## Success Criteria

1. **Unified Terminology:** Component registration uses "microservice" terminology consistently (widgets renamed to microservices)
2. **Pluggable Microservice Architecture:** EduTest and EduTest2 remain independent microservices that can be selectively enabled per course
3. **Unified Navigation API:** Single NavigationStore serves as common API for both app and course navigation
4. **Context-Aware Separation:** App and course navigation are logically separated through context-aware methods
5. **Clear Component Hierarchy:** LMSRoutes contains app microservices and Courses microservice container
6. **Proper Route Namespacing:** `/courses` prefix exclusively used for `:code` course routes
7. **Course Microservice Management:** Courses can selectively enable/disable available microservices like EduTest and EduTest2
8. **Clean App Structure:** App.tsx clearly shows LMSRoutes → [App Microservices, Courses (displays enabled microservices)]
9. **Systematic Migration:** All breaking changes from Phase 1 properly migrated and tested

## Timeline Estimate

- **Phase 1:** 2-3 days (terminology cleanup + migration - rename widget files/functions AND update all imports/usages)
- **Phase 2:** 2-3 days (component migration - extract course logic, enhance existing components)
- **Phase 3:** 2-3 days (navigation enhancements - add context awareness to existing store)
- **Phase 4:** 2-3 days (comprehensive testing and validation)

Total: 8-12 days for complete implementation.

**Note**: Phase 1 now includes migration work to handle breaking changes. Each phase has detailed documentation with precise implementation steps, validation checklists, and rollback plans.

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

1. **Unified Terminology**: Component registration uses "microservice" terminology consistently (renamed from widgets)
2. **Pluggable Microservice Architecture**: EduTest and EduTest2 remain as independent, reusable microservices that courses can selectively enable
3. **Unified Navigation API**: Single NavigationStore serves as common API for both app and course navigation
4. **Context-Aware Separation**: App and course navigation are logically separated through context-aware methods
5. **Course Microservice Container**: Courses folder contains routing and management logic, displaying enabled microservices
6. **Proper Route Namespacing**: `/courses` prefix is exclusively for course routes with `:code` parameter
7. **Clean App Structure**: App.tsx clearly shows LMSRoutes → [App Microservices, Courses (container for enabled microservices)]
8. **Systematic Migration**: Breaking changes from terminology cleanup are properly managed and tested

The key insight is that microservices like EduTest and EduTest2 should be pluggable modules that courses can enable/disable, not components moved into a course folder. This creates a more flexible and modular architecture where the Courses microservice acts as a container that manages and displays whatever microservices are enabled for that specific course.

**Important Note**: Phase 1 introduces breaking changes that require systematic migration of imports and function calls throughout the codebase. While the core functionality remains the same, all references to the renamed functions and types must be updated.

**Future Architectural Vision**: The context-aware enhancements in Phase 3 prepare the foundation for eventually separating the current unified navigation store into distinct APIs:
- **Routes API**: Managing URL routing and navigation patterns
- **Navigation API**: Managing microservice registration and display logic

This would provide cleaner separation of concerns but represents a future architectural improvement beyond the current refactor scope.
