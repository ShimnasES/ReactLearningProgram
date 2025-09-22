import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    fetchRequest: (state) => {
      state.loading = true;
    },

    fetchCompleted: (state) => {
      state.loading = false;
    },

    fetchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchRequest, fetchCompleted, fetchFailure } =
  commonSlice.actions;

export default commonSlice.reducer;
