import React, { FC } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ja';

type Props = {
  label: string;
  name: string;
  required?: boolean;
};

export const RhfDatePicker: FC<Props> = (props) => {
  const { label, name, required = false } = props;
  const { control } = useFormContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            label={label}
            slotProps={{
              textField: {
                required: required,
                id: name,
              },
            }}
            {...field}
            onChange={(value) => field.onChange(value)}
            value={field.value ?? dayjs()}
          />
        )}
      />
    </LocalizationProvider>
  );
};
