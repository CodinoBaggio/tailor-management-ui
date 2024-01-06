import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/auth/states/userSlice';
import orderReducer from '../features/order/states/orderSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    order: orderReducer,
  },
});
