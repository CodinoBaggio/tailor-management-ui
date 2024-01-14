import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import authUtils from '../features/auth/utils/authUtils';
import { setUser } from '../features/auth/stores/userSlice';
import { Box, Container } from '@mui/material';

export const AppLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.value);

  useEffect(() => {
    // JWTを持っているのか確認する
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();
      if (!user) {
        navigate('/login');
      } else {
        dispatch(setUser(user));
      }
    };
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return (
    <>
      <Box className="bg-gray-500 h-16 flex items-center justify-center">
        <header className="w-full flex justify-between mx-5 text-white">
          <div>ロゴ</div>
          <div>{`${user.shopName}：${user.userName}`}</div>
        </header>
      </Box>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};
