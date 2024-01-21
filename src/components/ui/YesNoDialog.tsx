import React, { FC } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  DialogContentText,
} from '@mui/material';

type Props = {
  open: boolean;
  titile?: string;
  message: string;
  onYesClick: () => void;
  onNoClick: () => void;
};

export const YesNoDialog: FC<Props> = (props) => {
  const { open, titile = '', message, onNoClick, onYesClick } = props;

  return (
    <Dialog
      open={open}
      onClose={onNoClick}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{titile}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onYesClick} autoFocus>
          はい
        </Button>
        <Button onClick={onNoClick}>いいえ</Button>
      </DialogActions>
    </Dialog>
  );
};
