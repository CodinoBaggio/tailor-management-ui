import { FC } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  label: string;
  name: string;
  required?: boolean;
  validationMessage?: string;
  type?: string;
  defaultValue?: string | number;
  width?: number;
  placeholder?: string;
  adornment?: string;
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
        // console.log(errors[name]);
        return (
          <TextField
            id={name}
            type={type}
            {...field}
            label={label + (required ? ' *' : '')}
            // required={required}
            error={errors[name] ? true : false}
            helperText={errors[name]?.message as string}
            size="small"
            inputProps={{ style: { fontSize: '0.8rem' } }}
            sx={{ width: { width } }}
            InputLabelProps={{ shrink: true }}
            variant="standard"
            placeholder={placeholder}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{adornment}</InputAdornment>
              ),
            }}
          />
        );
      }}
    />
  );
};
