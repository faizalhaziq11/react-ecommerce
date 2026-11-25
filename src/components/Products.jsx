import { useEffect, useState } from 'react';
import { http } from '../helper/requestUtils';
import { formatPrice } from '../helper/format';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import useCartStore from '../store/cartStore';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router';
import './Products.css';

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [product, setProduct] = useState([]);
  const [show, setShow] = useState(false);
  const [addedId, setAddedId] = useState(null);
  const [announcement, setAnnouncement] = useState('');
  const [clearedItems, setClearedItems] = useState(null);

  const addToCart = useCartStore((state) => state.addToCart);
  const totalCartItem = useCartStore((state) => state.totalCartItem);
  const cartItems = useCartStore((state) => state.cartItems);
  const totalCartPrice = useCartStore((state) => state.totalCartPrice);
  const clearCart = useCartStore((state) => state.clearCart);
  const restoreCart = useCartStore((state) => state.restoreCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setClearedItems(null);
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setAddedId(product.id);
    setAnnouncement(`Added ${product.title} to cart.`);
  };

  const handleRemove = (item) => {
    removeFromCart(item.id);
    setAnnouncement(`Removed ${item.title} from cart.`);
  };

  const handleClear = () => {
    setClearedItems(cartItems);
    clearCart();
    setAnnouncement('Cart cleared.');
  };

  const handleUndoClear = () => {
    restoreCart(clearedItems);
    setClearedItems(null);
    setAnnouncement('Cart restored.');
  };

  const retry = () => {
    setLoading(true);
    setError(null);
    setReloadKey((k) => k + 1);
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
      .then((data) => setProduct(Array.isArray(data) ? data : []))
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [reloadKey]);

  return (
    <div>
      <div className='visually-hidden' aria-live='polite' aria-atomic='true'>
        {announcement}
      </div>
      <Container>
        <div className='py-3 d-flex justify-content-between align-items-center'>
          <h1 className='h2 text-dark fw-bold mb-0'>Store</h1>
          <Button className='btn-gradient rounded-pill' onClick={handleShow}>
            <i className='bi bi-cart3 me-2' aria-hidden='true'></i>Cart (<span className='tabular-nums'>{totalCartItem}</span>)
          </Button>
        </div>

        <Offcanvas show={show} onHide={handleClose} placement='end'>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title as='h2'>Cart</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className='d-flex flex-column'>
            {cartItems.length === 0 ? (
              <div className='text-center text-muted py-5'>
                <i className='bi bi-cart3 display-5 d-block mb-2' aria-hidden='true'></i>
                {clearedItems ? (
                  <>
                    <p className='mb-3'>Cart cleared.</p>
                    <Button variant='outline-secondary' size='sm' onClick={handleUndoClear}>
                      Undo Clear
                    </Button>
                  </>
                ) : (
                  <>
                    <p className='mb-3'>Your cart is empty.</p>
                    <Button variant='outline-secondary' size='sm' onClick={handleClose}>
                      Continue Shopping
                    </Button>
                  </>
                )}
              </div>
            ) : (
              <>
                <div className='flex-grow-1'>
                  {cartItems.map((item) => (
                    <div key={item.id} className='card mb-3 border-0 shadow-sm rounded-3 overflow-hidden'>
                      <div className='row g-0'>
                        <div className='col-4'>
                          <img src={item.image} className='img-fluid rounded-start' alt={item.title} width={120} height={120} loading='lazy' />
                        </div>
                        <div className='col-8 min-w-0'>
                          <div className='card-body py-2'>
                            <h3 className='h6 card-title text-truncate mb-1'>{item.title}</h3>
                            <p className='card-text small text-muted mb-1 tabular-nums'>
                              {formatPrice(item.price)} × {item.count}
                            </p>
                            <p className='card-text fw-semibold mb-2 tabular-nums'>{formatPrice(item.price * item.count)}</p>
                            <Button variant='outline-danger' size='sm' onClick={() => handleRemove(item)}>
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
                    <span className='fw-bold tabular-nums'>{formatPrice(totalCartPrice)}</span>
                  </div>
                  <div className='d-flex gap-2'>
                    <Button variant='outline-danger' className='flex-grow-1' onClick={handleClear}>Clear Cart</Button>
                    <Button as={Link} to='/checkout' className='btn-gradient flex-grow-1'>Checkout</Button>
                  </div>
                </div>
              </>
            )}
          </Offcanvas.Body>
        </Offcanvas>

        {loading && (
          <div className='d-flex justify-content-center align-items-center gap-2 py-5'>
            <div className='spinner-grow spinner-fast' role='status'>
              <span className='visually-hidden'>Loading…</span>
            </div>
            <span className='text-muted' aria-hidden='true'>Loading products…</span>
          </div>
        )}

        {!loading && error && (
          <div className='text-center py-5' role='alert'>
            <p className='text-muted mb-3'>
              Couldn’t load products. Check your connection and try again.
            </p>
            <Button variant='outline-secondary' onClick={retry}>
              Retry Loading
            </Button>
          </div>
        )}

        {!loading && !error && product.length === 0 && (
          <div className='d-flex justify-content-center align-items-center py-5 text-muted'>
            No products found. Check back soon.
          </div>
        )}

        {!loading && !error && product.length > 0 && (
          <div className='products-grid'>
            {product.map((product, idx) => (
              <Card key={product.id} className='product-card' style={{ animationDelay: `${Math.min(idx, 10) * 50}ms` }}>
                <div className='product-img-wrap'>
                  <img
                    src={product.image}
                    alt={product.title}
                    width={240}
                    height={240}
                    className='product-img'
                    loading='lazy'
                  />
                </div>
                <Card.Body className='d-flex flex-column gap-2'>
                  <Card.Title as='h2' className='text-break text-capitalize fs-6 mb-0'>{product.title}</Card.Title>
                  <div className='mt-auto d-flex flex-column gap-2'>
                    <div className='product-price'>{formatPrice(product.price)}</div>
                    <Button
                      className={`btn-gradient w-100 ${addedId === product.id ? 'btn-added' : ''}`}
                      onClick={() => handleAddToCart(product)}
                    >
                      {addedId === product.id ? (
                        <>
                          <i className='bi bi-check-lg me-2' aria-hidden='true'></i>Added
                        </>
                      ) : (
                        <>
                          <i className='bi bi-cart-plus me-2' aria-hidden='true'></i>Add to Cart
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
