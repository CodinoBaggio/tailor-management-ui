/* eslint-disable no-irregular-whitespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import authApi from '../api/authApi';

const authUtils = {
  isAuthenticated: async () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const res: any = await authApi.verifyToken({
        token,
      });
      return res.status === 'success' ? res.payload.user : false;
    } catch (error) {
      return false;
    }
  },
};

export default authUtils;
