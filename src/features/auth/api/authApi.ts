// import axiosClient from '../../../api/axiosClient';
import axiosClientGCF from '../../../api/axiosClientGCF';

const authApi = {
  login: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'login',
      param: { loginId: params.loginId, password: params.password },
    }),
  // login: (params: any) => axiosClient.post('/exec', params),
  verifyToken: (params: any) =>
    axiosClientGCF.post('/TailorManagementApiGcf', {
      method: 'verifyToken',
      param: { token: params.token },
    }),
  // verifyToken: (params: any) => axiosClient.post('/exec', params),
};

export default authApi;
