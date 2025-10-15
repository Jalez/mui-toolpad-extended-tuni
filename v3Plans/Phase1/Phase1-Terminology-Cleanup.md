# Phase 1: Widget → Microservice Terminology Cleanup

## Overview

Phase 1 focuses solely on terminology cleanup while preserving all existing functionality. I discovered that:

1. **"Microservice" terminology** is already used in the navigation system for routing/navigation items
2. **"Service" terminology** is already used for API fetch requests
3. **Widget terminology** needs to be updated for consistency

For Phase 1, we'll take a **conservative approach**:
- **Rename "widget" → "microservice"** for component registration only
- **Keep existing "microservice" navigation terminology** unchanged (since it's already established)
- **Preserve all existing functionality** - no architectural changes

This establishes consistent terminology for the component registration system while maintaining backward compatibility with the existing navigation system.

## Files to be Modified

### 1. File Renames

#### Before → After
```
src/LMSToolpad/components/Navigation/hooks/useWidgetRoutes.tsx
↓
src/LMSToolpad/components/Navigation/hooks/useMicroserviceRoutes.tsx

src/LMSToolpad/components/Navigation/hooks/useWidgetNavigation.ts
↓
src/LMSToolpad/components/Navigation/hooks/useMicroserviceNavigation.ts
```

### 2. Content Changes in Existing Files

#### `NavigationRegistry.tsx`
**Lines 1-50: Interface and Type Definitions**

```typescript
// BEFORE:
export interface WidgetEntry {
  Component: ComponentType<any>;
  props?: Record<string, any>;
  name: string;
  description?: string;
  category?: string;
  iconComponent?: SvgIconComponent;
  metadata?: {
    keepVisible?: boolean;
    order?: number;
    tags?: string[];
    showInNavigation?: boolean;
    route?: {
      path: string;
      element?: ReactNode;
      index?: boolean;
    };
  };
}

interface WidgetRegistryStore {
  widgets: Map<string, WidgetEntry>;
  lastUpdate: number;
  registerWidget: (id: string, entry: WidgetEntry) => void;
  unregisterWidget: (id: string) => void;

// AFTER:
export interface MicroserviceEntry {
  Component: ComponentType<any>;
  props?: Record<string, any>;
  name: string;
  description?: string;
  category?: string;
  iconComponent?: SvgIconComponent;
  metadata?: {
    keepVisible?: boolean;
    order?: number;
    tags?: string[];
    showInNavigation?: boolean;
    route?: {
      path: string;
      element?: ReactNode;
      index?: boolean;
    };
  };
}

interface MicroserviceRegistryStore {
  microservices: Map<string, MicroserviceEntry>;
  lastUpdate: number;
  registerMicroservice: (id: string, entry: MicroserviceEntry) => void;
  unregisterMicroservice: (id: string) => void;
```



#### `NavigationRegistry.tsx` (continued)
**Lines 50-100: Store Implementation**

```typescript
// BEFORE:
const widgetRegistry = new Map<string, WidgetEntry>();

const useWidgetRegistryStoreRaw = create<WidgetRegistryStore>((set) => ({
  widgets: widgetRegistry,
  lastUpdate: Date.now(),
  registerWidget: (id, entry) => {
    widgetRegistry.set(id, entry);
    set({
      widgets: new Map(widgetRegistry),
      lastUpdate: Date.now(),
    });
    updateWidgetNavigation();
  },
  unregisterWidget: (id) => {
    if (widgetRegistry.has(id)) {
      widgetRegistry.delete(id);
      set({
        widgets: new Map(widgetRegistry),
        lastUpdate: Date.now(),
      });
      updateWidgetNavigation();
    }
  },

// AFTER:
const microserviceRegistry = new Map<string, MicroserviceEntry>();

const useMicroserviceRegistryStoreRaw = create<MicroserviceRegistryStore>((set) => ({
  microservices: microserviceRegistry,
  lastUpdate: Date.now(),
  registerMicroservice: (id, entry) => {
    microserviceRegistry.set(id, entry);
    set({
      microservices: new Map(microserviceRegistry),
      lastUpdate: Date.now(),
    });
    updateMicroserviceNavigation();
  },
  unregisterMicroservice: (id) => {
    if (microserviceRegistry.has(id)) {
      microserviceRegistry.delete(id);
      set({
        microservices: new Map(microserviceRegistry),
        lastUpdate: Date.now(),
      });
      updateMicroserviceNavigation();
    }
  },
```

#### `NavigationRegistry.tsx` (continued)
**Lines 150-200: Helper Functions**

```typescript
// BEFORE:
export function registerWidget(
  id: string,
  Component: ComponentType<any>,
  options?: {
    props?: Record<string, any>;
    name?: string;
    description?: string;
    category?: string;
    iconComponent?: SvgIconComponent;
    metadata?: {
      keepVisible?: boolean;
      order?: number;
      tags?: string[];
      showInNavigation?: boolean;
      route?: {
        path: string;
        element?: ReactNode;
        index?: boolean;
      };
    };
  }
) {
  if (widgetRegistry.has(id)) {
    return;
  }

  const entry: WidgetEntry = {
    Component,
    props: options?.props,
    name: options?.name || id,
    description: options?.description,
    category: options?.category,
    iconComponent: options?.iconComponent,
    metadata: options?.metadata,
  };

  useWidgetRegistryStoreRaw.getState().registerWidget(id, entry);
}

// AFTER:
export function registerMicroservice(
  id: string,
  Component: ComponentType<any>,
  options?: {
    props?: Record<string, any>;
    name?: string;
    description?: string;
    category?: string;
    iconComponent?: SvgIconComponent;
    metadata?: {
      keepVisible?: boolean;
      order?: number;
      tags?: string[];
      showInNavigation?: boolean;
      route?: {
        path: string;
        element?: ReactNode;
        index?: boolean;
      };
    };
  }
) {
  if (microserviceRegistry.has(id)) {
    return;
  }

  const entry: MicroserviceEntry = {
    Component,
    props: options?.props,
    name: options?.name || id,
    description: options?.description,
    category: options?.category,
    iconComponent: options?.iconComponent,
    metadata: options?.metadata,
  };

  useMicroserviceRegistryStoreRaw.getState().registerMicroservice(id, entry);
}
```

#### `useMicroserviceRoutes.tsx` (formerly `useWidgetRoutes.tsx`)

```typescript
// BEFORE:
import { useWidgetRegistryStore } from "../NavigationRegistry";

export const useWidgetRoutes = () => {
  const { lastUpdate, widgets } = useWidgetRegistryStore();

  return useMemo(() => {
    const routes: ReactElement[] = [];

    console.log("widgets", widgets);

    widgets.forEach((widget) => {
      // ... rest of function
    });

    return routes;
  }, [widgets, lastUpdate]);
};

// AFTER:
import { useMicroserviceRegistryStore } from "../NavigationRegistry";

export const useMicroserviceRoutes = () => {
  const { lastUpdate, microservices } = useMicroserviceRegistryStore();

  return useMemo(() => {
    const routes: ReactElement[] = [];

    console.log("microservices", microservices);

    microservices.forEach((microservice) => {
      // ... rest of function (unchanged logic)
    });

    return routes;
  }, [microservices, lastUpdate]);
};
```

#### `useMicroserviceNavigation.ts` (formerly `useWidgetNavigation.ts`)

```typescript
// BEFORE:
import {
  getAllWidgets,
  useWidgetRegistryStore,
} from "../NavigationRegistry";

export const useWidgetNavigation = () => {
  const { lastUpdate } = useWidgetRegistryStore();

  useEffect(() => {
    const widgets = getAllWidgets();
    const sections: Record<string, Array<{...}>> = {};

    widgets.forEach((widget, id) => {
      const category = widget.category || "Widgets";
      // ... rest of function
    });
  }, [lastUpdate]);
};

// AFTER:
import {
  getAllMicroservices,
  useMicroserviceRegistryStore,
} from "../NavigationRegistry";

export const useMicroserviceNavigation = () => {
  const { lastUpdate } = useMicroserviceRegistryStore();

  useEffect(() => {
    const microservices = getAllMicroservices();
    const sections: Record<string, Array<{...}>> = {};

    microservices.forEach((microservice, id) => {
      const category = microservice.category || "Microservices";
      // ... rest of function (unchanged logic)
    });
  }, [lastUpdate]);
};
```

#### `NavigationRegistry.tsx` - Additional Helper Functions

```typescript
// BEFORE:
export function getWidget(id: string): WidgetEntry | undefined {
  return widgetRegistry.get(id);
}

export function getAllWidgets(): Map<string, WidgetEntry> {
  return new Map(widgetRegistry);
}

export function getWidgetIds(): string[] {
  return Array.from(widgetRegistry.keys());
}

export function isWidgetRegistered(id: string): boolean {
  return widgetRegistry.has(id);
}

// AFTER:
export function getMicroservice(id: string): MicroserviceEntry | undefined {
  return microserviceRegistry.get(id);
}

export function getAllMicroservices(): Map<string, MicroserviceEntry> {
  return new Map(microserviceRegistry);
}

export function getMicroserviceIds(): string[] {
  return Array.from(microserviceRegistry.keys());
}

export function isMicroserviceRegistered(id: string): boolean {
  return microserviceRegistry.has(id);
}
```

### 3. Files Requiring Import Updates

#### `Microservices.tsx` (Hook imports)
**Line 15: Import statement**

```typescript
// BEFORE:
import { useWidgetRoutes } from "../Navigation/hooks/useWidgetRoutes";

// AFTER:
import { useMicroserviceRoutes } from "../Navigation/hooks/useMicroserviceRoutes";
```

#### `Microservices.tsx` (Hook usage)
**Line 66: Hook usage**

```typescript
// BEFORE:
const widgetRoutes = useWidgetRoutes();

// AFTER:
const microserviceRoutes = useMicroserviceRoutes();
```

#### `LMSProvider.tsx` (Line 30)
```typescript
// BEFORE:
import { useWidgetNavigation } from "./components/Navigation/hooks/useWidgetNavigation";

// AFTER:
import { useMicroserviceNavigation } from "./components/Navigation/hooks/useMicroserviceNavigation";
```

#### `LMSProvider.tsx` (Line 115)
```typescript
// BEFORE:
useWidgetNavigation(); // Add persistent widget navigation

// AFTER:
useMicroserviceNavigation(); // Add persistent microservice navigation
```

## Project Structure After Phase 1

```
src/LMSToolpad/components/Navigation/
├── hooks/
│   ├── useMicroserviceRoutes.tsx      (renamed from useWidgetRoutes.tsx)
│   └── useMicroserviceNavigation.ts   (renamed from useWidgetNavigation.ts)
├── NavigationRegistry.tsx             (updated with microservice terminology)
└── store/
    ├── useNavigationStore.ts          (unchanged - keeps existing microservice terminology)
    └── useNavigationFilterStore.ts

src/LMSToolpad/components/Microservices/
└── Microservices.tsx                  (updated hook imports and usage)

src/LMSToolpad/
└── LMSProvider.tsx                    (updated imports and hook calls)
```

## Key Terminology Changes

| **Before** | **After** | **Purpose** | **Scope** |
|------------|-----------|-------------|-----------|
| `WidgetEntry` | `MicroserviceEntry` | Component registration interface | Component registry only |
| `WidgetRegistryStore` | `MicroserviceRegistryStore` | Component registry store | Component registry only |
| `registerWidget` | `registerMicroservice` | Component registration function | Component registry only |
| `useWidgetRegistryStore` | `useMicroserviceRegistryStore` | Registry store hook | Component registry only |
| `useWidgetRoutes` | `useMicroserviceRoutes` | Hook for generating routes | Component registry only |
| `useWidgetNavigation` | `useMicroserviceNavigation` | Hook for navigation management | Component registry only |

**Note:** Navigation store terminology (`allMicroserviceNavigation`, etc.) remains unchanged in Phase 1 to preserve existing functionality.

## Validation Checklist

- [ ] All "widget" references renamed to "microservice" (component registration system only)
- [ ] All function names updated for component registration (useWidgetRoutes → useMicroserviceRoutes, etc.)
- [ ] All import statements updated in dependent files (Microservices.tsx, LMSProvider.tsx)
- [ ] Navigation store terminology preserved (allMicroserviceNavigation, etc.)
- [ ] Project builds successfully after changes
- [ ] No TypeScript errors introduced
- [ ] All existing functionality preserved (only terminology changed for component registration)

## Impact Assessment

**Breaking Changes:** Yes - this phase introduces breaking changes that require code updates:
- File renames require import statement updates
- Function name changes require function call updates
- Interface changes require type usage updates

**Migration Required:** All files importing or using the renamed functions must be updated

**Functionality:** Component registration terminology updated, core functionality preserved
**Performance:** No impact expected
**Testing:** Build verification and import testing required

## Breaking Changes Introduced

### 1. File Renames (Require Import Updates)
```typescript
// BEFORE:
import { useWidgetRoutes } from "../Navigation/hooks/useWidgetRoutes";
import { useWidgetNavigation } from "./components/Navigation/hooks/useWidgetNavigation";

// AFTER:
import { useMicroserviceRoutes } from "../Navigation/hooks/useMicroserviceRoutes";
import { useMicroserviceNavigation } from "./components/Navigation/hooks/useMicroserviceNavigation";
```

### 2. Function Name Changes (Require Function Call Updates)
```typescript
// BEFORE:
const routes = useWidgetRoutes();
useWidgetNavigation();

// AFTER:
const routes = useMicroserviceRoutes();
useMicroserviceNavigation();
```

### 3. Type/Interface Changes (Require Type Usage Updates)
```typescript
// BEFORE:
interface MyComponentProps {
  widget: WidgetEntry;
}

// AFTER:
interface MyComponentProps {
  microservice: MicroserviceEntry;
}
```

## Migration Strategy

### Files Requiring Updates
1. **LMSProvider.tsx** - Update hook imports and usage
2. **Microservices.tsx** - Update hook imports and usage
3. **Any components using WidgetEntry type** - Update type references
4. **Any files calling renamed functions** - Update function calls

### Safe Migration Approach
1. **Create new files first** with updated names
2. **Update imports gradually** in dependent files
3. **Test each file** after updates before moving to next
4. **Keep old files temporarily** during migration for rollback

This phase establishes consistent terminology for the **component registration system** while requiring systematic updates to maintain functionality.
