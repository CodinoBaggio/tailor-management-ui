import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import authApi from '../features/auth/api/authApi';
import { useForm } from 'react-hook-form';

export const Login = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);

      const loginId = getValues('loginId');
      const password = getValues('password') as string;

      // ログインAPIを叩く
      const res: any = await authApi.login({
        endpoint: 'login',
        endpointParams: {
          loginId: loginId,
          password: password,
        },
      });
      localStorage.setItem('token', res.payload.token);
      navigate('/');
    } catch (err: any) {
      alert(errors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          fullWidth
          id="loginId"
          label="ログインID"
          margin="normal"
          required
          helperText={
            errors.loginId?.message ? errors.loginId?.message.toString() : ''
          }
          // error={errors.loginId?.message !== ''}
          disabled={loading}
          {...register('loginId', { required: 'ログインIDを入力してください' })}
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
