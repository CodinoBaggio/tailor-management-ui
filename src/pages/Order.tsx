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
import {
  OrderBasisType,
  OrderJaketType,
  OrderPantsType,
  OrderVestType,
} from '../features/order/types/order';

const setOrderBasisValues = (
  methods: UseFormReturn<FieldValues, any, undefined>,
  order: OrderBasisType
) => {
  methods.setValue('basis-orderId', order.orderId || '');
  methods.setValue('basis-shopId', order.shopId || '');
  methods.setValue('basis-seq', order.seq || 0);
  methods.setValue('basis-orderStatus', order.orderStatus || '');
  methods.setValue('basis-inputDate', dayjs(order.inputDate) || dayjs());
  methods.setValue(
    'basis-orderDateTime',
    dayjs(order.orderDateTime) || dayjs()
  );
  methods.setValue('basis-shipDate', dayjs(order.shipDate) || dayjs());
  methods.setValue('basis-customerName', order.customerName || '');
  methods.setValue('basis-productName', order.productName || '');
  methods.setValue('basis-fabricMaker', order.fabricMaker || '');
  methods.setValue('basis-fabricProductNo', order.fabricProductNo || '');
  methods.setValue('basis-yield', order.yield || 0);
  methods.setValue('basis-blendRateFabric1', order.blendRateFabric1 || '');
  methods.setValue('basis-blendRate1', order.blendRate1 || 0);
  methods.setValue('basis-blendRateFabric2', order.blendRateFabric2 || '');
  methods.setValue('basis-blendRate2', order.blendRate2 || 0);
  methods.setValue('basis-inputUserId', order.inputUserId || '');
  methods.setValue('basis-isDelete', order.isDelete || false);
  methods.setValue(
    'basis-createDateTime',
    dayjs(order.createDateTime) || dayjs()
  );
  methods.setValue('basis-createUserId', order.createUserId || '');
  methods.setValue(
    'basis-updateDateTime',
    dayjs(order.updateDateTime) || dayjs()
  );
  methods.setValue('basis-updateUserId', order.updateUserId || '');
};

const setOrderJaketValues = (
  methods: UseFormReturn<FieldValues, any, undefined>,
  order: OrderJaketType
) => {
  methods.setValue('jaket-jaketOrderId', order.jaketOrderId || '');
  methods.setValue('jaket-orderId', order.orderId || '');
  methods.setValue('jaket-selectPattern1', order.selectPattern1 || '');
  methods.setValue('jaket-selectPattern2', order.selectPattern2 || '');
  methods.setValue('jaket-selectPattern3', order.selectPattern3 || '');
  methods.setValue('jaket-totalLength', order.totalLength || 0);
  methods.setValue('jaket-jaketLength', order.jaketLength || 0);
  methods.setValue('jaket-shoulderWidth', order.shoulderWidth || 0);
  methods.setValue('jaket-sleeveLengthLeft', order.sleeveLengthLeft || 0);
  methods.setValue('jaket-sleeveLengthRight', order.sleeveLengthRight || 0);
  methods.setValue('jaket-bust', order.bust || 0);
  methods.setValue('jaket-waist', order.waist || 0);
  methods.setValue('jaket-bustTop', order.bustTop || 0);
  methods.setValue('jaket-waistTop', order.waistTop || 0);
  methods.setValue('jaket-canvas', order.canvas || '');
  methods.setValue('jaket-shoulderType', order.shoulderType || '');
  methods.setValue('jaket-collarType', order.collarType || '');
  methods.setValue('jaket-frontButton', order.frontButton || '');
  methods.setValue('jaket-collarWidth', order.collarWidth || '');
  methods.setValue('jaket-sleeveButton', order.sleeveButton || '');
  methods.setValue('jaket-sleeveOpening', order.sleeveOpening || '');
  methods.setValue('jaket-chestPocket', order.chestPocket || '');
  methods.setValue('jaket-sewingMethod', order.sewingMethod || '');
  methods.setValue('jaket-frontCut', order.frontCut || '');
  methods.setValue('jaket-labelSatinFabric', order.labelSatinFabric || '');
  methods.setValue('jaket-stitch', order.stitch || '');
  methods.setValue('jaket-stitchLocation', order.stitchLocation || '');
  methods.setValue('jaket-pinpointStitch', order.pinpointStitch || '');
  methods.setValue(
    'jaket-pinpointStitchThreadColor',
    order.pinpointStitchThreadColor || ''
  );
  methods.setValue(
    'jaket-chestBoxSatinFabric',
    order.chestBoxSatinFabric || ''
  );
  methods.setValue('jaket-waistPocket', order.waistPocket || '');
  methods.setValue('jaket-flapWidth', order.flapWidth || 0);
  methods.setValue('jaket-changePocket', order.changePocket || '');
  methods.setValue('jaket-backSpec', order.backSpec || '');
  methods.setValue('jaket-insidePocket', order.insidePocket || '');
  methods.setValue('jaket-penPocket', order.penPocket || '');
  methods.setValue('jaket-ticketPocket', order.ticketPocket || '');
  methods.setValue('jaket-pat', order.pat || 0);
  methods.setValue('jaket-lining', order.lining || '');
  methods.setValue('jaket-collarBack', order.collarBack || '');
  methods.setValue('jaket-vents', order.vents || '');
  methods.setValue('jaket-inName', order.inName || '');
  methods.setValue('jaket-nameFont', order.nameFont || '');
  methods.setValue('jaket-namePosition', order.namePosition || '');
  methods.setValue('jaket-nameColor', order.nameColor || '');
  methods.setValue('jaket-name', order.name || '');
  methods.setValue('jaket-labelHole', order.labelHole || '');
  methods.setValue('jaket-stitchThreadColor', order.stitchThreadColor || '');
  methods.setValue('jaket-labelThreadColor', order.labelThreadColor || '');
  methods.setValue(
    'jaket-frontButtonThreadColor',
    order.frontButtonThreadColor || ''
  );
  methods.setValue(
    'jaket-sleeveButtonThreadColor',
    order.sleeveButtonThreadColor || ''
  );
  methods.setValue('jaket-brandName', order.brandName || '');
  methods.setValue('jaket-fabricMark', order.fabricMark || '');
  methods.setValue('jaket-buttonProductNo', order.buttonProductNo || '');
  methods.setValue('jaket-sleeveOpeningTape', order.sleeveOpeningTape || '');
  methods.setValue('jaket-sleeveElbowPatch', order.sleeveElbowPatch || '');
  methods.setValue('jaket-hole', order.hole || '');
  methods.setValue(
    'jaket-sleeveButtonHoleColor',
    order.sleeveButtonHoleColor || ''
  );
  methods.setValue('jaket-uchiai', order.uchiai || 0);
  methods.setValue('jaket-hanmi', order.hanmi || 0);
  methods.setValue('jaket-kutsumi', order.kutsumi || 0);
  methods.setValue('jaket-squareShoulderLeft', order.squareShoulderLeft || 0);
  methods.setValue('jaket-squareShoulderRight', order.squareShoulderRight || 0);
  methods.setValue('jaket-slopingShoulderLeft', order.slopingShoulderLeft || 0);
  methods.setValue(
    'jaket-slopingShoulderRight',
    order.slopingShoulderRight || 0
  );
  methods.setValue('jaket-totsuRyo', order.totsuRyo || 0);
  methods.setValue('jaket-hip', order.hip || 0);
  methods.setValue('jaket-frontLength', order.frontLength || 0);
  methods.setValue('jaket-frontSleeveHem', order.frontSleeveHem || 0);
  methods.setValue('jaket-ahFrontOpening', order.ahFrontOpening || 0);
  methods.setValue('jaket-sleeveOpeningWidth', order.sleeveOpeningWidth || 0);
  methods.setValue('jaket-collarMitsu', order.collarMitsu || 0);
  methods.setValue('jaket-collarBack', order.collarBack || 0);
  methods.setValue('jaket-buttonPosition', order.buttonPosition || 0);
  methods.setValue('jaket-backCurve', order.backCurve || 0);
  methods.setValue('jaket-sickleRaising', order.sickleRaising || 0);
  methods.setValue('jaket-sleeveWidth', order.sleeveWidth || 0);
  methods.setValue('jaket-backWidth', order.backWidth || 0);
  methods.setValue('jaket-sleeveBack', order.sleeveBack || '');
  methods.setValue('jaket-isDelete', order.isDelete || false);
  methods.setValue(
    'jaket-createDateTime',
    dayjs(order.createDateTime) || dayjs()
  );
  methods.setValue('jaket-createUserId', order.createUserId || '');
  methods.setValue(
    'jaket-updateDateTime',
    dayjs(order.updateDateTime) || dayjs()
  );
  methods.setValue('jaket-updateUserId', order.updateUserId || '');
};

const setOrderPantsValues = (
  methods: UseFormReturn<FieldValues, any, undefined>,
  order: OrderPantsType
) => {
  methods.setValue('pants-pantsOrderId', order.pantsOrderId || '');
  methods.setValue('pants-orderId', order.orderId || '');
  methods.setValue('pants-selectPattern1', order.selectPattern1 || '');
  methods.setValue('pants-selectPattern2', order.selectPattern2 || '');
  methods.setValue('pants-selectPattern3', order.selectPattern3 || '');
  methods.setValue('pants-waist', order.waist || 0);
  methods.setValue('pants-hip', order.hip || 0);
  methods.setValue('pants-hipTop', order.hipTop || 0);
  methods.setValue('pants-rise', order.rise || 0);
  methods.setValue('pants-inseamLeft', order.inseamLeft || 0);
  methods.setValue('pants-inseamRight', order.inseamRight || 0);
  methods.setValue('pants-crossingWidth', order.crossingWidth || 0);
  methods.setValue('pants-kneeWidth', order.kneeWidth || 0);
  methods.setValue('pants-hemOpening', order.hemOpening || 0);
  methods.setValue('pants-tack', order.tack || '');
  methods.setValue('pants-sidePocket', order.sidePocket || '');
  methods.setValue('pants-foldedHem', order.foldedHem || '');
  methods.setValue('pants-secretPocket', order.secretPocket || '');
  methods.setValue('pants-kneeBack', order.kneeBack || '');
  methods.setValue('pants-holeThreadColor', order.holeThreadColor || '');
  methods.setValue('pants-sideAmf', order.sideAmf || '');
  methods.setValue('pants-stitchThreadColor', order.stitchThreadColor || '');
  methods.setValue('pants-kneepadColor', order.kneepadColor || '');
  methods.setValue('pants-tackSpec', order.tackSpec || '');
  methods.setValue('pants-sideSatinFabric', order.sideSatinFabric || '');
  methods.setValue('pants-pisPocketJadeGreen', order.pisPocketJadeGreen || '');
  methods.setValue('pants-pisPocketJadeGreen', order.pisPocketJadeGreen || '');
  methods.setValue('pants-plaket', order.plaket || '');
  methods.setValue('pants-buttocks', order.buttocks || 0);
  methods.setValue('pants-flatButt', order.flatButt || 0);
  methods.setValue('pants-frontRise', order.frontRise || 0);
  methods.setValue('pants-backRise', order.backRise || 0);
  methods.setValue('pants-wedgie', order.wedgie || 0);
  methods.setValue('pants-pancherina', order.pancherina || '');
  methods.setValue('pants-loopCount', order.loopCount || '');
  methods.setValue('pants-qiLoop', order.qiLoop || '');
  methods.setValue('pants-hole', order.hole || '');
  methods.setValue('pants-chic', order.chic || '');
  methods.setValue('pants-loopAdd', order.loopAdd || '');
  methods.setValue('pants-plushLoop', order.plushLoop || '');
  methods.setValue('pants-setFinishing', order.setFinishing || '');
  methods.setValue('pants-creaseWire', order.creaseWire || '');
  methods.setValue('pants-buttholeTape', order.buttholeTape || '');
  methods.setValue('pants-isDelete', order.isDelete || false);
  methods.setValue(
    'pants-createDateTime',
    dayjs(order.createDateTime) || dayjs()
  );
  methods.setValue('pants-createUserId', order.createUserId || '');
  methods.setValue(
    'pants-updateDateTime',
    dayjs(order.updateDateTime) || dayjs()
  );
  methods.setValue('pants-updateUserId', order.updateUserId || '');
};

const setOrderVestValues = (
  methods: UseFormReturn<FieldValues, any, undefined>,
  order: OrderVestType
) => {
  methods.setValue('vest-vestOrderId', order.vestOrderId || '');
  methods.setValue('vest-orderId', order.orderId || '');
  methods.setValue('vest-selectPattern1', order.selectPattern1 || '');
  methods.setValue('vest-selectPattern2', order.selectPattern2 || '');
  methods.setValue('vest-selectPattern3', order.selectPattern3 || '');
  methods.setValue('vest-backLength', order.backLength || 0);
  methods.setValue('vest-bustTop', order.bustTop || 0);
  methods.setValue('vest-waistTop', order.waistTop || 0);
  methods.setValue('vest-collar', order.collar || '');
  methods.setValue('vest-chestPocket', order.chestPocket || '');
  methods.setValue('vest-frontButton', order.frontButton || '');
  methods.setValue(
    'vest-frontButtonHolePosition',
    order.frontButtonHolePosition || ''
  );
  methods.setValue('vest-waistPocket', order.waistPocket || '');
  methods.setValue('vest-backSide', order.backSide || '');
  methods.setValue('vest-buckle', order.buckle || '');
  methods.setValue('vest-holeThreadColor', order.holeThreadColor || '');
  methods.setValue('vest-stitch', order.stitch || '');
  methods.setValue('vest-hole', order.hole || '');
  methods.setValue('vest-uchiai', order.uchiai || 0);
  methods.setValue('vest-hanmi', order.hanmi || 0);
  methods.setValue('vest-kutsumi', order.kutsumi || 0);
  methods.setValue('vest-squareShoulderLeft', order.squareShoulderLeft || 0);
  methods.setValue('vest-squareShoulderRight', order.squareShoulderRight || 0);
  methods.setValue('vest-slopingShoulderLeft', order.slopingShoulderLeft || 0);
  methods.setValue(
    'vest-slopingShoulderRight',
    order.slopingShoulderRight || 0
  );
  methods.setValue('vest-sickleRaising', order.sickleRaising || 0);
  methods.setValue('vest-shoulderWidth', order.shoulderWidth || 0);
  methods.setValue('vest-buttonPosition', order.buttonPosition || 0);
  methods.setValue('vest-frontLength', order.frontLength || 0);
  methods.setValue('vest-isDelete', order.isDelete || false);
  methods.setValue('vest-createDateTime', dayjs(order.createDateTime) || dayjs());
  methods.setValue('vest-createUserId', order.createUserId || '');
  methods.setValue('vest-updateDateTime', dayjs(order.updateDateTime) || dayjs());
  methods.setValue('vest-updateUserId', order.updateUserId || '');
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
        setOrderPantsValues(methods, res.payload.order.pants);
        setOrderVestValues(methods, res.payload.order.vest);
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
