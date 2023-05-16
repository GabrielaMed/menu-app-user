import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Product } from '../pages/Product';
import { Cart } from '../pages/Cart';

export const AppRoutes = () => (
  <Routes>
    <Route path='/:companyIdURL/:tableNumberURL' element={<Home />} />
    <Route path='/' element={<Home />} />
    <Route path='/product' element={<Product />} />
    <Route path='/cart' element={<Cart />} />
  </Routes>
);
