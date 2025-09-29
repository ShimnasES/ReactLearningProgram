/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductDescription from "../productDetails";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

// Mock the redux store

const mockStore = configureMockStore();
const store = mockStore({});

// Mock ProductReview child component to simplify test
jest.mock("../productReview", () => () => <div data-testid="product-review" />);

describe("ProductDescription", () => {
  const fakeProduct = {
    id: 1,
    title: "Test Product",
    description: "This is a mocked product description.",
    category: "Category A",
    price: 42.5,
    rating: { rate: 4.2, count: 10 },
    image: "test-image.jpg",
  };

  beforeEach(() => {
    // Mock global fetch to return fake product data
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(fakeProduct),
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("fetches and displays product details, allows closing popup", async () => {
    const handleShowPopup = jest.fn();

    render(
      <Provider store={store}>
        <ProductDescription id={1} handleShowPopup={handleShowPopup} />
      </Provider>
    );

    // Initially, no product title yet
    expect(screen.queryByText(fakeProduct.title)).not.toBeInTheDocument();

    // Wait for product title after fetch resolves
    await waitFor(() => {
      expect(screen.getByText(fakeProduct.title)).toBeInTheDocument();
    });

    // Check other product details rendered
    expect(screen.getByText(fakeProduct.description)).toBeInTheDocument();
    
    const element = screen.getByTestId("product-price");
    expect(element).toBeInTheDocument();
    expect(screen.getByTestId("product-category")).toHaveTextContent(
      fakeProduct.category
    );
    expect(screen.getByTestId("product-review")).toBeInTheDocument();

    // Simulate closing the popup
    fireEvent.click(screen.getByText(/x/i));
    expect(handleShowPopup).toHaveBeenCalledWith(false);

    // Simulate clicking Add to Cart button
    fireEvent.click(screen.getByText(/Add to Cart/i));
    // Can add assertions to verify dispatch was called if desired
  });
});
