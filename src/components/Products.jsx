import { useEffect, useState } from 'react';
import { http } from '../helper/requestUtils';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Badge } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Footer from './Footer';
import useCartStore from '../store/cartStore';
import Offcanvas from 'react-bootstrap/Offcanvas';

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const increment = useCartStore((state) => state.increment);
  const count = useCartStore((state) => state.count);
  const addToCart = useCartStore((state) => state.addToCart);
  const totalCartItem = useCartStore((state) => state.totalCartItem);
  const cartItems = useCartStore((state) => state.cartItems);
  const totalCartPrice = useCartStore((state) => state.totalCartPrice);
  const clearCart = useCartStore((state) => state.clearCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  useEffect(() => {
    setLoading(true);
    http
      .get('/products')
      .then((data) => setProduct(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <Container fluid={true}>
      <div className='mb-3 d-flex justify-content-between'>
        <h2 className='text-center'>Store</h2>
        <Button variant='info' onClick={handleShow}>Cart: {totalCartItem}</Button>
      </div>
      <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cartItems.map((item) => (
            <div key={item.id}>
              <div className="card mb-3" style={{ maxWidth: '540px' }}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img src={item.image} className="img-fluid rounded-start" alt={item.title} />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">${item.price} x {item.count}</p>
                      <p className="card-text">Total: ${item.price * item.count}</p>
                      <Button variant='danger' className='' onClick={() => removeFromCart(item.id)}>
                        Remove from Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className='mb-3'>
            Total Amount to pay : ${totalCartPrice}
          </div>
          <div className='d-flex justify-content-between'>
            <Button variant='danger' className='' onClick={() => clearCart()}>Clear Cart</Button>
            <Button variant='success' className='' onClick={() => checkout()}>Checkout</Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <div className='d-flex flex-wrap gap-3 mb-3'>
        {product.map((product) => (
          <Card
            style={{ width: '18rem', height: '30rem' }}
            key={product.id}
            className='p-3'
          >
            <div
              className='overflow-hidden d-flex align-items-center justify-content-center'
              style={{ height: '50%', width: '100%' }}
            >
              <Card.Img
                variant='top'
                src={product.image}
                className='object-fit-scale w-75'
              />
            </div>
            <Card.Body className='d-flex flex-column align-items-stretch gap-2'>
              <Card.Title className='text-break text-capitalize'>
                {product.title}
              </Card.Title>
              <div className='mt-auto d-block w-100'>
                <Badge bg='success' className='w-100 bg-opacity-75'>
                  <h4 className='mb-0'>${product.price}</h4>
                </Badge>
              </div>
              <Button variant='primary' className='' onClick={() => addToCart(product, 1)}>
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      <Footer />
    </Container>
  );
};

export default Products;
