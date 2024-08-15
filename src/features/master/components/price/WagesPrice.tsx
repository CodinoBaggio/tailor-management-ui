import { GridColDef } from '@mui/x-data-grid';

import masterApi from '../../api/materApi';
import { Maintenance } from '../ui/Maintenance';

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
    field: 'wages',
    headerName: '工賃',
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

export const WagesPrice = () => {
  return (
    <Maintenance
      searchTextFieldLabel="品名"
      columns={columns}
      getDataApi={masterApi.getAllWagesPrice}
      getDataApiForDownload={masterApi.getAllWagesPriceForDownload}
      downloadFileName="工賃価格.csv"
      getDataApiByCondition={(productNo: string) => masterApi.getWagesPriceByCondition({ searchPattern: productNo })}
      upsertApi={(params: { data: object[][] }) =>
        masterApi.upsertWagesPrice({
          items: params.data,
        })
      }
      validateHeader={(header: string[]) => {
        if (
          header[0] !== '仲間分け' ||
          header[1] !== '品名' ||
          header[2] !== '工賃' ||
          header[3] !== '原価' ||
          header[4] !== '削除フラグ' ||
          header.length !== 5
        ) {
          return 'ヘッダ行の形式を「仲間分け,品名,工賃,原価,削除フラグ」にしてください';
        }
        return null;
      }}
      validateRows={(rows: any[][]) => {
        for (let i = 1; i < rows.length; i++) {
          if (!rows[i][0] || !rows[i][1] || !rows[i][2] || !rows[i][3] || !rows[i][4]) {
            return `${i + 1}行目の形式が正しくありません`;
          } else {
            // 販売価格が数値かどうか
            if (isNaN(rows[i][2])) {
              return `${i + 1}行目の販売価格が数値ではありません`;
            }
            // 原価が数値かどうか
            if (isNaN(rows[i][3])) {
              return `${i + 1}行目の原価が数値ではありません`;
            }
          }
        }
        return null;
      }}
      uploadButtonText="データ更新"
    />
  );
};
