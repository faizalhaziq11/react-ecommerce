import { useEffect, useState } from 'react';
import { http } from '../helper/requestUtils';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Badge } from 'react-bootstrap';

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);

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
    <div className='container-fluid'>
      <div>
        <h2 className='text-center'>Store</h2>
      </div>
      <div className='d-flex flex-wrap justify-content-center gap-3'>
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
              <Button variant='primary' className=''>
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Products;
