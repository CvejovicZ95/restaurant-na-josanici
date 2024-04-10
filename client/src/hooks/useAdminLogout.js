import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from '../context/authContext';
import { logoutUser } from '../api/adminApi';

const useLogout = () => {
  const { logout } = useAuthContext();

  const logoutHandler = async () => {
    try {
      await logoutUser(); 
      logout();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { logoutHandler };
};

export { useLogout };
