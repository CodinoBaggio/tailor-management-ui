import { Box, Divider, TextField } from '@mui/material';
import React, { FC, useEffect } from 'react';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';
import { LoadingButton } from '@mui/lab';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        prefix="¥"
      />
    );
  }
);

type Props = {
  fabricPrice: number | undefined;
  wagesPrice: number | undefined;
  customPrice: number | undefined;
  buttonPrice: number | undefined;
  totalPrice: number | undefined;
  tax: number | undefined;
  totalPriceWithTax: number | undefined;
  priceCalcLoading: boolean;
  handlePriceCalc: () => void;
  buttonDisabled: boolean;
  onChangeFabricPrice: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onChangeWagesPrice: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onChangeCustomPrice: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onChangeButtonPrice: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  disabled?: boolean;
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
    onChangeFabricPrice,
    onChangeWagesPrice,
    onChangeCustomPrice,
    onChangeButtonPrice,
    disabled = false,
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
    <Box className="w-48 text-sm">
      <Box className="flex justify-between mb-2">
        {/* <Box>生地</Box> */}
        {/* <Box>{fabricPrice}円</Box> */}
        <TextField
          label="生地"
          value={fabricPrice}
          InputProps={{
            inputComponent: NumericFormatCustom as any,
          }}
          inputProps={{
            style: { textAlign: 'right', fontSize: '13px', color: 'gray' },
          }}
          variant="standard"
          className="text-xs"
          fullWidth
          onChange={onChangeFabricPrice}
          disabled={disabled}
        />
      </Box>
      <Box className="flex justify-between mb-2">
        {/* <Box>工賃</Box>
        <Box>{wagesPrice}円</Box> */}
        <TextField
          label="工賃"
          value={wagesPrice}
          InputProps={{
            inputComponent: NumericFormatCustom as any,
          }}
          inputProps={{
            style: { textAlign: 'right', fontSize: '13px', color: 'gray' },
          }}
          variant="standard"
          className="text-xs"
          fullWidth
          onChange={onChangeWagesPrice}
          disabled={disabled}
        />
      </Box>
      <Box className="flex justify-between mb-2">
        {/* <Box>仕様変更</Box>
        <Box>{customPrice}円</Box> */}
        <TextField
          label="仕様変更"
          value={customPrice}
          InputProps={{
            inputComponent: NumericFormatCustom as any,
          }}
          inputProps={{
            style: { textAlign: 'right', fontSize: '13px', color: 'gray' },
          }}
          variant="standard"
          className="text-xs"
          fullWidth
          onChange={onChangeCustomPrice}
          disabled={disabled}
        />
      </Box>
      <Box className="flex justify-between mb-2">
        {/* <Box>ボタン裏地</Box>
        <Box>{buttonPrice}円</Box> */}
        <TextField
          label="ボタン裏地"
          value={buttonPrice}
          InputProps={{
            inputComponent: NumericFormatCustom as any,
          }}
          inputProps={{
            style: { textAlign: 'right', fontSize: '13px', color: 'gray' },
          }}
          variant="standard"
          className="text-xs"
          fullWidth
          onChange={onChangeButtonPrice}
          disabled={disabled}
        />
      </Box>
      {/* <Divider /> */}
      <Box className="flex justify-between my-2">
        <Box>小計</Box>
        <Box>¥{(totalPrice ? totalPrice.toLocaleString() : 0)}</Box>
      </Box>
      <Box className="flex justify-between mb-2">
        <Box>消費税</Box>
        <Box>¥{tax ? tax.toLocaleString() : 0}</Box>
      </Box>
      <Divider style={{ background: 'gray' }} />
      <Box className="flex justify-between mt-2 mb-5">
        <Box>合計</Box>
        <Box>¥{totalPriceWithTax ? totalPriceWithTax.toLocaleString() : 0}</Box>
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
