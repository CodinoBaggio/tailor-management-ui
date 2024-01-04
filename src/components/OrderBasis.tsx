import React, { useEffect } from 'react';
import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

export const OrderBasis = () => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext();
  const [value, setValue] = React.useState({});

  useEffect(() => {
    setValue(getValues('orderBasis_orderBasisId'));
  }, []);

  return (
    <>
      <div>OrderBasis</div>
      <TextField
        label="発注状況"
        defaultValue={value}
        {...register('orderBasis_orderBasisId')}
      />
      <div>
        {errors.orderBasis_orderBasisId
          ? errors.orderBasis_orderBasisId.message?.toString()
          : ''}
      </div>
    </>
  );
};
