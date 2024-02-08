import React, { useEffect, useState } from 'react';
import { CustomerEditor } from './customer/CustomerEditor';
import { Backdrop, CircularProgress } from '@mui/material';
import adminApi from '../api/adminApi';
import { useMessageDialog } from '../../order/hooks/useMessageDialog';
import { OkOnlyDialog } from '../../../components/ui/OkOnlyDialog';

export const CustomerMaintenace = () => {
  const [open, setOpen] = useState(false);
  const [shops, setShops] = useState([]);
  const okOnlyDialog = useMessageDialog();

  useEffect(() => {
    // 顧客情報を取得する
    const getOrders = async () => {
      // スピナーを表示する
      setOpen(true);

      try {
        // 顧客リスト取得
        const res: any = await adminApi.getShops({
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
    getOrders();
  }, []);

  return (
    <>
      {shops.map((shop: any) => (
        <CustomerEditor key={shop.id} />
      ))}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <OkOnlyDialog
        open={okOnlyDialog.messageDialogOpen}
        message={okOnlyDialog.messageDialogMessage}
        onClick={okOnlyDialog.handleClick}
      />
    </>
  );
};
