import { Navigate } from 'react-router';
import useCartStore from '../store/cartStore';

const ProtectedRoute = ({ children }) => {
  const totalItem = useCartStore((state) => state.totalCartItem);

  if (totalItem === 0) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
