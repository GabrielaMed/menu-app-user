import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { OrderProvider } from './shared/OrderContext';

const App = () => (
  <Router>
    <OrderProvider>
      <AppRoutes />
    </OrderProvider>
  </Router>
);

export default App;
