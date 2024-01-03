import axios from 'axios';
// const getToken = () => localStorage.getItem('token');

const deployId =
// 本番
  // 'AKfycbzRvGGHE56Ju6-HhlWvXd-pXP_axvyou29jWXBxZyLfJwtahblNsZXkbxi2G77l2qqcCA';
// 開発
'AKfycbzRvGGHE56Ju6-HhlWvXd-pXP_axvyou29jWXBxZyLfJwtahblNsZXkbxi2G77l2qqcCA';

const BASE_URL = `https://script.google.com/macros/s/${deployId}`;

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

// APIを叩く前に前処理を行う
axiosClient.interceptors.request.use(async (config: any) => {
  // config.headers['Content-Type'] = 'text/plain';
  // // config.headers['authorization'] = `Bearer ${getToken()}`;
  // return config;
  const ret = {
    ...config,
    headers: {
      'Content-Type': 'text/plain',
      // authorization: `Bearer ${getToken()}`,
    },
  };
  return ret;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    throw error.response;
  }
);

export default axiosClient;
