import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, FloatingLabel, ListGroup, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import useCartStore from '../store/cartStore';

const Checkout = () => {
    const { cartItems, totalCartPrice, clearCart } = useCartStore();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        cardName: '',
        cardNumber: '',
        expDate: '',
        cvv: ''
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real application, you would handle payment processing here
        alert('Order placed successfully! Thank you for your purchase.');
        clearCart();
        navigate('/');
    };

    return (
        <div className="bg-light min-vh-100 py-5" style={{ fontFamily: '"Inter", "Roboto", system-ui, sans-serif' }}>
            <Container>
                <div className="text-center mb-5">
                    <h1 className="fw-bold text-dark display-5">Secure Checkout</h1>
                    <p className="text-muted">Complete your order below</p>
                </div>

                <Row className="g-5">
                    {/* Left Column - Forms */}
                    <Col lg={8}>
                        <Form onSubmit={handleSubmit}>
                            {/* Contact Info Card */}
                            <Card className="shadow-sm border-0 rounded-4 mb-4">
                                <Card.Body className="p-4 p-md-5">
                                    <h4 className="fw-bold mb-4 text-dark">1. Contact & Shipping</h4>

                                    <Row className="g-3 mb-3">
                                        <Col md={6}>
                                            <FloatingLabel controlId="firstName" label="First Name" className="text-secondary">
                                                <Form.Control type="text" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} required className="rounded-3" />
                                            </FloatingLabel>
                                        </Col>
                                        <Col md={6}>
                                            <FloatingLabel controlId="lastName" label="Last Name" className="text-secondary">
                                                <Form.Control type="text" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} required className="rounded-3" />
                                            </FloatingLabel>
                                        </Col>
                                    </Row>

                                    <FloatingLabel controlId="email" label="Email Address" className="mb-3 text-secondary">
                                        <Form.Control type="email" placeholder="name@example.com" value={formData.email} onChange={handleInputChange} required className="rounded-3" />
                                    </FloatingLabel>

                                    <FloatingLabel controlId="address" label="Street Address" className="mb-3 text-secondary">
                                        <Form.Control type="text" placeholder="1234 Main St" value={formData.address} onChange={handleInputChange} required className="rounded-3" />
                                    </FloatingLabel>

                                    <Row className="g-3">
                                        <Col md={8}>
                                            <FloatingLabel controlId="city" label="City" className="text-secondary">
                                                <Form.Control type="text" placeholder="City" value={formData.city} onChange={handleInputChange} required className="rounded-3" />
                                            </FloatingLabel>
                                        </Col>
                                        <Col md={4}>
                                            <FloatingLabel controlId="zip" label="Zip Code" className="text-secondary">
                                                <Form.Control type="text" placeholder="Zip" value={formData.zip} onChange={handleInputChange} required className="rounded-3" />
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                            {/* Payment Info Card */}
                            <Card className="shadow-sm border-0 rounded-4 mb-4">
                                <Card.Body className="p-4 p-md-5">
                                    <h4 className="fw-bold mb-4 text-dark">2. Payment Details</h4>

                                    <FloatingLabel controlId="cardName" label="Name on Card" className="mb-3 text-secondary">
                                        <Form.Control type="text" placeholder="Name on Card" value={formData.cardName} onChange={handleInputChange} required className="rounded-3" />
                                    </FloatingLabel>

                                    <FloatingLabel controlId="cardNumber" label="Card Number" className="mb-3 text-secondary">
                                        <Form.Control type="text" placeholder="0000 0000 0000 0000" value={formData.cardNumber} onChange={handleInputChange} required className="rounded-3" />
                                    </FloatingLabel>

                                    <Row className="g-3">
                                        <Col md={6}>
                                            <FloatingLabel controlId="expDate" label="Expiration (MM/YY)" className="text-secondary">
                                                <Form.Control type="text" placeholder="MM/YY" value={formData.expDate} onChange={handleInputChange} required className="rounded-3" />
                                            </FloatingLabel>
                                        </Col>
                                        <Col md={6}>
                                            <FloatingLabel controlId="cvv" label="CVV" className="text-secondary">
                                                <Form.Control type="text" placeholder="123" value={formData.cvv} onChange={handleInputChange} required className="rounded-3" />
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                            <Button
                                type="submit"
                                className="w-100 py-3 fs-5 rounded-4 shadow-sm fw-bold mb-4 mb-lg-0"
                                style={{ background: 'linear-gradient(to right, #2b5876, #4e4376)', border: 'none' }}
                            >
                                Place Order - ${totalCartPrice.toFixed(2)}
                            </Button>
                        </Form>
                    </Col>

                    {/* Right Column - Order Summary */}
                    <Col lg={4}>
                        <Card className="shadow-sm border-0 rounded-4 position-sticky" style={{ top: '2rem' }}>
                            <Card.Header className="bg-white border-bottom-0 pt-4 pb-0 px-4">
                                <h5 className="fw-bold mb-0 d-flex justify-content-between align-items-center text-dark">
                                    Order Summary
                                    <Badge bg="primary" pill style={{ background: 'linear-gradient(to right, #2b5876, #4e4376)' }}>
                                        {cartItems.length}
                                    </Badge>
                                </h5>
                            </Card.Header>
                            <Card.Body className="p-4">
                                <ListGroup variant="flush" className="mb-3">
                                    {cartItems.length === 0 ? (
                                        <p className="text-muted text-center my-3">Your cart is empty.</p>
                                    ) : (
                                        cartItems.map((item, index) => (
                                            <ListGroup.Item key={index} className="px-0 d-flex justify-content-between align-items-center lh-sm bg-transparent border-light">
                                                <div className="pe-3">
                                                    <h6 className="my-0 fw-semibold text-dark">{item.title || item.name || `Product ${item.id}`}</h6>
                                                    <small className="text-muted">Qty: {item.count}</small>
                                                </div>
                                                <span className="text-secondary fw-semibold">${(item.price * item.count).toFixed(2)}</span>
                                            </ListGroup.Item>
                                        ))
                                    )}
                                </ListGroup>

                                <div className="border-top pt-3 d-flex justify-content-between align-items-center mt-3">
                                    <span className="fw-bold fs-5 text-dark">Total</span>
                                    <strong className="fs-4 d-block" style={{ color: '#2b5876' }}>${totalCartPrice.toFixed(2)}</strong>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Checkout;
