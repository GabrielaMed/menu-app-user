import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Product } from '../pages/Product';

export const AppRoutes = () => (
  <Routes>
    <Route path='/:companyId' element={<Home />} />
    <Route path='/:companyId/product/:productId' element={<Product />} />
  </Routes>
);
