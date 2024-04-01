import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header"
import Footer from "./Footer"
import scrollToTop from "../hooks/useScrollToTop";

import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaWifi } from "react-icons/fa";
import { FaParking } from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useGetRoom from "../hooks/useGetRoom";

import { useAuthContext } from '../context/authContext';

const Rooms=()=>{
  const {authUser}=useAuthContext()

  const {rooms,updateRoom}=useGetRoom()

  const reviews = ["All was good! Comfortable bed, warm room and hot water.", "Sve je bilo savrseno","Odlična lokacija, dobar smeštaj, ukusni obroci…","Прекрасное расположение, в центре. Очень чисто. Доброжелательный персонал . Аквапарк и оздоровительный комплекс с термальными водами располагается в 100м . Замечательный ресторан","Veoma ljubazni i gostoprimlivi domaćini sa izuzetnim restoranom i odličnom hranom"];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const nextReview = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };


  const [updatedName, setUpdatedName] = useState('');
  const [updatedAbout, setUpdatedAbout] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [updatedInfo, setUpdatedInfo] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);
  // eslint-disable-next-line
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = (item) => {
    setSelectedRoom(item);
    setUpdatedName(item.name);
    setUpdatedAbout(item.about);
    setUpdatedPrice(item.price);
    setUpdatedInfo(item.info)
  };

  const handleSaveUpdate = async (id) => {
    try {
      await updateRoom(id, updatedName, updatedAbout, updatedPrice, updatedInfo);
      setSelectedRoom(null); 
      setIsUpdating(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return(
    <>
    <Header/>
    <div className="rooms-page">
      <h1>Sobe na Jošanici</h1>
      <div className="rooms-container">
        {rooms && rooms.length > 0 ? (
          rooms.map((room) => (
              <div key={room._id} className="room">
                <img src={room.imagePath} alt={`room`} width="400px" />
                <div className="overlay-text">Od {room.price}€ po noći</div>
                <p>{room.name}</p>
                <div className="reserve-button">
                  <span>({room.info})</span>
                  <span>{room.price}€/noć</span>
                  <Link to={`/reservation/${room._id}`} onClick={scrollToTop}><button>Rezerviši sobu</button></Link>
                </div>
                {authUser && 
                  <div>
                    <button style={{backgroundColor:'blue'}} className="admin-button" onClick={()=>handleUpdate(room)} >Promeni</button>
                  </div>
                }

                    {selectedRoom && selectedRoom._id === room._id && (
                      <div className='update-div-room'> 
                        <input 
                          className='update-input' 
                          type="text" 
                          value={updatedName} 
                          onChange={e => setUpdatedName(e.target.value)} 
                          placeholder='Naziv sobe'
                          />
                        <textarea 
                          className='update-area' 
                          value={updatedAbout} 
                          onChange={e => setUpdatedAbout(e.target.value)}
                          placeholder='Opis sobe'
                          disabled
                          style={{display:'none'}} 
                        />
                         <input 
                          className='update-input' 
                          type="text" 
                          value={updatedInfo} 
                          onChange={e => setUpdatedInfo(e.target.value)}
                          placeholder='Cena' 
                        />
                        <input 
                          className='update-input' 
                          type="text" 
                          value={updatedPrice} 
                          onChange={e => setUpdatedPrice(e.target.value)}
                          placeholder='Cena' 
                        />
                        <button style={{backgroundColor:'green'}} className='admin-button' onClick={() => handleSaveUpdate(room._id)}>Sačuvaj</button>
                      </div>
                    )}

              </div>
          ))
        ) : (
          <p>No rooms available</p>
        )}
      </div>
        <div className="rooms-info">
          <div className="rooms-info-left">
            <h2>O sobama Na Jošanici</h2>
            <p>Dobrodošli u naš udobni smeštaj smješten u srcu Josaničke Banje, okružen planinskim pejzažima i blizu mnogih atrakcija koje ovaj region nudi. Naš kompleks nudi udobne sobe koje su idealne za opuštanje nakon istraživanja lokalnih znamenitosti ili uživanja u aktivnostima na otvorenom.</p>

            <p>U našem kompleksu imamo različite opcije ishrane kako bismo zadovoljili različite potrebe naših gostiju. Možete izabrati između <span>polupansiona</span> ili <span>punog pansiona</span>, ili jednostavno uživati u smeštaju bez obroka.</p>

            <p>Sobe se nalaze blizu lečilišta, udaljene svega 100 metara od smeštaja. Ovdje možete uživati u raznim tretmanima i terapijama koje će vam pružiti osjećaj potpunog blagostanja i relaksacije. Takođe, otvoreni bazen je idealno mesto za osveženje i uživanje.</p>

            <p>Akva park "Draguljica" je takođe udaljen samo 100 metara od našeg smeštaja. To je savršeno mesto za sve uzraste, gde se možete zabaviti na različitim toboganima i atrakcijama.</p>

            
          </div>
          <div className="rooms-info-right">
            <h2>Rekli su o našim sobama</h2>
            <div className="reviews">
              <button onClick={prevReview}><FaAngleDoubleLeft className="arrows" id="left" /></button>
              <p className="solo-review">{reviews[currentIndex]}</p>
              <button onClick={nextReview}><FaAngleDoubleRight className="arrows" id="right"  /></button>
            </div>
          </div>
        </div>

        <div className="gallery-room">
        <div className="image-container-room">
          <img src="images/room1.jpg" alt="hrana1" />
          
        </div>
        <div className="image-container-room">
          <img src="images/room2.jpg" alt="hrana2" />
          
        </div>
        <div className="image-container-room">
          <img src="images/room3.jpg" alt="hrana3" />
          
        </div>
        <div className="image-container-room">
          <img src="images/room4.jpg" alt="hrana4" />
          
        </div>
        <div className="image-container-room">
          <img src="images/room5.jpg" alt="hrana5" />
          
        </div>
        <div className="image-container-room">
          <img src="images/room6.jpg" alt="hrana6" />
         
        </div>
        <div className="image-container-room">
          <img src="images/room7.jpg" alt="hrana7" />
         
        </div>
        <div className="image-container-room">
          <img src="images/room8.jpg" alt="hrana8" />
          
        </div>
      </div>
        <div className="icons">
          <FaParking/>
          <FaWifi/>
          <GiForkKnifeSpoon/>
        </div>
      </div>
    <Footer/>
    </>
  )
}

export default Rooms