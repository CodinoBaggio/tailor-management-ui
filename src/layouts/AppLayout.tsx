import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import authUtils from '../features/auth/utils/authUtils';
import { setUser } from '../features/auth/stores/userSlice';
import {
  AppBar,
  Box, Container,
  Toolbar,
  Typography
} from '@mui/material';

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
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className='h-12 justify-center'>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ロゴ
            </Typography>
            <Box>{`${user.shopName}：${user.userName}`}</Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </>
  );
};
