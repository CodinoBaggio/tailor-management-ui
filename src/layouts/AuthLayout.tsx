// import React from 'react';
import { Container, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Logo from '../assets/images/logo.png';

export const AuthLayout = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          // marginTop: 6,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
        className="text-2xl"
      >
        <img
          src={Logo}
          alt=""
          style={{ height: 300, width: 300 }}
        />
        EN-ARQ発注管理
      </Box>
      <Outlet />
    </Container>
  );
};
