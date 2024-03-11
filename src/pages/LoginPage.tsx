import { Box, TextField } from '@mui/material';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import authApi from '../features/auth/api/authApi';
import { useForm } from 'react-hook-form';
import { setUser } from '../features/auth/stores/userSlice';
import { useDispatch } from 'react-redux';

export const LoginPage = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async () => {
    try {
      setLoading(true);

      const userId = getValues('userId');
      const password = getValues('password') as string;

      // ログインAPIを叩く
      const res: any = await authApi.login({
        endpoint: 'login',
        endpointParams: {
          userId,
          password,
        },
      });
      if (res.status === 'error') {
        alert(res.message);
        return;
      }

      dispatch(
        setUser({
          shopId: res.payload.shopId,
          roleId: res.payload.roleId,
        })
      );
      localStorage.setItem('token', res.payload.token);
      navigate('/');
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          fullWidth
          id="userId"
          label="ログインID"
          margin="normal"
          required
          helperText={
            errors.loginId?.message ? errors.loginId?.message.toString() : ''
          }
          // error={errors.loginId?.message !== ''}
          disabled={loading}
          {...register('userId', { required: 'ユーザーIDを入力してください' })}
        />
        <TextField
          fullWidth
          id="password"
          label="パスワード"
          margin="normal"
          type="password"
          required
          helperText={
            errors.password?.message ? errors.password?.message.toString() : ''
          }
          // error={errors.password?.message !== ''}
          disabled={loading}
          {...register('password', {
            required: 'ロパスワードを入力してください',
          })}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          loading={loading}
          color="primary"
          variant="outlined"
        >
          ログイン
        </LoadingButton>
      </Box>
    </>
  );
};
