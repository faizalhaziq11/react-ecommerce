import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, FloatingLabel } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router';

const Login = () => {
    const [email, setEmail] = useState('johnd');
    const [password, setPassword] = useState('m38rmF$');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, perform authentication here
        console.log("Logging in with: ", email);
        navigate('/shop'); // Redirect to home/shop on submit
    };

    return (
        <div
            className="d-flex align-items-center justify-content-center"
            style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '20px'
            }}
        >
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12}>
                        <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
                            <Card.Body className="p-5">
                                <div className="text-center mb-4">
                                    <h2 className="fw-bold mb-1 text-dark">Welcome Back</h2>
                                    <p className="text-muted">Please sign in to your account</p>
                                </div>

                                <Form onSubmit={handleSubmit}>
                                    <FloatingLabel
                                        controlId="floatingEmail"
                                        label="Username / Email address"
                                        className="mb-3 text-secondary"
                                    >
                                        <Form.Control
                                            type="text"
                                            placeholder="username / name@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="rounded-3"
                                        />
                                    </FloatingLabel>

                                    <FloatingLabel
                                        controlId="floatingPassword"
                                        label="Password"
                                        className="mb-4 text-secondary"
                                    >
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="rounded-3"
                                        />
                                    </FloatingLabel>

                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <Form.Check
                                            type="checkbox"
                                            id="remember-me"
                                            label="Remember me"
                                            className="text-muted small"
                                        />
                                        <a href="#" onClick={(e) => e.preventDefault()} className="text-decoration-none small fw-semibold" style={{ color: '#764ba2' }}>
                                            Forgot password?
                                        </a>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-100 py-2 fs-5 rounded-3 fw-bold shadow-sm"
                                        style={{ background: 'linear-gradient(to right, #667eea, #764ba2)', border: 'none' }}
                                    >
                                        Sign In
                                    </Button>
                                </Form>

                                <div className="text-center mt-4">
                                    <p className="text-muted small mb-0">
                                        Don't have an account? <Link to="/" className="fw-semibold text-decoration-none" style={{ color: '#667eea' }}>Sign up</Link>
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;