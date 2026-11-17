import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import useCartStore from './store/cartStore';

const Home = lazy(() => import('./components/Home'));
const Products = lazy(() => import('./components/Products'));
const Login = lazy(() => import('./components/Login'));
const Checkout = lazy(() => import('./components/Checkout'));

const ProtectedRoute = ({ children }) => {
  const totalItem = useCartStore((state) => state.totalCartItem);

  if (totalItem === 0) {
    return <Navigate to="/" replace />;
  }

  return (<>
    {children}
  </>);
}


const router = createBrowserRouter([
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
  }
]);

export default router;
