/** @format */

import { BrowserRouter } from "react-router-dom";
import { LMSProvider, Microservices } from ".";
import Contact from "./test/Contact";
import Help from "./test/Help";

// Optional extensions - install separately if needed:
// npm install @mui-toolpad-extended-tuni/calendar
// npm install @mui-toolpad-extended-tuni/courses
// npm install @mui-toolpad-extended-tuni/users
// 
// For local development, using relative imports. In production, use:
// import { CalendarMicroservice } from "@mui-toolpad-extended-tuni/calendar";
// import { CourseMicroservice } from "@mui-toolpad-extended-tuni/courses";
// import { UserMicroservice } from "@mui-toolpad-extended-tuni/users";
import { CalendarMicroservice } from "../packages/calendar/src";
import { CourseMicroservice } from "../packages/courses/src";
import { UserMicroservice } from "../packages/users/src";
import EduTest from "./test/EduTest";
import EduTest2 from "./test/EduTest2";

/**
 * Root application component.
 *
 * Architecture:
 * - BrowserRouter: Provides routing context
 * - LMSProvider: Core LMS functionality, auth, theme, layout
 * - Microservices: Top-level routing (Home, Help, Contact, dynamic routes)
 *   - UserMicroservice: Optional extension - self-contained user module with UserBus integration
 *   - CalendarMicroservice: Optional extension - self-contained calendar module with EventBus integration
 *   - CourseMicroservice: Optional extension - self-contained course module with its own routing
 *     - EduTest, EduTest2: Course-specific microservices (tools)
 *
 * This structure provides clear separation:
 * - App-level microservices are children of Microservices
 * - Extensions are optional - install only what you need
 * - User, Calendar, and Courses communicate through EventBus/UserBus (no runtime dependencies;
 *   acceptable exceptions: mock type imports, type definitions, and bus delegation)
 * - Course-level microservices are children of CourseMicroservice
 *
 * To use without extensions, simply remove the extension imports and components:
 * ```tsx
 * <Microservices>
 *   <Contact />
 *   <Help />
 *   // Your custom microservices
 * </Microservices>
 * ```
 */
const App = () => {
  return (
    <BrowserRouter>
      <LMSProvider>
        <Microservices>
          <Contact />
          <Help />
          {/* Optional extensions - remove if not installed */}
          <UserMicroservice />
          <CourseMicroservice>
            <EduTest />
            <EduTest2 />
          </CourseMicroservice>
          <CalendarMicroservice />
        </Microservices>
      </LMSProvider>
    </BrowserRouter>
  );
};

export default App;
