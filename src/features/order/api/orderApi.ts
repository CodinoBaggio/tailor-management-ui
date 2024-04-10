import axiosClient from '../../../api/axiosClient';
import axiosClientGCF from '../../../api/axiosClientGCF';

const orderApi = {
  getOrders: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getOrders',
      param: { roleId: params.roleId, shopId: params.shopId },
    }),
  // getOrders: (params: any) => axiosClient.post('/exec', { endpoint: 'orders', endpointParams: params }),
  getOrder: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getOrder',
      param: { orderId: params.orderId },
    }),
  // getOrder: (params: any) =>
  //   axiosClient.post('/exec', { endpoint: 'order', endpointParams: params }),
  getSelectPatterns: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getSelectPatterns',
      param: params,
    }),
  // getSelectPatterns: (params: any) =>
  //   axiosClient.post('/exec', {
  //     endpoint: 'select-pattern',
  //     endpointParams: params,
  //   }),
  getFabricProductNos: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getFabricProductNos',
      param: params,
    }),
  // getFabricProductNos: (params: any) =>
  //   axiosClient.post('/exec', {
  //     endpoint: 'fabric-product-nos',
  //     endpointParams: params,
  //   }),
  upsert: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'upsertOrder',
      param: { order: params.order },
    }),
  // upsert: (params: any) =>
  //   axiosClient.post('/exec', {
  //     endpoint: 'upsert-order',
  //     endpointParams: params,
  //   }),
  delete: (params: any) =>
    axiosClient.post('/exec', {
      endpoint: 'delete-order',
      endpointParams: params,
    }),
  getBodySize: (params: any) =>
    axiosClient.post('/exec', {
      endpoint: 'body-size',
      endpointParams: params,
    }),
  getLinings: (params: any) =>
    axiosClient.post('/exec', { endpoint: 'lining', endpointParams: params }),
  getPrice: (params: any) =>
    axiosClient.post('/exec', {
      endpoint: 'order-price',
      endpointParams: params,
    }),
};

export default orderApi;
