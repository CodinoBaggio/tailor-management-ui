import React, { FC } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  linings: string[];
  handleListItemClick: (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const LiningSearchDialog: FC<Props> = (props) => {
  const {
    open: open,
    setOpen,
    loading,
    linings,
    handleListItemClick,
    handleSubmit,
  } = props;

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
    >
      <DialogContent>
        <DialogContentText>
          裏地を検索します。 裏地の一部を入力してください。
        </DialogContentText>
        <Box className="flex items-end mt-3">
          <TextField
            autoFocus
            margin="dense"
            id="searchPattern"
            name="searchPattern"
            label="裏地"
            className="w-3/4"
            variant="standard"
          />
          <LoadingButton
            type="submit"
            startIcon={<SearchIcon />}
            loading={loading}
            loadingPosition="start"
            variant="outlined"
            sx={{ marginLeft: '5px' }}
          >
            検索
          </LoadingButton>
        </Box>
        <List>
          {linings.map((productNo: string, index: number) => (
            <ListItem disablePadding key={index}>
              <ListItemButton
                onClick={(event) => handleListItemClick(event, index)}
              >
                <ListItemText primary={productNo} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>キャンセル</Button>
      </DialogActions>
    </Dialog>
  );
};
