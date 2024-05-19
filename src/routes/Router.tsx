import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { AuthLayout } from '../layouts/AuthLayout';
import { AppLayout } from '../layouts/AppLayout';
import { OrderList } from '../pages/OrderList';
import { Order } from '../pages/Order';
import { AdminPage } from '../pages/AdminPage';
import { InvoicePage } from '../pages/InvoicePage';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        {
          path: 'login',
          element: <LoginPage />,
        },
      ],
    },
    {
      path: '/',
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
        {
          path: 'order-reuse/:orderId',
          element: <Order isReuse={true} />,
        },
        {
          path: 'admin',
          element: <AdminPage />,
        },
        {
          path: 'invoice',
          element: <InvoicePage />,
        },
      ],
    },
  ],
  { basename: import.meta.env.VITE_PUBLIC_URL }
);
