import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/auth/stores/userSlice';
import orderReducer from '../features/order/stores/orderSlice';
import orderResourcesReducer from '../features/order/stores/orderResourceSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    order: orderReducer,
    orderResources: orderResourcesReducer,
  },
});
