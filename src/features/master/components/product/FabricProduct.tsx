import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, TextField, createTheme } from '@mui/material';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { jaJP } from '@mui/x-data-grid/locales';
import { ThemeProvider } from '@emotion/react';
import { useSelector } from 'react-redux';
import { readString } from 'react-papaparse';
import { FileRejection } from 'react-dropzone';
import SearchIcon from '@mui/icons-material/Search';
import Encoding from 'encoding-japanese';

import { CsvImport } from '../../../../components/ui/CsvImport';
import Loading from '../../../../components/ui/Loading';
import { Toast } from 'primereact/toast';
import { useToast } from '../../../../hooks/useToast';
import masterApi from '../../api/materApi';

const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', width: 90},
  {
    field: 'fabricProductNo',
    headerName: '生地品番',
    width: 200,
  },
];

const theme = createTheme(undefined, jaJP);

export const FabricProduct = () => {
  // const [open, setOpen] = useState(false);
  // const { toast, showMessage } = useToast();
  // const [items, setItems] = useState<any[]>([]);
  // const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  // const user = useSelector((state: any) => state.user.value);

  // useEffect(() => {
  //   const getAllFabricProductNos = async () => {
  //     setOpen(true);
  //     try {
  //       const res: any = await masterApi.getAllFabricProductNos();
  //       if (res.status === 'success') {
  //         setItems(res.payload.productNos);
  //       } else {
  //         showMessage('エラー', 'error', res.message);
  //       }
  //     } catch (error: any) {
  //       showMessage('エラー', 'error', error);
  //     } finally {
  //       setOpen(false);
  //     }
  //   };
  //   getAllFabricProductNos();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const handleFileRead = (binaryStr: any) => {
  //   readString(binaryStr, {
  //     worker: true,
  //     complete: async (results: any) => {
  //       // バリデーションの処理
  //       if (results.data.length === 0 || results.data.length === 1) {
  //         showMessage('エラー', 'error', `ヘッダ行もしくはデータ行がありません`);
  //         return false;
  //       }

  //       if (results.data[0][0] !== '生地品番') {
  //         showMessage('エラー', 'error', `ヘッダ行を「生地品番」にしてください`);
  //         return false;
  //       }

  //       for (let i = 1; i < results.data.length; i++) {
  //         if (!results.data[i][0]) {
  //           showMessage('エラー', 'error', `${i + 1}行目の品番が入力されていません`);
  //           return false;
  //         }
  //       }

  //       // オブジェクトに格納し、APIに渡す
  //       try {
  //         // スピナーを表示する
  //         setOpen(true);

  //         const res: any = await masterApi.upsertFabricStocks({
  //           userId: user.userId,
  //           productNos: results.data.slice(1),
  //         });
  //         if (res.status === 'success') {
  //           showMessage('登録しました');
  //         } else {
  //           showMessage('エラー', 'error', res.message);
  //         }
  //       } catch (error: any) {
  //         showMessage('エラー', 'error', error);
  //       } finally {
  //         setOpen(false);
  //       }
  //     },
  //   });
  // };

  // // CSVをドロップしたときに呼び出される処理
  // const onDrop = useCallback((acceptedFiles: any) => {
  //   acceptedFiles.forEach((file: any) => {
  //     const reader = new FileReader();
  //     reader.onabort = () => console.log('file reading was aborted');
  //     reader.onerror = () => console.log('file reading has failed');
  //     reader.onload = (e: any) => {
  //       const binaryStr = e.target.result;
  //       console.log(binaryStr);
  //       const codes = new Uint8Array(binaryStr);
  //       const encoding = Encoding.detect(codes);
  //       if (typeof binaryStr === 'string') {
  //         handleFileRead(binaryStr.replace(/\n$/, ''));
  //       }
  //     };
  //     reader.readAsText(file);
  //   });
  // }, []);

  // const onDropRejected = useCallback((rejectedFiles: FileRejection[]) => {
  //   const message: string[] = [];
  //   let manyFilesError = false;
  //   rejectedFiles.forEach(({ file, errors }) => {
  //     errors.forEach(({ code }) => {
  //       switch (code) {
  //         // case 'file-too-large':
  //         //   message.push(
  //         //     `${file.name} のファイルサイズが大きすぎます。50MB以下のファイルをアップロードしてください。`
  //         //   );
  //         //   break;
  //         case 'file-invalid-type':
  //           message.push(`${file.name} のファイル形式が許可されていません。許可されているファイル形式は csv です。`);
  //           break;
  //         case 'too-many-files':
  //           if (!manyFilesError) {
  //             message.push(`ファイルは1つまでしかアップロードできません。`);
  //             manyFilesError = true;
  //           }
  //           break;
  //         default:
  //           break;
  //       }
  //     });
  //   });
  //   0 < message.length && showMessage('エラー', 'error', message.join('\n'));
  // }, []);

  // return (
  //   <>
  //     <Box className="mb-5">
  //       <CsvImport onDrop={onDrop} onDropRejected={onDropRejected} buttonText="生地品番データ" />
  //     </Box>
  //     <Box className="w-full">
  //       <ThemeProvider theme={theme}>
  //         <DataGrid
  //           rows={items}
  //           columns={columns}
  //           disableRowSelectionOnClick
  //           autoHeight
  //           onRowSelectionModelChange={(newRowSelectionModel) => {
  //             setRowSelectionModel(newRowSelectionModel);
  //           }}
  //           rowSelectionModel={rowSelectionModel}
  //         />
  //       </ThemeProvider>
  //     </Box>
  //     <Loading open={open} />
  //     <Toast ref={toast} position="center" />
  //   </>
  // );
  return (
    <div>FabricProduct</div>
  )
};
