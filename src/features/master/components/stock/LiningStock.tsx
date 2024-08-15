import { GridColDef } from '@mui/x-data-grid';

import masterApi from '../../api/materApi';
import { Maintenance } from '../ui/Maintenance';

const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', width: 90},
  {
    field: 'liningProductNo',
    headerName: '裏地品番',
    width: 200,
  },
  {
    field: 'stock',
    headerName: '在庫量',
    type: 'number',
    width: 200,
  },
  {
    field: 'importDateTime',
    headerName: 'データ取込日時',
    valueGetter: (value) => {
      return new Date(value);
    },
    type: 'dateTime',
    width: 200,
  },
];

export const LiningStock = () => {
  return (
    <Maintenance
      searchTextFieldLabel="裏地品番"
      columns={columns}
      getDataApi={masterApi.getAllLiningStocks}
      getDataApiForDownload={masterApi.getLiningStocksForDownload}
      downloadFileName="裏地在庫.csv"
      getDataApiByCondition={(productNo: string) => masterApi.getLiningStocks({ searchPattern: productNo })}
      upsertApi={(params: { userId: string; data: object[][] }) =>
        masterApi.upsertLiningStocks({
          userId: params.userId,
          stocks: params.data,
        })
      }
      validateHeader={(header: string[]) => {
        if (header[0] !== '裏地品番' || header[1] !== '在庫量' || header.length !== 2) {
          return 'ヘッダ行の形式を「裏地品番,在庫量」にしてください';
        }
        return null;
      }}
      validateRows={(rows: any[][]) => {
        for (let i = 1; i < rows.length; i++) {
          if (!rows[i][0] || !rows[i][1]) {
            return `${i + 1}行目の品番もしくは在庫量が入力されていません`;
          } else {
            // 在庫量が数値かどうか
            if (isNaN(rows[i][1])) {
              return `${i + 1}行目の在庫量が数値ではありません`;
            }
          }
        }
        return null;
      }}
      uploadButtonText="データ更新"
    />
  );
};
