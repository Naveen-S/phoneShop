import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../actions/types';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM: {
      const item = action.payload;

      // Check if the item is already
      const exists = state.cartItems.find((x) => x.product === item.product);

      // If item already exist, use the new item sent.
      if (exists) {
        return {
          ...state,
          cartItems: [
            ...state.cartItems.map((itm) => {
              if (itm.product === exists.product) {
                return item;
              } else {
                return itm;
              }
            }),
          ],
        };
      }
      // else just push the new item
      else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    }
    case CART_REMOVE_ITEM: {
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => {
          if (item.product === action.payload) {
            return false;
          } else {
            return true;
          }
        }),
      };
    }

    default: {
      return state;
    }
  }
};
