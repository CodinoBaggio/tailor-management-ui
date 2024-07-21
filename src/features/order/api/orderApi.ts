// import axiosClient from '../../../api/axiosClient';
import axiosClientGCF from '../../../api/axiosClientGCF';

const orderApi = {
  getOrders: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getOrders',
      param: {
        roleId: params.roleId,
        shopId: params.shopId,
        dateType: params.dateType,
        dateFrom: params.dateFrom,
        dateTo: params.dateTo,
        orderId: params.orderId,
        customerName: params.customerName,
        orderStatausType: params.orderStatausType,
      },
    }),
  getOrder: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getOrder',
      param: { orderId: params.orderId },
    }),
  getSelectPatterns: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getSelectPatterns',
      param: params,
    }),
  getFabricProductNos: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getFabricProductNos',
      param: params,
    }),
  upsert: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'upsertOrder',
      param: params,
    }),
  delete: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'deleteOrder',
      param: { orderId: params.orderId },
    }),
  getBodySize: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getBodySize',
      param: {
        jaketSelectPattern2: params.jaket.selectPattern2,
        jaketSelectPattern3: params.jaket.selectPattern3,
      },
    }),
  getLinings: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getLinings',
      param: {
        fabricProductNo: params.fabricProductNo,
        searchPattern: params.searchPattern,
      },
    }),
  getButtons: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getButtons',
      param: {
        fabricProductNo: params.fabricProductNo,
        searchPattern: params.searchPattern,
      },
    }),
  getPrice: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getPrice',
      param: params,
    }),
};

export default orderApi;
