import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getFood, deleteFood, uploadFood, updateFood } from '../api/menuApi';

const useGetFood = () => {
  const [food, setFood] = useState([]);
  // eslint-disable-next-line
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const data = await getFood();
        setFood(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchFood();
  }, [food]);

  const deleteFoodHandler = async (id) => {
    try {
      await deleteFood(id); 
      const updatedFood = food.filter(item => item._id !== id);
      setFood(updatedFood);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const uploadFoodHandler = async ({ name, price, about, category }) => {
    try {
      await uploadFood( name, price, about, category ); 
      const data = await getFood();
      setFood(data);
      setMessage('Artikal uspešno dodat');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateFoodHandler = async (id, updatedName, updatedAbout, updatedPrice) => {
    try {
      await updateFood(id, updatedName, updatedAbout, updatedPrice);
      const updatedFood = food.map(item => item._id === id ? { ...item, name: updatedName, about: updatedAbout, price: updatedPrice } : item);
      setFood(updatedFood);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { food, deleteFoodHandler, uploadFoodHandler, updateFoodHandler, message };
};

export { useGetFood };
