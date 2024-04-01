import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const useGetFood = () => {
  const [food, setFood] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getFood = async () => {
      try {
        const res = await fetch('http://localhost:4500/api/menu');
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setFood(data);
        //console.log(data)
      } catch (error) {
        toast.error(error.message);
      }
    };
    getFood();
  }, [food]);

  const deleteFood = async (id) => {
    try {
      await fetch(`http://localhost:4500/api/deleteFood/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const foods = food.filter(item => item._id !== id);
      setFood(foods);
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  const uploadFood = async ({ name, price, about, category }) => {
    const success = handleErrors({ name, price, about, category });
    if (!success) return;

    try {
      const res = await fetch('http://localhost:4500/api/uploadFood', {
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
      'Doručak',
      'Hladna predjela',
      'Topla predjela',
      'Čorbe',
      'Paste i rižota',
      'Jela po porudžbini',
      'Roštilj',
      'Riba',
      'Obrok salate',
      'Dezert'
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

  const updateFood=async(id, updatedName, updatedAbout, updatedPrice)=>{
    try{
      await fetch(`http://localhost:4500/api/updateFood/${id}`,{
        method: "PUT",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ name: updatedName, about: updatedAbout, price: updatedPrice })
      })
      const foods=food.map(item=>item._id===id ? {...item,name:updatedName, about:updatedAbout, price:updatedPrice} : item);

      setFood(foods)
    }catch(error){
      setMessage(error.message)
    }
  }

  return { food, deleteFood, uploadFood, updateFood, message };
};

export default useGetFood;
