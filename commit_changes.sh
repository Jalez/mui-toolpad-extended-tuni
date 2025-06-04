#!/bin/bash

# Bash script to commit all changes with proper separation of concerns
# Generated on June 4, 2025

set -e  # Exit on any error

echo "Starting commit process..."

# Change to the project directory
cd /home/a642905/School/lms/mui-toolpad-extended-tuni

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "Error: Not in a git repository"
    exit 1
fi

# 1. Commit Provider and Core Hooks
echo "Committing provider and core hooks..."
git add src/LMSToolpad/EduMLProvider.tsx
git add src/LMSToolpad/hooks/useRetry.ts
git commit -m "feat: add EduMLProvider and useRetry hook

- Add EduMLProvider as main application wrapper
- Implement useRetry hook for robust API operations
- Provides foundation for application state management"

# 2. Commit Grid Layout System
echo "Committing grid layout system..."
git add src/LMSToolpad/components/Common/GridLayout/useGridLayout.ts
git add src/LMSToolpad/components/Common/GridLayout/Tools/LayoutSelector.tsx
git commit -m "feat: implement grid layout management system

- Add useGridLayout hook for layout state management
- Implement LayoutSelector tool for layout configuration
- Provides foundation for flexible panel arrangements"

# 3. Commit Panel and Resize Components
echo "Committing panel and resize components..."
git add src/LMSToolpad/components/Common/Panel/Expandable/hooks/useExpandable.ts
git add src/LMSToolpad/components/Common/Panel/TBR/ResizeHandlers.tsx
git add src/LMSToolpad/components/Common/Panel/TBR/ResizeIndicator.tsx
git commit -m "feat: add panel expansion and resize functionality

- Implement useExpandable hook for collapsible panels
- Add ResizeHandlers for interactive panel resizing
- Add ResizeIndicator for visual resize feedback
- Enhances user interface flexibility and usability"

# 4. Commit Mindmap State Management
echo "Committing mindmap state management..."
git add src/LMSToolpad/components/Courses/Mindmap/stores/index.ts
git add src/LMSToolpad/components/Courses/Mindmap/stores/useEdgeStore.ts
git add src/LMSToolpad/components/Courses/Mindmap/stores/useViewPreferencesStore.ts
git add src/LMSToolpad/components/Courses/Mindmap/stores/useViewportStore.ts
git add src/LMSToolpad/components/Courses/Mindmap/Node/store/useNodeStore.ts
git add src/LMSToolpad/components/Courses/Mindmap/Minimap/store/useMinimapStore.ts
git commit -m "feat: implement mindmap state management system

- Add centralized stores for edges, nodes, viewport, and preferences
- Implement useMinimapStore for minimap functionality
- Provide unified state management for mindmap components
- Uses Zustand for efficient state handling"

# 5. Commit Mindmap Core Flow Components
echo "Committing mindmap core flow components..."
git add src/LMSToolpad/components/Courses/Mindmap/Flow/Flow.tsx
git add src/LMSToolpad/components/Courses/Mindmap/Flow/FlowContainer.tsx
git add src/LMSToolpad/components/Courses/Mindmap/Flow/hooks/useEdgeSelect.ts
git add src/LMSToolpad/components/Courses/Mindmap/Flow/hooks/useEdgeState.ts
git add src/LMSToolpad/components/Courses/Mindmap/Flow/hooks/useNodeSelect.ts
git add src/LMSToolpad/components/Courses/Mindmap/Flow/hooks/useNodeState.ts
git add src/LMSToolpad/components/Courses/Mindmap/Flow/hooks/useViewportManager.ts
git add src/LMSToolpad/components/Courses/Mindmap/constants.ts
git commit -m "feat: implement mindmap flow core system

- Add Flow component using @xyflow/react
- Implement FlowContainer with viewport management
- Add hooks for node/edge selection and state management
- Add viewport manager for navigation and zoom
- Define mindmap constants for consistent behavior"

# 6. Commit Node System and Types
echo "Committing node system and implementations..."
git add src/LMSToolpad/components/Courses/Mindmap/Node/hooks/useConnectionOperations.ts
git add src/LMSToolpad/components/Courses/Mindmap/Node/registry/nodeTypeRegistry.ts
git add src/LMSToolpad/components/Courses/Mindmap/Nodes/registerBasicNodeTypes.ts
git add src/LMSToolpad/components/Courses/Mindmap/Nodes/common/NodeStyles.tsx
git commit -m "feat: implement node registry and connection system

- Add useConnectionOperations for node connections
- Implement nodeTypeRegistry for dynamic node types
- Add registerBasicNodeTypes for default node registration
- Create common NodeStyles for consistent appearance"

# 7. Commit Specific Node Types
echo "Committing specific node type implementations..."
git add src/LMSToolpad/components/Courses/Mindmap/Nodes/CellNode/CellNode.tsx
git add src/LMSToolpad/components/Courses/Mindmap/Nodes/CellNode/CellNodeHandle.tsx
git add src/LMSToolpad/components/Courses/Mindmap/Nodes/CellNode/CellNodeHandleStyles.tsx
git add src/LMSToolpad/components/Courses/Mindmap/Nodes/CellNode/CellNodeMenu.tsx
git add src/LMSToolpad/components/Courses/Mindmap/Nodes/CellNode/CellNodeStyles.tsx
git add src/LMSToolpad/components/Courses/Mindmap/Nodes/CellNode/createCellNodeTemplate.tsx
git add src/LMSToolpad/components/Courses/Mindmap/Nodes/CellNode/types.ts
git commit -m "feat: implement CellNode component system

- Add CellNode with interactive handles and menu
- Implement CellNodeStyles for consistent styling
- Add CellNodeMenu for node-specific actions
- Create template system for cell node creation
- Define TypeScript types for type safety"

git add src/LMSToolpad/components/Courses/Mindmap/Nodes/CourseNode/CourseNode.tsx
git add src/LMSToolpad/components/Courses/Mindmap/Nodes/CourseNode/CourseNodeStyles.tsx
git add src/LMSToolpad/components/Courses/Mindmap/Nodes/CourseNode/createCourseNodeTemplate.tsx
git commit -m "feat: implement CourseNode component

- Add CourseNode for course representation
- Implement CourseNodeStyles for course-specific styling
- Create template system for course node creation"

git add src/LMSToolpad/components/Courses/Mindmap/Nodes/ModuleNode/ModuleNode.tsx
git add src/LMSToolpad/components/Courses/Mindmap/Nodes/ModuleNode/ModuleNodeStyles.tsx
git add src/LMSToolpad/components/Courses/Mindmap/Nodes/ModuleNode/createModuleNodeTemplate.tsx
git commit -m "feat: implement ModuleNode component

- Add ModuleNode for module representation
- Implement ModuleNodeStyles for module-specific styling
- Create template system for module node creation"

# 8. Commit Selection System
echo "Committing selection system..."
git add src/LMSToolpad/components/Courses/Mindmap/Select/SelectLogic.tsx
git add src/LMSToolpad/components/Courses/Mindmap/Select/SelectionDisplay.tsx
git add src/LMSToolpad/components/Courses/Mindmap/Select/buttons/CenterSelected.tsx
git add src/LMSToolpad/components/Courses/Mindmap/Select/buttons/DeleteSelected.tsx
git add src/LMSToolpad/components/Courses/Mindmap/Select/contexts/SelectContext.tsx
git commit -m "feat: implement mindmap selection system

- Add SelectLogic for selection state management
- Implement SelectionDisplay for visual feedback
- Add CenterSelected and DeleteSelected action buttons
- Create SelectContext for selection state sharing"

# 9. Commit Control System
echo "Committing control system..."
git add src/LMSToolpad/components/Courses/Mindmap/Controls/Components/ControlButton.tsx
git add src/LMSToolpad/components/Courses/Mindmap/Controls/Components/NavigationControls/index.tsx
git add src/LMSToolpad/components/Courses/Mindmap/Controls/Components/ViewSettingsControls/index.tsx
git add src/LMSToolpad/components/Courses/Mindmap/Controls/context/ControlsContext.tsx
git add src/LMSToolpad/components/Courses/Mindmap/Controls/index.tsx
git add src/LMSToolpad/components/Courses/Mindmap/Controls/registry/RegisteredControls.tsx
git add src/LMSToolpad/components/Courses/Mindmap/Controls/registry/UnifiedControlsPanel.tsx
git add src/LMSToolpad/components/Courses/Mindmap/Controls/registry/controlsRegistry.ts
git commit -m "feat: implement mindmap controls system

- Add ControlButton component for consistent UI
- Implement NavigationControls and ViewSettingsControls
- Create ControlsContext for controls state management
- Add registry system for dynamic control registration
- Implement UnifiedControlsPanel for control aggregation"

# 10. Commit Minimap System
echo "Committing minimap system..."
git add src/LMSToolpad/components/Courses/Mindmap/Minimap/Minimap.tsx
git add src/LMSToolpad/components/Courses/Mindmap/Minimap/button/MinimapToggle.tsx
git commit -m "feat: implement minimap navigation system

- Add Minimap component for overview navigation
- Implement MinimapToggle for show/hide functionality
- Enhances large mindmap navigation experience"

# 11. Commit Keyboard Shortcuts
echo "Committing keyboard shortcuts..."
git add src/LMSToolpad/components/Courses/Mindmap/KeyboardShortCuts/hooks/useKeyboardShortcuts.ts
git add src/LMSToolpad/components/Courses/Mindmap/KeyboardShortCuts/index.tsx
git commit -m "feat: implement keyboard shortcuts system

- Add useKeyboardShortcuts hook for key handling
- Implement KeyboardShortcuts component
- Provides efficient keyboard navigation for mindmap"

# 12. Commit Utilities and Test Data
echo "Committing utilities and test data..."
git add src/LMSToolpad/components/Courses/Mindmap/utils/withErrorHandler.ts
git add src/LMSToolpad/components/Courses/Mindmap/test/edgeData.ts
git add src/LMSToolpad/components/Courses/Mindmap/test/nodesData.ts
git commit -m "feat: add mindmap utilities and test data

- Implement withErrorHandler for robust error handling
- Add test data for edges and nodes
- Provides development and testing support"

# 13. Commit Documentation
echo "Committing documentation..."
git add src/LMSToolpad/components/Courses/Mindmap/Bugs.txt
git add src/LMSToolpad/components/Courses/Mindmap/Documentation/mindmapImprovements.txt
git add src/LMSToolpad/components/Courses/Mindmap/Documentation/mindmapToSolid.txt
git commit -m "docs: add mindmap documentation and bug tracking

- Document known bugs and issues
- Add improvement suggestions
- Include migration notes for SolidJS consideration"

echo "All changes have been committed successfully!"
echo "Total commits created: 13"

# Show the commit log
echo "Recent commit history:"
git log --oneline -15
