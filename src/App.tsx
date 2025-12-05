/** @format */

import { BrowserRouter } from "react-router-dom";
import { LMSProvider } from ".";
import Microservices from "./LMSToolpad/components/Microservices/Microservices";
import CourseMicroservice from "./LMSToolpad/components/Courses/CourseMicroservice";
import EduTest from "./test/EduTest";
import EduTest2 from "./test/EduTest2";

/**
 * Root application component.
 *
 * Architecture:
 * - BrowserRouter: Provides routing context
 * - LMSProvider: Core LMS functionality, auth, theme, layout
 * - Microservices: Top-level routing (Home, Help, Contact, dynamic routes)
 *   - CourseMicroservice: Self-contained course module with its own routing
 *     - EduTest, EduTest2: Course-specific microservices (tools)
 *
 * This structure provides clear separation:
 * - App-level microservices are children of Microservices
 * - Course-level microservices are children of CourseMicroservice
 */
const App = () => {
  return (
    <BrowserRouter>
      <LMSProvider>
        <Microservices>
          {/* Course as a top-level microservice with its own child microservices */}
          <CourseMicroservice>
            <EduTest />
            <EduTest2 />
          </CourseMicroservice>
        </Microservices>
      </LMSProvider>
    </BrowserRouter>
  );
};

export default App;
