import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

const resourcesInitialState = {
  value: {},
};

export const orderSlice: any = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const orderResourcesSlice: any = createSlice({
  name: 'orderResources',
  initialState: resourcesInitialState,
  reducers: {
    setOrderResources: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setOrder } = orderSlice.actions;
export const { setOrderResources } = orderResourcesSlice.actions;
export default orderSlice.reducer;
