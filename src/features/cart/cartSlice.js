import {  createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        itemInCart.quantity++;
        itemInCart.totalPrice = itemInCart.quantity * itemInCart.unitPrice;
      } else {
        state.cart.push({
          ...action.payload,
          quantity: 1,
          unitPrice: action.payload.unitPrice,
          totalPrice: action.payload.unitPrice,
        });
      }
    },
    deleteFromCart(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.id === action.payload);

      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0)
        cartSlice.caseReducers.deleteFromCart(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});



export const {
  addToCart,
  deleteFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;


export default cartSlice.reducer;
