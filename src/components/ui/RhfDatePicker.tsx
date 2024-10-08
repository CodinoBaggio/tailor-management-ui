import { FC } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Controller, useFormContext } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ja';
import { isValidDate } from '../../utils/util';

type Props = {
  label: string;
  name: string;
  required?: boolean;
  validationMessage?: string;
  disabled?: boolean;
  readOnly?: boolean;
};

export const RhfDatePicker: FC<Props> = (props) => {
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
          <DatePicker
            {...field}
            label={label}
            onChange={(value) => field.onChange(value)}
            // value={undefined}
            // value={field.value ?? null}
            value={isValidDate(field.value) ? field.value : null}
            slotProps={{
              textField: {
                required: required,
                id: name,
                size: 'small',
                sx: { width: '150px' },
                variant: 'standard',
                // placeholder: 'yyyy', // 値がない場合は空白のプレースホルダーを設定
              },
            }}
            disabled={disabled}
            readOnly={readOnly}
          />
        )}
      />
    </LocalizationProvider>
  );
};
