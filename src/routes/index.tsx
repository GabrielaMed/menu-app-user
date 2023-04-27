import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Product } from '../pages/Product';
import { Cart } from '../pages/Cart';

export const AppRoutes = () => (
  <Routes>
    <Route path='/:companyId' element={<Home />} />
    <Route path='/:companyId/product/:productId' element={<Product />} />
    <Route path='/:companyId/cart' element={<Cart />} />
  </Routes>
);
