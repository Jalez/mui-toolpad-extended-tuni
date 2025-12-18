/** @format */

import { BrowserRouter } from "react-router-dom";
import { LMSProvider } from ".";
import Microservices from "./LMSToolpad/components/Microservices/Microservices";
import CourseMicroservice from "./LMSToolpad/components/Courses/CourseMicroservice";
import CalendarMicroservice from "./LMSToolpad/components/Calendar/CalendarMicroservice";
import UserMicroservice from "./LMSToolpad/components/Users/UserMicroservice";
import EduTest from "./test/EduTest";
import EduTest2 from "./test/EduTest2";
import Contact from "./test/Contact";
import Help from "./test/Help";

/**
 * Root application component.
 *
 * Architecture:
 * - BrowserRouter: Provides routing context
 * - LMSProvider: Core LMS functionality, auth, theme, layout
 * - Microservices: Top-level routing (Home, Help, Contact, dynamic routes)
 *   - UserMicroservice: Self-contained user module with UserBus integration
 *   - CalendarMicroservice: Self-contained calendar module with EventBus integration
 *   - CourseMicroservice: Self-contained course module with its own routing
 *     - EduTest, EduTest2: Course-specific microservices (tools)
 *
 * This structure provides clear separation:
 * - App-level microservices are children of Microservices
 * - User, Calendar, and Courses communicate through EventBus/UserBus (no runtime dependencies;
 *   acceptable exceptions: mock type imports, type definitions, and bus delegation)
 * - Course-level microservices are children of CourseMicroservice
 */
const App = () => {
  return (
    <BrowserRouter>
      <LMSProvider>
        <Microservices>
          <Contact />
          <Help />
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
