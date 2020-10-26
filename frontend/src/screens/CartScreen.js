import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../actions/cartAction';
import { Row, Col, ListGroup, Image, FormControl, Card } from 'react-bootstrap';
import Message from '../components/Message';

const CartScreen = ({ history, match, location }) => {
  const productId = match.params.id;
  let qty = Number(location.search.split('=')[1]);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log(cart);

  useEffect(() => {
    dispatch(addItemToCart(productId, qty));
  }, [dispatch, productId, qty]);

  const removeItemHandler = (id) => {
    console.log('remove');
    dispatch(removeItemFromCart(id));
  };

  const checkoutHandler = (id) => {
    history.push(`/login?redirect=shipping`);
  };

  return (
    <div>
      <Row>
        <Col md={8}>
          <h1 className='text-uppercase'> Shopping Cart</h1>
          <ListGroup variant='flush'>
            {cart.cartItems.length === 0 ? (
              <Message>
                Cart is Item, <Link to='/'>Go back</Link>
              </Message>
            ) : (
              cart.cartItems.map((item) => {
                return (
                  <ListGroup.Item key={item.product}>
                    <Row className='d-flex align-items-center justify-content-start'>
                      <Col md={2}>
                        <Image src={item.image} fluid></Image>
                      </Col>
                      <Col md={4}>
                        <Link to={`/product/${item.product}`} className='fs-18'>
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={2}>
                        <p className='fs-18 ls-2 m-0'> $ {item.price} </p>
                      </Col>
                      <Col md={2}>
                        <FormControl
                          as='select'
                          value={item.qty}
                          onChange={(e) => {
                            dispatch(
                              addItemToCart(item.product, e.target.value)
                            );
                          }}>
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </FormControl>
                      </Col>
                      <Col md={2}>
                        <i
                          className='fas fa-trash curP'
                          onClick={() => {
                            removeItemHandler(item.product);
                          }}></i>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })
            )}
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2 className='text-uppercase'>
                  SubTotal (
                  {cart.cartItems.reduce((acc, item) => {
                    return acc + Number(item.qty);
                  }, 0)}
                  ) items
                </h2>
                <p className='fs-18 ls-2'>
                  $
                  {cart.cartItems
                    .reduce((acc, item) => {
                      return acc + Number(item.qty) * Number(item.price);
                    }, 0)
                    .toFixed(2)}
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <button
                  variant='primary'
                  className='btn btn-dark btn-block text-uppercase'
                  disabled={cart.cartItems.length === 0}
                  onClick={() => {
                    checkoutHandler(cart.cartItems.product);
                  }}>
                  Proceed to Checkout
                </button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartScreen;
