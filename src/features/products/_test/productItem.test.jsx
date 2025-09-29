/**
 * @jest-environment jsdom
 */


import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Product from "../productItem";

//mocking
jest.mock("../ProductReview", () => ({ rating }) => (
  <div data-testid="product-review">Rating: {rating}</div>
));
jest.mock("../productDetails", () => ({ id, handleShowPopup }) => (
  <div data-testid="product-description">
    Product Description for ID: {id}
    <button onClick={() => handleShowPopup(false)}>Close</button>
  </div>
));

//describe
describe("Product details Component", () => {
  const product = {
    id: 1,
    title: "Test Product",
    description:
      "This is a test product description that is definitely longer than 100 characters for testing truncation of the description text in the component.",
    image: "test-image.jpg",
    price: 42.5,
    rating: 4.2,
  };

  test("product detail page render with truncated description", () => {
    render(<Product product={product} className="custom-class" />);
    const name = screen.getByText("Test Product");
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent("Test Product");
    expect(screen.getByText(/Price:/)).toBeInTheDocument("$42.5");
    const truncatedDescription = product.description.slice(0, 50) + "...";
    expect(screen.getByText(truncatedDescription)).toBeInTheDocument();
    expect(screen.getByTestId("product-review")).toHaveTextContent(
      "Rating: 4.2"
    );
  });

  test("shows and hides popup on click and close button", () => {
    render(<Product product={product} />);
    // Popup should not be hidden
    expect(screen.queryByTestId("product-description")).not.toBeInTheDocument();

    // Click on product card to show popup
    fireEvent.click(screen.getByText("Test Product"));
    expect(screen.getByTestId("product-description")).toBeInTheDocument();

    // Click close button in popup to hide it
    fireEvent.click(screen.getByText("Close"));
    expect(screen.queryByTestId("product-description")).not.toBeInTheDocument();
  });
});