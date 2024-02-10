import React, { useCallback, useEffect, useState } from 'react';
import { CustomerEditor } from './customer/CustomerEditor';
import { Backdrop, CircularProgress } from '@mui/material';
import { Toast } from 'primereact/toast';

import adminApi from '../api/adminApi';
import { useMessageDialog } from '../../order/hooks/useMessageDialog';
import { OkOnlyDialog } from '../../../components/ui/OkOnlyDialog';
import { ShopType } from '../types/admin';
import { useToast } from '../../../hooks/useToast';

export const CustomerMaintenace = () => {
  const [open, setOpen] = useState(false);
  const [shops, setShops] = useState([]);
  const okOnlyDialog = useMessageDialog();
  const { toast, showMessage } = useToast();

  useEffect(() => {
    // 顧客情報を取得する
    const getShops = async () => {
      // スピナーを表示する
      setOpen(true);

      try {
        // 顧客リスト取得
        const res: any = await adminApi.shop.getShops({
          endpoint: 'shops',
          endpointParams: {},
        });
        setShops(res.payload.shops);
      } catch (error) {
        okOnlyDialog.showMessage(error);
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

  return (
    <>
      {shops.map((shop: ShopType, index: number) => (
        <CustomerEditor
          key={index}
          shop={shop}
          readOnly={true}
          deleteShop={deleteShop}
        />
      ))}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toast ref={toast} position="center" />
      <OkOnlyDialog
        open={okOnlyDialog.messageDialogOpen}
        message={okOnlyDialog.messageDialogMessage}
        onClick={okOnlyDialog.handleClick}
      />
    </>
  );
};
