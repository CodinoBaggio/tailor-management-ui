import { useCallback, useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Box, Button, TextField, createTheme } from '@mui/material';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { Toast } from 'primereact/toast';
import { jaJP } from '@mui/x-data-grid/locales';
import SearchIcon from '@mui/icons-material/Search';

import Loading from '../../../../components/ui/Loading';
import masterApi from '../../api/materApi';
import { useToast } from '../../../../hooks/useToast';

const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', width: 90},
  {
    field: 'shopGroup',
    headerName: '仲間分け',
    width: 150,
  },
  {
    field: 'tailoringItem',
    headerName: '仕立項目',
    width: 100,
  },
  {
    field: 'conditionSeq',
    headerName: '条件連番',
    width: 150,
  },
  {
    field: 'condition',
    headerName: '条件',
    width: 150,
  },
  {
    field: 'price',
    headerName: '販売価格',
    type: 'number',
    width: 150,
  },
  {
    field: 'cost',
    headerName: '原価',
    type: 'number',
    width: 150,
  },
  {
    field: 'isDelete',
    headerName: '削除フラグ',
    width: 100,
  },
];

const theme = createTheme(undefined, jaJP);

export const CustomFeaturePrice = () => {
  const [open, setOpen] = useState(false);
  const { toast, showMessage } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  const [fabricProductNo, setFabricProductNo] = useState<string>('');

  const getData = useCallback(async () => {
    setOpen(true);
    try {
      const res: any = await masterApi.getAllCustomFeaturePrice();
      if (res.status === 'success') {
        setItems(res.payload.prices);
      } else {
        showMessage('エラー', 'error', res.message);
      }
    } catch (error: any) {
      showMessage('エラー', 'error', error);
    } finally {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async () => {
    setOpen(true);
    try {
      const res: any = await masterApi.getCustomFeaturePriceByCondition({ searchPattern: fabricProductNo });
      if (res.status === 'success') {
        setItems(res.payload.prices);
      } else {
        showMessage('エラー', 'error', res.message);
      }
    } catch (error: any) {
      showMessage('エラー', 'error', error);
    } finally {
      setOpen(false);
    }
  };

  const handleChange = async (event: any) => {
    setFabricProductNo(event.target.value);
  };

  return (
    <>
      <Box className="flex justify-between items-end mb-5">
        <Box className="flex items-end">
          <Box className="flex items-center space-x-5 mr-10">
            <TextField size="small" label="仲間分け" variant="standard" onChange={handleChange} />
          </Box>
          <Button variant="outlined" color="primary" startIcon={<SearchIcon />} onClick={handleSearch}>
            検索
          </Button>
        </Box>
      </Box>
      <Box className="w-full">
        <ThemeProvider theme={theme}>
          <DataGrid
            rows={items}
            columns={columns}
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
