import { Outlet } from 'react-router';
import StoreNavbar from './StoreNavbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <ScrollToTop />
      <StoreNavbar />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
