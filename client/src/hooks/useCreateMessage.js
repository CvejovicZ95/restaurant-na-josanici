import {useEffect, useState} from 'react'
import { toast } from 'react-toastify';

const useCreateMessage=()=>{
  const [message,setMessage]=useState('')
  const [allMessages,setAllMessages]=useState([])
  
  const createMessage=async({firstLastName,email,phoneNumber,question})=>{
    const success=handleErrors({firstLastName,email,phoneNumber,question});
    if(!success) return

    try{
      const res=await fetch('http://localhost:4500/api/createMessage',{
        method:"POST",
        headers:{'Content-Type':"application/json"},
        body:JSON.stringify({firstLastName,email,phoneNumber,question})
      })
      const data=await res.json()
      setMessage(data)
      if(data.error){
        throw new Error(data.error)
      }
      
    }catch(error){
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    const fetchAllMessages=async()=>{
      try{
        const res=await fetch('http://localhost:4500/api/allMessages');
        const data=await res.json()
        if(data.error){
          throw new Error(data.error)
        }
        setAllMessages(data)
      }catch(error){
        toast.error(error.message)
      }
    }
    fetchAllMessages()
  },[allMessages])


  const deleteMessage = async (id) => {
    try {
      const res = await fetch(`http://localhost:4500/api/deleteMessage/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ deleted: true })
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setAllMessages(prevMessages => prevMessages.filter(res => res._id === id ? { ...res, deleted: true } : res));

    } catch (error) {
      toast.error(error.message);
    }
  };

  return{message,createMessage,allMessages,deleteMessage}
}

export default useCreateMessage

function handleErrors({ firstLastName, email, phoneNumber, question }) {
  if (!firstLastName || !email || !phoneNumber || !question) {
    toast.error('Molimo popunite sva polja');
    return false;
  }
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailRegex.test(email)) {
     toast.error('Molimo unesite ispravan format e-pošte');
     return false;
   }
   const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
   if (!phoneRegex.test(phoneNumber)) {
     toast.error('Molimo unesite ispravan format broja telefona');
     return false;
   }
   if(firstLastName.length < 6){
    toast.error('Molimo unesite puno ime i prezime')
    return false;
   }
  return true;
}