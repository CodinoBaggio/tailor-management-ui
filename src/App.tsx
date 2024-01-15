// import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import './App.css';
import { blue } from '@mui/material/colors';
import { Login } from './pages/Login';
// import { RouterProvider } from 'react-router-dom';
// import { router } from './routes/Router';

function App() {
  const theme = createTheme({
    palette: { primary: blue },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <RouterProvider router={router} /> */}
      {/* <div>Hello world</div> */}
      <Login />
    </ThemeProvider>
  );
}

export default App;
