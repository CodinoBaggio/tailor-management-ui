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
} from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import { useForm } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';

import { GridContainer } from '../../../../components/containers/GridContainer';
import { ShopType, UserType } from '../../types/admin';

const style = {
  boxMargin: 'mb-2',
};

type Props = {
  user: UserType;
  shops: ShopType[];
  createUser: (data: any) => void;
  backToUserList?: () => void;
};

export const UserAddEditor: FC<Props> = (props) => {
  const { user, shops, createUser, backToUserList } = props;
  const { shop } = user;
  const [checked, setChecked] = useState(user.allowLogin);
  const [selectedRoleId, setSelectedRoleId] = React.useState(user.roleId);
  const [selectedShopId, setSelectedShopId] = React.useState(
    shop ? shop.shopId : 'empty'
  );
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      userId: user.userId,
      password: user.password,
      userName: user.userName,
      userNameKana: user.userNameKana,
      allowLogin: user.allowLogin,
      roleId: user.roleId,
      shop: {
        shopId: shop ? shop.shopId : 'empty',
        commonItem: user.shop?.commonItem,
      },
      commonItem: {
        isDelete: user.commonItem.isDelete,
        createUserId: user.commonItem.createUserId,
        createDateTime: user.commonItem.createDateTime,
        updateUserId: user.commonItem.updateUserId,
        updateDateTime: user.commonItem.updateDateTime,
      },
    },
  });

  useEffect(() => {
    reset({
      userId: user.userId,
      password: user.password,
      userName: user.userName,
      userNameKana: user.userNameKana,
      allowLogin: user.allowLogin,
      roleId: user.roleId,
      shop: {
        shopId: shop ? shop.shopId : 'empty',
        commonItem: user.shop?.commonItem,
      },
      commonItem: {
        isDelete: user.commonItem.isDelete,
        createUserId: user.commonItem.createUserId,
        createDateTime: user.commonItem.createDateTime,
        updateUserId: user.commonItem.updateUserId,
        updateDateTime: user.commonItem.updateDateTime,
      },
    });
    setChecked(user.allowLogin);
    setSelectedShopId(shop ? shop.shopId : 'empty');
    setSelectedRoleId(user.roleId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleChange = (event: any) => {
    setSelectedShopId(event.target.value);
  };

  const handleRoleIdChange = (event: any) => {
    setSelectedRoleId(event.target.value);
  };

  const handleCheckChange = (event: any) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <form onSubmit={handleSubmit(createUser)}>
        <Box className="p-4 m-2 border rounded-md shadow-md border-blue-200 bg-red-50">
          <IconButton color="error" type="submit">
            <AddIcon />
          </IconButton>
          <IconButton color="error" onClick={backToUserList}>
            <UndoIcon />
          </IconButton>
          <Box className="md:flex">
            <Box>
              <Box className={style.boxMargin}>
                <GridContainer>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={checked}
                        {...register('allowLogin')}
                        onChange={handleCheckChange}
                      />
                    }
                    className="text-gray-500"
                    label="ログイン可"
                  />
                  <FormControl variant="standard">
                    <InputLabel>権限</InputLabel>
                    <Select
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
                    label="パスワード"
                    type="password"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    {...register('password')}
                  />
                  <TextField
                    variant="standard"
                    label="名前"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    {...register('userName')}
                  />
                  <TextField
                    variant="standard"
                    label="名前カナ"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    {...register('userNameKana')}
                  />
                </GridContainer>
              </Box>
            </Box>
          </Box>
        </Box>
      </form>
    </>
  );
};
