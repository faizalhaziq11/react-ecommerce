import { Outlet } from 'react-router';
import StoreNavbar from './StoreNavbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <a href="#main" className="skip-link visually-hidden-focusable">
        Skip to Main Content
      </a>
      <ScrollToTop />
      <StoreNavbar />
      <main id="main" tabIndex={-1} className="flex-grow-1 d-flex flex-column">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
