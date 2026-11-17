import { useEffect, useState } from 'react';
import { http } from '../helper/requestUtils';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import useCartStore from '../store/cartStore';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router';
import './Products.css';

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [show, setShow] = useState(false);
  const [addedId, setAddedId] = useState(null);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addToCart = useCartStore((state) => state.addToCart);
  const totalCartItem = useCartStore((state) => state.totalCartItem);
  const cartItems = useCartStore((state) => state.cartItems);
  const totalCartPrice = useCartStore((state) => state.totalCartPrice);
  const clearCart = useCartStore((state) => state.clearCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const checkout = () => {
    navigate('/checkout');
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setAddedId(product.id);
  };

  useEffect(() => {
    if (!addedId) return;
    const t = setTimeout(() => setAddedId(null), 1200);
    return () => clearTimeout(t);
  }, [addedId]);

  useEffect(() => {
    const controller = new AbortController();
    http
      .get('/products', { signal: controller.signal })
      .then((data) => setProduct(data))
      .catch((error) => {
        if (error.name !== 'AbortError') {
          console.log(error);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <div>
      <Container>
        <div className='py-3 d-flex justify-content-between align-items-center'>
          <h2 className='text-dark fw-bold mb-0'>Store</h2>
          <Button className='btn-gradient rounded-pill' onClick={handleShow}>
            <i className='bi bi-cart3 me-2'></i>Cart ({totalCartItem})
          </Button>
        </div>

        <Offcanvas show={show} onHide={handleClose} placement='end'>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className='d-flex flex-column'>
            {cartItems.length === 0 ? (
              <div className='text-center text-muted py-5'>
                <i className='bi bi-cart3 display-5 d-block mb-2'></i>
                Your cart is empty
              </div>
            ) : (
              <>
                <div className='flex-grow-1'>
                  {cartItems.map((item) => (
                    <div key={item.id} className='card mb-3 border-0 shadow-sm rounded-3 overflow-hidden'>
                      <div className='row g-0'>
                        <div className='col-4'>
                          <img src={item.image} className='img-fluid rounded-start' alt={item.title} />
                        </div>
                        <div className='col-8'>
                          <div className='card-body py-2'>
                            <h6 className='card-title text-truncate mb-1'>{item.title}</h6>
                            <p className='card-text small text-muted mb-1'>${item.price} x {item.count}</p>
                            <p className='card-text fw-semibold mb-2'>${(item.price * item.count).toFixed(2)}</p>
                            <Button variant='outline-danger' size='sm' onClick={() => removeFromCart(item.id)}>
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='border-top pt-3'>
                  <div className='d-flex justify-content-between mb-3'>
                    <span className='fw-semibold'>Total</span>
                    <span className='fw-bold'>${totalCartPrice}</span>
                  </div>
                  <div className='d-flex gap-2'>
                    <Button variant='outline-danger' className='flex-grow-1' onClick={() => clearCart()}>Clear</Button>
                    <Button className='btn-gradient flex-grow-1' onClick={() => checkout()}>Checkout</Button>
                  </div>
                </div>
              </>
            )}
          </Offcanvas.Body>
        </Offcanvas>

        {loading && (
          <div className='d-flex justify-content-center align-items-center gap-2 py-5'>
            <div className='spinner-grow spinner-fast' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
            <span className='text-muted'>Loading products...</span>
          </div>
        )}

        {!loading && product.length === 0 && (
          <div className='d-flex justify-content-center align-items-center py-5 text-muted'>
            No Products Found
          </div>
        )}

        {!loading && product.length > 0 && (
          <div className='products-grid'>
            {product.map((product, idx) => (
              <Card key={product.id} className='product-card' style={{ animationDelay: `${idx * 50}ms` }}>
                <div className='product-img-wrap'>
                  <img src={product.image} alt={product.title} className='product-img' loading='lazy' />
                </div>
                <Card.Body className='d-flex flex-column gap-2'>
                  <Card.Title className='text-break text-capitalize fs-6 mb-0'>{product.title}</Card.Title>
                  <div className='mt-auto d-flex flex-column gap-2'>
                    <div className='product-price'>${product.price}</div>
                    <Button
                      className={`btn-gradient w-100 ${addedId === product.id ? 'btn-added' : ''}`}
                      onClick={() => handleAddToCart(product)}
                    >
                      {addedId === product.id ? (
                        <>
                          <i className='bi bi-check-lg me-2'></i>Added
                        </>
                      ) : (
                        <>
                          <i className='bi bi-cart-plus me-2'></i>Add to Cart
                        </>
                      )}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Products;
