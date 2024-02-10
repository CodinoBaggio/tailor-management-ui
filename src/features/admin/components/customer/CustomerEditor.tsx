import React, { FC, useState } from 'react';
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
  Backdrop,
  CircularProgress,
  ListSubheader,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import { useForm } from 'react-hook-form';

import { prefectures } from '../../utils/util';
import { GridContainer } from '../../../../components/containers/GridContainer';
import { ShopType } from '../../types/admin';
import adminApi from '../../api/adminApi';
import { confirmYesNo } from '../../../../utils/confirm';
import { Toast } from 'primereact/toast';
import { useToast } from '../../../../hooks/useToast';

const style = {
  boxMargin: 'mb-2',
};

type Props = {
  shop: ShopType;
  readOnly: boolean;
  deleteShop: (shopId: string) => void;
};

export const CustomerEditor: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const { shop, readOnly, deleteShop } = props;
  const { chargePersons } = shop;
  const [readOnlyState, setReadOnlyState] = useState(readOnly);
  const [checked] = useState(shop.isOwn);
  const [selectedPrefecture, setSelectedPrefecture] = React.useState(
    shop.prefecture
  );
  const [selectedShopGroup, setSelectedShopGroup] = React.useState(
    shop.shopGroup
  );
  const { register, handleSubmit } = useForm({
    defaultValues: {
      isOwn: shop.isOwn,
      shopGroup: shop.shopGroup,
      shopNo: shop.shopNo,
      shopName: shop.shopName,
      'postal-no': shop.postalCode,
      prefecture: shop.prefecture,
      city: shop.city,
      address: shop.address,
      building: shop.building,
    },
  });
  const prefecturesItems = prefectures();
  const { toast, showMessage } = useToast();

  const handleChange = (event: any) => {
    setSelectedPrefecture(event.target.value);
  };

  const handleShopGroupChange = (event: any) => {
    setSelectedShopGroup(event.target.value);
  };

  const handleUpdate = (data: any) => {
    const updateShop = async () => {
      try {
        // スピナーを表示する
        setOpen(true);

        // 顧客情報を更新する
        const res: any = await adminApi.shop.updateShop({
          endpoint: 'update-shop',
          endpointParams: { shop: data },
        });

        if (res.status === 'error') {
          showMessage('エラー', 'error', res.message);
          return;
        }

        setReadOnlyState(!readOnlyState);
      } catch (error: any) {
        showMessage('エラー', 'error', error);
      } finally {
        // スピナーを非表示にする
        setOpen(false);
      }
    };
    confirmYesNo('更新しますか？', updateShop);
  };

  const handleDelete = () => {
    confirmYesNo('削除しますか？', () => {
      try {
        deleteShop(shop.shopId);
      } catch (error: any) {
        showMessage('エラー', 'error', error);
      }
    });
  };

  return (
    <>
      <Box position="relative">
        <form onSubmit={handleSubmit(handleUpdate)}>
          <Box
            className={`p-4 m-2 border rounded-md shadow-md border-blue-200 ${
              readOnlyState || 'bg-red-50'
            }`}
          >
            {!readOnlyState || (
              <>
                <IconButton
                  color="primary"
                  onClick={() => setReadOnlyState(!readOnlyState)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton color="primary" onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}
            {readOnlyState || (
              <>
                <IconButton color="error" type="submit">
                  <SaveIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => setReadOnlyState(!readOnlyState)}
                >
                  <UndoIcon />
                </IconButton>
              </>
            )}
            <Box className="flex">
              <Box>
                <Box className={style.boxMargin}>
                  <FormControlLabel
                    control={
                      <Switch checked={checked} {...register('isOwn')} />
                    }
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
                    {...register('postal-no')}
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
                    />
                  </GridContainer>
                </Box>
              </Box>
              <Box>
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
                  {chargePersons.map((chargePerson, index: number) => (
                    <ListItem key={index} sx={{ py: 0, minHeight: 32 }}>
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
                  ))}
                </List>
              </Box>
            </Box>
          </Box>
          <Backdrop
            sx={{
              color: '#fff',
              zIndex: (theme) => theme.zIndex.drawer + 1,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            open={open}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </form>
      </Box>
      <Toast ref={toast} position="center" />
    </>
  );
};
