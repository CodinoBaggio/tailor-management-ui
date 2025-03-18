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
    headerName: '仕様変更価格',
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

export const CustomFeaturePrice = () => {
  return (
    <Maintenance
      searchTextFieldLabel="仲間分け"
      columns={columns}
      getDataApi={masterApi.getAllCustomFeaturePrice}
      getDataApiForDownload={masterApi.getAllCustomFeaturePriceForDownload}
      downloadFileName="仕様変更価格.csv"
      getDataApiByCondition={(productNo: string) =>
        masterApi.getCustomFeaturePriceByCondition({ searchPattern: productNo })
      }
      upsertApi={(params: { data: object[][] }) =>
        masterApi.upsertCustomFeaturePrice({
          items: params.data,
        })
      }
      validateHeader={(header: string[]) => {
        if (
          header[0] !== '仲間分け' ||
          header[1] !== '仕立項目' ||
          header[2] !== '条件連番' ||
          header[3] !== '条件' ||
          header[4] !== '仕様変更価格' ||
          header[5] !== '原価' ||
          header[6] !== '削除フラグ' ||
          header.length !== 7
        ) {
          return 'ヘッダ行の形式を「仲間分け,仕立項目,条件連番,条件,仕様変更価格,原価,削除フラグ」にしてください';
        }
        return null;
      }}
      validateRows={(rows: any[][]) => {
        for (let i = 1; i < rows.length; i++) {
          if (!rows[i][0] || !rows[i][1] || !rows[i][2] || !rows[i][3] || !rows[i][4] || !rows[i][5] || !rows[i][6]) {
            return `${i + 1}行目の形式が正しくありません`;
          } else {
            // 仕様変更価格が数値かどうか?
            if (isNaN(rows[i][4])) {
              return `${i + 1}行目の仕様変更価格が数値ではありません`;
            }
            // 原価が数値かどうか?
            if (isNaN(rows[i][5])) {
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
