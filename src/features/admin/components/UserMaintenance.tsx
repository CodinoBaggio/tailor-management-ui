import React, { useCallback, useEffect, useState } from 'react';
import { Backdrop, Box, Button, CircularProgress } from '@mui/material';
import { Toast } from 'primereact/toast';
import AddIcon from '@mui/icons-material/Add';

import adminApi from '../api/adminApi';
import { ShopType, UserType } from '../types/admin';
import { useToast } from '../../../hooks/useToast';
import { SearchTextField } from '../../../components/ui/SearchTextField';
import { UserEditor } from './user/UserEditor';
import { UserAddEditor } from './user/UserAddEditor';
import { useSelector } from 'react-redux';
import { toDateTimeString } from '../../../utils/util';

export const UserMaintenance = () => {
  const [open, setOpen] = useState(false);
  const [orgUsers, setOrgUsers] = useState<UserType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [newUser, setNewUser] = useState<UserType>({
    userId: '',
    password: '',
    userName: '',
    userNameKana: '',
    allowLogin: false,
    roleId: '',
    commonItem: {
      isDelete: false,
      createUserId: '',
      createDateTime: '',
      updateUserId: '',
      updateDateTime: '',
    }
  });
  const [newUserOpen, setNewUserOpen] = useState(false);
  const [shops, setShops] = useState<ShopType[]>([]);
  const { toast, showMessage } = useToast();
  const loginUser = useSelector((state: any) => state.user.value);

  useEffect(() => {
    // ユーザー情報を取得する
    const initialize = async () => {
      try {
        // スピナーを表示する
        setOpen(true);

        // ユーザーリスト取得
        const res: any = await adminApi.user.getUsers({});
        if (res.status === 'error') {
          showMessage('エラー', 'error', res.message);
          return;
        }
        setUsers(res.payload.users);
        setOrgUsers(res.payload.users);

        // 顧客リスト取得
        const resShop: any = await adminApi.shop.getShops({});
        setShops([{ shopId: 'empty', shopName: '' }, ...resShop.payload.shops]);
      } catch (error: any) {
        showMessage('エラー', 'error', error);
      } finally {
        // スピナーを非表示にする
        setOpen(false);
      }
    };
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteUser = useCallback(
    async (userId: string) => {
      try {
        // スピナーを表示する
        setOpen(true);

        // ユーザー情報を削除する
        const res: any = await adminApi.user.deleteUser({
          userId: userId,
        });

        if (res.status === 'error') {
          showMessage('エラー', 'error', res.message);
          return;
        }

        // usersから削除する
        const newShops = users.filter(
          (user: UserType) => user.userId !== userId
        );
        setUsers(newShops);
        setOrgUsers(newShops);

        showMessage('削除しました');
      } catch (error: any) {
        showMessage('エラー', 'error', error);
      } finally {
        // スピナーを非表示にする
        setOpen(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [users]
  );

  const handleAddUserOpen = () => {
    setNewUser({
      userId: '(新規)',
      password: '',
      userName: '',
      userNameKana: '',
      allowLogin: false,
      roleId: 'empty',
      commonItem: {
        isDelete: false,
        createUserId: loginUser.userId,
        createDateTime: toDateTimeString(new Date()),
        updateUserId: loginUser.userId,
        updateDateTime: toDateTimeString(new Date()),
      },
      shop: {
        shopId: 'empty',
        shopName: '',
        shopGroup: '',
        shopNo: '',
        postalCode: '',
        prefecture: '',
        city: '',
        address: '',
        building: '',
        isOwn: false,
        commonItem: {
          isDelete: false,
          createUserId: loginUser.userId,
          createDateTime: toDateTimeString(new Date()),
          updateUserId: loginUser.userId,
          updateDateTime: toDateTimeString(new Date()),
        },
      },
    });
    setNewUserOpen(true);
  };

  const handleCreateUser = async (user: UserType) => {
    try {
      // スピナーを表示する
      setOpen(true);

      // ユーザー情報を作成する
      const res: any = await adminApi.user.createUser({
        user: user,
      });

      if (res.status === 'error') {
        showMessage('エラー', 'error', res.message);
        return;
      }

      // shopsに追加する
      const newUsers = [...users, res.payload.user];
      setUsers(newUsers);
      setOrgUsers(newUsers);

      showMessage('登録しました');
      setNewUserOpen(false);
    } catch (error: any) {
      showMessage('エラー', 'error', error);
    } finally {
      // スピナーを非表示にする
      setOpen(false);
    }
  };

  const handleBackToUserList = () => {
    setNewUserOpen(false);
  };

  const handleSearch = (text: any) => {
    if (text === '') {
      setUsers(orgUsers);
      return;
    }
    console.log(text);
    const newUsers = orgUsers.filter((user: UserType) => {
      return user.userName.includes(text) || user.userNameKana.includes(text);
    });
    setUsers(newUsers);
  };

  return (
    <>
      <Box className="flex justify-between">
        <Button onClick={handleAddUserOpen} startIcon={<AddIcon />}>
          新規ユーザー
        </Button>
        <Box>
          <SearchTextField onSearch={handleSearch} />
        </Box>
      </Box>
      {users.map((user: UserType) => (
        <UserEditor
          key={user.userId}
          shops={shops}
          user={user}
          readOnly={true}
          deleteUser={deleteUser}
        />
      ))}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 2 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={newUserOpen}
      >
        <UserAddEditor
          user={newUser}
          shops={shops}
          createUser={handleCreateUser}
          backToUserList={handleBackToUserList}
        />
      </Backdrop>
      <Toast ref={toast} position="center" />
    </>
  );
};
