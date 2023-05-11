import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalProvider } from './shared/GlobalContext';

const App = () => (
  <Router>
    <GlobalProvider>
      <AppRoutes />
    </GlobalProvider>
  </Router>
);

export default App;
