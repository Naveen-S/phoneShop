import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import products from '../products';
import Product from '../components/Product';
import { Row, Col } from 'react-bootstrap';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h3>Latest Products</h3>
      <Row>
        {products.map((product) => {
          return (
            <Col
              className='my-3'
              key={product._id}
              sm={12}
              md={6}
              lg={4}
              xl={3}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default HomeScreen;