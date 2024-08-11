import { useCallback, useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Box, Button, TextField, createTheme } from '@mui/material';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { Toast } from 'primereact/toast';
import { jaJP } from '@mui/x-data-grid/locales';
import SearchIcon from '@mui/icons-material/Search';
import { readString } from 'react-papaparse';
import Encoding from 'encoding-japanese';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import Loading from '../../../../components/ui/Loading';
import masterApi from '../../api/materApi';
import { useToast } from '../../../../hooks/useToast';
import { CsvImport } from '../../../../components/ui/CsvImport';
import { FileRejection } from 'react-dropzone';

const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', width: 90},
  {
    field: 'shopGroup',
    headerName: '仲間分け',
    width: 150,
  },
  {
    field: 'productName',
    headerName: '品名',
    width: 100,
  },
  {
    field: 'liningProductNo',
    headerName: '裏地品番',
    width: 200,
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

export const LiningPrice = () => {
  const [open, setOpen] = useState(false);
  const { toast, showMessage } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  const [fabricProductNo, setFabricProductNo] = useState<string>('');

  const getData = useCallback(async () => {
    setOpen(true);
    try {
      const res: any = await masterApi.getAllLiningPrice();
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
      const res: any = await masterApi.getLiningPriceByCondition({ searchPattern: fabricProductNo });
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

  const handleFileRead = (binaryStr: any) => {
    readString(binaryStr, {
      worker: true,
      complete: async (results: any) => {
        // バリデーションの処理
        if (results.data.length === 0 || results.data.length === 1) {
          showMessage('エラー', 'error', `ヘッダ行もしくはデータ行がありません`);
          return false;
        }

        if (
          results.data[0][0] !== '仲間分け' ||
          results.data[0][1] !== '品名' ||
          results.data[0][2] !== '裏地品番' ||
          results.data[0][3] !== '販売価格' ||
          results.data[0][4] !== '原価' ||
          results.data[0][5] !== '削除フラグ' ||
          results.data[0].length !== 6
        ) {
          showMessage(
            'エラー',
            'error',
            `ヘッダ行の形式を「仲間分け,品名,裏地品番,販売価格,原価,削除フラグ」にしてください`
          );
          return false;
        }

        for (let i = 1; i < results.data.length; i++) {
          if (
            !results.data[i][0] ||
            !results.data[i][1] ||
            !results.data[i][2] ||
            !results.data[i][3] ||
            !results.data[i][4] ||
            !results.data[i][5]
          ) {
            showMessage('エラー', 'error', `${i + 2}行目の形式が正しくありません`);
            return false;
          } else {
            // 販売価格が数値かどうか
            if (isNaN(results.data[i][4])) {
              showMessage('エラー', 'error', `${i + 2}行目の販売価格が数値ではありません`);
              return false;
            }
            // 原価が数値かどうか
            if (isNaN(results.data[i][5])) {
              showMessage('エラー', 'error', `${i + 2}行目の原価が数値ではありません`);
              return false;
            }
          }
        }

        // オブジェクトに格納し、APIに渡す
        try {
          // スピナーを表示する
          setOpen(true);

          const res: any = await masterApi.upsertLiningPrice({ items: results.data.slice(1) });
          if (res.status === 'success') {
            getData();
            showMessage('登録しました');
          } else {
            showMessage('エラー', 'error', res.message);
          }
        } catch (error: any) {
          showMessage('エラー', 'error', error);
        } finally {
          setOpen(false);
        }
      },
    });
  };

  // CSVをドロップしたときに呼び出される処理
  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = async (e: any) => {
        const binaryStr = e.target.result;
        const codes = new Uint8Array(binaryStr);
        const encoding = Encoding.detect(codes) || 'UTF8';
        const text = Encoding.convert(codes, {
          to: 'UNICODE',
          from: encoding,
          type: 'string',
        });

        // 不正な文字が含まれていないかチェック
        const res: any = await masterApi.includesUnusableCharacter({ fileContents: codes });
        if (res.status === 'success') {
          if (res.payload) {
            showMessage('エラー', 'error', `ファイルに不正な文字（${res.payload}）が含まれています。`);
            return;
          }
        }

        handleFileRead(text.replace(/\n$/, ''));
      };

      // ファイルの読み込み ※readAsTextでは文字化けするため、readAsArrayBufferを使用
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const onDropRejected = useCallback((rejectedFiles: FileRejection[]) => {
    const message: string[] = [];
    let manyFilesError = false;
    rejectedFiles.forEach(({ file, errors }) => {
      errors.forEach(({ code }) => {
        switch (code) {
          // case 'file-too-large':
          //   message.push(
          //     `${file.name} のファイルサイズが大きすぎます。50MB以下のファイルをアップロードしてください。`
          //   );
          //   break;
          case 'file-invalid-type':
            message.push(`${file.name} のファイル形式が許可されていません。許可されているファイル形式は csv です。`);
            break;
          case 'too-many-files':
            if (!manyFilesError) {
              message.push(`ファイルは1つまでしかアップロードできません。`);
              manyFilesError = true;
            }
            break;
          default:
            break;
        }
      });
    });
    0 < message.length && showMessage('エラー', 'error', message.join('\n'));
  }, []);

  const handleDownload = async () => {
    setOpen(true);
    try {
      const res: any = await masterApi.getAllLiningPriceForDownload();
      if (res.status === 'success') {
        const sjisData = Encoding.convert(res.payload.csv, { to: 'SJIS', from: 'UNICODE', type: 'arraybuffer' });
        const uint8Array = new Uint8Array(sjisData);
        const blob = new Blob([uint8Array], { type: 'text/csv;charset=shift-jis;' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = '裏地品番価格.csv';
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
            <TextField size="small" label="裏地品番" variant="standard" onChange={handleChange} />
          </Box>
          <Button variant="outlined" color="primary" startIcon={<SearchIcon />} onClick={handleSearch}>
            検索
          </Button>
        </Box>
        <Box className="flex">
          <Box className="flex flex-col items-end mr-3">
            <Button
              variant="outlined"
              onClick={handleDownload}
              sx={{ marginRight: '3px' }}
              startIcon={<FileDownloadIcon />}
            >
              ダウンロード
            </Button>
          </Box>
          <Box className="flex flex-col items-end">
            <CsvImport onDrop={onDrop} onDropRejected={onDropRejected} buttonText="データ更新" />
          </Box>
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
