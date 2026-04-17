import { createBrowserRouter } from 'react-router';
import App from './App';
import Products from './components/Products';
import Login from './components/Login';
import Checkout from './components/Checkout';
import Home from './components/Home';
import useCartStore from './store/cartStore';
import { Navigate } from 'react-router';

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
