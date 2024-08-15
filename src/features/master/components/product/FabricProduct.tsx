import { GridColDef } from '@mui/x-data-grid';

import masterApi from '../../api/materApi';
import { Maintenance } from '../ui/Maintenance';

const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', width: 90},
  {
    field: 'fabricProductNo',
    headerName: '生地品番',
    width: 400,
  },
  {
    field: 'isDelete',
    headerName: '削除フラグ',
    width: 200,
  },
];

export const FabricProduct = () => {
  return (
    <Maintenance
      searchTextFieldLabel="生地品番"
      columns={columns}
      getDataApi={masterApi.getAllFabricProductNos}
      getDataApiForDownload={masterApi.getAllFabricProductNosForDownload}
      downloadFileName="生地品番.csv"
      getDataApiByCondition={(productNo: string) =>
        masterApi.getFabricProductNosByCondition({ searchPattern: productNo })
      }
      upsertApi={(params: { data: object[][] }) =>
        masterApi.upsertFabricProductNos({
          productNos: params.data,
        })
      }
      validateHeader={(header: string[]) => {
        if (header[0] !== '生地品番' || header[1] !== '削除フラグ' || header.length !== 2) {
          return 'ヘッダ行を「生地品番,削除フラグ」にしてください';
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
