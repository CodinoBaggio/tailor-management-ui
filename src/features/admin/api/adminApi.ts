// import axiosClient from '../../../api/axiosClient';
import axiosClientGCF from '../../../api/axiosClientGCF';

const adminApi = {
  shop: {
    getShops: (params: any) =>
      axiosClientGCF.post('/TailorManagementApiGcf', {
        method: 'getShops',
        param: params,
      }),
    // getShops: (params: any) =>
    //   axiosClient.post('/exec', { endpoint: 'shops', endpointParams: params }),
    createShop: (params: any) =>
      axiosClientGCF.post('/TailorManagementApiGcf', {
        method: 'createShop',
        param: { shop: params.shop },
      }),
    // createShop: (params: any) =>
    //   axiosClient.post('/exec', {
    //     endpoint: 'create-shop',
    //     endpointParams: params,
    //   }),
    updateShop: (params: any) =>
      axiosClientGCF.post('/TailorManagementApiGcf', {
        method: 'updateShop',
        param: { shop: params.shop },
      }),
    // updateShop: (params: any) =>
    //   axiosClient.post('/exec', {
    //     endpoint: 'update-shop',
    //     endpointParams: params,
    //   }),
    deleteShop: (params: any) =>
      axiosClientGCF.post('/TailorManagementApiGcf', {
        method: 'deleteShop',
        param: { shopId: params.shopId },
      }),
    // deleteShop: (params: any) =>
    //   axiosClient.post('/exec', {
    //     endpoint: 'delete-shop',
    //     endpointParams: params,
    //   }),
  },
  user: {
    getUsers: (params: any) =>
      axiosClientGCF.post('/TailorManagementApiGcf', {
        method: 'getUsers',
        param: params,
      }),
    // getUsers: (params: any) =>
    //   axiosClient.post('/exec', { endpoint: 'users', endpointParams: params }),
    createUser: (params: any) =>
      axiosClientGCF.post('/TailorManagementApiGcf', {
        method: 'createUser',
        param: { user: params.user },
      }),
    // createUser: (params: any) =>
    //   axiosClient.post('/exec', {
    //     endpoint: 'create-user',
    //     endpointParams: params,
    //   }),
    updateUser: (params: any) =>
      axiosClientGCF.post('/TailorManagementApiGcf', {
        method: 'updateUser',
        param: { user: params.user },
      }),
    // updateUser: (params: any) =>
    //   axiosClient.post('/exec', {
    //     endpoint: 'update-user',
    //     endpointParams: params,
    //   }),
    deleteUser: (params: any) =>
      axiosClientGCF.post('/TailorManagementApiGcf', {
        method: 'deleteUser',
        param: { userId: params.userId },
      }),
    // deleteUser: (params: any) =>
    //   axiosClient.post('/exec', {
    //     endpoint: 'delete-user',
    //     endpointParams: params,
    //   }),
  },
};

export default adminApi;
