import { Box, Divider } from '@mui/material';
import React, { FC, useEffect } from 'react';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';
import { LoadingButton } from '@mui/lab';

type Props = {
  fabricPrice: string;
  wagesPrice: string;
  customPrice: string;
  buttonPrice: string;
  totalPrice: string;
  tax: string;
  totalPriceWithTax: string;
  priceCalcLoading: boolean;
  handlePriceCalc: () => void;
  buttonDisabled: boolean;
};

export const OrderPrice: FC<Props> = (props) => {
  const {
    handlePriceCalc,
    fabricPrice,
    wagesPrice,
    customPrice,
    buttonPrice,
    totalPrice,
    tax,
    totalPriceWithTax,
    priceCalcLoading,
    buttonDisabled,
  } = props;

  useEffect(() => {
    const numberInputs = document.querySelectorAll('input[type=number]');
    numberInputs.forEach((input) => {
      input.addEventListener('wheel', (event) => event.preventDefault());
    });

    // コンポーネントのアンマウント時にイベントリスナーをクリーンアップ
    return () => {
      numberInputs.forEach((input) => {
        input.removeEventListener('wheel', (event) => event.preventDefault());
      });
    };
  }, []);

  return (
    <Box className="w-48 text-gray-600 text-xs">
      <Box className="flex justify-between mb-2">
        <Box>生地</Box>
        <Box>{fabricPrice}円</Box>
      </Box>
      <Box className="flex justify-between mb-2">
        <Box>工賃</Box>
        <Box>{wagesPrice}円</Box>
      </Box>
      <Box className="flex justify-between mb-2">
        <Box>仕様変更</Box>
        <Box>{customPrice}円</Box>
      </Box>
      <Box className="flex justify-between mb-2">
        <Box>ボタン裏地</Box>
        <Box>{buttonPrice}円</Box>
      </Box>
      <Divider />
      <Box className="flex justify-between my-2">
        <Box>小計</Box>
        <Box>{totalPrice}円</Box>
      </Box>
      <Box className="flex justify-between mb-2">
        <Box>消費税</Box>
        <Box>{tax}円</Box>
      </Box>
      <Divider />
      <Box className="flex justify-between mt-2 mb-5">
        <Box>合計</Box>
        <Box>{totalPriceWithTax}円</Box>
      </Box>
      <LoadingButton
        onClick={handlePriceCalc}
        startIcon={<CurrencyYenIcon />}
        fullWidth
        loading={priceCalcLoading}
        color="primary"
        variant="outlined"
        disabled={buttonDisabled}
      >
        価格計算
      </LoadingButton>
    </Box>
  );
};
