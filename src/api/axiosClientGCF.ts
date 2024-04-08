import axios from 'axios';

const BASE_URL = 'https://asia-northeast2-river-vigil-698.cloudfunctions.net';

const axiosClientGCF = axios.create({
  baseURL: BASE_URL,
});

// // APIを叩く前に前処理を行う
// axiosClientGCF.interceptors.request.use(async (config: any) => {
//   // config.headers['Content-Type'] = 'text/plain';
//   // // config.headers['authorization'] = `Bearer ${getToken()}`;
//   // return config;
//   const ret = {
//     ...config,
//     headers: {
//       'Content-Type': 'text/plain',
//       // authorization: `Bearer ${getToken()}`,
//     },
//   };
//   return ret;
// });

axiosClientGCF.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    throw error.response;
  }
);

export default axiosClientGCF;
