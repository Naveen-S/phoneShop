import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
  FormControl,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import { fetchProduct } from '../actions/productAction';
import Loading from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!match.params.productId) {
      return;
    } else {
      dispatch(fetchProduct(match.params.productId));
    }
  }, [match, dispatch]);

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const onAddToCartHandler = () => {
    history.push(`/cart/${match.params.productId}?qty=${qty}`);
  };

  return (
    <>
      <Link className='btn btn-light my-3 font-weight-bold' to='/'>
        Go back
      </Link>

      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
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
                <ListGroup.Item>
                  {' '}
                  Description: {product.description}
                </ListGroup.Item>
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
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <FormControl
                            as='select'
                            value={qty}
                            onChange={(e) => {
                              setQty(e.target.value);
                            }}>
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </FormControl>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Row className='my-2'>
                      <Button
                        className='btn btn-dark btn-block text-center'
                        disabled={product.countInStock === 0}
                        onClick={onAddToCartHandler}>
                        Add to Cart
                      </Button>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
