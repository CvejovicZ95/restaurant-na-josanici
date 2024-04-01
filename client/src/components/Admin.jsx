import { useState } from "react";
import useLogin from '../hooks/useAdminLogin';
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


const Admin=()=>{

  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')

  const {login}=useLogin()

  const handleSubmit=async(e)=>{
    e.preventDefault()
    await login(username,password)
  }
  return(
    <div>
      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Korisnicko ime"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Lozinka"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button type="submit">Uloguj se</button>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default Admin