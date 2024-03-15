import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import SaveIcon from '@mui/icons-material/Save';
import { green, pink } from '@mui/material/colors';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ReplyIcon from '@mui/icons-material/Reply';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from 'react-redux';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Toast } from 'primereact/toast';

import orderApi from '../features/order/api/orderApi';
import { OrderBasis } from '../features/order/components/OrderBasis';
import { OrderJaket } from '../features/order/components/OrderJaket';
import { OrderPants } from '../features/order/components/OrderPants';
import { OrderVest } from '../features/order/components/OrderVest';
import { HorizontalTabs } from '../components/ui/HorizontalTabs';
import { setUpdated } from '../features/order/stores/orderSlice';
import {
  bindOrderBasisValues,
  bindOrderJaketValues,
  bindOrderPantsValues,
  bindOrderVestValues,
  createDefaultOrderValues,
} from '../features/order/utils/orderUtil';
import { validateOrder } from '../features/order/utils/orderValidations';
import { confirmYesNo } from '../utils/confirm';
import { useToast } from '../hooks/useToast';
import Loading from '../components/ui/Loading';
import { toDateTimeString } from '../utils/util';

type Props = {
  isReuse?: boolean;
};

export const Order: FC<Props> = (props) => {
  const { isReuse } = props;
  const [open, setOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState<string>('');
  const methods = useForm({
    // mode: 'onChange',
    criteriaMode: 'all',
    // shouldFocusError: false,
  });
  const { orderId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user.value);
  const dispatch = useDispatch();
  const [basisErrorCount, setBasisErrorCount] = useState(0);
  const [jaketErrorCount, setJaketErrorCount] = useState(0);
  const [pantsErrorCount, setPantsErrorCount] = useState(0);
  const [vestErrorCount, setVestErrorCount] = useState(0);
  const { toast, showMessage } = useToast();

  useEffect(() => {
    const getOrder = async () => {
      // スピナーを表示する
      setOpen(true);

      try {
        let order = createDefaultOrderValues(user);
        if (orderId) {
          const res: any = await orderApi.getOrder({
            orderId: orderId,
          });
          order = res.payload.order;

          // 流用の場合はオーダーIDを新規にする
          if (isReuse) {
            order.orderId = '';
            order.jaket.orderId = '';
            order.jaket.jaketOrderId = '';
            order.pants.orderId = '';
            order.pants.pantsOrderId = '';
            order.vest.orderId = '';
            order.vest.vestOrderId = '';
            order.orderStatus = '保存';
          }
        }
        bindOrderBasisValues(methods, order);
        bindOrderJaketValues(methods, order.jaket);
        bindOrderPantsValues(methods, order.pants);
        bindOrderVestValues(methods, order.vest);
        setOrderStatus(order.orderStatus);
      } catch (error: any) {
        showMessage('エラー', 'error', error);
      } finally {
        // スピナーを非表示にする
        setOpen(false);
      }
    };
    getOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReuse]);

  const handleSave = () => {
    const fire = async () => {
      try {
        // スピナーを表示する
        setOpen(true);

        const order = {
          orderId: methods.getValues('basis-orderId'),
          shopId: methods.getValues('basis-shopId'),
          seq: methods.getValues('basis-seq'),
          orderStatus: '保存',
          inputDate: toDateTimeString(methods.getValues('basis-inputDate')),
          orderDateTime: toDateTimeString(methods.getValues('basis-orderDateTime')),
          shipDate: toDateTimeString(methods.getValues('basis-shipDate')),
          customerName: methods.getValues('basis-customerName'),
          productName: methods.getValues('basis-productName'),
          fabricMaker: methods.getValues('basis-fabricMaker'),
          fabricProductNo: methods.getValues('basis-fabricProductNo'),
          yield: methods.getValues('basis-yield'),
          blendRateFabric1: methods.getValues('basis-blendRateFabric1'),
          blendRate1: methods.getValues('basis-blendRate1'),
          blendRateFabric2: methods.getValues('basis-blendRateFabric2'),
          blendRate2: methods.getValues('basis-blendRate2'),
          blendRateFabric3: methods.getValues('basis-blendRateFabric3'),
          blendRate3: methods.getValues('basis-blendRate3'),
          blendRateFabric4: methods.getValues('basis-blendRateFabric4'),
          blendRate4: methods.getValues('basis-blendRate4'),
          inputUserId: methods.getValues('basis-inputUserId'),
          remark: methods.getValues('basis-remark'),
          isDelete: methods.getValues('basis-isDelete'),
          createDateTime: toDateTimeString(methods.getValues('basis-createDateTime')),
          createUserId: methods.getValues('basis-createUserId'),
          updateDateTime: toDateTimeString(methods.getValues('basis-updateDateTime')),
          updateUserId: methods.getValues('basis-updateUserId'),
          jaket: {
            jaketOrderId: methods.getValues('jaket-jaketOrderId'),
            orderId: methods.getValues('jaket-orderId'),
            selectPattern1: methods.getValues('jaket-selectPattern1'),
            selectPattern2: methods.getValues('jaket-selectPattern2'),
            selectPattern3: methods.getValues('jaket-selectPattern3'),
            totalLength: methods.getValues('jaket-totalLength'),
            jaketLength: methods.getValues('jaket-jaketLength'),
            shoulderWidth: methods.getValues('jaket-shoulderWidth'),
            sleeveLengthLeft: methods.getValues('jaket-sleeveLengthLeft'),
            sleeveLengthRight: methods.getValues('jaket-sleeveLengthRight'),
            bust: methods.getValues('jaket-bust'),
            waist: methods.getValues('jaket-waist'),
            bustTop: methods.getValues('jaket-bustTop'),
            waistTop: methods.getValues('jaket-waistTop'),
            canvas: methods.getValues('jaket-canvas'),
            shoulderType: methods.getValues('jaket-shoulderType'),
            collarType: methods.getValues('jaket-collarType'),
            frontButton: methods.getValues('jaket-frontButton'),
            collarWidth: methods.getValues('jaket-collarWidth'),
            sleeveButton: methods.getValues('jaket-sleeveButton'),
            sleeveOpening: methods.getValues('jaket-sleeveOpening'),
            chestPocket: methods.getValues('jaket-chestPocket'),
            sewingMethod: methods.getValues('jaket-sewingMethod'),
            frontCut: methods.getValues('jaket-frontCut'),
            labelSatinFabric: methods.getValues('jaket-labelSatinFabric'),
            stitch: methods.getValues('jaket-stitch'),
            stitchLocation: methods.getValues('jaket-stitchLocation'),
            pinpointStitch: methods.getValues('jaket-pinpointStitch'),
            pinpointStitchThreadColor: methods.getValues(
              'jaket-pinpointStitchThreadColor'
            ),
            chestBoxSatinFabric: methods.getValues('jaket-chestBoxSatinFabric'),
            waistPocket: methods.getValues('jaket-waistPocket'),
            flapWidth: methods.getValues('jaket-flapWidth'),
            changePocket: methods.getValues('jaket-changePocket'),
            secretPocket: methods.getValues('jaket-secretPocket'),
            backSpec: methods.getValues('jaket-backSpec'),
            daiba: methods.getValues('jaket-daiba'),
            insidePocket: methods.getValues('jaket-insidePocket'),
            penPocket: methods.getValues('jaket-penPocket'),
            ticketPocket: methods.getValues('jaket-ticketPocket'),
            pat: methods.getValues('jaket-pat'),
            lining: methods.getValues('jaket-lining'),
            collarBack: methods.getValues('jaket-collarBack'),
            vents: methods.getValues('jaket-vents'),
            inName: methods.getValues('jaket-inName'),
            nameFont: methods.getValues('jaket-nameFont'),
            namePosition: methods.getValues('jaket-namePosition'),
            nameColor: methods.getValues('jaket-nameColor'),
            name: methods.getValues('jaket-name'),
            labelHole: methods.getValues('jaket-labelHole'),
            stitchThreadColor: methods.getValues('jaket-stitchThreadColor'),
            labelThreadColor: methods.getValues('jaket-labelThreadColor'),
            frontButtonThreadColor: methods.getValues(
              'jaket-frontButtonThreadColor'
            ),
            sleeveButtonThreadColor: methods.getValues(
              'jaket-sleeveButtonThreadColor'
            ),
            brandName: methods.getValues('jaket-brandName'),
            fabricMark: methods.getValues('jaket-fabricMark'),
            buttonProductNo: methods.getValues('jaket-buttonProductNo'),
            sleeveOpeningTape: methods.getValues('jaket-sleeveOpeningTape'),
            sleeveElbowPatch: methods.getValues('jaket-sleeveElbowPatch'),
            hole: methods.getValues('jaket-hole'),
            sleeveButtonHoleColor: methods.getValues(
              'jaket-sleeveButtonHoleColor'
            ),
            uchiai: methods.getValues('jaket-uchiai'),
            hanmi: methods.getValues('jaket-hanmi'),
            kutsumi: methods.getValues('jaket-kutsumi'),
            squareShoulderLeft: methods.getValues('jaket-squareShoulderLeft'),
            squareShoulderRight: methods.getValues('jaket-squareShoulderRight'),
            slopingShoulderLeft: methods.getValues('jaket-slopingShoulderLeft'),
            slopingShoulderRight: methods.getValues(
              'jaket-slopingShoulderRight'
            ),
            totsuRyo: methods.getValues('jaket-totsuRyo'),
            hip: methods.getValues('jaket-hip'),
            frontLength: methods.getValues('jaket-frontLength'),
            frontSleeveHem: methods.getValues('jaket-frontSleeveHem'),
            ahFrontOpening: methods.getValues('jaket-ahFrontOpening'),
            sleeveOpeningWidth: methods.getValues('jaket-sleeveOpeningWidth'),
            collarMitsu: methods.getValues('jaket-collarMitsu'),
            collarShift: methods.getValues('jaket-collarShift'),
            buttonPosition: methods.getValues('jaket-buttonPosition'),
            backCurve: methods.getValues('jaket-backCurve'),
            sickleRaising: methods.getValues('jaket-sickleRaising'),
            sleeveWidth: methods.getValues('jaket-sleeveWidth'),
            backWidth: methods.getValues('jaket-backWidth'),
            sleeveBack: methods.getValues('jaket-sleeveBack'),
            remark: methods.getValues('jaket-remark'),
            isDelete: methods.getValues('jaket-isDelete'),
            createDateTime: toDateTimeString(methods.getValues('jaket-createDateTime')),
            createUserId: methods.getValues('jaket-createUserId'),
            updateDateTime: toDateTimeString(methods.getValues('jaket-updateDateTime')),
            updateUserId: methods.getValues('jaket-updateUserId'),
          },
          pants: {
            pantsOrderId: methods.getValues('pants-pantsOrderId'),
            orderId: methods.getValues('pants-orderId'),
            selectPattern1: methods.getValues('pants-selectPattern1'),
            selectPattern2: methods.getValues('pants-selectPattern2'),
            selectPattern3: methods.getValues('pants-selectPattern3'),
            waist: methods.getValues('pants-waist'),
            hip: methods.getValues('pants-hip'),
            hipTop: methods.getValues('pants-hipTop'),
            rise: methods.getValues('pants-rise'),
            inseamLeft: methods.getValues('pants-inseamLeft'),
            inseamRight: methods.getValues('pants-inseamRight'),
            crossingWidth: methods.getValues('pants-crossingWidth'),
            kneeWidth: methods.getValues('pants-kneeWidth'),
            hemOpening: methods.getValues('pants-hemOpening'),
            tack: methods.getValues('pants-tack'),
            sidePocket: methods.getValues('pants-sidePocket'),
            foldedHem: methods.getValues('pants-foldedHem'),
            secretPocket: methods.getValues('pants-secretPocket'),
            kneeBack: methods.getValues('pants-kneeBack'),
            holeThreadColor: methods.getValues('pants-holeThreadColor'),
            amfStitch: methods.getValues('pants-amfStitch'),
            sideAmf: methods.getValues('pants-sideAmf'),
            stitchThreadColor: methods.getValues('pants-stitchThreadColor'),
            kneepadColor: methods.getValues('pants-kneepadColor'),
            tackSpec: methods.getValues('pants-tackSpec'),
            sideSatinFabric: methods.getValues('pants-sideSatinFabric'),
            pisPocketJadeGreen: methods.getValues('pants-pisPocketJadeGreen'),
            pisPocket: methods.getValues('pants-pisPocket'),
            plaket: methods.getValues('pants-plaket'),
            buttocks: methods.getValues('pants-buttocks'),
            flatButt: methods.getValues('pants-flatButt'),
            frontRise: methods.getValues('pants-frontRise'),
            backRise: methods.getValues('pants-backRise'),
            wedgie: methods.getValues('pants-wedgie'),
            pancherina: methods.getValues('pants-pancherina'),
            loopCount: methods.getValues('pants-loopCount'),
            qiLoop: methods.getValues('pants-qiLoop'),
            hole: methods.getValues('pants-hole'),
            chic: methods.getValues('pants-chic'),
            loopAdd: methods.getValues('pants-loopAdd'),
            plushLoop: methods.getValues('pants-plushLoop'),
            setFinishing: methods.getValues('pants-setFinishing'),
            creaseWire: methods.getValues('pants-creaseWire'),
            buttholeTape: methods.getValues('pants-buttholeTape'),
            remark: methods.getValues('pants-remark'),
            isDelete: methods.getValues('pants-isDelete'),
            createDateTime: toDateTimeString(methods.getValues('pants-createDateTime')),
            createUserId: methods.getValues('pants-createUserId'),
            updateDateTime: toDateTimeString(methods.getValues('pants-updateDateTime')),
            updateUserId: methods.getValues('pants-updateUserId'),
          },
          vest: {
            vestOrderId: methods.getValues('vest-vestOrderId'),
            orderId: methods.getValues('vest-orderId'),
            selectPattern1: methods.getValues('vest-selectPattern1'),
            selectPattern2: methods.getValues('vest-selectPattern2'),
            selectPattern3: methods.getValues('vest-selectPattern3'),
            backLength: methods.getValues('vest-backLength'),
            bustTop: methods.getValues('vest-bustTop'),
            waistTop: methods.getValues('vest-waistTop'),
            collar: methods.getValues('vest-collar'),
            chestPocket: methods.getValues('vest-chestPocket'),
            frontButton: methods.getValues('vest-frontButton'),
            frontButtonHolePosition: methods.getValues(
              'vest-frontButtonHolePosition'
            ),
            waistPocket: methods.getValues('vest-waistPocket'),
            backSide: methods.getValues('vest-backSide'),
            buckle: methods.getValues('vest-buckle'),
            holeThreadColor: methods.getValues('vest-holeThreadColor'),
            stitch: methods.getValues('vest-stitch'),
            hole: methods.getValues('vest-hole'),
            uchiai: methods.getValues('vest-uchiai'),
            hanmi: methods.getValues('vest-hanmi'),
            kutsumi: methods.getValues('vest-kutsumi'),
            squareShoulderLeft: methods.getValues('vest-squareShoulderLeft'),
            squareShoulderRight: methods.getValues('vest-squareShoulderRight'),
            slopingShoulderLeft: methods.getValues('vest-slopingShoulderLeft'),
            slopingShoulderRight: methods.getValues(
              'vest-slopingShoulderRight'
            ),
            sickleRaising: methods.getValues('vest-sickleRaising'),
            shoulderWidth: methods.getValues('vest-shoulderWidth'),
            buttonPosition: methods.getValues('vest-buttonPosition'),
            frontLength: methods.getValues('vest-frontLength'),
            remark: methods.getValues('vest-remark'),
            isDelete: methods.getValues('vest-isDelete'),
            createDateTime: toDateTimeString(methods.getValues('vest-createDateTime')),
            createUserId: methods.getValues('vest-createUserId'),
            updateDateTime: toDateTimeString(methods.getValues('vest-updateDateTime')),
            updateUserId: methods.getValues('vest-updateUserId'),
          },
        };
        const res: any = await orderApi.upsert({
          order: order,
        });
        if (res.status === 'success') {
          // 更新フラグを設定する
          dispatch(setUpdated(true));

          showMessage('保存しました。', 'info');
          // navigate('/');
        } else {
          showMessage('エラー', 'error', res.message);
        }
      } catch (error: any) {
        showMessage('エラー', 'error', error);
      } finally {
        // スピナーを非表示にする
        setOpen(false);
      }
    };
    confirmYesNo('保存しますか？', fire);
  };

  const handleOrder = () => {
    const fire = async () => {
      try {
        // スピナーを表示する
        setOpen(true);

        // バリデーションエラー表示クリア
        setBasisErrorCount(0);
        setJaketErrorCount(0);
        setPantsErrorCount(0);
        setVestErrorCount(0);

        // バリデーションを実行する
        const result = await methods.trigger();
        if (!result) {
          // バリデーションエラーの場合は何もしない
          return;
        } else {
          // カスタムバリデーションを実行する
          const valid = await validateOrder(methods);
          if (!valid.success) {
            setBasisErrorCount(valid.errorCounts.basisErrorCount);
            setJaketErrorCount(valid.errorCounts.jaketErrorCount);
            setPantsErrorCount(valid.errorCounts.pantsErrorCount);
            setVestErrorCount(valid.errorCounts.vestErrorCount);
            return;
          }
        }

        // 発注登録
        const order = {
          orderId: methods.getValues('basis-orderId'),
          shopId: methods.getValues('basis-shopId'),
          seq: methods.getValues('basis-seq'),
          orderStatus: '発注済み',
          inputDate: toDateTimeString(methods.getValues('basis-inputDate')),
          orderDateTime: toDateTimeString(methods.getValues('basis-orderDateTime')),
          shipDate: toDateTimeString(methods.getValues('basis-shipDate')),
          customerName: methods.getValues('basis-customerName'),
          productName: methods.getValues('basis-productName'),
          fabricMaker: methods.getValues('basis-fabricMaker'),
          fabricProductNo: methods.getValues('basis-fabricProductNo'),
          yield: methods.getValues('basis-yield'),
          blendRateFabric1: methods.getValues('basis-blendRateFabric1'),
          blendRate1: methods.getValues('basis-blendRate1'),
          blendRateFabric2: methods.getValues('basis-blendRateFabric2'),
          blendRate2: methods.getValues('basis-blendRate2'),
          blendRateFabric3: methods.getValues('basis-blendRateFabric3'),
          blendRate3: methods.getValues('basis-blendRate3'),
          blendRateFabric4: methods.getValues('basis-blendRateFabric4'),
          blendRate4: methods.getValues('basis-blendRate4'),
          inputUserId: methods.getValues('basis-inputUserId'),
          remark: methods.getValues('basis-remark'),
          isDelete: methods.getValues('basis-isDelete'),
          createDateTime: toDateTimeString(methods.getValues('basis-createDateTime')),
          createUserId: methods.getValues('basis-createUserId'),
          updateDateTime: toDateTimeString(methods.getValues('basis-updateDateTime')),
          updateUserId: methods.getValues('basis-updateUserId'),
          jaket: {
            jaketOrderId: methods.getValues('jaket-jaketOrderId'),
            orderId: methods.getValues('jaket-orderId'),
            selectPattern1: methods.getValues('jaket-selectPattern1'),
            selectPattern2: methods.getValues('jaket-selectPattern2'),
            selectPattern3: methods.getValues('jaket-selectPattern3'),
            totalLength: methods.getValues('jaket-totalLength'),
            jaketLength: methods.getValues('jaket-jaketLength'),
            shoulderWidth: methods.getValues('jaket-shoulderWidth'),
            sleeveLengthLeft: methods.getValues('jaket-sleeveLengthLeft'),
            sleeveLengthRight: methods.getValues('jaket-sleeveLengthRight'),
            bust: methods.getValues('jaket-bust'),
            waist: methods.getValues('jaket-waist'),
            bustTop: methods.getValues('jaket-bustTop'),
            waistTop: methods.getValues('jaket-waistTop'),
            canvas: methods.getValues('jaket-canvas'),
            shoulderType: methods.getValues('jaket-shoulderType'),
            collarType: methods.getValues('jaket-collarType'),
            frontButton: methods.getValues('jaket-frontButton'),
            collarWidth: methods.getValues('jaket-collarWidth'),
            sleeveButton: methods.getValues('jaket-sleeveButton'),
            sleeveOpening: methods.getValues('jaket-sleeveOpening'),
            chestPocket: methods.getValues('jaket-chestPocket'),
            sewingMethod: methods.getValues('jaket-sewingMethod'),
            frontCut: methods.getValues('jaket-frontCut'),
            labelSatinFabric: methods.getValues('jaket-labelSatinFabric'),
            stitch: methods.getValues('jaket-stitch'),
            stitchLocation: methods.getValues('jaket-stitchLocation'),
            pinpointStitch: methods.getValues('jaket-pinpointStitch'),
            pinpointStitchThreadColor: methods.getValues(
              'jaket-pinpointStitchThreadColor'
            ),
            chestBoxSatinFabric: methods.getValues('jaket-chestBoxSatinFabric'),
            waistPocket: methods.getValues('jaket-waistPocket'),
            flapWidth: methods.getValues('jaket-flapWidth'),
            changePocket: methods.getValues('jaket-changePocket'),
            secretPocket: methods.getValues('jaket-secretPocket'),
            backSpec: methods.getValues('jaket-backSpec'),
            daiba: methods.getValues('jaket-daiba'),
            insidePocket: methods.getValues('jaket-insidePocket'),
            penPocket: methods.getValues('jaket-penPocket'),
            ticketPocket: methods.getValues('jaket-ticketPocket'),
            pat: methods.getValues('jaket-pat'),
            lining: methods.getValues('jaket-lining'),
            collarBack: methods.getValues('jaket-collarBack'),
            vents: methods.getValues('jaket-vents'),
            inName: methods.getValues('jaket-inName'),
            nameFont: methods.getValues('jaket-nameFont'),
            namePosition: methods.getValues('jaket-namePosition'),
            nameColor: methods.getValues('jaket-nameColor'),
            name: methods.getValues('jaket-name'),
            labelHole: methods.getValues('jaket-labelHole'),
            stitchThreadColor: methods.getValues('jaket-stitchThreadColor'),
            labelThreadColor: methods.getValues('jaket-labelThreadColor'),
            frontButtonThreadColor: methods.getValues(
              'jaket-frontButtonThreadColor'
            ),
            sleeveButtonThreadColor: methods.getValues(
              'jaket-sleeveButtonThreadColor'
            ),
            brandName: methods.getValues('jaket-brandName'),
            fabricMark: methods.getValues('jaket-fabricMark'),
            buttonProductNo: methods.getValues('jaket-buttonProductNo'),
            sleeveOpeningTape: methods.getValues('jaket-sleeveOpeningTape'),
            sleeveElbowPatch: methods.getValues('jaket-sleeveElbowPatch'),
            hole: methods.getValues('jaket-hole'),
            sleeveButtonHoleColor: methods.getValues(
              'jaket-sleeveButtonHoleColor'
            ),
            uchiai: methods.getValues('jaket-uchiai'),
            hanmi: methods.getValues('jaket-hanmi'),
            kutsumi: methods.getValues('jaket-kutsumi'),
            squareShoulderLeft: methods.getValues('jaket-squareShoulderLeft'),
            squareShoulderRight: methods.getValues('jaket-squareShoulderRight'),
            slopingShoulderLeft: methods.getValues('jaket-slopingShoulderLeft'),
            slopingShoulderRight: methods.getValues(
              'jaket-slopingShoulderRight'
            ),
            totsuRyo: methods.getValues('jaket-totsuRyo'),
            hip: methods.getValues('jaket-hip'),
            frontLength: methods.getValues('jaket-frontLength'),
            frontSleeveHem: methods.getValues('jaket-frontSleeveHem'),
            ahFrontOpening: methods.getValues('jaket-ahFrontOpening'),
            sleeveOpeningWidth: methods.getValues('jaket-sleeveOpeningWidth'),
            collarMitsu: methods.getValues('jaket-collarMitsu'),
            collarShift: methods.getValues('jaket-collarShift'),
            buttonPosition: methods.getValues('jaket-buttonPosition'),
            backCurve: methods.getValues('jaket-backCurve'),
            sickleRaising: methods.getValues('jaket-sickleRaising'),
            sleeveWidth: methods.getValues('jaket-sleeveWidth'),
            backWidth: methods.getValues('jaket-backWidth'),
            sleeveBack: methods.getValues('jaket-sleeveBack'),
            remark: methods.getValues('jaket-remark'),
            isDelete: methods.getValues('jaket-isDelete'),
            createDateTime: toDateTimeString(methods.getValues('jaket-createDateTime')),
            createUserId: methods.getValues('jaket-createUserId'),
            updateDateTime: toDateTimeString(methods.getValues('jaket-updateDateTime')),
            updateUserId: methods.getValues('jaket-updateUserId'),
          },
          pants: {
            pantsOrderId: methods.getValues('pants-pantsOrderId'),
            orderId: methods.getValues('pants-orderId'),
            selectPattern1: methods.getValues('pants-selectPattern1'),
            selectPattern2: methods.getValues('pants-selectPattern2'),
            selectPattern3: methods.getValues('pants-selectPattern3'),
            waist: methods.getValues('pants-waist'),
            hip: methods.getValues('pants-hip'),
            hipTop: methods.getValues('pants-hipTop'),
            rise: methods.getValues('pants-rise'),
            inseamLeft: methods.getValues('pants-inseamLeft'),
            inseamRight: methods.getValues('pants-inseamRight'),
            crossingWidth: methods.getValues('pants-crossingWidth'),
            kneeWidth: methods.getValues('pants-kneeWidth'),
            hemOpening: methods.getValues('pants-hemOpening'),
            tack: methods.getValues('pants-tack'),
            sidePocket: methods.getValues('pants-sidePocket'),
            foldedHem: methods.getValues('pants-foldedHem'),
            secretPocket: methods.getValues('pants-secretPocket'),
            kneeBack: methods.getValues('pants-kneeBack'),
            holeThreadColor: methods.getValues('pants-holeThreadColor'),
            amfStitch: methods.getValues('pants-amfStitch'),
            sideAmf: methods.getValues('pants-sideAmf'),
            stitchThreadColor: methods.getValues('pants-stitchThreadColor'),
            kneepadColor: methods.getValues('pants-kneepadColor'),
            tackSpec: methods.getValues('pants-tackSpec'),
            sideSatinFabric: methods.getValues('pants-sideSatinFabric'),
            pisPocketJadeGreen: methods.getValues('pants-pisPocketJadeGreen'),
            pisPocket: methods.getValues('pants-pisPocket'),
            plaket: methods.getValues('pants-plaket'),
            buttocks: methods.getValues('pants-buttocks'),
            flatButt: methods.getValues('pants-flatButt'),
            frontRise: methods.getValues('pants-frontRise'),
            backRise: methods.getValues('pants-backRise'),
            wedgie: methods.getValues('pants-wedgie'),
            pancherina: methods.getValues('pants-pancherina'),
            loopCount: methods.getValues('pants-loopCount'),
            qiLoop: methods.getValues('pants-qiLoop'),
            hole: methods.getValues('pants-hole'),
            chic: methods.getValues('pants-chic'),
            loopAdd: methods.getValues('pants-loopAdd'),
            plushLoop: methods.getValues('pants-plushLoop'),
            setFinishing: methods.getValues('pants-setFinishing'),
            creaseWire: methods.getValues('pants-creaseWire'),
            buttholeTape: methods.getValues('pants-buttholeTape'),
            remark: methods.getValues('pants-remark'),
            isDelete: methods.getValues('pants-isDelete'),
            createDateTime: toDateTimeString(methods.getValues('pants-createDateTime')),
            createUserId: methods.getValues('pants-createUserId'),
            updateDateTime: toDateTimeString(methods.getValues('pants-updateDateTime')),
            updateUserId: methods.getValues('pants-updateUserId'),
          },
          vest: {
            vestOrderId: methods.getValues('vest-vestOrderId'),
            orderId: methods.getValues('vest-orderId'),
            selectPattern1: methods.getValues('vest-selectPattern1'),
            selectPattern2: methods.getValues('vest-selectPattern2'),
            selectPattern3: methods.getValues('vest-selectPattern3'),
            backLength: methods.getValues('vest-backLength'),
            bustTop: methods.getValues('vest-bustTop'),
            waistTop: methods.getValues('vest-waistTop'),
            collar: methods.getValues('vest-collar'),
            chestPocket: methods.getValues('vest-chestPocket'),
            frontButton: methods.getValues('vest-frontButton'),
            frontButtonHolePosition: methods.getValues(
              'vest-frontButtonHolePosition'
            ),
            waistPocket: methods.getValues('vest-waistPocket'),
            backSide: methods.getValues('vest-backSide'),
            buckle: methods.getValues('vest-buckle'),
            holeThreadColor: methods.getValues('vest-holeThreadColor'),
            stitch: methods.getValues('vest-stitch'),
            hole: methods.getValues('vest-hole'),
            uchiai: methods.getValues('vest-uchiai'),
            hanmi: methods.getValues('vest-hanmi'),
            kutsumi: methods.getValues('vest-kutsumi'),
            squareShoulderLeft: methods.getValues('vest-squareShoulderLeft'),
            squareShoulderRight: methods.getValues('vest-squareShoulderRight'),
            slopingShoulderLeft: methods.getValues('vest-slopingShoulderLeft'),
            slopingShoulderRight: methods.getValues(
              'vest-slopingShoulderRight'
            ),
            sickleRaising: methods.getValues('vest-sickleRaising'),
            shoulderWidth: methods.getValues('vest-shoulderWidth'),
            buttonPosition: methods.getValues('vest-buttonPosition'),
            frontLength: methods.getValues('vest-frontLength'),
            remark: methods.getValues('vest-remark'),
            isDelete: methods.getValues('vest-isDelete'),
            createDateTime: toDateTimeString(methods.getValues('vest-createDateTime')),
            createUserId: methods.getValues('vest-createUserId'),
            updateDateTime: toDateTimeString(methods.getValues('vest-updateDateTime')),
            updateUserId: methods.getValues('vest-updateUserId'),
          },
        };
        const res: any = await orderApi.upsert({
          order: order,
        });
        if (res.status === 'success') {
          // 更新フラグを設定する
          dispatch(setUpdated(true));

          showMessage('発注処理を実行しました。', 'info');
          // navigate('/');
        } else {
          showMessage('エラー', 'error', res.message);
        }
      } catch (error: any) {
        showMessage('エラー', 'error', error);
      } finally {
        // スピナーを非表示にする
        setOpen(false);
      }
    };
    confirmYesNo('発注します。よろしいですか？', fire);
  };

  const handleReuse = () => {
    confirmYesNo('流用しますか？', () => navigate(`/order-reuse/${orderId}`));
  };

  const handleDelete = () => {
    const fire = async () => {
      try {
        // スピナーを表示する
        setOpen(true);

        const res: any = await orderApi.delete({
          orderId: orderId,
        });
        if (res.status === 'success') {
          dispatch(setUpdated(true));
          navigate('/');
        } else {
          showMessage('エラー', 'error', res.message);
        }
      } catch (error: any) {
        showMessage('エラー', 'error', error);
      } finally {
        // スピナーを非表示にする
        setOpen(false);
      }
    };
    confirmYesNo('削除しますか？', fire);
  };

  const handleBack = () => {
    // navigate(-1);
    navigate('/');
  };

  return (
    <>
      <Box className=" flex my-5 text-gray-500" alignItems="center">
        <Box className="flex mr-5" alignItems="center">
          <CheckroomIcon className="mr-3" />
          <Typography variant="h6">発注</Typography>
        </Box>
        <Button
          onClick={handleBack}
          startIcon={<ReplyIcon />}
          color="info"
          size="small"
        >
          ホーム
        </Button>
      </Box>
      <FormProvider {...methods}>
        <Box className="flex items-center justify-between my-5">
          <Box>
            <Box className="flex items-center mb-3">
              <Typography sx={{ marginRight: '10px' }}>
                {orderStatus &&
                  (orderStatus === '保存' ? (
                    <Tooltip title="保存済み" arrow>
                      <SaveIcon fontSize="large" sx={{ color: green[500] }} />
                    </Tooltip>
                  ) : (
                    <Tooltip title="発注済み" arrow>
                      <CloudUploadIcon
                        fontSize="large"
                        sx={{ color: pink[500] }}
                      />
                    </Tooltip>
                  ))}
              </Typography>
              <Typography variant="body1">{`オーダーID：${
                orderId && !isReuse ? orderId : '(新規)'
              }`}</Typography>
            </Box>
            <Box className="ml-3 mb-2">
              <Button
                type="submit"
                variant="outlined"
                onClick={handleOrder}
                sx={{ marginRight: '3px' }}
                disabled={orderStatus === '発注済み' ? true : false}
                startIcon={<CloudUploadIcon />}
              >
                発注
              </Button>
              <Button
                variant="outlined"
                onClick={handleSave}
                sx={{ marginRight: '3px' }}
                disabled={orderStatus === '発注済み' ? true : false}
                startIcon={<SaveIcon />}
              >
                保存
              </Button>
              <Button
                // variant="outlined"
                onClick={handleReuse}
                // onClick={() => {
                //   setYesNoDialogMessage('流用しますか？');
                //   setYesNoDialogOpen(true);
                // }}
                startIcon={<FileCopyIcon />}
              >
                流用
              </Button>
              <Button
                // variant="outlined"
                onClick={handleDelete}
                // onClick={() => yesNoDialog.showMessage('削除しますか？')}
                disabled={orderStatus === '発注済み' ? true : false}
                startIcon={<ClearIcon />}
              >
                削除
              </Button>
            </Box>
          </Box>
        </Box>
        <Box className="mt-5">
          <HorizontalTabs
            tabItems={[
              {
                label: 'オーダー',
                component: (
                  <OrderBasis
                    methods={methods}
                    readOnly={orderStatus === '発注済み'}
                  />
                ),
                errorCount: basisErrorCount,
              },
              {
                label: 'ジャケット',
                component: (
                  <OrderJaket
                    methods={methods}
                    readOnly={orderStatus === '発注済み'}
                  />
                ),
                errorCount: jaketErrorCount,
              },
              {
                label: 'パンツ',
                component: <OrderPants readOnly={orderStatus === '発注済み'} />,
                errorCount: pantsErrorCount,
              },
              {
                label: 'ベスト',
                component: <OrderVest readOnly={orderStatus === '発注済み'} />,
                errorCount: vestErrorCount,
              },
            ]}
          />
        </Box>
        <Loading open={open} />
      </FormProvider>
      <Toast ref={toast} position="center" />
    </>
  );
};
