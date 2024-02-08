import axiosClient from '../../../api/axiosClient';

const adminApi = {
  getShops: (params: any) => axiosClient.post('/exec', params),
  getShop: (params: any) => axiosClient.post('/exec', params),
};

export default adminApi;
