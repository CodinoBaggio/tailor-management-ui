import axiosClient from '../../../api/axiosClient';

const orderApi = {
  getOrders: (params: any) => axiosClient.post('/exec', { endpoint: 'orders', endpointParams: params }),
  getOrder: (params: any) => axiosClient.post('/exec', { endpoint: 'order', endpointParams: params }),
  getSelectPatterns: (params: any) =>
    axiosClient.post('/exec', {
      endpoint: 'select-pattern',
      endpointParams: params,
    }),
  getFabricProductNos: (params: any) =>
    axiosClient.post('/exec', {
      endpoint: 'fabric-product-nos',
      endpointParams: params,
    }),
  upsert: (params: any) =>
    axiosClient.post('/exec', {
      endpoint: 'upsert-order',
      endpointParams: params,
    }),
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
  getLinings: (params: any) => axiosClient.post('/exec', { endpoint: 'lining', endpointParams: params }),
  getPrice: (params: any) => axiosClient.post('/exec', { endpoint: 'order-price', endpointParams: params }),
};

export default orderApi;
