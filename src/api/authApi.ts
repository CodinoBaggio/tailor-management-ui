import axiosClient from './axiosClient';

// interface AuthParams {
//   loginId: string;
//   password: string;
// }

const authApi = {
  login: (params: any) => axiosClient.post('/exec', params),
  verifyToken: (params: any) => axiosClient.post('/exec', params),
};

export default authApi;
