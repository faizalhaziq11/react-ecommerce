import { Link } from 'react-router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const SOCIALS = [
  { label: 'Facebook', icon: 'bi-facebook', href: 'https://facebook.com' },
  { label: 'X (Twitter)', icon: 'bi-twitter-x', href: 'https://x.com' },
  { label: 'LinkedIn', icon: 'bi-linkedin', href: 'https://linkedin.com' },
];

const Footer = () => {
  return (
    <footer id="contact" className="bg-dark text-white pt-5 pb-4">
      <Container>
        <Row className="g-4 g-lg-5 mb-4 pb-4 border-bottom border-secondary">
          <Col lg={4} md={6}>
            <p className="h3 fw-bold mb-3" style={{ letterSpacing: '1px' }} translate="no">
              LUMI<span style={{ color: '#FF512F' }}>NEX</span>
            </p>
            <p className="opacity-75 pe-md-4 mb-4" style={{ lineHeight: '1.8' }}>
              Your premier destination for top-tier goods. We prioritize quality, sustainability, and an exceptional customer experience. Join our community today.
            </p>
            <div className="d-flex gap-3">
              {SOCIALS.map(({ label, icon, href }) => (
                <Button
                  key={label}
                  as="a"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline-light"
                  className="rounded-circle d-inline-flex align-items-center justify-content-center"
                  style={{ width: '40px', height: '40px', padding: 0 }}
                  aria-label={label}
                >
                  <i className={`bi ${icon}`} aria-hidden="true"></i>
                </Button>
              ))}
            </div>
          </Col>
          <Col lg={2} md={6} xs={6}>
            <h2 className="h5 mb-3 fw-bold">Company</h2>
            <ul className="list-unstyled opacity-75 mb-0" style={{ lineHeight: '2.2' }}>
              <li><Link to="/#about" className="footer-link">About Us</Link></li>
              <li>Careers</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </Col>
          <Col lg={3} md={6} xs={6}>
            <h2 className="h5 mb-3 fw-bold">Help &amp; Support</h2>
            <ul className="list-unstyled opacity-75 mb-0" style={{ lineHeight: '2.2' }}>
              <li>Shipping &amp; Returns</li>
              <li>FAQ</li>
              <li>Track Order</li>
              <li><a href="mailto:support@luminex.com" className="footer-link">Customer Care</a></li>
            </ul>
          </Col>
          <Col lg={3} md={6}>
            <h2 className="h5 mb-3 fw-bold">Contact Us</h2>
            <ul className="list-unstyled opacity-75 mb-0" style={{ lineHeight: '2.2' }}>
              <li>
                <strong>Email:</strong>{' '}
                <a href="mailto:support@luminex.com" className="footer-link text-break">support@luminex.com</a>
              </li>
              <li>
                <strong>Phone:</strong>{' '}
                <a href="tel:+15551234567" className="footer-link">+1&nbsp;(555)&nbsp;123-4567</a>
              </li>
              <li className="mt-2"><strong>Address:</strong><br />123 Commerce St, Suite 100,<br />New York, NY 10001</li>
            </ul>
          </Col>
        </Row>
        <div className="text-center opacity-50 small">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} <span translate="no">Luminex</span> Store. All rights reserved. Built with React &amp; react-bootstrap.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
