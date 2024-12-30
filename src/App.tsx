/** @format */

import { BrowserRouter } from 'react-router-dom';
import { EduMLProvider } from './EduMLToolpad';

const App = () => {
  return (
    <BrowserRouter>
      <EduMLProvider></EduMLProvider>
    </BrowserRouter>
  );
};

export default App;
