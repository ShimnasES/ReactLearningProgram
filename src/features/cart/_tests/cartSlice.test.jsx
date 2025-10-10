/**
 * @jest-environment jsdom
 */

import React from "react";
import cartReducer, {
  addToCart,
  deleteFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} from "../cartSlice";

describe("cartSlice", () => {
  const initialState = {
    cart: [],
  };

  test("should handle addToCart for a new item", () => {
    const item = { id: 1, name: "Test Item", unitPrice: 10 };
    const nextState = cartReducer(initialState, addToCart(item));
    expect(nextState.cart.length).toBe(1);
    expect(nextState.cart[0].quantity).toBe(1);
    expect(nextState.cart[0].totalPrice).toBe(10);
  });

  test("should handle addToCart for an existing item", () => {
    const item = { id: 1, name: "Test Item", unitPrice: 10 };
    let state = cartReducer(initialState, addToCart(item));
    state = cartReducer(state, addToCart(item));
    expect(state.cart[0].quantity).toBe(2);
    expect(state.cart[0].totalPrice).toBe(20);
  });

  test("should handle deleteFromCart", () => {
    const item = { id: 1, name: "Test Item", unitPrice: 10 };
    let state = cartReducer(initialState, addToCart(item));
    state = cartReducer(state, deleteFromCart(1));
    expect(state.cart.length).toBe(0);
  });

  test("should handle increaseItemQuantity", () => {
    const item = { id: 1, name: "Test Item", unitPrice: 10 };
    let state = cartReducer(initialState, addToCart(item));
    state = cartReducer(state, increaseItemQuantity(1));
    expect(state.cart[0].quantity).toBe(2);
    expect(state.cart[0].totalPrice).toBe(20);
  });

  test("should handle decreaseItemQuantity", () => {
    const item = { id: 1, name: "Test Item", unitPrice: 10 };
    let state = cartReducer(initialState, addToCart(item));
    state = cartReducer(state, increaseItemQuantity(1));
    state = cartReducer(state, decreaseItemQuantity(1));
    expect(state.cart[0].quantity).toBe(1);
    expect(state.cart[0].totalPrice).toBe(10);
  });

  test("should handle decreaseItemQuantity and remove item when quantity is 0", () => {
    const item = { id: 1, name: "Test Item", unitPrice: 10 };
    let state = cartReducer(initialState, addToCart(item));
    state = cartReducer(state, decreaseItemQuantity(1));
    expect(state.cart.length).toBe(0);
  });

  test("should handle clearCart", () => {
    const item = { id: 1, name: "Test Item", unitPrice: 10 };
    let state = cartReducer(initialState, addToCart(item));
    state = cartReducer(state, clearCart());
    expect(state.cart.length).toBe(0);
  });
});
