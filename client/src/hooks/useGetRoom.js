import {useEffect,useState} from 'react'
import { toast } from 'react-toastify';

const useGetRoom=()=>{
  const [rooms,setRooms]=useState([])

  useEffect(()=>{
    const getRooms=async()=>{
      try{
        const res=await fetch('http://localhost:4500/api/allRooms')
        const data=await res.json()
        if(data.error){
          throw new Error(data.error)
        }
        setRooms(data)
      }catch(error){
        toast.error(error.message)
      }
    }
    getRooms()
  },[])

  const updateRoom=async(id,updatedName,updatedAbout,updatedPrice,updatedInfo)=>{
    try{
      await fetch(`http://localhost:4500/api/updateRoom/${id}`,{
        method: "PUT",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ name: updatedName, about: updatedAbout, price: updatedPrice,info:updatedInfo }) 
      })
      const updatedRooms=rooms.map(item=>item._id===id ? {...item,name:updatedName, about:updatedAbout, price:updatedPrice, info:updatedInfo} : item);

      setRooms(updatedRooms)
    }catch(error){
      toast.error(error.message)
    }
  }

  return {rooms,updateRoom}
}

export default useGetRoom