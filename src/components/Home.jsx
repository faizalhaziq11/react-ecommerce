import React from 'react';
import { Container, Row, Col, Button, Navbar, Nav, Card, Carousel, Badge } from 'react-bootstrap';
import { Link } from 'react-router';

const Home = () => {
    return (
        <div style={{ fontFamily: '"Inter", "Roboto", system-ui, sans-serif' }}>
            {/* 1. Navigation Menu */}
            <Navbar bg="white" expand="lg" sticky="top" className="py-3 shadow-sm">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="fw-bolder fs-4" style={{ letterSpacing: '1px', color: '#1e3c72' }}>
                        LUMI<span style={{ color: '#FF512F' }}>NEX</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto align-items-center">
                            <Nav.Link as={Link} to="/" className="px-3 fw-semibold text-dark">Home</Nav.Link>
                            <Nav.Link href="#about" className="px-3 fw-semibold text-dark">About</Nav.Link>
                            <Nav.Link href="#services" className="px-3 fw-semibold text-dark">Services</Nav.Link>
                            <Nav.Link href="#contact" className="px-3 fw-semibold text-dark">Contact</Nav.Link>
                            <Link to="/shop">
                                <Button className="ms-3 rounded-pill px-4 py-2 fw-bold shadow-sm" style={{ background: 'linear-gradient(45deg, #FF512F, #DD2476)', border: 'none' }}>
                                    Shop Now
                                </Button>
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* 4. Visual Elements & 2. Call-to-Action (Hero Section) */}
            <section className="position-relative d-flex align-items-center" style={{ 
                minHeight: '90vh', 
                background: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1920) center/cover no-repeat',
                clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)'
            }}>
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark" style={{ opacity: 0.7 }}></div>
                <Container className="position-relative z-1 text-white">
                    <Row>
                        <Col lg={8} md={10}>
                            <Badge className="mb-3 px-3 py-2 rounded-pill fs-6 fw-semibold mb-4" style={{ background: 'linear-gradient(45deg, #FF512F, #DD2476)' }}>
                                New Collection 2026
                            </Badge>
                            <h1 className="display-2 fw-bolder mb-4 text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)', lineHeight: '1.1' }}>
                                Discover Your Signature Style
                            </h1>
                            <p className="lead fw-normal mb-5" style={{ fontSize: '1.25rem', maxWidth: '600px', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                                Explore our curated collection of premium products designed to elevate your everyday life. Uncompromising quality meets modern design.
                            </p>
                            <div className="d-flex flex-wrap gap-3">
                                <Link to="/shop">
                                    <Button size="lg" className="rounded-pill px-5 py-3 fw-bold shadow-lg" style={{ background: 'linear-gradient(45deg, #FF512F, #DD2476)', border: 'none' }}>
                                        Explore Collection
                                    </Button>
                                </Link>
                                <Button size="lg" variant="outline-light" href="#about" className="rounded-pill px-5 py-3 fw-bold">
                                    Our Story
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* 6. Content Highlights (Categories/Blog) */}
            <section id="services" className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
                <Container className="py-5">
                    <div className="text-center mb-5">
                        <Badge bg="dark" className="px-3 py-2 rounded-pill fs-7 mb-3">Trending</Badge>
                        <h2 className="display-5 fw-bold text-dark">Most Sought-After Collections</h2>
                        <p className="text-muted fs-5">Explore our top product categories this season</p>
                    </div>
                    <Row className="g-4">
                        {[
                            { title: 'Tech Gadgets', desc: 'Cutting-edge innovation.', img: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=800' },
                            { title: 'Fashion & Apparel', desc: 'Trend-setting designs.', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800' },
                            { title: 'Home Decor', desc: 'Elevate your space.', img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800' }
                        ].map((cat, idx) => (
                            <Col md={4} key={idx}>
                                <Link to="/shop" className="text-decoration-none">
                                    <Card className="border-0 shadow-lg rounded-4 overflow-hidden h-100 text-white border-0 position-relative category-card">
                                        <div style={{ height: '350px', background: '#000' }}>
                                            <Card.Img src={cat.img} style={{ objectFit: 'cover', height: '100%', width: '100%', opacity: '0.7', transition: 'opacity 0.3s' }} />
                                            <Card.ImgOverlay className="d-flex flex-column justify-content-end p-4 bg-gradient">
                                                <Card.Title className="fs-3 fw-bold mb-1 text-white">{cat.title}</Card.Title>
                                                <Card.Text className="fw-semibold pb-2 text-white-50">{cat.desc}</Card.Text>
                                            </Card.ImgOverlay>
                                        </div>
                                    </Card>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* About / CTA Section */}
            <section id="about" className="py-5 my-5">
                <Container>
                    <Row className="align-items-center g-5">
                        <Col lg={6}>
                            <div className="position-relative p-2">
                                <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary rounded-5" style={{ opacity: 0.1, transform: 'translate(-20px, 20px)' }}></div>
                                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" alt="About Us" className="img-fluid rounded-5 shadow-lg position-relative" />
                            </div>
                        </Col>
                        <Col lg={6} className="ps-lg-5">
                            <Badge className="px-3 py-2 rounded-pill fs-7 mb-3 text-dark bg-light border border-secondary shadow-sm">About Us</Badge>
                            <h2 className="display-4 fw-bold text-dark mb-4" style={{ lineHeight: '1.2' }}>Crafting digital experiences since 2026</h2>
                            <p className="lead text-muted mb-4">
                                We believe in keeping things simple, elegant, and user-focused. Our mission is to provide you with the best products without compromising on style or functionality. Our curated selection undergoes strict quality control.
                            </p>
                            <Button size="lg" variant="dark" href="#contact" className="rounded-pill px-5 py-3 shadow mt-3 fw-bold">Get in Touch</Button>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* 3. Social Proof (Testimonials) */}
            <section className="py-5 text-white position-relative" style={{ background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', clipPath: 'polygon(0 10%, 100% 0, 100% 100%, 0 90%)', padding: '100px 0' }}>
                <Container className="py-5">
                    <Row className="justify-content-center text-center mb-5">
                        <Col md={8}>
                            <h2 className="display-5 fw-bold mb-3">Loved By Thousands</h2>
                            <p className="lead opacity-75">Don't just take our word for it. Here is what our customers are saying.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={10} className="mx-auto">
                            <Carousel indicators={false} controls={true} className="pb-4">
                                {[
                                    { q: "This store completely changed how I shop. The quality is unmatched and delivery was lightning fast! The website was beautiful and extremely easy to navigate.", author: "Sarah Jenkins", role: "Verified Buyer" },
                                    { q: "I've never been so impressed by customer service. They went above and beyond to ensure I got exactly what I needed. Will definitely buy again.", author: "Marcus Thorne", role: "Long-time Customer" },
                                    { q: "The checkout process was incredibly smooth, and the products received were precisely as described. A highly recommended, premium digital shopping experience.", author: "Elena Rodriguez", role: "Verified Buyer" }
                                ].map((test, index) => (
                                    <Carousel.Item key={index} className="text-center px-lg-5">
                                        <div className="mb-4">
                                            {[1,2,3,4,5].map(star => <span key={star} className="text-warning mx-1 fs-3">★</span>)}
                                        </div>
                                        <h3 className="fw-normal fst-italic mb-5" style={{ lineHeight: '1.6' }}>"{test.q}"</h3>
                                        <div className="fw-bold fs-5">{test.author}</div>
                                        <div className="opacity-75">{test.role}</div>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* 5. Footer */}
            <footer id="contact" className="bg-dark text-white pt-5 pb-4 mt-5">
                <Container>
                    <Row className="g-5 mb-5 pb-4 border-bottom border-secondary">
                        <Col lg={4} md={6}>
                            <h3 className="fw-bold mb-4" style={{ letterSpacing: '1px' }}>LUMI<span style={{ color: '#FF512F' }}>NEX</span></h3>
                            <p className="opacity-75 pe-md-4 mb-4" style={{ lineHeight: '1.8' }}>
                                Your premier destination for top-tier goods. We prioritize quality, sustainability, and an exceptional customer experience. Join our community today.
                            </p>
                            <div className="d-flex gap-3">
                                <Button variant="outline-light" className="rounded-circle" style={{ width: '40px', height: '40px', padding: 0 }}>f</Button>
                                <Button variant="outline-light" className="rounded-circle" style={{ width: '40px', height: '40px', padding: 0 }}>t</Button>
                                <Button variant="outline-light" className="rounded-circle" style={{ width: '40px', height: '40px', padding: 0 }}>in</Button>
                            </div>
                        </Col>
                        <Col lg={2} md={6} xs={6}>
                            <h5 className="mb-4 fw-bold">Company</h5>
                            <ul className="list-unstyled opacity-75" style={{ lineHeight: '2.2' }}>
                                <li><a href="#" className="text-white text-decoration-none">About Us</a></li>
                                <li><a href="#" className="text-white text-decoration-none">Careers</a></li>
                                <li><a href="#" className="text-white text-decoration-none">Privacy Policy</a></li>
                                <li><a href="#" className="text-white text-decoration-none">Terms of Service</a></li>
                            </ul>
                        </Col>
                        <Col lg={3} md={6} xs={6}>
                            <h5 className="mb-4 fw-bold">Help & Support</h5>
                            <ul className="list-unstyled opacity-75" style={{ lineHeight: '2.2' }}>
                                <li><a href="#" className="text-white text-decoration-none">Shipping & Returns</a></li>
                                <li><a href="#" className="text-white text-decoration-none">FAQ</a></li>
                                <li><a href="#" className="text-white text-decoration-none">Track Order</a></li>
                                <li><a href="#" className="text-white text-decoration-none">Customer Care</a></li>
                            </ul>
                        </Col>
                        <Col lg={3} md={6}>
                            <h5 className="mb-4 fw-bold">Contact Us</h5>
                            <ul className="list-unstyled opacity-75" style={{ lineHeight: '2.2' }}>
                                <li><strong>Email:</strong> support@luminex.com</li>
                                <li><strong>Phone:</strong> +1 (555) 123-4567</li>
                                <li className="mt-2"><strong>Address:</strong><br/>123 Commerce St, Suite 100,<br/>New York, NY 10001</li>
                            </ul>
                        </Col>
                    </Row>
                    <div className="text-center opacity-50 small">
                        <p className="mb-0">&copy; {new Date().getFullYear()} Luminex Store. All rights reserved. Built with React & react-bootstrap.</p>
                    </div>
                </Container>
            </footer>
        </div>
    );
};

export default Home;
