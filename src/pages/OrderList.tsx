import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  Pagination,
  PaginationItem,
  SwipeableDrawer,
  Typography,
} from '@mui/material';
import 'dayjs/locale/ja';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import GradingIcon from '@mui/icons-material/Grading';

import orderApi from '../features/order/api/orderApi';
import { setOrder, setUpdated } from '../features/order/stores/orderSlice';
import { setOrderResources } from '../features/order/stores/orderResourceSlice';
import { OrderCard } from '../features/order/components/ui/OrderCard';
import { SearchPanel } from '../features/order/components/ui/SearchPanel';
import { useSearchPanel } from '../features/order/hooks/useSearchPanel';
import { useToast } from '../hooks/useToast';
import { Toast } from 'primereact/toast';
import Loading from '../components/ui/Loading';

export const OrderList = () => {
  const searchStates = useSearchPanel();
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user.value);
  const orders = useSelector((state: any) => state.order.orders);
  const updated = useSelector((state: any) => state.order.updated);
  const maxPageCount = 10;
  const { toast, showMessage } = useToast();

  useEffect(() => {
    const getOrders = async () => {
      if (!updated) {
        // 更新フラグが立っていない場合はページ数を設定して終了する
        const pageCount = Math.ceil(orders.length / maxPageCount);
        setPageCount(pageCount);
        return;
      }

      // スピナーを表示する
      setOpen(true);

      try {
        // 発注リスト取得
        const res: any = await orderApi.getOrders({
          roleId: user.roleId,
          shopId: user.shopId,
        });
        dispatch(setOrder(res.payload.orders));

        // ページ数を設定する
        const pageCount = Math.ceil(res.payload.orders.length / maxPageCount);
        setPageCount(pageCount);

        // リソース取得
        const res2: any = await orderApi.getSelectPatterns({});
        dispatch(setOrderResources(res2.payload));

        // 表示更新フラグを下ろす
        dispatch(setUpdated(false));
      } catch (error: any) {
        showMessage('エラー', 'error', error);
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

  const handleSearch = async () => {
    // スピナーを表示する
    setOpen(true);

    try {
      // 発注リスト取得
      const res: any = await orderApi.getOrders({
        shopId: user.shopId,
        roleId: user.roleId,
        dateType: searchStates.dateType,
        dateFrom: searchStates.dateFrom?.toISOString(),
        dateTo: searchStates.dateTo?.toISOString(),
        orderId: searchStates.orderId,
        customerName: searchStates.customerName,
        orderStatausType: searchStates.orderStatausType,
      });
      dispatch(setOrder(res.payload.orders));
      setDrawerOpen(false);
    } catch (error: any) {
      showMessage('エラー', 'error', error);
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

  const handlePageChange = async (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    // ページを更新
    setPage(page);
  };

  return (
    <>
      <Box className=" flex my-5 text-gray-500" alignItems="center">
        <GradingIcon className="mr-3" />
        <Typography variant="h6">発注リスト</Typography>
      </Box>
      
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
        <Box className="flex justify-center mb-3">
          <Pagination
            count={pageCount}
            variant="outlined"
            shape="circular"
            renderItem={(item) => <PaginationItem {...item} color="primary" />}
            onChange={(e, page) => handlePageChange(e, page)}
          />
        </Box>
        {0 < orders.length ? (
          orders
            .slice((page - 1) * maxPageCount, page * maxPageCount)
            .map((order: any, index: number) => {
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
      <Loading open={open} />
      <Toast ref={toast} position="center" />
    </>
  );
};
