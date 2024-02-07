import React from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@mui/material';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

export const CustomerMaintenace = () => {
  const [checked, setChecked] = React.useState(false);

  const handleOwn = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              onChange={handleOwn}
              value={checked}
              icon={<BookmarkBorderIcon />}
              checkedIcon={<BookmarkAddIcon />}
            />
          }
          label="自社"
        />
      </Box>
      <Box>
        <TextField placeholder="郵便番号" type='number' />
      </Box>
    </>
  );
};
