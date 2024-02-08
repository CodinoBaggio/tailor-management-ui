import React, { useState } from 'react';
import {
  IconButton,
  Box,
  FormControlLabel,
  Switch,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import { useForm } from 'react-hook-form';

import { prefectures } from '../../utils/util';

export const CustomerEditor = () => {
  const [checked, setChecked] = useState(false);
  const [selectedPrefecture, setSelectedPrefecture] = React.useState('empty');
  const [selectedShopGroup, setSelectedShopGroup] = React.useState('empty');
  const { register, handleSubmit } = useForm();
  const prefecturesItems = prefectures();

  const handleOwn = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleChange = (event: any) => {
    setSelectedPrefecture(event.target.value);
  };

  const handleShopGroupChange = (event: any) => {
    setSelectedShopGroup(event.target.value);
  };

  return (
    <>
      <IconButton color="primary">
        <EditIcon />
      </IconButton>
      <IconButton color="primary">
        <DeleteIcon />
      </IconButton>
      <IconButton color="primary">
        <SaveIcon />
      </IconButton>
      <IconButton color="primary">
        <UndoIcon />
      </IconButton>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <FormControlLabel
            control={<Switch onChange={handleOwn} value={checked} />}
            label="自社"
          />
        </Box>
        <Box>
          <TextField
            variant="standard"
            type="number"
            label="郵便番号"
            size="small"
            InputLabelProps={{ shrink: true }}
            helperText="ハイフンなし"
            placeholder="1234567"
            {...register('postal-no')}
          />
          <FormControl variant="standard">
            <InputLabel>都道府県</InputLabel>
            <Select
              value={selectedPrefecture}
              sx={{ width: 200 }}
              {...register('prefecture')}
              onChange={handleChange}
              size="small"
            >
              {prefecturesItems.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            variant="standard"
            label="市区町村"
            size="small"
            InputLabelProps={{ shrink: true }}
            placeholder="福岡市中央区天神"
            {...register('city')}
          />
          <TextField
            variant="standard"
            label="番地"
            size="small"
            InputLabelProps={{ shrink: true }}
            placeholder="1丁目8-1、1-8-1"
            {...register('address')}
          />
          <TextField
            variant="standard"
            label="建物名"
            size="small"
            InputLabelProps={{ shrink: true }}
            placeholder="xxxビル、yyyマンション"
            {...register('building')}
          />
          <FormControl variant="standard">
            <InputLabel>仲間分け</InputLabel>
            <Select
              value={selectedShopGroup}
              sx={{ width: 200 }}
              {...register('shopGroup')}
              onChange={handleShopGroupChange}
              size="small"
            >
              <MenuItem value="empty"></MenuItem>
              <MenuItem value="JV">JV</MenuItem>
              <MenuItem value="HH">HH</MenuItem>
            </Select>
          </FormControl>
          <TextField
            variant="standard"
            label="番号"
            size="small"
            InputLabelProps={{ shrink: true }}
            {...register('shopNo')}
          />
          <TextField
            variant="standard"
            label="卸先様名"
            size="small"
            InputLabelProps={{ shrink: true }}
            {...register('shopName')}
            InputProps={{
              endAdornment: <InputAdornment position="end">様</InputAdornment>,
              // readOnly: true,
            }}
          />
          <List
            sx={{
              width: '100%',
              maxWidth: 360,
              position: 'relative',
              overflow: 'auto',
              maxHeight: 200,
            }}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="池田　晴彦"
                secondary="2010.10.10"
                primaryTypographyProps={{
                  fontWeight: 'medium',
                  variant: 'body2',
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="東　顕正"
                secondary="2011.11.11"
                primaryTypographyProps={{
                  fontWeight: 'medium',
                  variant: 'body2',
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="井谷　和博"
                secondary="2012.12.12"
                primaryTypographyProps={{
                  fontWeight: 'medium',
                  variant: 'body2',
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="井谷　和博"
                secondary="2012.12.12"
                primaryTypographyProps={{
                  fontWeight: 'medium',
                  variant: 'body2',
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="井谷　和博"
                secondary="2012.12.12"
                primaryTypographyProps={{
                  fontWeight: 'medium',
                  variant: 'body2',
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="井谷　和博"
                secondary="2012.12.12"
                primaryTypographyProps={{
                  fontWeight: 'medium',
                  variant: 'body2',
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="井谷　和博"
                secondary="2012.12.12"
                primaryTypographyProps={{
                  fontWeight: 'medium',
                  variant: 'body2',
                }}
              />
            </ListItem>
          </List>
        </Box>
      </form>
    </>
  );
};
