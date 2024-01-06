import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/auth/stores/userSlice';
import orderReducer from '../features/order/stores/orderSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    order: orderReducer,
  },
});
