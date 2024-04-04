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
  setOrderObject,
} from '../features/order/utils/orderUtil';
import { validateOrder } from '../features/order/utils/orderValidations';
import { confirmYesNo } from '../utils/confirm';
import { useToast } from '../hooks/useToast';
import Loading from '../components/ui/Loading';
import { OrderBasisType } from '../features/order/types/order';

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

        const order: OrderBasisType =setOrderObject('保存', methods);
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
        const order: OrderBasisType =setOrderObject('発注済み', methods);
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
