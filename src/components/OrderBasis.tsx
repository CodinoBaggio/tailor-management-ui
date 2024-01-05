import React from 'react';
import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/ja';
// import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers';

export const OrderBasis = () => {
  const { getValues, control } = useFormContext();

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
        <div className='font-bold text-blue-600'>OrderBasis</div>
        <div>発注ステータス：{getValues('orderBasis_orderStatus')}</div>
        <Controller
          name="orderBasis_inputDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="入力日"
              slotProps={{
                textField: {
                  required: true,
                },
              }}
              {...field}
              onChange={(value) => field.onChange(value)}
            />
          )}
        />
        <Controller
          name="orderBasis_orderDateTime"
          control={control}
          render={({ field }) => (
            <DateTimePicker
              label="発注日"
              slotProps={{
                textField: {
                  required: true,
                },
              }}
              {...field}
              onChange={(value) => field.onChange(value)}
            />
          )}
        />
        <Controller
          name="orderBasis_shipDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="工場出荷日"
              slotProps={{
                textField: {
                  required: true,
                },
              }}
              {...field}
              onChange={(value) => field.onChange(value)}
            />
          )}
        />
        <Controller
          name="orderBasis_customerName"
          control={control}
          rules={{
            required: { value: true, message: 'お客様名を入力してください' },
          }}
          render={({ field, formState: { errors } }) => (
            <TextField
              {...field}
              label="お客様名"
              required
              defaultValue={field.value || 'Loading...'}
              error={errors.text ? true : false}
              helperText={errors.text?.message as string}
            />
          )}
        />
      </LocalizationProvider>
    </>
  );
};
