import masterApi from '../../master/api/materApi';
import { ContainsJaket } from './orderUtil';

export const validateStock = async (productName: string, fabricProductNo: string, liningProductNo: string) => {
  // ジャケットを含むかどうか
  const containJaket = ContainsJaket(productName);

  // 生地と裏地の在庫ステータスチェック
  const fabricStockResult: any = await masterApi.validateFabricStock({ fabricProductNo });
  const liningStockResult: any = containJaket
    ? await masterApi.validateLiningStock({ liningProductNo })
    : { status: 'success', payload: { stockStatus: 'OK' } };
  if (fabricStockResult.status !== 'success' || liningStockResult.status !== 'success') return 'EXP';

  let stockStatus = '';
  if (fabricStockResult.payload.stockStatus === 'NON' || liningStockResult.payload.stockStatus === 'NON') {
    // どちらかが登録なし
    stockStatus = 'NON';
  } else if (fabricStockResult.payload.stockStatus === 'NG' || liningStockResult.payload.stockStatus === 'NG') {
    // どちらかが5m以下
    stockStatus = 'NG';
  } else if (
    fabricStockResult.payload.stockStatus === 'SELECT_OTHER' ||
    liningStockResult.payload.stockStatus === 'SELECT_OTHER'
  ) {
    // どちらかが10m以下
    stockStatus = 'SELECT_OTHER';
  } else if (fabricStockResult.payload.stockStatus === 'WARN' || liningStockResult.payload.stockStatus === 'WARN') {
    // どちらかが20m以下
    stockStatus = 'WARN';
  } else {
    stockStatus = 'OK';
  }
  const productType =
    fabricStockResult.payload.stockStatus === stockStatus && liningStockResult.payload.stockStatus === stockStatus
      ? '生地品番/裏地品番'
      : fabricStockResult.payload.stockStatus === stockStatus
      ? '生地品番'
      : '裏地品番';
  return { stockStatus, productType };
};
