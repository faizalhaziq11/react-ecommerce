import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { useBlocker, useNavigate } from 'react-router';
import useCartStore from '../store/cartStore';
import { formatPrice } from '../helper/format';

const Field = ({ id, label, error, className = '', ...props }) => (
    <FloatingLabel controlId={id} label={label} className={`text-secondary ${className}`}>
        <Form.Control name={id} placeholder={label} required className="rounded-3" {...props} />
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </FloatingLabel>
);

const EMPTY_FORM = {
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
};

const Checkout = () => {
    const cartItems = useCartStore((state) => state.cartItems);
    const totalCartItem = useCartStore((state) => state.totalCartItem);
    const totalCartPrice = useCartStore((state) => state.totalCartPrice);
    const clearCart = useCartStore((state) => state.clearCart);
    const navigate = useNavigate();

    const [submitted, setSubmitted] = useState(false);
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState(EMPTY_FORM);

    const isDirty = !submitted && Object.values(formData).some((v) => v.trim() !== '');

    // Warn before leaving with unsaved details (in-app navigation)
    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) => isDirty && currentLocation.pathname !== nextLocation.pathname
    );

    useEffect(() => {
        if (blocker.state !== 'blocked') return;
        if (window.confirm('You have unsaved checkout details. Leave this page?')) {
            blocker.proceed();
        } else {
            blocker.reset();
        }
    }, [blocker]);

    // Warn before leaving with unsaved details (reload / close tab)
    useEffect(() => {
        if (!isDirty) return;
        const handler = (e) => {
            e.preventDefault();
            e.returnValue = '';
        };
        window.addEventListener('beforeunload', handler);
        return () => window.removeEventListener('beforeunload', handler);
    }, [isDirty]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (!form.checkValidity()) {
            setValidated(true);
            form.querySelector(':invalid')?.focus();
            return;
        }
        setSubmitted(true);
    };

    const handleContinue = () => {
        clearCart();
        navigate('/');
    };

    if (submitted) {
        return (
            <div className="bg-light py-5">
                <Container>
                    <Card className="shadow-sm border-0 rounded-4 text-center mx-auto animate-fade-in-up" style={{ maxWidth: '520px' }}>
                        <Card.Body className="p-5" aria-live="polite">
                            <div className="text-success mb-3">
                                <i className="bi bi-check-circle-fill" style={{ fontSize: '4rem' }} aria-hidden="true"></i>
                            </div>
                            <h1 className="h2 fw-bold text-dark mb-2">Order Placed!</h1>
                            <p className="text-muted mb-4">Thank you for your purchase. A confirmation email is on its way.</p>
                            <Button className="btn-gradient rounded-pill px-4 py-2 fw-bold" onClick={handleContinue}>
                                Continue Shopping
                            </Button>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }

    const fieldProps = (id) => ({ id, value: formData[id], onChange: handleInputChange });

    return (
        <div className="bg-light py-5">
            <Container>
                <div className="text-center mb-5">
                    <h1 className="fw-bold text-dark display-5">Secure Checkout</h1>
                    <p className="text-muted">Complete your order below</p>
                </div>

                <Row className="g-5">
                    {/* Left Column - Forms */}
                    <Col lg={8}>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            {/* Contact Info Card */}
                            <Card className="shadow-sm border-0 rounded-4 mb-4">
                                <Card.Body className="p-4 p-md-5">
                                    <h2 className="h4 fw-bold mb-4 text-dark">1. Contact &amp; Shipping</h2>

                                    <Row className="g-3 mb-3">
                                        <Col md={6}>
                                            <Field {...fieldProps('firstName')} label="First Name" type="text" autoComplete="given-name" error="Enter your first name." />
                                        </Col>
                                        <Col md={6}>
                                            <Field {...fieldProps('lastName')} label="Last Name" type="text" autoComplete="family-name" error="Enter your last name." />
                                        </Col>
                                    </Row>

                                    <Field
                                        {...fieldProps('email')}
                                        label="Email Address"
                                        type="email"
                                        autoComplete="email"
                                        spellCheck={false}
                                        autoCapitalize="none"
                                        className="mb-3"
                                        error="Enter a valid email, e.g. name@example.com."
                                    />

                                    <Field {...fieldProps('address')} label="Street Address" type="text" autoComplete="street-address" className="mb-3" error="Enter your street address." />

                                    <Row className="g-3">
                                        <Col md={8}>
                                            <Field {...fieldProps('city')} label="City" type="text" autoComplete="address-level2" error="Enter your city." />
                                        </Col>
                                        <Col md={4}>
                                            <Field
                                                {...fieldProps('zip')}
                                                label="Zip Code"
                                                type="text"
                                                inputMode="numeric"
                                                autoComplete="postal-code"
                                                pattern="\d{5}(-\d{4})?"
                                                error="Enter a 5-digit zip, e.g. 10001."
                                            />
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                            {/* Payment Info Card */}
                            <Card className="shadow-sm border-0 rounded-4 mb-4">
                                <Card.Body className="p-4 p-md-5">
                                    <h2 className="h4 fw-bold mb-4 text-dark">2. Payment Details</h2>

                                    <Field {...fieldProps('cardName')} label="Name on Card" type="text" autoComplete="cc-name" className="mb-3" error="Enter the name shown on your card." />

                                    <Field
                                        {...fieldProps('cardNumber')}
                                        label="Card Number"
                                        type="text"
                                        inputMode="numeric"
                                        autoComplete="cc-number"
                                        pattern="[\d ]{12,23}"
                                        className="mb-3"
                                        error="Enter a 12–19 digit card number."
                                    />

                                    <Row className="g-3">
                                        <Col md={6}>
                                            <Field
                                                {...fieldProps('expDate')}
                                                label="Expiration (MM/YY)"
                                                type="text"
                                                inputMode="numeric"
                                                autoComplete="cc-exp"
                                                pattern="(0[1-9]|1[0-2])\/\d{2}"
                                                error="Use MM/YY, e.g. 08/28."
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <Field
                                                {...fieldProps('cvv')}
                                                label="CVV"
                                                type="text"
                                                inputMode="numeric"
                                                autoComplete="cc-csc"
                                                pattern="\d{3,4}"
                                                error="Enter the 3–4 digit code on the back of your card."
                                            />
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                            <Button
                                type="submit"
                                className="btn-gradient w-100 py-3 fs-5 rounded-4 shadow-sm fw-bold mb-4 mb-lg-0"
                            >
                                Place Order – <span className="tabular-nums">{formatPrice(totalCartPrice)}</span>
                            </Button>
                        </Form>
                    </Col>

                    {/* Right Column - Order Summary */}
                    <Col lg={4}>
                        <Card className="shadow-sm border-0 rounded-4 position-sticky" style={{ top: '5rem' }}>
                            <Card.Header className="bg-white border-bottom-0 pt-4 pb-0 px-4">
                                <h2 className="h5 fw-bold mb-0 d-flex justify-content-between align-items-center text-dark">
                                    Order Summary
                                    <Badge bg="primary" pill style={{ background: 'linear-gradient(45deg, #ff512f, #dd2476)', border: 'none' }}>
                                        <span className="tabular-nums">{totalCartItem}</span>
                                        <span className="visually-hidden"> items</span>
                                    </Badge>
                                </h2>
                            </Card.Header>
                            <Card.Body className="p-4">
                                {cartItems.length === 0 ? (
                                    <p className="text-muted text-center my-3">Your cart is empty.</p>
                                ) : (
                                    <ListGroup variant="flush" className="mb-3">
                                        {cartItems.map((item) => (
                                            <ListGroup.Item key={item.id} className="px-0 d-flex justify-content-between align-items-center lh-sm bg-transparent border-light">
                                                <div className="pe-3 min-w-0">
                                                    <h3 className="h6 my-0 fw-semibold text-dark text-truncate">{item.title || item.name || `Product ${item.id}`}</h3>
                                                    <small className="text-muted">Qty: <span className="tabular-nums">{item.count}</span></small>
                                                </div>
                                                <span className="text-secondary fw-semibold tabular-nums">{formatPrice(item.price * item.count)}</span>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}

                                <div className="border-top pt-3 d-flex justify-content-between align-items-center mt-3">
                                    <span className="fw-bold fs-5 text-dark">Total</span>
                                    <strong className="fs-4 d-block tabular-nums" style={{ color: '#1e3c72' }}>{formatPrice(totalCartPrice)}</strong>
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
