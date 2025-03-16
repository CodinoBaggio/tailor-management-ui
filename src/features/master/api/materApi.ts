import axiosClientGCF from '../../../api/axiosClientGCF';

const masterApi = {
  getAllFablicStocks: () =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getAllFablicStocks',
      param: {},
    }),
  getFabricStocks: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getFabricStocks',
      param: params,
    }),
  getAllLiningStocks: () =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getAllLiningStocks',
      param: {},
    }),
  getLiningStocks: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getLiningStocks',
      param: params,
    }),
  upsertFabricStocks: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'upsertFabricStocks',
      param: params,
    }),
  upsertLiningStocks: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'upsertLiningStocks',
      param: params,
    }),
  validateFabricStock: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'validateFabricStock',
      param: params,
    }),
  validateLiningStock: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'validateLiningStock',
      param: params,
    }),
  getAllFabricProductNos: () =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getAllFabricProductNos',
      param: {},
    }),
  getAllLinings: () =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getAllLinings',
      param: {},
    }),
  getAllButtons: () =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getAllButtons',
      param: {},
    }),
  upsertFabricProductNos: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'upsertFabricProductNos',
      param: params,
    }),
  upsertLiningProductNos: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'upsertLiningProductNos',
      param: params,
    }),
  upsertButtonProductNos: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'upsertButtonProductNos',
      param: params,
    }),
  getAllFabricPrice: () =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getAllFabricPrice',
      param: {},
    }),
  getAllFabricPriceForDownload: () =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getAllFabricPriceForDownload',
      param: {},
    }),
  getFabricPriceByCondition: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getFabricPriceByCondition',
      param: params,
    }),
  upsertFabricPrice: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'upsertFabricPrice',
      param: params,
    }),
  getAllLiningPrice: () =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getAllLiningPrice',
      param: {},
    }),
  getAllLiningPriceForDownload: () =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getAllLiningPriceForDownload',
      param: {},
    }),
  getLiningPriceByCondition: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getLiningPriceByCondition',
      param: params,
    }),
  upsertLiningPrice: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'upsertLiningPrice',
      param: params,
    }),
  getAllButtonPrice: () =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getAllButtonPrice',
      param: {},
    }),
  getAllButtonPriceForDownload: () =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getAllButtonPriceForDownload',
      param: {},
    }),
  getButtonPriceByCondition: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getButtonPriceByCondition',
      param: params,
    }),
  upsertButtonPrice: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'upsertButtonPrice',
      param: params,
    }),
  getAllWagesPrice: () =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getAllWagesPrice',
      param: {},
    }),
  getAllWagesPriceForDownload: () =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getAllWagesPriceForDownload',
      param: {},
    }),
  getWagesPriceByCondition: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getWagesPriceByCondition',
      param: params,
    }),
  upsertWagesPrice: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'upsertWagesPrice',
      param: params,
    }),
  getAllCustomFeaturePrice: () =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getAllCustomFeaturePrice',
      param: {},
    }),
  getAllCustomFeaturePriceForDownload: () =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getAllCustomFeaturePriceForDownload',
      param: {},
    }),
  getCustomFeaturePriceByCondition: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getCustomFeaturePriceByCondition',
      param: params,
    }),
  upsertCustomFeaturePrice: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'upsertCustomFeaturePrice',
      param: params,
    }),
  includesUnusableCharacter: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'includesUnusableCharacter',
      param: params,
    }),
  getFablicStocksForDownload: () =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getFablicStocksForDownload',
      param: {},
    }),
  getLiningStocksForDownload: () =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getLiningStocksForDownload',
      param: {},
    }),
  getAllFabricProductNosForDownload: () =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getAllFabricProductNosForDownload',
      param: {},
    }),
  getAllLiningProductNosForDownload: () =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getAllLiningProductNosForDownload',
      param: {},
    }),
  getAllButtonProductNosForDownload: () =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getAllButtonProductNosForDownload',
      param: {},
    }),
  getFabricProductNosByCondition: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getFabricProductNosByCondition',
      param: params,
    }),
  getLiningByCondition: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getLiningByCondition',
      param: params,
    }),
  getButtonByCondition: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getButtonByCondition',
      param: params,
    }),
  getAllDeliveryCalendar: () =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getAllDeliveryCalendar',
      param: {},
    }),
  getDeliveryCaledarTemplate: () =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getDeliveryCaledarTemplate',
      param: {},
    }),
  getDeliveryCalendarByDue: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getDeliveryCalendarByDue',
      param: params,
    }),
  upsertDeliveryCalendar: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'upsertDeliveryCalendar',
      param: params,
    }),
  deleteDeliveryCalendar: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'deleteDeliveryCalendar',
      param: params,
    }),
};

export default masterApi;
