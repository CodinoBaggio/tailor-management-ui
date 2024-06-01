import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
  // GridColumnGroupingModel,
} from '@mui/x-data-grid';
import { Box, Button, createTheme } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { jaJP } from '@mui/x-data-grid/locales';
import { ThemeProvider } from '@emotion/react';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import { Toast } from 'primereact/toast';

import Loading from '../../../components/ui/Loading';
import { useToast } from '../../../hooks/useToast';
import invoiceApi from '../api/invoiceApi';

const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', width: 90},
  {
    field: 'shipDate',
    headerName: '工場出荷日',
    width: 110,
  },
  {
    field: 'orderId',
    headerName: 'オーダーID',
    width: 150,
  },
  {
    field: 'seq',
    headerName: 'ショップ連番',
    type: 'number',
    width: 110,
  },
  {
    field: 'productName',
    headerName: '品名',
    width: 150,
  },
  {
    field: 'fabricProductNo',
    headerName: '生地品番',
    width: 150,
  },
  {
    field: 'customerName',
    headerName: '卸先名',
    width: 150,
  },
  {
    field: 'totalPriceWithTax',
    headerName: '請求金額',
    type: 'number',
    width: 110,
  },
];

const theme = createTheme(undefined, jaJP);

export const InvoiceData = () => {
  const [formDateValue, setFormDateValue] = useState<Dayjs>(dayjs());
  const [toDateValue, setToDateValue] = useState<Dayjs>(dayjs());
  const [open, setOpen] = useState(false);
  const { toast, showMessage } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  useEffect(() => {
    setFormDateValue(dayjs());
    setToDateValue(dayjs().add(7, 'day'));

    const getInvoices = async () => {
      setOpen(true);
      try {
        const res: any = await invoiceApi.getInvoices({
          dateFrom: formDateValue.format('YYYY-MM-DDTHH:mm:ss'),
          dateTo: toDateValue.format('YYYY-MM-DDTHH:mm:ss'),
        });
        if (res.status === 'success') {
          setItems(res.payload.invoices);
        } else {
          showMessage('エラー', 'error', res.message);
        }
      } catch (error: any) {
        showMessage('エラー', 'error', error);
      } finally {
        setOpen(false);
      }
    };
    getInvoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async () => {
    setOpen(true);
    try {
      const res: any = await invoiceApi.getInvoices({
        dateFrom: formDateValue.format('YYYY-MM-DDTHH:mm:ss'),
        dateTo: toDateValue.format('YYYY-MM-DDTHH:mm:ss'),
      });
      if (res.status === 'success') {
        setItems(res.payload.invoices);
      } else {
        showMessage('エラー', 'error', res.message);
      }
    } catch (error: any) {
      showMessage('エラー', 'error', error);
    } finally {
      setOpen(false);
    }
  };

  const handleDownload = async () => {
    const selectedRows = items.filter((item) =>
      rowSelectionModel.includes(item.id)
    );
    if (selectedRows.length === 0) {
      showMessage(
        'エラー',
        'error',
        'ダウンロードするデータを選択してください'
      );
      return;
    }

    // オーダーIDをAPIに送信して、請求書データを作成する
    setOpen(true);
    try {
      // APIコール
      const orderIds = selectedRows.map((row) => row.orderId);
      const res: any = await invoiceApi.createInvoiceData({ orderIds });

      if (res.status === 'success') {
        // ダウンロード処理
        const a = document.createElement('a');
        const file = new Blob([JSON.stringify(res.payload.invoiceData)], {
          type: 'text/plain',
        });
        a.href = URL.createObjectURL(file);
        a.download = `invoice_${dayjs().format('YYYYMMDDHHmmss')}.json`;
        a.click();
      } else {
        showMessage('エラー', 'error', res.message);
      }
    } catch (error: any) {
      showMessage('エラー', 'error', error);
    } finally {
      setOpen(false);
    }
  };

  const handleRpaDataDownload = async () => {
    const selectedRows = items.filter((item) =>
      rowSelectionModel.includes(item.id)
    );
    if (selectedRows.length === 0) {
      showMessage(
        'エラー',
        'error',
        'ダウンロードするデータを選択してください'
      );
      return;
    }

    // オーダーIDをAPIに送信して、請求書データを作成する
    setOpen(true);
    try {
      // APIコール
      const orderIds = selectedRows.map((row) => row.orderId);
      const res: any = await invoiceApi.createRpaData({ orderIds });

      if (res.status === 'success') {
        // ダウンロード処理
        const a = document.createElement('a');
        const file = new Blob([JSON.stringify(res.payload.invoiceData)], {
          type: 'text/plain',
        });
        a.href = URL.createObjectURL(file);
        a.download = `auto_${dayjs().format('YYYYMMDDHHmmss')}.json`;
        a.click();
      } else {
        showMessage('エラー', 'error', res.message);
      }
    } catch (error: any) {
      showMessage('エラー', 'error', error);
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <Box className="flex justify-between items-end mb-5">
        <Box className="flex items-end">
          <Box className="flex items-center space-x-5 mr-10">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
              <DatePicker
                label="工場出荷日From"
                value={formDateValue}
                onChange={(newValue: Dayjs | null) =>
                  setFormDateValue(newValue!)
                }
                slotProps={{
                  textField: {
                    size: 'small',
                    className: 'w-40',
                    variant: 'standard',
                  },
                }}
              />
              <Box>～</Box>
              <DatePicker
                label="工場出荷日To"
                value={toDateValue}
                onChange={(newValue: Dayjs | null) => setToDateValue(newValue!)}
                slotProps={{
                  textField: {
                    size: 'small',
                    className: 'w-40',
                    variant: 'standard',
                  },
                }}
              />
            </LocalizationProvider>
          </Box>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<SearchIcon />}
            // className="w-24"
            onClick={handleSearch}
          >
            検索
          </Button>
        </Box>
        <Box>
          <Box className="flex flex-col items-end">
            <Button
              variant="contained"
              color="primary"
              startIcon={<DownloadIcon />}
              onClick={handleDownload}
            >
              請求書データ
            </Button>
          </Box>
          <Box className="mt-2">
            <Button
              variant="outlined"
              color="primary"
              startIcon={<DownloadIcon />}
              onClick={handleRpaDataDownload}
            >
              自動入力データ
            </Button>
          </Box>
        </Box>
      </Box>
      <Box className="w-full">
        <ThemeProvider theme={theme}>
          <DataGrid
            rows={items}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            autoHeight
            onRowSelectionModelChange={(newRowSelectionModel) => {
              setRowSelectionModel(newRowSelectionModel);
            }}
            rowSelectionModel={rowSelectionModel}
          />
        </ThemeProvider>
      </Box>
      <Loading open={open} />
      <Toast ref={toast} position="center" />
    </>
  );
};
