/** @format */
import { ReactNode } from "react";
export interface ToolpadProviderProps {
    children?: ReactNode;
}
/**
 * ToolpadProvider Component
 *
 * @version 3.0.0
 * @breaking-changes
 * - Renamed from LMSProvider to ToolpadProvider in v3.0.0
 * - Complete architectural restructuring for better separation of concerns
 * - Removed direct course management (now handled by CourseManager)
 * - Simplified authentication handling (now handled by AuthenticationManager)
 * - Improved theme management with consistent application
 * - Enhanced layout structure with PageContent and PageToolbar components
 * - Removed direct message handling (now managed by respective components)
 *
 * Main application provider that sets up:
 * - Authentication context
 * - Theme provider
 * - Navigation structure
 * - Basic app layout
 * - Router integration
 *
 * @example
 * ```tsx
 * <BrowserRouter>
 *   <ToolpadProvider>
 *     <YourApp />
 *   </ToolpadProvider>
 * </BrowserRouter>
 * ```
 */
declare const ToolpadProvider: React.FC<ToolpadProviderProps>;
export default ToolpadProvider;
