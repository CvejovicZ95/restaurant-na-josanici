import {Header} from "../Layout/Header/Header.jsx"
import {Footer} from "../Layout/Footer/Footer.jsx"
import {useGetFood} from '../../hooks/useGetFood';
import { useState, useEffect } from 'react';

import { useAuthContext } from "../../context/authContext";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./MenuAndWine.css";

export const Menu = () => {
  const {authUser}=useAuthContext()

  const { food,deleteFoodHandler,uploadFoodHandler,updateFoodHandler,message } = useGetFood();
  
  const [loaded, setLoaded] = useState(false);
  const [completed,setCompleted]=useState(false)

  const [updatedName, setUpdatedName] = useState('');
  const [updatedAbout, setUpdatedAbout] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);
  // eslint-disable-next-line
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const [inputs,setInputs]=useState({
    name:'',
    price:'',
    about:'',
    category:''
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadFoodHandler(inputs);
    setCompleted(true);
  };
  
  useEffect(() => {
    if (completed) {
      setInputs({
        name:'',
        about:'',
        price:'',
        category:''
      });
    }
  }, [completed]);

  const handleUpdate = (item) => {
    setSelectedFood(item);
    setUpdatedName(item.name);
    setUpdatedAbout(item.about);
    setUpdatedPrice(item.price);
  };

  const handleSaveUpdate=async(id)=>{
    try{
      await updateFoodHandler(id, updatedName, updatedAbout, updatedPrice)
      setSelectedFood(null)
      setIsUpdating(false)
    }catch(error){
      toast.error(error.message)
    }
  }

 
  const handleDelete=async(id)=>{
    const alert=window.confirm('Jeste sigurno da zelite da izbrisete artikal?')
    if(alert){
      try{
        await deleteFoodHandler(id)
      }catch(error){
        toast.error(error.message)
      }
    }
  }

  return (
    <div>
      <Header />
      <div className={`menu ${loaded ? 'fade-in' : ''}`}>
        <div className="menu-grid">
          <img src="images/pasta.png" alt="Food" className="food-image-left" />
          <div className="food-list">
            {authUser && 
              <div>
                <form onSubmit={handleSubmit}>
                  <input
                    type='text'
                    placeholder='Naziv artikla'
                    value={inputs.name}
                    onChange={(e)=>setInputs({...inputs,name:e.target.value})}
                  />
                  <input
                    type='text'
                    placeholder='Opis'
                    value={inputs.about}
                    onChange={(e)=>setInputs({...inputs,about:e.target.value})}
                  />
                  <input
                    type='text'
                    placeholder='Cena'
                    value={inputs.price}
                    onChange={(e)=>setInputs({...inputs,price:e.target.value})}
                  />
                  <input
                    type='text'
                    placeholder='Kategorija'
                    value={inputs.category}
                    onChange={(e)=>setInputs({...inputs,category:e.target.value})}
                  />
                  <button style={{backgroundColor:'green'}} className='admin-button' type='submit'>Dodaj artikal</button>
                  <p>{message}</p>
                </form>
              </div>
            }
            <h1>Menu</h1>
            {Object.keys(food).map(category => (
              <div key={category}>
                <h2 className='food-category'>{category}</h2>
                {food[category].map(item => (
                  !item.deleted && (
                  <div key={item._id}
                       className='single-food'>
                    <div className='food-name-price'>
                      <span className='food-name'>{item.name}</span>
                      <label className='food-price'>{item.price}</label>
                    </div>
                      <p className='about-food'>{item.about}</p>
                    {authUser && 
                    <div>
                      <button style={{backgroundColor:'blue'}} className='admin-button' onClick={() => handleUpdate(item)}>Promeni</button>

                      <button style={{backgroundColor:'red'}} className='admin-button' onClick={() => handleDelete(item._id)}>Obriši</button>
                    </div>
                      }

                      {selectedFood && selectedFood._id === item._id && (
                      <div className='update-div'> 
                        <input 
                          className='update-input' 
                          type="text" 
                          value={updatedName} 
                          onChange={e => setUpdatedName(e.target.value)} 
                          placeholder='Naziv artikla'
                          />
                        <textarea 
                          className='update-area' 
                          value={updatedAbout} 
                          onChange={e => setUpdatedAbout(e.target.value)}
                          placeholder='Opis' 
                        />
                        <input 
                          className='update-input' 
                          type="text" 
                          value={updatedPrice} 
                          onChange={e => setUpdatedPrice(e.target.value)}
                          placeholder='Cena' 
                        />
                        <button style={{backgroundColor:'green'}} className='admin-button' onClick={() => handleSaveUpdate(item._id)}>Save</button>
                      </div>
                    )}


                  </div>
                  )
                ))}
              </div>
            ))}
          </div>
          <img src="images/beef.png" alt="Food" className="food-image-right" />
        </div>
      </div>
      <Footer />
    </div>
  );
};