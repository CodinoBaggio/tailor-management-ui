import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';
import {
  useForm,
  FormProvider,
  UseFormReturn,
  FieldValues,
} from 'react-hook-form';

import orderApi from '../api/orderApi';
import { OrderBasis } from '../components/OrderBasis';
import { OrderJaket } from '../components/OrderJaket';
import { OrderPants } from '../components/OrderPants';
import { OrderVest } from '../components/OrderVest';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { OrderBasisType } from '../types/order';

const setOrderBasisValues = (
  methods: UseFormReturn<FieldValues, any, undefined>,
  order: OrderBasisType
) => {
  methods.setValue('orderBasis_orderStatus', order.orderStatus || '');
  methods.setValue(
    'orderBasis_inputDate',
    dayjs(order.inputDate) || new Date()
  );
  methods.setValue(
    'orderBasis_orderDateTime',
    dayjs(order.orderDateTime) || new Date()
  );
  methods.setValue('orderBasis_shipDate', dayjs(order.shipDate) || new Date());
  methods.setValue('orderBasis_customerName', order.customerName || '');
};

const setOrderJaketValues = (
  methods: UseFormReturn<FieldValues, any, undefined>,
  order: any
) => {
  methods.setValue('orderJaket_orderStatus', order.orderStatus || '');
  methods.setValue(
    'orderBasis_inputDate',
    dayjs(order.inputDate) || new Date()
  );
  methods.setValue(
    'orderBasis_orderDateTime',
    dayjs(order.orderDateTime) || new Date()
  );
  methods.setValue('orderBasis_shipDate', dayjs(order.shipDate) || new Date());
  methods.setValue('orderBasis_customerName', order.customerName || '');
};

export const Order = () => {
  const methods = useForm();
  const [open, setOpen] = useState(false);
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [jaketOrderId, setJaketOrderId] = useState('');
  const [pantsOrderId, setPantsOrderId] = useState('');
  const [vestOrderId, setVestOrderId] = useState('');

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
        setJaketOrderId(res.payload.order.jaket.jaketOrderId);
        setPantsOrderId(res.payload.order.pants.pantsOrderId);
        setVestOrderId(res.payload.order.vest.vestOrderId);
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
      dayjs(methods.getValues('orderBasis_inputDate'))
        .tz()
        .format('YYYY/MM/DD HH:mm:ss')
    );
    alert(
      dayjs(methods.getValues('orderBasis_orderDateTime'))
        .tz()
        .format('YYYY/MM/DD HH:mm:ss')
    );
    alert(
      dayjs(methods.getValues('orderBasis_shipDate'))
        .tz()
        .format('YYYY/MM/DD HH:mm:ss')
    );
    alert(methods.getValues('orderBasis_customerName'));
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
      <div>{jaketOrderId}</div>
      <div>{pantsOrderId}</div>
      <div>{vestOrderId}</div>
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
