import React, { FC } from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  label: string;
  name: string;
  disabled?: boolean;
  menuItems: {
    value: string;
    label: string;
  }[];
  onChange?: (e: React.ChangeEvent<{ value: unknown }>) => void;
};

export const RhfSelect: FC<Props> = (props) => {
  const { label, name, menuItems, disabled = false, onChange: handleChange } = props;
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={menuItems[0].value}
      render={({ field, formState: { errors } }) => (
        <FormControl error={errors.select ? true : false}>
          <InputLabel id="select-label">{label}</InputLabel>
          <Select
            labelId="select-label"
            id={name}
            label="Select"
            {...field}
            disabled={disabled}
            onChange={(event) => {
              field.onChange(event);
              if (handleChange) handleChange(event as React.ChangeEvent<{ value: unknown }>);
            }}
          >
            {menuItems.map((item, index) => {
              return (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText>
            {errors.select?.message ? errors.select?.message.toString() : ''}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};
