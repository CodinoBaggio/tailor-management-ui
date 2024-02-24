import { FC } from 'react';
import { InputAdornment, TextField, TextFieldVariants } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  label: string;
  name: string;
  required?: boolean;
  validationMessage?: string;
  type?: string;
  defaultValue?: string | number;
  width?: number | string;
  placeholder?: string;
  adornment?: string;
  disabled?: boolean;
  multiline?: boolean;
  variant?: TextFieldVariants | undefined;
};

export const RhfTextField: FC<Props> = (props) => {
  const {
    label,
    name,
    required = false,
    validationMessage = '',
    type = 'text',
    defaultValue = '',
    width,
    placeholder = '',
    adornment = '',
    disabled = false,
    multiline = false,
    variant = 'standard',
  } = props;
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{
        required: {
          value: required,
          message: validationMessage,
        },
      }}
      render={({ field, formState: { errors } }) => {
        return (
          <TextField
            id={name}
            type={type}
            {...field}
            label={label + (required ? ' *' : '')}
            required={required}
            error={errors[name] ? true : false}
            helperText={errors[name]?.message as string}
            size="small"
            inputProps={{ style: { fontSize: '0.8rem' } }}
            sx={{ width: { width } }}
            InputLabelProps={{ shrink: true }}
            variant={variant}
            placeholder={placeholder}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{adornment}</InputAdornment>
              ),
            }}
            disabled={disabled}
            multiline={multiline}
            rows={multiline ? 3 : 1}
          />
        );
      }}
    />
  );
};
