import React, { useEffect } from 'react';
import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

export const OrderBasis = () => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext();
  // const [orderValue, setOrderValue] = React.useState<any>({});

  // useEffect(() => {
  //   setOrderValue(getValues('orderBasis'));
  //   console.log(orderValue);
  // }, []);

  return (
    <>
      <div>OrderBasis</div>
      <TextField
        label="発注ステータス"
        defaultValue={'Loading...'}
        {...register('orderBasis_orderStatus')}
      />
      <TextField
        label="入力日"
        defaultValue={'Loading...'}
        {...register('orderBasis_inputDate')}
      />
      <div>
        {errors.orderBasis_orderStatus
          ? errors.orderBasis_orderStatus.message?.toString()
          : ''}
      </div>
    </>
  );
};
