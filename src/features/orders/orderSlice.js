import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  reviews: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrders(state, action) {
      state.orders = [...action.payload];
      state.orderId = `id-${Math.random()
        .toString(36)
        .substr(2, 9)}-${Date.now()}`;
    },
    addOrUpdateReview(state, action) {
      const review = state.reviews.find(
        (item) => item.reviewId === action.payload.reviewId
      );
      if (review) {
        review.itemId = action.payload.itemId;
        review.rating = action.payload.rating;
        review.comments = action.payload.comments;
      } else {
        const reviewId = `rId-${Math.random()
          .toString(36)
          .substr(2, 9)}-${Date.now()}`;
        state.reviews.push({
          reviewId: reviewId,
          itemId: action.payload.itemId,
          rating: action.payload.rating,
          comments: action.payload.comments,
          date:action.payload.date
        });
      }
    },

    deleteReview(state, action) {
      const review = state.reviews.find(
        (item) => item.reviewId === action.payload.reviewId
      );
      if (review) {
       state.reviews = state.reviews.filter((item) => item.reviewId !== action.payload);
      }
    },

    clearOrders(state) {
      state.orders = [];
    },
  },
});

export const { addOrders,addOrUpdateReview,deleteReview, clearOrders } = orderSlice.actions;

export default orderSlice.reducer;
