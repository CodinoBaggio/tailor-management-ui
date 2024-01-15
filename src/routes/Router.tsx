import { createBrowserRouter } from 'react-router-dom';
import { Login } from '../pages/Login';
import { AuthLayout } from '../layouts/AuthLayout';
import { AppLayout } from '../layouts/AppLayout';
import { OrderList } from '../pages/OrderList';
import { Order } from '../pages/Order';

export const router = createBrowserRouter(
  [
    {
      path: 'https://codinobaggio.github.io/tailor-management-ui/deploy/hosting/',
      element: <AuthLayout />,
      children: [
        {
          path: 'login',
          element: <Login />,
        },
      ],
    },
    {
      path: 'https://codinobaggio.github.io/tailor-management-ui/deploy/hosting/',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <OrderList />,
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
  ],
  // { basename: import.meta.env.PUBLIC_URL }
);
