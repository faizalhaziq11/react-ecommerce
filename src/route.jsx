import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

const Home = lazy(() => import('./components/Home'));
const Products = lazy(() => import('./components/Products'));
const Login = lazy(() => import('./components/Login'));
const Checkout = lazy(() => import('./components/Checkout'));

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        path: '/',
        Component: Home,
      },
      {
        path: '/shop',
        Component: Products,
      },
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/checkout',
        element: <ProtectedRoute><Checkout /></ProtectedRoute>,
      },
    ],
  },
]);

export default router;
