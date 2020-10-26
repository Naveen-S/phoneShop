import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { productListReducer, productReducer } from './reducers/productReducers';

const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productReducer,
});
const middleware = [thunk];
const initialState = {};

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
