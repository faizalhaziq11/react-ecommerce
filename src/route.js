import { createBrowserRouter } from 'react-router';
import App from './App';
import Products from './components/Products';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
  },
  {
    path: '/products',
    Component: Products,
  },
]);

export default router;
