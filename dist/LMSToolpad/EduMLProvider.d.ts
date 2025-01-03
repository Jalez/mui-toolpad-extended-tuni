/** @format */
import { ReactNode } from 'react';
export interface EduMLProviderProps {
    children?: ReactNode;
}
/**
 * @deprecated Use LMSProvider instead of EduMLProvider. Will be removed in version 2.0.0
 * EduMLProvider must be wrapped in a Router component from react-router-dom
 * Example:
 * ```tsx
 * import { BrowserRouter } from 'react-router-dom';
 *
 * <BrowserRouter>
 *   <EduMLProvider>
 *     {children}
 *   </EduMLProvider>
 * </BrowserRouter>
 * ```
 */
declare const EduMLProvider: ({ children }: EduMLProviderProps) => import("react/jsx-runtime").JSX.Element;
export default EduMLProvider;
