import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import './Home.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Badge from 'react-bootstrap/Badge';

const CATEGORIES = [
    { title: 'Tech Gadgets', desc: 'Cutting-edge innovation.', img: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=800' },
    { title: 'Fashion & Apparel', desc: 'Trend-setting designs.', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800' },
    { title: 'Home Decor', desc: 'Elevate your space.', img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800' }
];

const TESTIMONIALS = [
    { q: 'This store completely changed how I shop. The quality is unmatched and delivery was lightning fast! The website was beautiful and extremely easy to navigate.', author: 'Sarah Jenkins', role: 'Verified Buyer' },
    { q: 'I’ve never been so impressed by customer service. They went above and beyond to ensure I got exactly what I needed. Will definitely buy again.', author: 'Marcus Thorne', role: 'Long-time Customer' },
    { q: 'The checkout process was incredibly smooth, and the products received were precisely as described. A highly recommended, premium digital shopping experience.', author: 'Elena Rodriguez', role: 'Verified Buyer' }
];

const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    }
};

const Home = () => {
    const { hash } = useLocation();
    const [carouselPaused, setCarouselPaused] = useState(prefersReducedMotion);

    useEffect(() => {
        const els = document.querySelectorAll('.reveal');
        if (!('IntersectionObserver' in window)) {
            els.forEach((el) => el.classList.add('is-visible'));
            return;
        }
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    useEffect(() => {
        if (hash) scrollToId(hash.replace('#', ''));
    }, [hash]);

    return (
        <div className="home">
            {/* Hero */}
            <section
                className="position-relative d-flex align-items-center overflow-hidden"
                style={{ minHeight: '90vh', clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)' }}
            >
                <img
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1920"
                    alt=""
                    width={1920}
                    height={1280}
                    fetchPriority="high"
                    className="hero-img position-absolute top-0 start-0 w-100 h-100"
                />
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark" style={{ opacity: 0.7 }} aria-hidden="true"></div>
                <Container className="position-relative z-1 text-white">
                    <Row>
                        <Col lg={8} md={10} className="reveal">
                            <Badge className="px-3 py-2 rounded-pill fs-6 fw-semibold mb-4" style={{ background: 'linear-gradient(45deg, #FF512F, #DD2476)' }}>
                                New Collection 2026
                            </Badge>
                            <h1 className="display-2 fw-bolder mb-4 text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)', lineHeight: '1.1' }}>
                                Discover Your Signature Style
                            </h1>
                            <p className="lead fw-normal mb-5" style={{ fontSize: '1.25rem', maxWidth: '600px', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                                Explore our curated collection of premium products designed to elevate your everyday life. Uncompromising quality meets modern design.
                            </p>
                            <div className="d-flex flex-wrap gap-3">
                                <Button as={Link} to="/shop" size="lg" className="rounded-pill px-5 py-3 fw-bold shadow-lg btn-gradient">
                                    Explore Collection
                                </Button>
                                <Button size="lg" variant="outline-light" onClick={() => scrollToId('about')} className="rounded-pill px-5 py-3 fw-bold">
                                    Our Story
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Categories */}
            <section id="services" className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
                <Container className="py-5">
                    <div className="text-center mb-5 reveal">
                        <Badge bg="dark" className="px-3 py-2 rounded-pill fs-7 mb-3">Trending</Badge>
                        <h2 className="display-5 fw-bold text-dark">Most Sought-After Collections</h2>
                        <p className="text-muted fs-5">Explore our top product categories this season</p>
                    </div>
                    <Row className="g-4">
                        {CATEGORIES.map((cat, idx) => (
                            <Col md={4} key={cat.title}>
                                <Link to="/shop" className="category-link text-decoration-none">
                                    <Card className="border-0 shadow-lg rounded-4 overflow-hidden h-100 text-white position-relative category-card reveal" style={{ transitionDelay: `${idx * 80}ms` }}>
                                        <div style={{ height: '350px', background: '#000' }}>
                                            <Card.Img
                                                src={cat.img}
                                                alt=""
                                                width={800}
                                                height={600}
                                                loading="lazy"
                                                className="category-img"
                                                style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                                            />
                                            <Card.ImgOverlay className="d-flex flex-column justify-content-end p-4 bg-gradient">
                                                <Card.Title as="h3" className="fs-3 fw-bold mb-1 text-white">{cat.title}</Card.Title>
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

            {/* About / CTA */}
            <section id="about" className="py-5 my-5">
                <Container>
                    <Row className="align-items-center g-5">
                        <Col lg={6} className="reveal">
                            <div className="position-relative p-2">
                                <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary rounded-5" style={{ opacity: 0.1, transform: 'translate(-20px, 20px)' }} aria-hidden="true"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
                                    alt="Our team collaborating around a table with laptops"
                                    width={800}
                                    height={533}
                                    loading="lazy"
                                    className="img-fluid rounded-5 shadow-lg position-relative"
                                />
                            </div>
                        </Col>
                        <Col lg={6} className="ps-lg-5 reveal" style={{ transitionDelay: '80ms' }}>
                            <Badge className="px-3 py-2 rounded-pill fs-7 mb-3 text-dark bg-light border border-secondary shadow-sm">About Us</Badge>
                            <h2 className="display-4 fw-bold text-dark mb-4" style={{ lineHeight: '1.2' }}>Crafting Digital Experiences Since 2026</h2>
                            <p className="lead text-muted mb-4">
                                We believe in keeping things simple, elegant, and user-focused. Our mission is to provide you with the best products without compromising on style or functionality. Our curated selection undergoes strict quality control.
                            </p>
                            <Button size="lg" variant="dark" onClick={() => scrollToId('contact')} className="rounded-pill px-5 py-3 shadow mt-3 fw-bold">Get in Touch</Button>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Testimonials */}
            <section className="py-5 text-white position-relative" style={{ background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', clipPath: 'polygon(0 10%, 100% 0, 100% 100%, 0 90%)', padding: '100px 0' }}>
                <Container className="py-5">
                    <Row className="justify-content-center text-center mb-5">
                        <Col md={8} className="reveal">
                            <h2 className="display-5 fw-bold mb-3">Loved By Thousands</h2>
                            <p className="lead opacity-75">Don’t just take our word for it. Here’s what our customers are saying.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={10} className="mx-auto reveal" style={{ transitionDelay: '80ms' }}>
                            <Carousel
                                indicators={false}
                                controls={true}
                                interval={carouselPaused ? null : 6000}
                                pause="hover"
                                className="pb-4"
                            >
                                {TESTIMONIALS.map((test) => (
                                    <Carousel.Item key={test.author} className="text-center px-4 px-lg-5">
                                        <figure className="mb-0">
                                            <div className="mb-4">
                                                <span className="visually-hidden">Rated 5 out of 5 stars</span>
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <span key={star} className="text-warning mx-1 fs-3" aria-hidden="true">★</span>
                                                ))}
                                            </div>
                                            <blockquote className="mb-5">
                                                <p className="h3 fw-normal fst-italic" style={{ lineHeight: '1.6' }}>“{test.q}”</p>
                                            </blockquote>
                                            <figcaption>
                                                <div className="fw-bold fs-5">{test.author}</div>
                                                <div className="opacity-75">{test.role}</div>
                                            </figcaption>
                                        </figure>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                            <div className="text-center">
                                <Button
                                    variant="outline-light"
                                    size="sm"
                                    className="rounded-pill px-3"
                                    aria-pressed={carouselPaused}
                                    onClick={() => setCarouselPaused((p) => !p)}
                                >
                                    <i className={`bi ${carouselPaused ? 'bi-play-fill' : 'bi-pause-fill'} me-1`} aria-hidden="true"></i>
                                    {carouselPaused ? 'Play Testimonials' : 'Pause Testimonials'}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default Home;
