// import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import './App.css';
import { blue } from '@mui/material/colors';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Router';

function App() {
  const theme = createTheme({
    palette: {
      primary: blue,
      // text: {
      //   disabled: '#2196f3',
      // },
      // action: {
      //   disabled: '#2196f3',
      // },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
