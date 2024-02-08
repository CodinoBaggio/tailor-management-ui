import axiosClient from '../../../api/axiosClient';

const authApi = {
  login: (params: any) => axiosClient.post('/exec', params),
  verifyToken: (params: any) => axiosClient.post('/exec', params),
};

export default authApi;
