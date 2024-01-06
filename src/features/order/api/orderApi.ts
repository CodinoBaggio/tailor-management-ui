import axiosClient from '../../../api/axiosClient';

const orderApi = {
  getOrders: (params: any) => axiosClient.post('/exec', params),
  getOrder: (params: any) => axiosClient.post('/exec', params),
  getOrderResources: (params: any) => axiosClient.post('/exec', params),
  create: (params: any) => axiosClient.post('/exec', params),
  update: (params: any) => axiosClient.post('/exec', params),
  delete: (params: any) => axiosClient.post('/exec', params),
};

export default orderApi;
