import React, { FC, useEffect, useState } from 'react';
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
  ListItemText,
  ListItemIcon,
  ListSubheader,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import UndoIcon from '@mui/icons-material/Undo';
import { useForm } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';

import { prefectures } from '../../utils/util';
import { GridContainer } from '../../../../components/containers/GridContainer';
import { ShopType } from '../../types/admin';

const style = {
  boxMargin: 'mb-2',
};

type Props = {
  shop: ShopType;
  createShop: (data: any) => void;
  backToShopList: () => void;
};

export const CustomerAddEditor: FC<Props> = (props) => {
  const { shop, createShop, backToShopList } = props;
  const { chargePersons } = shop;
  const [checked, setChecked] = useState(shop.isOwn);
  const [selectedPrefecture, setSelectedPrefecture] = React.useState(
    shop.prefecture
  );
  const [selectedShopGroup, setSelectedShopGroup] = React.useState(
    shop.shopGroup
  );
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      isOwn: shop.isOwn,
      shopGroup: shop.shopGroup,
      shopNo: shop.shopNo,
      shopName: shop.shopName,
      postalCode: shop.postalCode,
      prefecture: shop.prefecture,
      city: shop.city,
      address: shop.address,
      building: shop.building,
    },
  });
  const prefecturesItems = prefectures();

  useEffect(() => {
    reset({
      isOwn: shop.isOwn,
      shopGroup: shop.shopGroup,
      shopNo: shop.shopNo,
      shopName: shop.shopName,
      postalCode: shop.postalCode,
      prefecture: shop.prefecture,
      city: shop.city,
      address: shop.address,
      building: shop.building,
    });
    setChecked(shop.isOwn);
    setSelectedPrefecture(shop.prefecture);
    setSelectedShopGroup(shop.shopGroup);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shop]);

  const handleChange = (event: any) => {
    setSelectedPrefecture(event.target.value);
  };

  const handleShopGroupChange = (event: any) => {
    setSelectedShopGroup(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit(createShop)}>
        <Box
          className={
            'p-4 m-2 border rounded-md shadow-md border-blue-200 bg-red-50'
          }
        >
          <IconButton color="error" type="submit">
            <AddIcon />
          </IconButton>
          <IconButton color="error" onClick={backToShopList}>
            <UndoIcon />
          </IconButton>
          <Box className="flex">
            <Box>
              <Box className={style.boxMargin}>
                <FormControlLabel
                  control={
                    <Switch defaultChecked={checked} {...register('isOwn')} />
                  }
                  className="text-gray-500"
                  label="自社"
                />
              </Box>
              <Box className={style.boxMargin}>
                <GridContainer>
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
                      <MenuItem value="JV1">JV1</MenuItem>
                      <MenuItem value="HH">HH</MenuItem>
                      <MenuItem value="HH1">HH1</MenuItem>
                      <MenuItem value="HH2">HH2</MenuItem>
                      <MenuItem value="HH3">HH3</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    variant="standard"
                    label="顧客カテゴリ"
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
                      endAdornment: (
                        <InputAdornment position="end">様</InputAdornment>
                      ),
                      // readOnly: true,
                    }}
                  />
                </GridContainer>
              </Box>
              <Box className={style.boxMargin}>
                <TextField
                  variant="standard"
                  type="number"
                  label="郵便番号"
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  helperText="ハイフンなし"
                  placeholder="1234567"
                  {...register('postalCode')}
                />
                ,
              </Box>
              <Box className={style.boxMargin}>
                <GridContainer>
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
                    className="w-80"
                    />
                </GridContainer>
              </Box>
            </Box>
            <Box>
              {chargePersons!.length > 0 && (
                <List
                  sx={{
                    width: '180px',
                    maxWidth: 360,
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 200,
                    border: 1,
                    borderColor: 'divider',
                  }}
                  subheader={
                    <ListSubheader
                      component="div"
                      id="nested-list-subheader"
                      className="text-center"
                    >
                      担当者
                    </ListSubheader>
                  }
                >
                  {chargePersons?.map((chargePerson) => {
                    if (chargePerson.user) {
                      return (
                        <ListItem
                          key={chargePerson.user.userId}
                          sx={{ py: 0, minHeight: 32 }}
                        >
                          <ListItemIcon>
                            <PersonIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={chargePerson.user.userName}
                            primaryTypographyProps={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              color: 'rgb(0 0 0 / .4)',
                            }}
                          />
                        </ListItem>
                      );
                    }
                  })}
                </List>
              )}
            </Box>
          </Box>
        </Box>
      </form>
    </>
  );
};
