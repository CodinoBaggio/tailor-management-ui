import { Box, Divider } from '@mui/material';
import React, { FC } from 'react';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';
import { LoadingButton } from '@mui/lab';

type Props = {
  fabricPrice: string;
  wagesPrice: string;
  customPrice: string;
  totalPrice: string;
  priceCalcLoading: boolean;
  handlePriceCalc: () => void;
};

export const OrderPrice: FC<Props> = (props) => {
  const { handlePriceCalc, fabricPrice, wagesPrice, customPrice, totalPrice, priceCalcLoading } = props;
  return (
    <Box className="w-52 text-gray-600">
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
      <Divider />
      <Box className="flex justify-between mb-5">
        <Box>合計</Box>
        <Box>{totalPrice}円</Box>
      </Box>
      <LoadingButton
        onClick={handlePriceCalc}
        startIcon={<CurrencyYenIcon />}
        fullWidth
        loading={priceCalcLoading}
        color="primary"
        variant="outlined"
      >
        価格計算
      </LoadingButton>
    </Box>
  );
};
