import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  updated: true,
};

export const orderSlice: any = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.orders = action.payload;
    },
    setUpdated: (state, action) => {
      state.updated = action.payload;
    },
  },
});

export const { setOrder, setUpdated } = orderSlice.actions;
export default orderSlice.reducer;
