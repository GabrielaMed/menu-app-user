import { Route, Routes } from 'react-router-dom';
import { UserHome } from '../pages/UserHome';

export const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<UserHome />} />
  </Routes>
);
