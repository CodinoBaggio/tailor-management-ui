import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {},
};

export const orderResourcesSlice: any = createSlice({
  name: 'orderResources',
  initialState: initialState,
  reducers: {
    setOrderResources: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setOrderResources } = orderResourcesSlice.actions;
export default orderResourcesSlice.reducer;
