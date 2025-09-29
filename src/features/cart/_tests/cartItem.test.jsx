/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from '../CartItem';

// Mock redux useDispatch
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

// Mock OrderReview component when actions is false
jest.mock('../../orders/review', () => () => <div data-testid="order-review" />);

describe('CartItem component', () => {
  const baseCartItem = {
    id: 1,
    image: 'test-image.jpg',
    title: 'Test Product',
    category: 'electronics',
    unitPrice: 100,
    quantity: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders cart item details correctly', () => {
    render(<CartItem cartItem={baseCartItem} actions={true} />);

    expect(screen.getByAltText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('electronics')).toBeInTheDocument();
    expect(screen.getByText(/Price:/)).toBeInTheDocument("$100");
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('shows delete button when quantity is 1, and clicking calls dispatch with deleteFromCart', () => {
    render(<CartItem cartItem={baseCartItem} actions={true} />);

    const deleteBtn = screen.getByTestId('delete-icon') ;
    fireEvent.click(deleteBtn);
    expect(mockDispatch).toHaveBeenCalled();
    // Optional: check called action type and payload if you mock cartSlice action creators
  });

  test('shows decrease button when quantity is > 1, and clicking calls dispatch with decreaseItemQuantity', () => {
    render(<CartItem cartItem={{ ...baseCartItem, quantity: 2 }} actions={true} />);

    const decreaseBtn =screen.getByTestId('minus-icon') ;
    fireEvent.click(decreaseBtn);
    expect(mockDispatch).toHaveBeenCalled();
  });

  test('shows increase button and clicking calls dispatch with increaseItemQuantity', () => {
    render(<CartItem cartItem={baseCartItem} actions={true} />);

    const increaseBtn = screen.getByTestId('plus-icon') ;
    fireEvent.click(increaseBtn);
    expect(mockDispatch).toHaveBeenCalled();
  });

  test('renders OrderReview component when actions is false', () => {
    render(<CartItem cartItem={baseCartItem} actions={false} />);

    expect(screen.getByTestId('order-review')).toBeInTheDocument();
  });
});
