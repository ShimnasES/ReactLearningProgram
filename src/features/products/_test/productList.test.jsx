/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductList from '../productList';

// Mock Product component to isolate ProductList test
jest.mock('../productItem', () => ({ product }) => (
  <div data-testid="product-item">{product.title}</div>
));

describe('ProductList component', () => {
  test('renders no products message when list is empty', () => {
    render(<ProductList products={[]} setFilter={() => {}} />);
    expect(screen.getByText(/no products found/i)).toBeInTheDocument();
  });

  test('renders product items when products are present', () => {
    const products = [
      { id: 1, title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops' },
      { id: 2, title: 'Mens Casual Premium Slim Fit T-Shirts' },
    ];
    render(<ProductList products={products} setFilter={() => {}} />);

    // The "No products found." message should not be there
    expect(screen.queryByText(/no products found/i)).not.toBeInTheDocument();

    // Check that both product items render via mock Product component
    const productItems = screen.getAllByTestId('product-item');
    expect(productItems).toHaveLength(2);
    expect(productItems[0]).toHaveTextContent('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops');
    expect(productItems[1]).toHaveTextContent('Mens Casual Premium Slim Fit T-Shirts');
  });
});
