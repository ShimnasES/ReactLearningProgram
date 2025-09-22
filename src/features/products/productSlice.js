import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchSuccess: (state, action) => {
      state.products = [...action.payload];
      state.loading = false;
    },
  },
});

export const { fetchProducts, fetchSuccess, fetchFailure } =
  productSlice.actions;

export default productSlice.reducer;
