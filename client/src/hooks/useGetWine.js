import {useEffect,useState} from 'react'
import { toast } from 'react-toastify';

const useGetWine=()=>{
  const [wine,setWine]=useState([])
  const [message,setMessage]=useState('')

  useEffect(()=>{
    const getWIne=async()=>{
      try{
        const res=await fetch('http://localhost:4500/api/wine')
        const data=await res.json()
        if(data.error){
          throw new Error(data.error)
        }
        setWine(data)
      }catch(error){
        toast.error(error.message)
      }
    }
    getWIne()
  },[wine])
  
  const deleteWine = async (id) => {
    try {
      await fetch(`http://localhost:4500/api/deleteWine/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': "application/json"
        },
      });
      const updatedWine = wine.filter(item => item._id !== id);
      setWine(updatedWine);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const uploadWine = async ({ name, price, about, category }) => {
    const success = handleErrors({ name, price, about, category });
    if (!success) return;

    try {
      const res = await fetch('http://localhost:4500/api/uploadWine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, price, about, category })
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  function handleErrors({ name, price, about, category }) {
    const validCategories = [
      'Penušava vina',
      'Bela vina',
      'Rose',
      'Crvena vina',
      'Dezertna vina',
      'Otvorena vina',
    ];

    if (!validCategories.includes(category)) {
      setMessage('Ispravno unesite kategoriju');
      return false;
    }

    if (!name || !price || !category) {
      setMessage('Popunite sva obavezna polja');
      return false;
    }

    setMessage('Artikal uspesno dodat')
    return true;
   
  }

  const updateWine=async(id, updatedName, updatedAbout, updatedPrice)=>{
    try{
      await fetch(`http://localhost:4500/api/updateWine/${id}`,{
        method: "PUT",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ name: updatedName, about: updatedAbout, price: updatedPrice })
      })
      const wines=wine.map(item=>item._id===id ? {...item,name:updatedName, about:updatedAbout, price:updatedPrice} : item);

      setWine(wines)
    }catch(error){
      setMessage(error.message)
    }
  }

  return {wine,deleteWine,uploadWine,updateWine,message}
}

export default useGetWine