import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { productListReducer, productReducer } from './reducers/productReducers';

const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productReducer,
  cart: cartReducer,
});
const middleware = [thunk];
const initialCartItems = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const initialState = {
  cart: { cartItems: initialCartItems },
};

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
