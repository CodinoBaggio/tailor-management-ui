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
        <img src={Logo} alt="" style={{ height: 300, width: 300 }} />
      </Box>
      <Outlet />
      {import.meta.env.MODE !== 'prod' && (
        <Box className="text-xs">
          <Box>{`モード：${import.meta.env.MODE}`}</Box>
          <Box>{`VITE_PUBLIC_URL：${import.meta.env.VITE_PUBLIC_URL}`}</Box>
          <Box>{`VITE_API_URL：${import.meta.env.VITE_API_URL}`}</Box>
        </Box>
      )}
    </Container>
  );
};
