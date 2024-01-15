import { createBrowserRouter } from 'react-router-dom';
import { Login } from '../pages/Login';
import { AuthLayout } from '../layouts/AuthLayout';
import { AppLayout } from '../layouts/AppLayout';
// import { OrderList } from '../pages/OrderList';
import { Order } from '../pages/Order';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Login />,
        // element: <OrderList />,
      },
      {
        path: 'order/:orderId',
        element: <Order />,
      },
      {
        path: 'order/new',
        element: <Order />,
      },
    ],
  },
]);
