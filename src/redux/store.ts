import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import orderReducer from './features/orderSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    order: orderReducer,
  },
});
