/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import OrderReview from "../review";

// Mock useDispatch hook
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

describe("OrderReview component", () => {
  beforeAll(() => {
    global.crypto = {
      randomUUID: jest.fn(() => "test-uuid"),
    };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders no reviews message initially", () => {
    render(<OrderReview itemId="123" />);
    expect(screen.getByText(/no reviews yet/i)).toBeInTheDocument();
  });

  test("allows user to submit a review", () => {
    render(<OrderReview itemId="123" />);

    // Click on the 5th star to give rating 5
    const stars = screen.getAllByText("★");
    fireEvent.click(stars[4]);

    // Input comment
    const textarea = screen.getByPlaceholderText(/write your review/i);
    fireEvent.change(textarea, { target: { value: "Great product!" } });

    // Click submit button
    const submitButton = screen.getByRole("button", { name: /submit review/i });
    fireEvent.click(submitButton);

    // Verify dispatch was called with an object containing rating, comments, itemId
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: expect.any(String), 
        payload: expect.objectContaining({
          itemId: "123",
          rating: 5,
          comments: "Great product!",
        }),
      })
    );

    // Review should appear in the review list
    expect(screen.getByText(/great product!/i)).toBeInTheDocument();
  });

  test("prevents submitting empty rating or comment", () => {
    render(<OrderReview itemId="123" />);

    const submitButton = screen.getByRole("button", { name: /submit review/i });
    fireEvent.click(submitButton);

    // Dispatch should not be called
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  test("allows editing and deleting reviews", () => {
    render(<OrderReview itemId="123" />);

    // Add a review first
    const stars = screen.getAllByText("★");
    fireEvent.click(stars[4]);
    const textarea = screen.getByPlaceholderText(/write your review/i);
    fireEvent.change(textarea, { target: { value: "Nice product!" } });
    fireEvent.click(screen.getByRole("button", { name: /submit review/i }));

    // Click edit button (the edit icon button)
    const editButton = screen.getByTestId("edit-icon");
    fireEvent.click(editButton);

    // The textarea should be filled with existing comment
    expect(textarea.value).toBe("Nice product!");

    // Change comment and submit updated review
    fireEvent.change(textarea, { target: { value: "Updated review" } });
    fireEvent.click(screen.getByRole("button", { name: /update review/i }));

    expect(mockDispatch).toHaveBeenCalledTimes(2); // 1 for add, 1 for update
    expect(screen.getByText(/updated review/i)).toBeInTheDocument();

    // Mock window.confirm to always return true for delete
    window.confirm = jest.fn(() => true);

    // Click delete button
    const deleteButton = screen.getByTitle("Delete");
    fireEvent.click(deleteButton);

    expect(mockDispatch).toHaveBeenCalledTimes(3); // 3rd call for delete
  });
});
