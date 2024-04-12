// import React from 'react';
import { Container, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Logo from '../assets/images/cool_logo.png';

export const AuthLayout = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 6,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
        className="text-2xl"
        >
        <Box>EN-ARQ</Box>
        <Box>オーダースーツ発注システム</Box>
        <img
          src={Logo}
          alt=""
          style={{ height: 300, width: 300 }}
        />
      </Box>
      <Outlet />
    </Container>
  );
};
