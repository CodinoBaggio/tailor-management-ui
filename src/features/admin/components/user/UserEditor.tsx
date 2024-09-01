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
  Backdrop,
  CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import { useForm } from 'react-hook-form';

import { GridContainer } from '../../../../components/containers/GridContainer';
import { ShopType, UserType } from '../../types/admin';
import adminApi from '../../api/adminApi';
import { confirmYesNo } from '../../../../utils/confirm';
import { Toast } from 'primereact/toast';
import { useToast } from '../../../../hooks/useToast';
import dayjs from 'dayjs';

const style = {
  boxMargin: 'mb-2',
};

type Props = {
  user: UserType;
  shops: ShopType[];
  readOnly: boolean;
  deleteUser?: (shopId: string) => void;
  createUser?: () => void;
  backToUserList?: () => void;
};

export const UserEditor: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const { user, shops, readOnly, deleteUser } = props;
  const { shop } = user;
  const [readOnlyState, setReadOnlyState] = useState(readOnly);
  const [checked, setChecked] = useState(user.allowLogin);
  const [selectedRoleId, setSelectedRoleId] = React.useState(user.roleId);
  const [selectedShopId, setSelectedShopId] = React.useState(shop ? shop.shopId : 'empty');
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      userId: user.userId,
      loginId: user.loginId,
      password: user.password,
      userName: user.userName,
      userNameKana: user.userNameKana,
      allowLogin: user.allowLogin,
      roleId: user.roleId,
      seqHead: user.seqHead,
      commonItem: {
        isDelete: user.commonItem.isDelete,
        createUserId: user.commonItem.createUserId,
        createDateTime: user.commonItem.createDateTime,
        updateUserId: user.commonItem.updateUserId,
        updateDateTime: user.commonItem.updateDateTime,
      },
      shop: {
        shopId: shop!.shopId,
        shopName: shop!.shopName,
        shopGroup: shop!.shopGroup,
        shopNo: shop!.shopNo,
        postalCode: shop!.postalCode,
        prefecture: shop!.prefecture,
        city: shop!.city,
        address: shop!.address,
        building: shop!.building,
        isOwn: shop!.isOwn,
        commonItem: {
          isDelete: shop!.commonItem.isDelete,
          createUserId: shop!.commonItem.createUserId,
          createDateTime: shop!.commonItem.createDateTime,
          updateUserId: shop!.commonItem.updateUserId,
          updateDateTime: shop!.commonItem.updateDateTime,
        },
      },
    },
  });
  const { toast, showMessage } = useToast();

  const handleChange = (event: any) => {
    setSelectedShopId(event.target.value);
  };

  const handleRoleIdChange = (event: any) => {
    setSelectedRoleId(event.target.value);
  };

  const handleCheckChange = (event: any) => {
    setChecked(event.target.checked);
  };

  const handleUpdate = async (data: any) => {
    // 入力チェック
    if (data.loginId === '') {
      showMessage('エラー', 'error', 'ログインIDを入力してください');
      return;
    }
    if (data.password === '') {
      showMessage('エラー', 'error', 'パスワードを入力してください');
      return;
    }
    if (data.userName === '') {
      showMessage('エラー', 'error', 'ユーザー名を入力してください');
      return;
    }
    if (data.userNameKana === '') {
      showMessage('エラー', 'error', 'ユーザー名カナを入力してください');
      return;
    }
    if (!data.roleId || data.roleId === 'empty') {
      showMessage('エラー', 'error', '権限を選択してください');
      return;
    }
    if (!data.seqHead || data.seqHead === '') {
      showMessage('エラー', 'error', '連番頭文字を入力してください');
      return;
    }
    if (!data.shop?.shopId || data.shop?.shopId === 'empty') {
      showMessage('エラー', 'error', '卸先を選択してください');
      return;
    }

    try {
      // スピナーを表示する
      setOpen(true);

      // 顧客情報を更新する
      data.allowLogin = checked;
      data.commonItem.updateDateTime = dayjs().format('YYYY-MM-DDTHH:mm:ss');
      data.commonItem.updateUserId = user.userId;
      const res: any = await adminApi.user.updateUser({
        user: data,
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
        deleteUser!(user.userId);
      } catch (error: any) {
        showMessage('エラー', 'error', error);
      }
    });
  };

  const handleUndo = () => {
    reset({
      userId: user.userId,
      loginId: user.loginId,
      password: user.password,
      userName: user.userName,
      userNameKana: user.userNameKana,
      allowLogin: user.allowLogin,
      roleId: user.roleId,
      commonItem: {
        isDelete: user.commonItem.isDelete,
        createUserId: user.commonItem.createUserId,
        createDateTime: user.commonItem.createDateTime,
        updateUserId: user.commonItem.updateUserId,
        updateDateTime: user.commonItem.updateDateTime,
      },
      shop: {
        shopId: shop!.shopId,
        shopName: shop!.shopName,
        shopGroup: shop!.shopGroup,
        shopNo: shop!.shopNo,
        postalCode: shop!.postalCode,
        prefecture: shop!.prefecture,
        city: shop!.city,
        address: shop!.address,
        building: shop!.building,
        isOwn: shop!.isOwn,
        commonItem: {
          isDelete: shop!.commonItem.isDelete,
          createUserId: shop!.commonItem.createUserId,
          createDateTime: shop!.commonItem.createDateTime,
          updateUserId: shop!.commonItem.updateUserId,
          updateDateTime: shop!.commonItem.updateDateTime,
        },
      },
    });
    setChecked(user.allowLogin);
    setSelectedShopId(shop ? shop.shopId : 'empty');
    setSelectedRoleId(user.roleId);

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
                  <GridContainer>
                    <FormControlLabel
                      disabled={readOnlyState}
                      control={<Switch checked={checked} {...register('allowLogin')} onChange={handleCheckChange} />}
                      className="text-gray-500"
                      label="ログイン可"
                    />
                    <FormControl variant="standard">
                      <InputLabel>権限</InputLabel>
                      <Select
                        readOnly={readOnlyState}
                        value={selectedRoleId}
                        sx={{ width: 200 }}
                        {...register('roleId')}
                        onChange={handleRoleIdChange}
                        size="small"
                      >
                        <MenuItem value="empty"></MenuItem>
                        <MenuItem value="00">管理者</MenuItem>
                        <MenuItem value="10">一般</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl variant="standard">
                      <InputLabel>卸先</InputLabel>
                      <Select
                        readOnly={readOnlyState}
                        value={selectedShopId}
                        sx={{ width: 200 }}
                        {...register('shop.shopId')}
                        onChange={handleChange}
                        size="small"
                      >
                        {shops.map((item) => {
                          return (
                            <MenuItem key={item.shopId} value={item.shopId}>
                              {item.shopName}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <TextField
                      variant="standard"
                      label="連番頭文字"
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      {...register('seqHead')}
                      InputProps={{ readOnly: readOnlyState }}
                    />
                  </GridContainer>
                </Box>
                <Box className={style.boxMargin}>
                  <GridContainer>
                    <TextField
                      variant="standard"
                      label="ユーザーID"
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      {...register('userId')}
                      InputProps={{ readOnly: true }}
                    />
                    <TextField
                      variant="standard"
                      label="ログインID"
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      {...register('loginId')}
                      InputProps={{ readOnly: readOnlyState }}
                    />
                    <TextField
                      variant="standard"
                      label="パスワード"
                      // type="password"
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      {...register('password')}
                      InputProps={{ readOnly: readOnlyState }}
                    />
                    <TextField
                      variant="standard"
                      label="名前"
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      {...register('userName')}
                      InputProps={{ readOnly: readOnlyState }}
                    />
                    <TextField
                      variant="standard"
                      label="名前かな"
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      {...register('userNameKana')}
                      InputProps={{ readOnly: readOnlyState }}
                    />
                  </GridContainer>
                </Box>
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
