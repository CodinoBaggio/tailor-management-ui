import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  SwipeableDrawer,
  Typography,
} from '@mui/material';
import 'dayjs/locale/ja';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SecurityIcon from '@mui/icons-material/Security';

import orderApi from '../features/order/api/orderApi';
import { setOrder, setUpdated } from '../features/order/stores/orderSlice';
import { setOrderResources } from '../features/order/stores/orderResourceSlice';
import { OrderCard } from '../features/order/components/ui/OrderCard';
import { SearchPanel } from '../features/order/components/ui/SearchPanel';
import { useSearchPanel } from '../features/order/hooks/useSearchPanel';

export const OrderList = () => {
  const searchStates = useSearchPanel();
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user.value);
  const orders = useSelector((state: any) => state.order.orders);
  const updated = useSelector((state: any) => state.order.updated);

  useEffect(() => {
    const getOrders = async () => {
      // 更新フラグが立っていない場合は何もしない
      if (!updated) return;

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

        // 更新フラグを下ろす
        dispatch(setUpdated(false));
      } catch (error) {
        alert(error);
        // console.log(error);
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
  };

  const handleAdmin = () => {
    navigate('/admin');
  };

  const handleSearch = async () => {
    // スピナーを表示する
    setOpen(true);

    try {
      // 発注リスト取得
      const res: any = await orderApi.getOrders({
        endpoint: 'orders',
        endpointParams: {
          shopId: user.shopId,
          roleId: user.roleId,
          dateType: searchStates.dateType,
          dateFrom: searchStates.dateFrom?.toISOString(),
          dateTo: searchStates.dateTo?.toISOString(),
          orderId: searchStates.orderId,
          customerName: searchStates.customerName,
          orderStatausType: searchStates.orderStatausType,
        },
      });
      dispatch(setOrder(res.payload.orders));
      setDrawerOpen(false);
    } catch (error) {
      alert(error);
      // console.log(error);
    } finally {
      // スピナーを非表示にする
      setOpen(false);
    }
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        event instanceof KeyboardEvent &&
        (event.key === 'Tab' || event.key === 'Shift')
      ) {
        return;
      }

      setDrawerOpen(open);
    };

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Button
          onClick={toggleDrawer(true)}
          startIcon={<ArrowForwardIosIcon />}
        >
          検索
        </Button>
        <Box>
          <Button onClick={handleCreate} startIcon={<AddIcon />}>
            新規オーダー
          </Button>
          {user.roleId === '00' && (
            <Button onClick={handleAdmin} startIcon={<SecurityIcon />}>
              管理者メニュー
            </Button>
          )}
        </Box>
        <SwipeableDrawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <SearchPanel
            searchStates={searchStates}
            handleSearch={handleSearch}
            toggleDrawer={toggleDrawer}
          />
        </SwipeableDrawer>
      </Box>
      <Divider sx={{ marginBottom: '10px' }} />
      <Box>
        {0 < orders.length ? (
          orders.map((order: any, index: number) => {
            return (
              <div key={index}>
                <OrderCard order={order} handleEdit={handleEdit} />
              </div>
            );
          })
        ) : (
          <Typography>オーダー情報はありません</Typography>
        )}
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
