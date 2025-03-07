# Navigation Integration Guide

## Overview

This document describes the new navigation integration system that allows widgets to dynamically register themselves in the navigation menu when they are added to the grid layout.

## Features

- Automatic navigation registration for grid widgets
- Section-based organization
- Visibility control
- Cleanup on widget removal
- Backward compatibility with existing navigation

## Usage

### Register a Widget with Navigation

```typescript
registerWidget("my-widget", MyWidgetComponent, {
  name: "My Widget",
  description: "Widget description",
  category: "Tools", // This will be used as the navigation section
  metadata: {
    keepVisible: true, // Optional: Keep this section visible in navigation
  },
});
```

### Manual Navigation Control

You can use the `useNavigationSync` hook directly in your components:

```typescript
const MyComponent = () => {
  useNavigationSync({
    title: "My Component",
    segment: "my-component",
    section: "Custom Section",
    description: "Component description",
    keepVisible: true
  }, "unique-id");

  return <div>My Component</div>;
};
```

## Migration Guide

### From Automatic to Grid-Based Navigation

1. Remove automatic navigation registration:

   ```typescript
   // Old approach
   <MindmapNavigationBuilder />

   // New approach
   registerWidget("mindmap", MindmapComponent, {
     name: "Mindmap",
     description: "Mindmap visualization",
     category: "Tools"
   });
   ```

2. Update existing navigation builders:
   - Add @deprecated tags
   - Maintain backward compatibility
   - Gradually migrate to grid-based approach

### Best Practices

1. Use consistent section names
2. Clean up navigation items when removing widgets
3. Group related widgets under the same section
4. Use descriptive titles and segments
5. Consider visibility preferences

## Technical Details

### Navigation Configuration

```typescript
interface NavigationConfig {
  title: string; // Display name in navigation
  segment: string; // URL segment/identifier
  section?: string; // Navigation section (optional)
  description?: string; // Tooltip/description
  keepVisible?: boolean; // Keep section visible
  Icon?: ComponentType; // Navigation icon
}
```

### Store Integration

The system integrates with:

- NavigationStore: Manages navigation structure
- NavigationFilterStore: Handles visibility
- WidgetRegistry: Stores widget metadata

## Known Limitations

1. Single section per widget
2. No nested navigation support yet
3. Section names must be unique
4. Icons must be provided separately

## Future Enhancements

1. Nested navigation support
2. Drag-and-drop organization
3. Custom section ordering
4. Enhanced icon support
5. Navigation state persistence
