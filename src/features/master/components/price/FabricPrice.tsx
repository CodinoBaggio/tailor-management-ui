import { GridColDef } from '@mui/x-data-grid';

import masterApi from '../../api/materApi';
import { Maintenance } from '../ui/Maintenance';

const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', width: 90},
  {
    field: 'shopNo',
    headerName: '顧客カテゴリ',
    width: 150,
  },
  {
    field: 'shopGroup',
    headerName: '仲間分け',
    width: 150,
  },
  {
    field: 'fabricProductNo',
    headerName: '生地品番',
    width: 200,
  },
  {
    field: 'productName',
    headerName: '品名',
    width: 100,
  },
  {
    field: 'fabricSize',
    headerName: '生地広さ',
    width: 100,
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
    width: 200,
  },
];

export const FabricPrice = () => {
  return (
    <Maintenance
      searchTextFieldLabel="生地品番"
      columns={columns}
      getDataApi={masterApi.getAllFabricPrice}
      getDataApiForDownload={masterApi.getAllFabricPriceForDownload}
      downloadFileName="生地品番価格.csv"
      getDataApiByCondition={(productNo: string) => masterApi.getFabricPriceByCondition({ searchPattern: productNo })}
      upsertApi={(params: { data: object[][] }) =>
        masterApi.upsertFabricPrice({
          items: params.data,
        })
      }
      validateHeader={(header: string[]) => {
        if (
          header[0] !== '顧客カテゴリ' ||
          header[1] !== '仲間分け' ||
          header[2] !== '生地品番' ||
          header[3] !== '品名' ||
          header[4] !== '生地広さ' ||
          header[5] !== '販売価格' ||
          header[6] !== '原価' ||
          header[7] !== '削除フラグ' ||
          header.length !== 8
        ) {
          return 'ヘッダ行の形式を「顧客カテゴリ,仲間分け,生地品番,品名,生地広さ,販売価格,原価,削除フラグ」にしてください';
        }
        return null;
      }}
      validateRows={(rows: any[][]) => {
        for (let i = 1; i < rows.length; i++) {
          if (
            !rows[i][0] ||
            !rows[i][1] ||
            !rows[i][2] ||
            !rows[i][3] ||
            // !rows[i][4] ||
            !rows[i][5] ||
            !rows[i][6] ||
            !rows[i][7]
          ) {
            return `${i + 1}行目の形式が正しくありません`;
          } else {
            // 販売価格が数値かどうか
            if (isNaN(rows[i][5])) {
              return `${i + 1}行目の販売価格が数値ではありません`;
            }
            // 原価が数値かどうか
            if (isNaN(rows[i][6])) {
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
