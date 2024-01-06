import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import orderApi from '../features/order/api/orderApi';
import { setOrder, setOrderResources } from '../features/order/stores/orderSlice';
import { useNavigate } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';

export const OrderList = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user.value);
  const orders = useSelector((state: any) => state.order.value);

  useEffect(() => {
    const getOrders = async () => {
      // スピナーを表示する
      setOpen(true);

      try {
        // 発注リスト取得
        const res: any = await orderApi.getOrders({
          endpoint: 'orders',
          endpointParams: { shopId: user.shopId, roleId: user.roleId },
        });
        dispatch(setOrder(res.payload.orders));

        // リソース取得
        const res2: any = await orderApi.getOrderResources({
          endpoint: 'order-resources',
          endpointParams: {},
        });
        dispatch(setOrderResources(res2.payload));
      } catch (error) {
        alert(error);
        console.log(error);
      } finally {
        // スピナーを非表示にする
        setOpen(false);
      }
    };
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleEdit = (orderId: string) => {
    navigate(`/order/${orderId}`);
  };

  const handleCreate = () => {
    navigate('/order/new');
    // alert('新規');
  };

  return (
    <>
      <button onClick={handleCreate}>新規</button>
      {orders.map((order: any, index: number) => {
        return (
          <div key={index}>
            <div>{order.orderId}</div>
            <div>{order.customerName}</div>
            <button onClick={() => handleEdit(order.orderId)}>編集</button>
          </div>
        );
      })}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
