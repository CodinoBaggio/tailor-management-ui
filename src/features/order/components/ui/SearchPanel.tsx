import { FC } from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import 'dayjs/locale/ja';

type Props = {
  handleSearch: () => void;
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  searchStates: {
    dateFrom: Date | null;
    setDateFrom: React.Dispatch<React.SetStateAction<Date | null>>;
    dateTo: Date | null;
    setDateTo: React.Dispatch<React.SetStateAction<Date | null>>;
    dateType: string;
    setDateType: React.Dispatch<React.SetStateAction<string>>;
    orderStatausType: string;
    setOrderStatausType: React.Dispatch<React.SetStateAction<string>>;
    seq: string;
    setSeq: React.Dispatch<React.SetStateAction<string>>;
    customerName: string;
    setCustomerName: React.Dispatch<React.SetStateAction<string>>;
  };
};

export const SearchPanel: FC<Props> = (props) => {
  const { handleSearch, toggleDrawer, searchStates } = props;

  return (
    <Box
      sx={{ width: 'auto', height: '100%' }}
      role="presentation"
      // onClick={toggleDrawer(false)}
      // onKeyDown={toggleDrawer(false)}
      className="p-3"
    >
      <FormControl>
        <Box mb={2}>
          <RadioGroup
            row
            value={searchStates.dateType}
            onChange={(newValue) =>
              searchStates.setDateType(newValue.target.value)
            }
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
        </Box>
        <Box mb={2} className="flex items-center">
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
            <DatePicker
              label="From"
              value={searchStates.dateFrom}
              onChange={(newValue) => searchStates.setDateFrom(newValue)}
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
              value={searchStates.dateTo}
              onChange={(newValue) => searchStates.setDateTo(newValue)}
              className="max-sm:w-32 max-md:w-40"
              slotProps={{
                textField: {
                  size: 'small',
                },
              }}
            />
          </LocalizationProvider>
        </Box>
        <Box mb={2}>
          <TextField
            label="連番"
            placeholder="連番"
            value={searchStates.seq}
            onChange={(event) => {
              searchStates.setSeq(event.target.value);
            }}
            size='small'
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="顧客名"
            placeholder="顧客名"
            value={searchStates.customerName}
            onChange={(event) => {
              searchStates.setCustomerName(event.target.value);
            }}
            size='small'
          />
        </Box>
        <Box mb={2}>
          <FormControl>
            <FormLabel>発注ステータス</FormLabel>
            <RadioGroup
              row
              value={searchStates.orderStatausType}
              onChange={(newValue) =>
                searchStates.setOrderStatausType(newValue.target.value)
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
        </Box>
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
