import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import authUtils from '../../utils/authUtils';
import { setUser } from '../../redux/features/userSlice';

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
      <header>
        <div>ロゴ</div>
        <div>{`${user.shopName}：${user.userName}`}</div>
      </header>
      <Outlet />
    </>
  );
};
