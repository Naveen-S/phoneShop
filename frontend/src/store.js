import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { productListReducer, productReducer } from './reducers/productReducers';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';

const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});

const middleware = [thunk];
const initialCartItems = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const initialUserInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  cart: { cartItems: initialCartItems },
  userLogin: { userInfo: initialUserInfo },
};

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
