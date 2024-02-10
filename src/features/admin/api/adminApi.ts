import axiosClient from '../../../api/axiosClient';

const adminApi = {
  shop: {
    getShops: (params: any) => axiosClient.post('/exec', params),
    getShop: (params: any) => axiosClient.post('/exec', params),
    createShop: (params: any) => axiosClient.post('/exec', params),
    updateShop: (params: any) => axiosClient.post('/exec', params),
    deleteShop: (params: any) => axiosClient.post('/exec', params),
  },
};

export default adminApi;
