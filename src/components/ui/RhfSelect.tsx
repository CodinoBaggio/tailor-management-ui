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
  menuItems: {
    value: string;
    label: string;
  }[];
};

export const RhfSelect: FC<Props> = (props) => {
  const { label, name, menuItems } = props;
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
