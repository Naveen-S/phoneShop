import {
  PRODUCT_LIST_FAILURE,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
  PRODUCT_FAILURE,
} from '../actions/types';

export const productListReducer = (
  state = { products: [], product: {} },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST: {
      return {
        loading: true,
        products: [],
      };
    }
    case PRODUCT_LIST_SUCCESS: {
      return {
        loading: false,
        products: action.payload,
      };
    }
    case PRODUCT_LIST_FAILURE: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export const productReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_REQUEST: {
      return {
        loading: true,
        product: {},
      };
    }

    case PRODUCT_SUCCESS: {
      return {
        loading: false,
        product: action.payload,
      };
    }

    case PRODUCT_FAILURE: {
      return {
        loading: false,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
