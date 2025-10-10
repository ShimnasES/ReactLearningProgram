/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import OrderList from "../orderList";
import { useSelector } from "react-redux";
import * as reactRedux from 'react-redux';

// Mock CartItem to isolate OrderList testing
jest.mock("../../cart/cartItem", () => ({ cartItem, actions }) => (
  <div data-testid="cart-item">{cartItem.title}</div>
));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),   // Make useSelector a Jest mock function
}));

describe("OrderList component", () => {
  beforeEach(() => {
    reactRedux.useSelector.mockImplementation((selector) =>
      selector({
        order: {
          orders: [
            { id: 1, title: "Order 1" },
            { id: 2, title: "Order 2" },
          ],
        },
      })
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders order list header and items from Redux state", () => {
    // Mock useSelector to return orders array
    useSelector.mockImplementation((selectorFn) =>
      selectorFn({
        order: {
          orders: [
            { id: 1, title: "Order 1" },
            { id: 2, title: "Order 2" },
          ],
        },
      })
    );

    render(<OrderList />);

    expect(screen.getByText(/your order\(s\)/i)).toBeInTheDocument();

    // Check mocked CartItem components rendered for each order entry
    const orderItems = screen.getAllByTestId("cart-item");
    expect(orderItems).toHaveLength(2);
    expect(orderItems[0]).toHaveTextContent("Order 1");
    expect(orderItems[1]).toHaveTextContent("Order 2");
  });
});
