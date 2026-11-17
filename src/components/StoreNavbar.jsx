import { Link, NavLink } from 'react-router';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

const StoreNavbar = () => {
  return (
    <Navbar bg="white" expand="lg" sticky="top" className="py-3 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bolder fs-4" style={{ letterSpacing: '1px', color: '#1e3c72' }}>
          LUMI<span style={{ color: '#FF512F' }}>NEX</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="store-navbar-nav" />
        <Navbar.Collapse id="store-navbar-nav">
          <Nav className="ms-auto align-items-lg-center">
            <Nav.Link as={NavLink} to="/" end className="px-lg-3 fw-semibold">Home</Nav.Link>
            <Nav.Link as={Link} to="/#about" className="px-lg-3 fw-semibold">About</Nav.Link>
            <Nav.Link as={Link} to="/#services" className="px-lg-3 fw-semibold">Services</Nav.Link>
            <Nav.Link as={Link} to="/#contact" className="px-lg-3 fw-semibold">Contact</Nav.Link>
            <div className="ms-lg-3 mt-2 mt-lg-0">
              <Button as={Link} to="/shop" className="rounded-pill px-4 py-2 fw-bold shadow-sm btn-gradient">
                Shop Now
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default StoreNavbar;
