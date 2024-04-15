import {useEffect,useState} from 'react'
import { toast } from 'react-toastify';
import { getWine, deleteWine, uploadWine, updateWine } from '../api/wineApi';

const useGetWine = () => {
  const [wine, setWine] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchWine = async () => {
      try {
        const data = await getWine(); 
        setWine(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchWine();
  }, [wine]);

  const deleteWineHandler = async (id) => {
    try {
      await deleteWine(id); 
      const updatedWine = wine.filter(item => item._id !== id);
      setWine(updatedWine);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const uploadWineHandler = async ({ name, price, about, category }) => {
    try {
      await uploadWine( name, price, about, category ); 
      const data = await getWine(); 
      setWine(data);
      setMessage('Artikal uspešno dodat');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateWineHandler = async (id, updatedName, updatedAbout, updatedPrice) => {
    try {
      await updateWine(id, updatedName, updatedAbout, updatedPrice);
      const updatedWine = wine.map(item => item._id === id ? { ...item, name: updatedName, about: updatedAbout, price: updatedPrice } : item);
      setWine(updatedWine);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { wine, deleteWineHandler, uploadWineHandler, updateWineHandler, message };
};

export { useGetWine };