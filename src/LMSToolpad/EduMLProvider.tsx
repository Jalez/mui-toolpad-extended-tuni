/** @format */

/**
 * @deprecated Use LMSProvider instead of EduMLProvider. No longer used in the codebase.
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
const EduMLProvider = () => {};

export default EduMLProvider;
