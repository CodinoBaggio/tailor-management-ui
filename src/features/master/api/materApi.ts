import axiosClientGCF from '../../../api/axiosClientGCF';

const masterApi = {
  getFabricStocks: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getFabricStocks',
      param: params,
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
};

export default masterApi;
