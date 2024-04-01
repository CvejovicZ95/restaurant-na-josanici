import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from '../context/authContext';

const useLogout=()=>{
  const {setAuthUser}=useAuthContext()

  const logout=async()=>{
    try{
      const res=await fetch('http://localhost:4500/api/logout',{
        method:'POST',
        headers:{'Content-Type':"application/json"},
      })
      const data=await res.json()
      if(data.error){
        throw new Error(data.error)
      }
      localStorage.removeItem('josanica-admin')
      setAuthUser(null)
    }catch(error){
      toast.error(error.mesasge)
    }
  }
  return {logout}
}

export default useLogout
