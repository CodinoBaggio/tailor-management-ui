import axiosClient from '../../../api/axiosClient';

// interface AuthParams {
//   loginId: string;
//   password: string;
// }

const authApi = {
  login: (params: any) => axiosClient.post('/exec', params),
  verifyToken: (params: any) => axiosClient.post('/exec', params),
};

export default authApi;
