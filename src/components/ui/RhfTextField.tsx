import React, { FC } from 'react';
import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  label: string;
  name: string;
  required?: boolean;
  message: string;
  type?: string;
  defaultValue?: string | number;
};

export const RhfTextField: FC<Props> = (props) => {
  const {
    label,
    name,
    required = false,
    message,
    type = 'text',
    defaultValue = 'Loading...',
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
          message: message,
        },
      }}
      render={({ field, formState: { errors } }) => (
        <TextField
          id={name}
          type={type}
          {...field}
          label={label}
          required={required}
          error={errors.text ? true : false}
          helperText={errors.text?.message as string}
        />
      )}
    />
  );
};
