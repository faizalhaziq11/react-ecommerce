import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Footer = () => {
  return (
    <footer id="contact" className="bg-dark text-white pt-5 pb-4">
      <Container>
        <Row className="g-4 g-lg-5 mb-4 pb-4 border-bottom border-secondary">
          <Col lg={4} md={6}>
            <h3 className="fw-bold mb-3" style={{ letterSpacing: '1px' }}>LUMI<span style={{ color: '#FF512F' }}>NEX</span></h3>
            <p className="opacity-75 pe-md-4 mb-4" style={{ lineHeight: '1.8' }}>
              Your premier destination for top-tier goods. We prioritize quality, sustainability, and an exceptional customer experience. Join our community today.
            </p>
            <div className="d-flex gap-3">
              <Button variant="outline-light" className="rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', padding: 0 }} aria-label="Facebook"><i className="bi bi-facebook"></i></Button>
              <Button variant="outline-light" className="rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', padding: 0 }} aria-label="Twitter"><i className="bi bi-twitter-x"></i></Button>
              <Button variant="outline-light" className="rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', padding: 0 }} aria-label="LinkedIn"><i className="bi bi-linkedin"></i></Button>
            </div>
          </Col>
          <Col lg={2} md={6} xs={6}>
            <h5 className="mb-3 fw-bold">Company</h5>
            <ul className="list-unstyled opacity-75 mb-0" style={{ lineHeight: '2.2' }}>
              <li><a href="#" className="text-white text-decoration-none">About Us</a></li>
              <li><a href="#" className="text-white text-decoration-none">Careers</a></li>
              <li><a href="#" className="text-white text-decoration-none">Privacy Policy</a></li>
              <li><a href="#" className="text-white text-decoration-none">Terms of Service</a></li>
            </ul>
          </Col>
          <Col lg={3} md={6} xs={6}>
            <h5 className="mb-3 fw-bold">Help & Support</h5>
            <ul className="list-unstyled opacity-75 mb-0" style={{ lineHeight: '2.2' }}>
              <li><a href="#" className="text-white text-decoration-none">Shipping & Returns</a></li>
              <li><a href="#" className="text-white text-decoration-none">FAQ</a></li>
              <li><a href="#" className="text-white text-decoration-none">Track Order</a></li>
              <li><a href="#" className="text-white text-decoration-none">Customer Care</a></li>
            </ul>
          </Col>
          <Col lg={3} md={6}>
            <h5 className="mb-3 fw-bold">Contact Us</h5>
            <ul className="list-unstyled opacity-75 mb-0" style={{ lineHeight: '2.2' }}>
              <li><strong>Email:</strong> support@luminex.com</li>
              <li><strong>Phone:</strong> +1 (555) 123-4567</li>
              <li className="mt-2"><strong>Address:</strong><br />123 Commerce St, Suite 100,<br />New York, NY 10001</li>
            </ul>
          </Col>
        </Row>
        <div className="text-center opacity-50 small">
          <p className="mb-0">&copy; {new Date().getFullYear()} Luminex Store. All rights reserved. Built with React & react-bootstrap.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
