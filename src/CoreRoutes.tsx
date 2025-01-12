/** @format */

import { Route, Routes } from 'react-router-dom';
import Home from './LMSToolpad/components/Home';

const CoreRoutes = () => {
  return (
    <Routes>
      <Route path='' element={<Home />} index />
      <Route path='/help' element={<div>Help</div>} />
      <Route path='/contact' element={<div>Contact</div>} />
    </Routes>
  );
};

export default CoreRoutes;
