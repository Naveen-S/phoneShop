import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap';
import Rating from '../components/Rating';
import axios from 'axios';

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    console.log(match);
    if (!match.params.productId) {
      return;
    }
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `/api/products/${match.params.productId}`
      );
      setProduct(data);
    };
    fetchProduct();
  }, [match]);

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={`${product.image}`} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <h2>{product.name}</h2>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item> Price: $ {product.price}</ListGroup.Item>
            <ListGroup.Item> Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price</Col>
                  <Col>${product.price}</Col>
                </Row>
                <Row>
                  <Col>Status</Col>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
                <Row className='my-2'>
                  <Button
                    className='btn btn-dark btn-block text-center'
                    disabled={product.countInStock === 0}>
                    Add to Cart
                  </Button>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;