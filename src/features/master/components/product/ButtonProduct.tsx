import { GridColDef } from '@mui/x-data-grid';

import masterApi from '../../api/materApi';
import { Maintenance } from '../ui/Maintenance';

const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', width: 90},
  {
    field: 'buttonProductNo',
    headerName: 'ボタン品番',
    width: 400,
  },
  {
    field: 'isDelete',
    headerName: '削除フラグ',
    width: 200,
  },
];

export const ButtonProduct = () => {
  return (
    <Maintenance
      searchTextFieldLabel="ボタン品番"
      columns={columns}
      getDataApi={masterApi.getAllButtons}
      getDataApiForDownload={masterApi.getAllButtonProductNosForDownload}
      downloadFileName="ボタン品番.csv"
      getDataApiByCondition={(productNo: string) => masterApi.getButtonByCondition({ searchPattern: productNo })}
      upsertApi={(params: { data: object[][] }) =>
        masterApi.upsertButtonProductNos({
          productNos: params.data,
        })
      }
      validateHeader={(header: string[]) => {
        if (header[0] !== 'ボタン品番' || header[1] !== '削除フラグ' || header.length !== 2) {
          return 'ヘッダ行を「ボタン品番,削除フラグ」にしてください';
        }
        return null;
      }}
      validateRows={(rows: object[][]) => {
        for (let i = 1; i < rows.length; i++) {
          if (!rows[i][0] || !rows[i][1]) {
            return `${i + 1}行目の品番または削除フラグが入力されていません`;
          }
        }
        return null;
      }}
      uploadButtonText="データ更新"
    />
  );
};
