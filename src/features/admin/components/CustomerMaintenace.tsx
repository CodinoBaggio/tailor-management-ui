import React, { useCallback, useEffect, useState } from 'react';
import { CustomerEditor } from './customer/CustomerEditor';
import { Backdrop, Box, Button, CircularProgress } from '@mui/material';
import { Toast } from 'primereact/toast';
import AddIcon from '@mui/icons-material/Add';

import adminApi from '../api/adminApi';
import { ShopType } from '../types/admin';
import { useToast } from '../../../hooks/useToast';
import { CustomerAddEditor } from './customer/CustomerAddEditor';

export const CustomerMaintenace = () => {
  const [open, setOpen] = useState(false);
  const [shops, setShops] = useState<ShopType[]>([]);
  const [newShop, setNewShop] = useState<ShopType>({
    shopId: '',
    shopName: '',
    shopGroup: 'empty',
    shopNo: '',
    postalCode: '',
    prefecture: 'empty',
    city: '',
    address: '',
    building: '',
    isOwn: false,
    isDelete: false,
    createUserId: '',
    createDateTime: '',
    updateUserId: '',
    updateDateTime: '',
    chargePersons: [],
  });
  const [newShopOpen, setNewShopOpen] = useState(false);
  const { toast, showMessage } = useToast();

  useEffect(() => {
    // 顧客情報を取得する
    const getShops = async () => {
      try {
        // スピナーを表示する
        setOpen(true);
  
        // 顧客リスト取得
        const res: any = await adminApi.shop.getShops({
          endpoint: 'shops',
          endpointParams: {},
        });
        setShops(res.payload.shops);
      } catch (error: any) {
        showMessage('エラー', 'error', error);
      } finally {
        // スピナーを非表示にする
        setOpen(false);
      }
    };
    getShops();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteShop = useCallback(
    async (shopId: string) => {
      try {
        // スピナーを表示する
        setOpen(true);

        // 顧客情報を削除する
        const res: any = await adminApi.shop.deleteShop({
          endpoint: 'delete-shop',
          endpointParams: { shopId: shopId },
        });

        if (res.status === 'error') {
          showMessage('エラー', 'error', res.message);
          return;
        }

        // shopsから削除する
        const newShops = shops.filter(
          (shop: ShopType) => shop.shopId !== shopId
        );
        setShops(newShops);

        showMessage('削除しました');
      } catch (error: any) {
        showMessage('エラー', 'error', error);
      } finally {
        // スピナーを非表示にする
        setOpen(false);
      }
    },
    [shops]
  );

  const handleAddShopOpen = () => {
    setNewShop({
      shopId: '',
      shopName: '',
      shopGroup: 'empty',
      shopNo: '',
      postalCode: '',
      prefecture: 'empty',
      city: '',
      address: '',
      building: '',
      isOwn: false,
      isDelete: false,
      createUserId: '',
      createDateTime: '',
      updateUserId: '',
      updateDateTime: '',
      chargePersons: [],
    });
    setNewShopOpen(true);
  };

  const handleCreateShop = async (shop: ShopType) => {
    try {
      // スピナーを表示する
      setOpen(true);

      // 顧客情報を作成する
      const res: any = await adminApi.shop.createShop({
        endpoint: 'create-shop',
        endpointParams: { shop: shop },
      });

      if (res.status === 'error') {
        showMessage('エラー', 'error', res.message);
        return;
      }

      // shopsに追加する
      const newShops = [...shops, shop];
      setShops(newShops);

      showMessage('登録しました');
      setNewShopOpen(false);
    } catch (error: any) {
      showMessage('エラー', 'error', error);
    } finally {
      // スピナーを非表示にする
      setOpen(false);
    }
  };

  const handleBackToShopList = () => {
    setNewShopOpen(false);
  };

  return (
    <>
      <Box>
        <Button onClick={handleAddShopOpen} startIcon={<AddIcon />}>
          新規卸先
        </Button>
      </Box>
      {shops.map((shop: ShopType, index: number) => (
        <CustomerEditor
          key={index}
          shop={shop}
          readOnly={true}
          deleteShop={deleteShop}
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
        open={newShopOpen}
      >
        <CustomerAddEditor
          shop={newShop}
          createShop={handleCreateShop}
          backToShopList={handleBackToShopList}
        />
      </Backdrop>
      <Toast ref={toast} position="center" />
    </>
  );
};
