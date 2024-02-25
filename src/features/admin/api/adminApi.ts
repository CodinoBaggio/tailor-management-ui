import axiosClient from '../../../api/axiosClient';

const adminApi = {
  shop: {
    getShops: (params: any) =>
      axiosClient.post('/exec', { endpoint: 'shops', endpointParams: params }),
    createShop: (params: any) =>
      axiosClient.post('/exec', {
        endpoint: 'create-shop',
        endpointParams: params,
      }),
    updateShop: (params: any) =>
      axiosClient.post('/exec', {
        endpoint: 'update-shop',
        endpointParams: params,
      }),
    deleteShop: (params: any) =>
      axiosClient.post('/exec', {
        endpoint: 'delete-shop',
        endpointParams: params,
      }),
  },
  user: {
    getUsers: (params: any) =>
      axiosClient.post('/exec', { endpoint: 'users', endpointParams: params }),
    createUser: (params: any) =>
      axiosClient.post('/exec', {
        endpoint: 'create-user',
        endpointParams: params,
      }),
    updateUser: (params: any) =>
      axiosClient.post('/exec', {
        endpoint: 'update-user',
        endpointParams: params,
      }),
    deleteUser: (params: any) =>
      axiosClient.post('/exec', {
        endpoint: 'delete-user',
        endpointParams: params,
      }),
  },
};

export default adminApi;
