// import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import './App.css';
import { Login } from './pages/Login';
import { blue } from '@mui/material/colors';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthLayout } from './components/layouts/AuthLayout';
import { AppLayout } from './components/layouts/AppLayout';
import { OrderList } from './pages/OrderList';
import { Order } from './pages/Order';

const router = createBrowserRouter(
  [
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
          element: <OrderList />,
          // loader: informationsLoader,
        },
        {
          path: 'order/:orderId',
          element: <Order />,
          // loader: informationLoader,
        },
        {
          path: 'order/new',
          element: <Order />,
        },
      ],
    },
  ],
);

function App() {
  const theme = createTheme({
    palette: { primary: blue },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
