import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import 'dayjs/locale/ja';

type Props = {
  dateType: string;
  setDateType: (value: string) => void;
  dateFrom: Date | null;
  setDateFrom: (value: Date | null) => void;
  dateTo: Date | null;
  setDateTo: (value: Date | null) => void;
  orderId: string;
  setOrderId: (value: string) => void;
  customerName: string;
  setCustomerName: (value: string) => void;
  orderStatausType: string;
  setOrderStatausType: (value: string) => void;
  handleSearch: () => void;
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
};

export const SearchDrawer:FC<Props> = (props) => {
  const {
    dateType,
    setDateType,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    orderId,
    setOrderId,
    customerName,
    setCustomerName,
    orderStatausType,
    setOrderStatausType,
    handleSearch,
    toggleDrawer,
  } = props;
  return (
    <Box
      sx={{ width: 'auto', height: '100%' }}
      role="presentation"
      // onClick={toggleDrawer(false)}
      // onKeyDown={toggleDrawer(false)}
      className="p-3"
    >
      <FormControl>
        <FormControl>
          <RadioGroup
            row
            // aria-labelledby="demo-row-radio-buttons-group-label"
            // name="row-radio-buttons-group"
            value={dateType}
            onChange={(newValue) => setDateType(newValue.target.value)}
          >
            <FormControlLabel
              value="inputDate"
              control={<Radio size="small" />}
              label="入力日"
            />
            <FormControlLabel
              value="orderDateTime"
              control={<Radio size="small" />}
              label="発注日時"
            />
            <FormControlLabel
              value="shipDate"
              control={<Radio size="small" />}
              label="工場出荷日"
            />
          </RadioGroup>
        </FormControl>
        <Box className="flex items-center">
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
            <DatePicker
              label="From"
              value={dateFrom}
              onChange={(newValue) => setDateFrom(newValue)}
              className="max-sm:w-32 max-md:w-40"
              slotProps={{
                textField: {
                  size: 'small',
                },
              }}
            />
            <div className="mx-3">～</div>
            <DatePicker
              label="To"
              value={dateTo}
              onChange={(newValue) => setDateTo(newValue)}
              className="max-sm:w-32 max-md:w-40"
              slotProps={{
                textField: {
                  size: 'small',
                },
              }}
            />
          </LocalizationProvider>
        </Box>
        <TextField
          placeholder="オーダーID"
          value={orderId}
          onChange={(event) => {
            setOrderId(event.target.value);
          }}
          className="mt-5"
        />
        <TextField
          placeholder="顧客名"
          value={customerName}
          onChange={(event) => {
            setCustomerName(event.target.value);
          }}
          className="mt-5"
        />
        <FormControl sx={{ marginTop: '1.25rem' }}>
          <FormLabel>発注ステータス</FormLabel>
          <RadioGroup
            row
            // aria-labelledby="demo-row-radio-buttons-group-label"
            // name="row-radio-buttons-group"
            value={orderStatausType}
            onChange={(newValue) =>
              setOrderStatausType(newValue.target.value)
            }
          >
            <FormControlLabel
              value="all"
              control={<Radio size="small" />}
              label="すべて"
            />
            <FormControlLabel
              value="saved"
              control={<Radio size="small" />}
              label="保存"
            />
            <FormControlLabel
              value="ordered"
              control={<Radio size="small" />}
              label="発注済み"
            />
          </RadioGroup>
        </FormControl>
      </FormControl>
      <Box className="my-2">
        <Divider />
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Button
          variant="outlined"
          onClick={handleSearch}
          startIcon={<SearchIcon />}
        >
          検索
        </Button>
        <Button onClick={toggleDrawer(false)} startIcon={<CloseIcon />}>
          閉じる
        </Button>
      </Box>
    </Box>
  );
};
