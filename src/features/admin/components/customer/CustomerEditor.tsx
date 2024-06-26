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
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

const style = {
  boxMargin: 'mb-2',
};

type Props = {
  shop: ShopType;
  readOnly: boolean;
  deleteShop?: (shopId: string) => void;
  createShop?: () => void;
  backToShopList?: () => void;
};

export const CustomerEditor: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const { shop, readOnly, deleteShop } = props;
  const { chargePersons } = shop;
  const [readOnlyState, setReadOnlyState] = useState(readOnly);
  const [checked, setChecked] = useState(shop.isOwn);
  const user = useSelector((state: any) => state.user.value);
  const [selectedPrefecture, setSelectedPrefecture] = React.useState(shop.prefecture);
  const [selectedShopGroup, setSelectedShopGroup] = React.useState(shop.shopGroup);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      shopId: shop.shopId,
      isOwn: shop.isOwn,
      shopGroup: shop.shopGroup,
      shopNo: shop.shopNo,
      shopName: shop.shopName,
      postalCode: shop.postalCode,
      prefecture: shop.prefecture,
      city: shop.city,
      address: shop.address,
      building: shop.building,
      commonItem: {
        isDelete: false,
        createUserId: user.userId,
        createDateTime: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
        updateUserId: user.userId,
        updateDateTime: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
      },
    },
  });
  const prefecturesItems = prefectures();
  const { toast, showMessage } = useToast();

  const handleShopGroupChange = (event: any) => {
    setSelectedShopGroup(event.target.value);
  };

  const handleChange = (event: any) => {
    setSelectedPrefecture(event.target.value);
  };

  const handleCheckChange = (event: any) => {
    setChecked(event.target.checked);
  };

  const handleUpdate = async (data: any) => {
    try {
      // スピナーを表示する
      setOpen(true);

      // 顧客情報を更新する
      data.isOwn = checked;
      data.commonItem.updateTime = dayjs().format('YYYY-MM-DDTHH:mm:ss');
      data.commonItem.updateUserId = user.userId;
      const res: any = await adminApi.shop.updateShop({
        shop: data,
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

  const handleDelete = () => {
    confirmYesNo('削除しますか？', () => {
      try {
        deleteShop!(shop.shopId);
      } catch (error: any) {
        showMessage('エラー', 'error', error);
      }
    });
  };

  const handleUndo = () => {
    reset({
      isOwn: shop.isOwn,
      shopId: shop.shopId,
      shopGroup: shop.shopGroup,
      shopNo: shop.shopNo,
      shopName: shop.shopName,
      postalCode: shop.postalCode,
      prefecture: shop.prefecture,
      city: shop.city,
      address: shop.address,
      building: shop.building,
      commonItem: {
        isDelete: false,
        createUserId: user.userId,
        createDateTime: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
        updateUserId: user.userId,
        updateDateTime: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
      },
    });
    setChecked(shop.isOwn);
    setSelectedShopGroup(shop.shopGroup);
    setSelectedPrefecture(shop.prefecture);

    setReadOnlyState(!readOnlyState);
  };

  return (
    <>
      <Box position="relative">
        <form onSubmit={handleSubmit(handleUpdate)}>
          <Box className={`p-4 m-2 border rounded-md shadow-md border-blue-200 ${readOnlyState || 'bg-red-50'}`}>
            {!readOnlyState || (
              <>
                <IconButton color="primary" onClick={() => setReadOnlyState(!readOnlyState)}>
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
                <IconButton color="error" onClick={handleUndo}>
                  <UndoIcon />
                </IconButton>
              </>
            )}
            <Box className="md:flex">
              <Box>
                <Box className={style.boxMargin}>
                  <FormControlLabel
                    disabled={readOnlyState}
                    control={<Switch checked={checked} {...register('isOwn')} onChange={handleCheckChange} />}
                    className="text-gray-500"
                    label="自社"
                  />
                </Box>
                <Box className={style.boxMargin}>
                  <GridContainer>
                    <FormControl variant="standard">
                      <InputLabel>仲間分け</InputLabel>
                      <Select
                        readOnly={readOnlyState}
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
                      InputProps={{ readOnly: readOnlyState }}
                    />
                    <TextField
                      variant="standard"
                      label="卸先様名"
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      {...register('shopName')}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">様</InputAdornment>,
                        readOnly: readOnlyState,
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
                    InputProps={{ readOnly: readOnlyState }}
                  />
                </Box>
                <Box className={style.boxMargin}>
                  <GridContainer>
                    <FormControl variant="standard">
                      <InputLabel>都道府県</InputLabel>
                      <Select
                        readOnly={readOnlyState}
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
                      InputProps={{ readOnly: readOnlyState }}
                    />
                    <TextField
                      variant="standard"
                      label="番地"
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      placeholder="1丁目8-1、1-8-1"
                      {...register('address')}
                      InputProps={{ readOnly: readOnlyState }}
                    />
                    <TextField
                      variant="standard"
                      label="建物名"
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      placeholder="xxxビル、yyyマンション"
                      {...register('building')}
                      InputProps={{ readOnly: readOnlyState }}
                      className="w-80"
                    />
                  </GridContainer>
                </Box>
              </Box>
              <Box>
                {chargePersons && 0 < chargePersons.length && (
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
                        sx={{
                          bgcolor: 'rgb(254 242 242 / var(--tw-bg-opacity))',
                        }}
                      >
                        担当者
                      </ListSubheader>
                    }
                  >
                    {chargePersons.map((chargePerson) => {
                      if (chargePerson.user) {
                        return (
                          <ListItem key={chargePerson.user.userId} sx={{ py: 0, minHeight: 32 }}>
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
