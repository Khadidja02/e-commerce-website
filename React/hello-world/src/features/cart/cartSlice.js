// slices/cartSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shoppingCart: null,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    cartSuccess: (state, action) => {
      state.shoppingCart = action.payload;
      state.loading = false;
      state.error = null;
    },
    cartFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { cartStart, cartSuccess, cartFail } = cartSlice.actions;
export default cartSlice.reducer;
