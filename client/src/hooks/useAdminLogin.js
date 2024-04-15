import {toast} from 'react-toastify';
import { useAuthContext } from '../context/authContext';
import { setCookie } from './useSetCookie';
import { loginUser } from '../api/adminApi.js';

export const useLogin = () => {
  const { login } = useAuthContext();

  const loginHandler = async (username, password) => {
    const success = handleErrors({ username, password });
    if (!success) return;

    try {
      const data = await loginUser(username, password); 
      login(data);
      setCookie('token', data.token, 30);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { loginHandler };
};

function handleErrors({ username, password }) {
  return !username || !password ? (toast.error('Popunite potrebna polja'), false) : true;
}