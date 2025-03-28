import { FC, useCallback, useEffect, useState } from 'react';
import { Box, Button, createTheme, TextField } from '@mui/material';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { jaJP } from '@mui/x-data-grid/locales';
import { ThemeProvider } from '@emotion/react';
import { useSelector } from 'react-redux';
import { readString } from 'react-papaparse';
import { FileRejection } from 'react-dropzone';
import Encoding from 'encoding-japanese';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SearchIcon from '@mui/icons-material/Search';
import { AxiosResponse } from 'axios';

import { CsvImport } from '../../../../components/ui/CsvImport';
import Loading from '../../../../components/ui/Loading';
import { Toast } from 'primereact/toast';
import { useToast } from '../../../../hooks/useToast';
import masterApi from '../../api/materApi';

type Props = {
  searchTextFieldLabel: string;
  columns: GridColDef[];
  getDataApi: () => Promise<AxiosResponse<any, any>>;
  getDataApiByCondition: (searchPattern: any) => Promise<AxiosResponse<any, any>>;
  referenceOnly?: boolean;
  getDataApiForDownload?: () => Promise<AxiosResponse<any, any>>;
  downloadFileName?: string;
  upsertApi?: (params: any) => Promise<AxiosResponse<any, any>>;
  validateHeader?: (header: string[], columnCount: number) => string | null;
  validateRows?: (row: object[][]) => string | null;
  uploadButtonText?: string;
  downloadButtonText?: string;
};

const theme = createTheme(undefined, jaJP);

export const Maintenance: FC<Props> = (props) => {
  const {
    columns,
    getDataApi,
    getDataApiByCondition,
    referenceOnly = false,
    getDataApiForDownload,
    downloadFileName,
    upsertApi,
    searchTextFieldLabel,
    validateHeader,
    validateRows,
    uploadButtonText = '在庫データ',
    downloadButtonText = 'ダウンロード',
  } = props;
  const [open, setOpen] = useState(false);
  const { toast, showMessage } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  const user = useSelector((state: any) => state.user.value);
  const [productNo, setProductNo] = useState<string>();

  const getData = useCallback(async () => {
    setOpen(true);
    try {
      const res: any = await getDataApi();
      if (res.status === 'success') {
        setItems(res.payload.items);
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

  const handleFileRead = (binaryStr: any) => {
    readString(binaryStr, {
      worker: true,
      complete: async (results: any) => {
        // オブジェクトに格納し、APIに渡す
        try {
          // バリデーション
          if (results.data.length === 0 || results.data.length === 1) {
            showMessage('エラー', 'error', `ヘッダ行もしくはデータ行がありません`);
            return false;
          }
  
          // ヘッダーのバリデーション
          if (validateHeader) {
            const errorHeaderMessage = validateHeader(results.data[0], 2);
            if (errorHeaderMessage) {
              showMessage('エラー', 'error', errorHeaderMessage);
              return false;
            }
          }
  
          // データ行のバリデーション
          if (validateRows) {
            const errorRowMessage = validateRows(results.data);
            if (errorRowMessage) {
              showMessage('エラー', 'error', errorRowMessage);
              return;
            }
          }
  
          if (upsertApi) {
            const res: any = await upsertApi({ userId: user.userId, data: results.data.slice(1) });
            if (res.status === 'success') {
              setProductNo('');
              getData();
              showMessage('登録しました');
            } else {
              showMessage('エラー', 'error', res.message);
            }
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
    // ドロップ時にすぐにスピナーを表示
    setOpen(true);
    
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = async (e: any) => {
        const binaryStr = e.target.result;
        const codes = new Uint8Array(binaryStr);

        let text;

        try {
          // まずSJISとして試行
          text = Encoding.convert(codes, {
            to: 'UNICODE',
            from: 'SJIS',
            type: 'string',
          });
        } catch (error) {
          // SJISで失敗した場合はUTF-8として試行
          text = Encoding.convert(codes, {
            to: 'UNICODE',
            from: 'UTF8',
            type: 'string',
          });
        }

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
      if (getDataApiForDownload) {
        const res: any = await getDataApiForDownload();
        if (res.status === 'success') {
          const sjisData = Encoding.convert(res.payload.csv, { to: 'SJIS', from: 'UNICODE', type: 'arraybuffer' });
          const uint8Array = new Uint8Array(sjisData);
          const blob = new Blob([uint8Array], { type: 'text/csv;charset=shift-jis;' });
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = downloadFileName ?? '';
          a.click();
        } else {
          showMessage('エラー', 'error', res.message);
        }
      }
    } catch (error: any) {
      showMessage('エラー', 'error', error);
    } finally {
      setOpen(false);
    }
  };

  const handleChange = async (event: any) => {
    setProductNo(event.target.value);
  };

  const handleSearch = async () => {
    setOpen(true);
    try {
      const res: any = await getDataApiByCondition(productNo || '');
      if (res.status === 'success') {
        setItems(res.payload.items);
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
            <TextField size="small" label={searchTextFieldLabel} variant="standard" onChange={handleChange} value={productNo} />
          </Box>
          <Button variant="outlined" color="primary" startIcon={<SearchIcon />} onClick={handleSearch}>
            検索
          </Button>
        </Box>
        {referenceOnly ? null : (
          <Box className="flex">
            <Box className="flex flex-col items-end mr-3">
              <Button
                variant="outlined"
                onClick={handleDownload}
                sx={{ marginRight: '3px' }}
                startIcon={<FileDownloadIcon />}
              >
                {downloadButtonText}
              </Button>
            </Box>
            <Box className="flex flex-col items-end">
              <CsvImport onDrop={onDrop} onDropRejected={onDropRejected} buttonText={uploadButtonText} />
            </Box>
          </Box>
        )}
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
