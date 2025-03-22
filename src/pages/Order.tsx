import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Divider, Tooltip, Typography } from '@mui/material';
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
import { Dialog } from 'primereact/dialog';
import dayjs from 'dayjs';

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
  setOrderObject,
} from '../features/order/utils/orderUtil';
import { validateOrder } from '../features/order/utils/orderValidations';
import { confirmYesNo } from '../utils/confirm';
import { useToast } from '../hooks/useToast';
import Loading from '../components/ui/Loading';
import { OrderBasisType } from '../features/order/types/order';
import { GridContainer } from '../components/containers/GridContainer';
import { RhfDatePicker } from '../components/ui/RhfDatePicker';
import { RhfDateTimePicker } from '../components/ui/RhfDateTimePicker';
import { OrderPrice } from '../features/order/components/OrderPrice';
import { RhfTextField } from '../components/ui/RhfTextField';
import { validateStock } from '../features/order/utils/stockValidations';

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
  const [currentOrderId, setCurrentOrderId] = useState(orderId);
  const [isNew, setIsNew] = useState(Boolean(currentOrderId) === false);
  const { toast, showMessage } = useToast();
  const [fabricPrice, setFabricPrice] = useState<number | undefined>();
  const [wagesPrice, setWagesPrice] = useState<number | undefined>();
  const [customPrice, setCustomPrice] = useState<number | undefined>();
  const [buttonLiningPrice, setButtonLiningPrice] = useState<number | undefined>();
  const [totalPrice, setTotalPrice] = useState<number | undefined>();
  const [tax, setTax] = useState<number | undefined>();
  const [totalPriceWithTax, setTotalPriceWithTax] = useState<number | undefined>();
  const [priceCalcLoading, setPriceCalcLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [stockValidationMessage, setStockValidationMessage] = useState('');
  const [fabricCost, setFabricCost] = useState<number | undefined>();
  const [wagesCost, setWagesCost] = useState<number | undefined>();
  const [customCost, setCustomCost] = useState<number | undefined>();
  const [buttonLiningCost, setButtonLiningCost] = useState<number | undefined>();
  const [totalCost, setTotalCost] = useState<number | undefined>();

  useEffect(() => {
    const getOrder = async () => {
      // スピナーを表示する
      setOpen(true);

      try {
        let order = createDefaultOrderValues(user);
        if (!isNew) {
          const res: any = await orderApi.getOrder({
            orderId: currentOrderId,
          });
          order = res.payload.order;

          // 流用の場合はオーダーIDを新規にする
          if (isReuse) {
            order.orderId = 'new';
            order.seq = undefined;
            order.shopId = user.shopId;
            order.inputDate = dayjs().format('YYYY-MM-DDTHH:mm:ss');
            order.orderDateTime = dayjs().format('YYYY-MM-DDTHH:mm:ss');
            order.shipDate = undefined;
            order.deliveryDate = undefined;
            // order.shipDate = dayjs().format('YYYY-MM-DDTHH:mm:ss');
            // order.deliveryDate = dayjs().format('YYYY-MM-DDTHH:mm:ss');
            order.inputUserId = user.userId;
            order.inputUserName = user.userName;
            order.shopId;
            order.createDateTime = dayjs().format('YYYY-MM-DDTHH:mm:ss');
            order.createUserId = user.userId;
            order.updateDateTime = dayjs().format('YYYY-MM-DDTHH:mm:ss');
            order.updateUserId = user.userId;
            order.jaket.orderId = 'new';
            order.jaket.jaketOrderId = '';
            order.jaket.createDateTime = dayjs().format('YYYY-MM-DDTHH:mm:ss');
            order.jaket.createUserId = user.userId;
            order.jaket.updateDateTime = dayjs().format('YYYY-MM-DDTHH:mm:ss');
            order.jaket.updateUserId = user.userId;
            order.pants.orderId = 'new';
            order.pants.pantsOrderId = '';
            order.pants.createDateTime = dayjs().format('YYYY-MM-DDTHH:mm:ss');
            order.pants.createUserId = user.userId;
            order.pants.updateDateTime = dayjs().format('YYYY-MM-DDTHH:mm:ss');
            order.pants.updateUserId = user.userId;
            order.vest.orderId = 'new';
            order.vest.vestOrderId = '';
            order.vest.createDateTime = dayjs().format('YYYY-MM-DDTHH:mm:ss');
            order.vest.createUserId = user.userId;
            order.vest.updateDateTime = dayjs().format('YYYY-MM-DDTHH:mm:ss');
            order.vest.updateUserId = user.userId;
            order.orderStatus = '保存';
            setCurrentOrderId('new');
            setIsNew(true);
          } else {
            setFabricPrice(res.payload.invoice.fabricPrice);
            setWagesPrice(res.payload.invoice.wagesPrice);
            setCustomPrice(res.payload.invoice.customFeaturePrice);
            setButtonLiningPrice(res.payload.invoice.buttonLiningPrice);
            setTotalPrice(res.payload.invoice.totalPrice);
            setTax(res.payload.invoice.tax);
            setTotalPriceWithTax(res.payload.invoice.totalPriceWithTax);
            setFabricCost(res.payload.invoice.fabricCost);
            setWagesCost(res.payload.invoice.wagesCost);
            setCustomCost(res.payload.invoice.customFeatureCost);
            setButtonLiningCost(res.payload.invoice.buttonLiningCost);
            setTotalCost(res.payload.invoice.totalCost);
         }
        } else {
          order.shopId = user.shopId;
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

        const order: OrderBasisType = setOrderObject('保存', methods);
        if (!isNew) {
          order.updateDateTime = dayjs().format('YYYY-MM-DDTHH:mm:ss');
          order.updateUserId = user.userId;
          order.jaket.updateDateTime = dayjs().format('YYYY-MM-DDTHH:mm:ss');
          order.jaket.updateUserId = user.userId;
          order.pants.updateDateTime = dayjs().format('YYYY-MM-DDTHH:mm:ss');
          order.pants.updateUserId = user.userId;
          order.vest.updateDateTime = dayjs().format('YYYY-MM-DDTHH:mm:ss');
          order.vest.updateUserId = user.userId;
        }

        // order.seq = order.seq || 0;
        order.yield = order.yield || 0;
        const res: any = await orderApi.upsert({
          seqHead: user.seqHead,
          order: order,
          invoice: {
            fabricPrice: fabricPrice || 0,
            wagesPrice: wagesPrice || 0,
            customPrice: customPrice || 0,
            buttonLiningPrice: buttonLiningPrice || 0,
            totalPrice: totalPrice,
            tax: tax,
            totalPriceWithTax: totalPriceWithTax,
          },
        });
        if (res.status === 'success') {
          bindOrderBasisValues(methods, res.payload.order);
          bindOrderJaketValues(methods, res.payload.order.jaket);
          bindOrderPantsValues(methods, res.payload.order.pants);
          bindOrderVestValues(methods, res.payload.order.vest);
          setOrderStatus(order.orderStatus);
          setIsNew(false);
          setCurrentOrderId(res.payload.order.orderId);

          // 更新フラグを設定する
          dispatch(setUpdated(true));

          order.vest.updateUserId = user.userId;
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

  const handleOrder = async () => {
    const fire = async () => {
      try {
        // スピナーを表示する!
        setOpen(true);

        // 発注登録
        const order: OrderBasisType = setOrderObject('発注済み', methods);
        // order.seq = order.seq || 0;
        order.yield = order.yield || 0;
        order.shopId = order.shopId || user.shopId;

        const res: any = await orderApi.upsert({
          seqHead: user.seqHead,
          order: order,
          orderExec: orderStatus === '保存',
          invoice: {
            fabricPrice: fabricPrice || 0,
            wagesPrice: wagesPrice || 0,
            customPrice: customPrice || 0,
            buttonLiningPrice: buttonLiningPrice || 0,
            totalPrice: totalPrice,
            tax: tax,
            totalPriceWithTax: totalPriceWithTax,
            fabricCost: fabricCost || 0,
            wagesCost: wagesCost || 0,
            customCost: customCost || 0,
            buttonLiningCost: buttonLiningCost || 0,
            totalCost: totalCost,
          },
        });
        if (res.status === 'success') {
          bindOrderBasisValues(methods, res.payload.order);
          bindOrderJaketValues(methods, res.payload.order.jaket);
          bindOrderPantsValues(methods, res.payload.order.pants);
          bindOrderVestValues(methods, res.payload.order.vest);
          setOrderStatus(order.orderStatus);
          setIsNew(false);
          setCurrentOrderId(res.payload.order.orderId);

          // 更新フラグを設定する
          dispatch(setUpdated(true));

          const isSkirt = order.productName.includes('SK');
          showMessage(
            orderStatus === '発注済み' ? '更新しました' : '発注処理を実行しました',
            'info',
            isSkirt ? 'スカートの情報は発注明細に記入してください' : ''
          );
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

      // 生地在庫のバリデーションを実行する
      const stockResult: any = await validateStock(
        methods.getValues('basis-productName'),
        methods.getValues('basis-fabricProductNo'),
        methods.getValues('jaket-lining')
      );
      if (stockResult.stockStatus === 'OK') {
        confirmYesNo(
          orderStatus === '発注済み' ? '更新します。よろしいですか？' : '発注します。よろしいですか？',
          fire
        );
      } else if (stockResult.stockStatus === 'WARN') {
        confirmYesNo(
          orderStatus === '発注済み' ? (
            <div>
              更新します。よろしいですか？
              <br />
              注意：{stockResult.productType}の在庫量が20mを下回っています
            </div>
          ) : (
            <div>
              発注します。よろしいですか？
              <br />
              注意：{stockResult.productType}の在庫量が20mを下回っています
            </div>
          ),
          fire
        );
      } else if (stockResult.stockStatus === 'SELECT_OTHER') {
        confirmYesNo(
          <div>
            {stockResult.productType}の在庫量が10mを下回っています。このまま
            {orderStatus === '発注済み' ? '更新' : '発注'}しますか？
            <br />
            <br />
            はい：{orderStatus === '発注済み' ? '更新' : '発注'}処理を行います
            <br />
            いいえ：前の画面に戻ります
          </div>,
          fire
        );
      } else if (stockResult.stockStatus === 'NG') {
        confirmYesNo(
          <div>
            {stockResult.productType}
            の在庫量が5mを下回っています。
            <br />
            在庫切れになりスーツが作成できない可能性がありますが、このまま
            {orderStatus === '発注済み' ? '更新' : '発注'}しますか？
            <br />
            <br />
            はい：{orderStatus === '発注済み' ? '更新' : '発注'}処理を行います
            <br />
            いいえ：前の画面に戻ります
          </div>,
          fire
        );
      } else if (stockResult.stockStatus === 'NON') {
        setStockValidationMessage(`${stockResult.productType}の登録がありません`);
        setDialogVisible(true);
        return;
      }
    } catch (error: any) {
      showMessage('エラー', 'error', error);
    } finally {
      // スピナーを非表示にする
      setOpen(false);
    }
  };

  const handleReuse = () => {
    confirmYesNo('流用しますか？', () => navigate(`/order-reuse/${currentOrderId}`));
  };

  const handleDelete = () => {
    const fire = async () => {
      try {
        // スピナーを表示する
        setOpen(true);

        const res: any = await orderApi.delete({
          orderId: currentOrderId,
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

  const handlePriceCalc = async () => {
    try {
      setPriceCalcLoading(true);

      const order: OrderBasisType = setOrderObject('発注済み', methods);
      // order.seq = order.seq || 0;
      order.yield = order.yield || 0;
      order.shopId = order.shopId || user.shopId;

      const res: any = await orderApi.getPrice({
        shopNo: user.shopNo,
        shopGroup: user.shopGroup,
        order,
      });
      if (res.status === 'success') {
        setFabricPrice(res.payload.price.fabricPrice);
        setWagesPrice(res.payload.price.wagesPrice);
        setCustomPrice(res.payload.price.customPrice);
        setButtonLiningPrice(res.payload.price.buttonLiningPrice);
        setTotalPrice(res.payload.price.totalPrice.toLocaleString());
        setTax(res.payload.price.tax.toLocaleString());
        setTotalPriceWithTax(res.payload.price.totalPriceWithTax.toLocaleString());
        setFabricCost(res.payload.price.fabricCost);
        setWagesCost(res.payload.price.wagesCost);
        setCustomCost(res.payload.price.customCost);
        setButtonLiningCost(res.payload.price.buttonLiningCost);
        setTotalCost(res.payload.price.totalCost.toLocaleString());
      } else {
        showMessage('エラー', 'error', res.message);
      }
    } catch (error: any) {
      showMessage('エラー', 'error', error);
    } finally {
      setPriceCalcLoading(false);
    }
  };

  const onChangeFabricPrice = (e: any) => {
    setFabricPrice(parseInt(e.target.value));
  };

  const onChangeWagesPrice = (e: any) => {
    setWagesPrice(parseInt(e.target.value));
  };

  const onChangeCustomPrice = (e: any) => {
    setCustomPrice(parseInt(e.target.value));
  };

  const onChangeButtonLiningPrice = (e: any) => {
    setButtonLiningPrice(parseInt(e.target.value));
  };

  const clacTotalPrice = () => {
    const totalPrice = (fabricPrice || 0) + (wagesPrice || 0) + (customPrice || 0) + (buttonLiningPrice || 0);
    setTotalPrice(totalPrice);
    setTax(Math.round(totalPrice * 0.1));
    setTotalPriceWithTax(Math.round(totalPrice * 1.1));
  };

  useEffect(() => {
    clacTotalPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fabricPrice, wagesPrice, customPrice, buttonLiningPrice]);

  return (
    <>
      <Box className=" flex my-5 text-gray-500" alignItems="center">
        <Box className="flex mr-5" alignItems="center">
          <CheckroomIcon className="mr-3" />
          <Typography variant="h6">発注</Typography>
        </Box>
        <Button onClick={handleBack} startIcon={<ReplyIcon />} color="info" size="small">
          ホーム
        </Button>
      </Box>
      <Divider />
      <FormProvider {...methods}>
        <Box className="items-center my-5">
          <Box className="flex items-center mb-3">
            <Typography sx={{ marginRight: '10px' }}>
              {orderStatus &&
                (orderStatus === '保存' ? (
                  <Tooltip title="保存済み" arrow>
                    <SaveIcon fontSize="large" sx={{ color: green[500] }} />
                  </Tooltip>
                ) : (
                  <Tooltip title="発注済み" arrow>
                    <CloudUploadIcon fontSize="large" sx={{ color: pink[500] }} />
                  </Tooltip>
                ))}
            </Typography>
            <Typography variant="body1">{`オーダーID：${isNew ? '(新規)' : currentOrderId}`}</Typography>
          </Box>
          <Box className="ml-3 mb-5">
            <Button
              type="submit"
              variant="outlined"
              onClick={handleOrder}
              sx={{ marginRight: '3px' }}
              disabled={orderStatus === '発注済み' && user.roleId !== '00'}
              startIcon={<CloudUploadIcon />}
            >
              {orderStatus === '発注済み' ? '更新' : '発注'}
            </Button>
            <Button
              variant="outlined"
              onClick={handleSave}
              sx={{ marginRight: '3px' }}
              disabled={orderStatus === '発注済み'}
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
              disabled={orderStatus === '発注済み'}
              startIcon={<ClearIcon />}
            >
              削除
            </Button>
          </Box>
          <Box className="flex ml-3 mb-2 justify-between">
            <Box>
              <GridContainer>
                <RhfDatePicker label="入力日" name="basis-inputDate" readOnly={true} />
                <RhfDateTimePicker label="発注日時" name="basis-orderDateTime" readOnly={true} />
                <RhfDatePicker
                  label="工場出荷日"
                  name="basis-shipDate"
                  readOnly={orderStatus === '発注済み' && user.roleId !== '00'}
                />
                <RhfDatePicker
                  label="納品日"
                  name="basis-deliveryDate"
                  readOnly={orderStatus === '発注済み' && user.roleId !== '00'}
                />
              </GridContainer>
              <GridContainer>
                <RhfTextField label="ショップ連番" name="basis-seq" readOnly={true} />
                <RhfTextField label="入力者" name="basis-inputUserName" readOnly={true} />
              </GridContainer>
            </Box>
            <OrderPrice
              fabricPrice={fabricPrice}
              wagesPrice={wagesPrice}
              customPrice={customPrice}
              buttonPrice={buttonLiningPrice}
              totalPrice={totalPrice}
              tax={tax}
              totalPriceWithTax={totalPriceWithTax}
              priceCalcLoading={priceCalcLoading}
              handlePriceCalc={handlePriceCalc}
              buttonDisabled={orderStatus === '発注済み' && user.roleId !== '00'}
              onChangeFabricPrice={onChangeFabricPrice}
              onChangeWagesPrice={onChangeWagesPrice}
              onChangeCustomPrice={onChangeCustomPrice}
              onChangeButtonPrice={onChangeButtonLiningPrice}
              disabled={orderStatus === '発注済み' && user.roleId !== '00'}
            />
          </Box>
        </Box>
        <Box className="mt-5">
          <HorizontalTabs
            tabItems={[
              {
                label: 'オーダー',
                component: (
                  <OrderBasis methods={methods} readOnly={orderStatus === '発注済み' && user.roleId !== '00'} />
                ),
                errorCount: basisErrorCount,
              },
              {
                label: 'ジャケット',
                component: (
                  <OrderJaket methods={methods} readOnly={orderStatus === '発注済み' && user.roleId !== '00'} />
                ),
                errorCount: jaketErrorCount,
              },
              {
                label: 'パンツ',
                component: <OrderPants readOnly={orderStatus === '発注済み' && user.roleId !== '00'} />,
                errorCount: pantsErrorCount,
              },
              {
                label: 'ベスト',
                component: <OrderVest readOnly={orderStatus === '発注済み' && user.roleId !== '00'} />,
                errorCount: vestErrorCount,
              },
            ]}
          />
        </Box>
        <Loading open={open} />
      </FormProvider>
      <Toast ref={toast} position="center" />
      <Dialog
        header="エラー"
        visible={dialogVisible}
        // style={{ width: '50vw' }}
        onHide={() => {
          if (!dialogVisible) return;
          setDialogVisible(false);
        }}
      >
        <p className="m-0">{stockValidationMessage}</p>
      </Dialog>
    </>
  );
};
