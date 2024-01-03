import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import orderApi from '../api/orderApi';
import { setOrder } from '../redux/features/orderSlice';
import { useNavigate } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';

export const OrderList = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user.value);
  const orders = useSelector((state: any) => state.order.value);

  useEffect(() => {
    const getOrders = async () => {
      // スピナーを表示する
      setOpen(true);

      try {
        const res: any = await orderApi.getOrders({
          endpoint: 'orders',
          endpointParams: { shopId: user.shopId, roleId: user.roleId },
        });
        dispatch(setOrder(res.payload.orders));
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
    alert('新規');
  };

  return (
    <>
      <button onClick={handleCreate}>新規</button>
      {orders.map((order: any) => {
        return (
          <>
            <div>{order.orderId}</div>
            <div>{order.customerName}</div>
            <button onClick={() => handleEdit(order.orderId)}>編集</button>
          </>
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
