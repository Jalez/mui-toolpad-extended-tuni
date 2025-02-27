/** @format */

import { BrowserRouter } from "react-router-dom";
import { LMSProvider } from ".";
import Microservices from "./LMSToolpad/components/Microservices/Microservices";
import EduTest from "./test/EduTest";
import EduTest2 from "./test/EduTest2";

/**
 * Root application component.
 * Sets up routing and core application providers.
 */
const App = () => {
  return (
    <BrowserRouter>
      <LMSProvider>
        <Microservices>
          <EduTest />
          <EduTest2 />
        </Microservices>
      </LMSProvider>
    </BrowserRouter>
  );
};

export default App;
