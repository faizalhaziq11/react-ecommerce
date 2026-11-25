import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useNavigate, Link } from 'react-router';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [resetNotice, setResetNotice] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, perform authentication here
        navigate('/shop');
    };

    return (
        <div
            className="d-flex flex-grow-1 align-items-center justify-content-center"
            style={{
                background: 'linear-gradient(135deg, #ff512f 0%, #dd2476 100%)',
                padding: '40px 16px',
            }}
        >
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} sm={10} md={8} lg={6} xl={5}>
                        <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
                            <Card.Body className="p-4 p-md-5">
                                <div className="text-center mb-4">
                                    <h1 className="h2 fw-bold mb-1 text-dark">Welcome Back</h1>
                                    <p className="text-muted mb-1">Sign in to your account</p>
                                    <p className="small text-muted mb-0">
                                        Demo account: <code translate="no">johnd</code> / <code translate="no">m38rmF$</code>
                                    </p>
                                </div>

                                <Form onSubmit={handleSubmit}>
                                    <FloatingLabel
                                        controlId="floatingEmail"
                                        label="Username or Email"
                                        className="mb-3 text-secondary"
                                    >
                                        <Form.Control
                                            type="text"
                                            name="username"
                                            autoComplete="username"
                                            autoCapitalize="none"
                                            spellCheck={false}
                                            placeholder="Username or Email"
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
                                            name="password"
                                            autoComplete="current-password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="rounded-3"
                                        />
                                    </FloatingLabel>

                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <Form.Check
                                            type="checkbox"
                                            id="remember-me"
                                            name="remember"
                                            label="Remember me"
                                            className="text-muted small"
                                        />
                                        <Button
                                            type="button"
                                            variant="link"
                                            className="p-0 text-decoration-none small fw-semibold"
                                            style={{ color: '#ff512f' }}
                                            onClick={() => setResetNotice('Password reset isn’t available in this demo. Use the demo account above.')}
                                        >
                                            Forgot Password?
                                        </Button>
                                    </div>
                                    <p className="small text-muted mb-4" aria-live="polite">{resetNotice}</p>

                                    <Button
                                        type="submit"
                                        className="btn-gradient w-100 py-2 fs-5 rounded-3 fw-bold shadow-sm"
                                    >
                                        Sign In
                                    </Button>
                                </Form>

                                <div className="text-center mt-4">
                                    <p className="text-muted small mb-0">
                                        Don’t have an account? <Link to="/shop" className="fw-semibold text-decoration-none" style={{ color: '#ff512f' }}>Browse as Guest</Link>
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
