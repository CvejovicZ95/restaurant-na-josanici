import {toast} from 'react-toastify';
import { useAuthContext } from '../context/authContext';

const useLogin=()=>{
  const {setAuthUser}=useAuthContext()

  const login=async(username,password)=>{
    const success=handleErrors({username,password})
    if(!success) return

    try{
      const res=await fetch('http://localhost:4500/api/login',{
        method:"POST",
        headers:{'Content-Type':"application/json"},
        body:JSON.stringify({username,password})
      })

      const data=await res.json()
      if(data.error){
        if(data.error==='Pogresno korisnicko ime ili lozinka'){
          throw new Error('Pogresno korisnicko ime ili lozinka')
        }else{
          throw new Error(data.error)
        }
      }

      localStorage.setItem('josanica-admin',JSON.stringify(data))
      setAuthUser(data)
    }catch(error){
      toast.error(error.message)
    }
  }
  return {login}
}

export default useLogin


function handleErrors({username,password}){
  if(!username || !password){
    toast.error('Popunite potrebna polja')
    return false
  }
  return true
}