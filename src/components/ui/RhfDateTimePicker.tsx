import { FC } from 'react';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ja';

type Props = {
  label: string;
  name: string;
  required?: boolean;
  validationMessage?: string;
  disabled?: boolean;
  readOnly?: boolean;
};

export const RhfDateTimePicker: FC<Props> = (props) => {
  const {
    label,
    name,
    required = false,
    validationMessage = '日付を選択してください',
    disabled = false,
    readOnly = false,
  } = props;
  const { control } = useFormContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
      <Controller
        name={name}
        control={control}
        rules={{
          required: {
            value: required,
            message: validationMessage,
          },
        }}
        render={({ field }) => (
          <DateTimePicker
            label={label}
            slotProps={{
              textField: {
                required: required,
                id: name,
                size: 'small',
                sx: { width: '190px' },
                variant: 'standard',
              },
            }}
            {...field}
            onChange={(value) => field.onChange(value)}
            value={field.value ?? dayjs()}
            disabled={disabled}
            readOnly={readOnly}
          />
        )}
      />
    </LocalizationProvider>
  );
};
