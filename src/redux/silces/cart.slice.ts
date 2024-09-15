import {type PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  ICart,
  ICartItem,
  ICartState,
  cartInitialState,
} from '../redux.constants';

// Redux Toolkit slice
export const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialState,

  reducers: {
    updateCurrentCategory: (
      state: ICartState,
      action: PayloadAction<string>,
    ) => {
      return {
        ...state,
        currentCategory: action.payload,
      };
    },

    // updateCurrentCart: (
    //   state: ICartState,
    //   action: PayloadAction<ICartItem>,
    // ) => {
    //   const totalAmount = (
    //     parseFloat(state.currentCart.totalAmount) +
    //     parseFloat(action.payload.totalPrice)
    //   ).toFixed(2);

    //   //(updateCurrentCart, 'cart');
    //   return {
    //     ...state,

    //     currentCart: {
    //       ...state.currentCart,
    //       items: [action.payload, ...state?.currentCart?.items],
    //       totalAmount: totalAmount.toString(),
    //     },
    //   };
    // },

    updateCurrentCart: (
      state: ICartState,
      action: PayloadAction<ICartItem>,
    ) => {
      // Find the item index in the current cart items
      const existingItemIndex = state.currentCart.items.findIndex(
        item => item.id === action.payload.id,
      );

      let updatedItems;
      let totalAmount;

      if (existingItemIndex >= 0) {
        // If the item exists, update its count and total price
        const updatedItem = {
          ...state.currentCart.items[existingItemIndex],
          count:
            state.currentCart.items[existingItemIndex].count +
            action.payload.count,
          totalPrice: (
            parseFloat(state.currentCart.items[existingItemIndex].totalPrice) +
            parseFloat(action.payload.totalPrice)
          ).toFixed(2),
        };

        // Create a new items array with the updated item
        updatedItems = [
          ...state.currentCart.items.slice(0, existingItemIndex),
          updatedItem,
          ...state.currentCart.items.slice(existingItemIndex + 1),
        ];

        // Calculate the new total amount
        totalAmount = state.currentCart.items
          .reduce((sum, item, index) => {
            if (index === existingItemIndex) {
              return sum + parseFloat(updatedItem.totalPrice);
            }
            return sum + parseFloat(item.totalPrice);
          }, 0)
          .toFixed(2);
      } else {
        // If the item does not exist, add it to the cart
        updatedItems = [action.payload, ...state.currentCart.items];

        // Calculate the new total amount
        totalAmount = (
          parseFloat(state.currentCart.totalAmount) +
          parseFloat(action.payload.totalPrice)
        ).toFixed(2);
      }

      return {
        ...state,
        currentCart: {
          ...state.currentCart,
          items: updatedItems,
          totalAmount: totalAmount.toString(),
        },
      };
    },

    addNewCartInList: (state: ICartState, action: PayloadAction<ICart>) => {
      const existingCartIndex = state.cartList.findIndex(
        cart => cart.id === action.payload.id,
      );

      if (existingCartIndex !== -1) {
        // Replace the existing cart with the new one
        const updatedCartList = [...state.cartList];
        updatedCartList[existingCartIndex] = action.payload;

        return {
          ...state,
          cartList: updatedCartList,
        };
      } else {
        // Add the new cart to the beginning of the list
        return {
          ...state,
          cartList: [action.payload, ...state.cartList],
        };
      }
    },

    updateCartInList: (state: ICartState, action: PayloadAction<ICartItem>) => {
      return {
        ...state,
        cartList: state.cartList.map((cart, index) =>
          cart.id === action.payload.id
            ? {...cart, items: [action.payload, ...state.cartList[index].items]}
            : cart,
        ),
      };
    },

    setCurrentCart: (state: ICartState, action: PayloadAction<ICart>) => {
      const initialCart = {
        id: '',
        totalAmount: '0',
        items: [],
      };
      const newItems = state.cartList.find(
        cart => cart.id === action.payload.id,
      );
      return {
        ...state,
        currentCart: newItems ?? initialCart,
      };
    },

    clearCurrentCart: (state: ICartState, action: PayloadAction<ICart>) => {
      const initialCart = {
        id: '',
        totalAmount: '0',
        items: [],
      };

      return {
        ...state,
        currentCart: initialCart,
      };
    },

    setInitialCurrentCart: (
      state: ICartState,
      action: PayloadAction<ICart>,
    ) => {
      return {
        ...state,
        currentCart: action.payload,
      };
    },

    removeCartItem: (state: ICartState, action: PayloadAction<ICart>) => {
      const newItems = state.cartList.filter(
        cart => cart.id !== action.payload.id,
      );
      return {
        ...state,
        cartList: newItems,
      };
    },
    removeSingleCartItem: (
      state: ICartState,
      action: PayloadAction<{
        cartId: string;
        itemId: string;
        itemPrice: string;
      }>,
    ) => {
      const {cartId, itemId, itemPrice} = action.payload;

      return {
        ...state,

        cartList: state.cartList.map((cart, index) =>
          cart.id === cartId
            ? {
                ...cart,
                items: state.cartList[index].items?.filter(
                  (item, id) => item?.uuid !== itemId,
                ),
                totalAmount: (
                  parseFloat(cart.totalAmount) - parseFloat(itemPrice)
                ).toFixed(2),
              }
            : cart,
        ),

        currentCart: {
          ...state.currentCart,
          items: state.currentCart.items?.filter(
            (item, id) => item?.uuid !== itemId,
          ),
          totalAmount: (
            parseFloat(state.currentCart.totalAmount) - parseFloat(itemPrice)
          ).toFixed(2),
        },
      };
    },

    clearCart: (state: ICartState) => {
      return {
        ...cartInitialState,
      };
    },
  },
});
export const {
  updateCurrentCart,
  updateCurrentCategory,
  addNewCartInList,
  updateCartInList,
  removeCartItem,
  setCurrentCart,
  clearCart,
  clearCurrentCart,
  setInitialCurrentCart,
  removeSingleCartItem,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
