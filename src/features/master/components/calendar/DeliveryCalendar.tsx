import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Maintenance } from '../ui/Maintenance';
import masterApi from '../../api/materApi';

const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', width: 90},
  {
    field: 'dueFrom',
    headerName: '期間開始日',
    width: 200,
  },
  {
    field: 'dueTo',
    headerName: '期間終了日',
    width: 200,
  },
  {
    field: 'shipDate',
    headerName: '工場出荷日',
    width: 200,
  },
  {
    field: 'deliveryDate',
    headerName: '納品日',
    width: 200,
  },
];

export const DeliveryCalendar = () => {
  return (
    <Maintenance
      searchTextFieldLabel="期間内の日付"
      columns={columns}
      getDataApi={masterApi.getAllDeliveryCalendar}
      getDataApiForDownload={masterApi.getDeliveryCaledarTemplate}
      downloadFileName="納品日カレンダー.csv"
      getDataApiByCondition={(due: string) => masterApi.getDeliveryCalendarByDue({ searchPattern: due })}
      upsertApi={(params: { data: object[][] }) =>
        masterApi.upsertDeliveryCalendar({
          items: params.data,
        })
      }
      validateHeader={(header: string[]) => {
        if (
          header.length !== 4 ||
          header[0] !== '期間開始日' ||
          header[1] !== '期間終了日' ||
          header[2] !== '工場出荷日' ||
          header[3] !== '納品日'
        ) {
          return 'ヘッダ行を「期間開始日,期間終了日,工場出荷日,納品日」にしてください';
        }
        return null;
      }}
      validateRows={(rows: object[][]) => {
        for (let i = 1; i < rows.length; i++) {
          if (!rows[i][0] || !rows[i][1] || !rows[i][2] || !rows[i][3]) {
            return `${i + 1}行目の期間開始日、期間終了日、工場出荷日、納品日のいずれかが入力されていません`;
          }
        }
        return null;
      }}
      uploadButtonText="データ更新"
      downloadButtonText="雛形ダウンロード"
    />
  );
};
