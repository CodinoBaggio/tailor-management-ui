import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';
import {
  useForm,
  FormProvider,
  UseFormReturn,
  FieldValues,
} from 'react-hook-form';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import orderApi from '../features/order/api/orderApi';
import { OrderBasis } from '../features/order/components/OrderBasis';
import { OrderJaket } from '../features/order/components/OrderJaket';
import { OrderPants } from '../features/order/components/OrderPants';
import { OrderVest } from '../features/order/components/OrderVest';
import { OrderBasisType } from '../features/order/types/order';

const setOrderBasisValues = (
  methods: UseFormReturn<FieldValues, any, undefined>,
  order: OrderBasisType
) => {
  methods.setValue('basis-orderStatus', order.orderStatus || '');
  methods.setValue('basis-inputDate', dayjs(order.inputDate) || new Date());
  methods.setValue(
    'basis-orderDateTime',
    dayjs(order.orderDateTime) || new Date()
  );
  methods.setValue('basis-shipDate', dayjs(order.shipDate) || new Date());
  methods.setValue('basis-customerName', order.customerName || '');
  methods.setValue('basis-productName', order.productName || '');
  methods.setValue('basis-fabricMaker', order.fabricMaker || '');
  methods.setValue('basis-fabricProductNo', order.fabricProductNo || '');
  methods.setValue('basis-yield', order.yield || 0);
  methods.setValue('basis-blendRateFabric1', order.blendRateFabric1 || '');
  methods.setValue('basis-blendRate1', order.blendRate1 || 0);
  methods.setValue('basis-blendRateFabric2', order.blendRateFabric2 || '');
  methods.setValue('basis-blendRate2', order.blendRate2 || 0);
};

const setOrderJaketValues = (
  methods: UseFormReturn<FieldValues, any, undefined>,
  order: any
) => {
  methods.setValue('jaket_jaketOrderId', order.jaketOrderId || '');
};

export const Order = () => {
  const methods = useForm();
  const [open, setOpen] = useState(false);
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getOrder = async () => {
      // スピナーを表示する
      setOpen(true);

      try {
        const res: any = await orderApi.getOrder({
          endpoint: 'order',
          endpointParams: { orderId: orderId },
        });
        setOrderBasisValues(methods, res.payload.order);
        setOrderJaketValues(methods, res.payload.order.jaket);
      } catch (error) {
        alert(error);
        console.log(error);
      } finally {
        // スピナーを非表示にする
        setOpen(false);
      }
    };
    getOrder();
  }, []);

  const handleSave = () => {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.tz.setDefault('Asia/Tokyo');
    alert(
      dayjs(methods.getValues('basis-inputDate'))
        .tz()
        .format('YYYY/MM/DD HH:mm:ss')
    );
    alert(
      dayjs(methods.getValues('basis-orderDateTime'))
        .tz()
        .format('YYYY/MM/DD HH:mm:ss')
    );
    alert(
      dayjs(methods.getValues('basis-shipDate'))
        .tz()
        .format('YYYY/MM/DD HH:mm:ss')
    );
    alert(methods.getValues('basis-customerName'));
    alert('保存');
  };

  const handleUpdate = () => {
    alert('更新');
  };

  const handleDelete = () => {
    alert('削除');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <FormProvider {...methods}>
      <div>Order</div>
      <OrderBasis />
      <OrderJaket />
      <OrderPants />
      <OrderVest />
      <button onClick={handleSave}>保存</button>
      <button onClick={handleUpdate}>更新</button>
      <button onClick={handleDelete}>削除</button>
      <button onClick={handleBack}>戻る</button>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </FormProvider>
  );
};
