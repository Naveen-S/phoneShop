import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from './types';

export const addItemToCart = (id, qty) => async (dispatch, getState) => {
  console.log('in add item to cart');
  const { data } = await axios.get(`/api/products/${id}`);
  console.log(data);
  const payload = {
    product: data._id,
    name: data.name,
    image: data.image,
    price: data.price,
    countInStock: data.countInStock,
    qty,
  };
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  dispatch({
    type: CART_ADD_ITEM,
    payload,
  });
};

export const removeItemFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
};
