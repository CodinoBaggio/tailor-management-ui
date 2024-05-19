import axiosClientGCF from '../../../api/axiosClientGCF';

const invoiceApi = {
  getInvoices: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'getInvoices',
      param: {
        dateFrom: params.dateFrom,
        dateTo: params.dateTo,
      },
    }),
  createInvoiceData: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'createInvoiceData',
      param: {
        orderIds: params.orderIds,
      },
    }),
};

export default invoiceApi;
