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

export const CustomFeaturePrice = () => {
  return (
    <Maintenance
      searchTextFieldLabel="仲間分け"
      columns={columns}
      getDataApi={masterApi.getAllCustomFeaturePrice}
      getDataApiByCondition={(productNo: string) =>
        masterApi.getCustomFeaturePriceByCondition({ searchPattern: productNo })
      }
      referenceOnly={true}
    />
  );
};
