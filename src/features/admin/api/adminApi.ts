// import axiosClient from '../../../api/axiosClient';
import axiosClientGCF from '../../../api/axiosClientGCF';

const adminApi = {
  shop: {
    getShops: (params: any) =>
      axiosClientGCF.post('/TailorManagementApiGcf', {
        method: 'getShops',
        param: params,
      }),
    createShop: (params: any) =>
      axiosClientGCF.post('/TailorManagementApiGcf', {
        method: 'createShop',
        param: { shop: params.shop },
      }),
    updateShop: (params: any) =>
      axiosClientGCF.post('/TailorManagementApiGcf', {
        method: 'updateShop',
        param: { shop: params.shop },
      }),
    deleteShop: (params: any) =>
      axiosClientGCF.post('/TailorManagementApiGcf', {
        method: 'deleteShop',
        param: { shopId: params.shopId },
      }),
  },
  user: {
    getUsers: (params: any) =>
      axiosClientGCF.post('/TailorManagementApiGcf', {
        method: 'getUsers',
        param: params,
      }),
    createUser: (params: any) =>
      axiosClientGCF.post('/TailorManagementApiGcf', {
        method: 'createUser',
        param: { user: params.user },
      }),
    updateUser: (params: any) =>
      axiosClientGCF.post('/TailorManagementApiGcf', {
        method: 'updateUser',
        param: { user: params.user },
      }),
    deleteUser: (params: any) =>
      axiosClientGCF.post('/TailorManagementApiGcf', {
        method: 'deleteUser',
        param: { userId: params.userId },
      }),
  },
};

export default adminApi;
