import {Header} from "../layout/header/Header.jsx"
import {Footer} from "../layout/footer/Footer.jsx"

import { useState } from "react"
import {useGetRoomById} from '../../hooks/useGetRoomById'

import {useCreateReservation} from '../../hooks/useCreateReservation'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useParams } from "react-router-dom"

import "./Reservation.css";


const Reservation=()=>{
  
  const {id}= useParams();
  
  // eslint-disable-next-line
  const {loading,reservedDates,room}=useGetRoomById(id)

  const [completed,setCompleted]=useState(false)
  const [errorMessage, setErrorMessage] = useState("");
  
  const { reservation,createReservation} = useCreateReservation();

  const [inputs,setInputs]=useState({
    arrivalDate:'',
    departureDate:'',
    firstLastName:'',
    numberOfPersons:'',
    email:'',
    phoneNumber:'',
    additionalInfo:'',
    roomId: id,
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!inputs.arrivalDate || !inputs.departureDate) {
      setErrorMessage("Molimo Vas da izaberete datume dolaska i odlaska.");
      return;
    }

    if (inputs.departureDate <= inputs.arrivalDate) {
      setErrorMessage('Datum odlaska mora biti posle datuma dolaska.');
      return;
    }
  
    if (!phoneRegex.test(inputs.phoneNumber)) {
      setErrorMessage('Molimo unesite ispravan format broja telefona.');
      return;
    }
  
    if (inputs.firstLastName.length < 6) {
      setErrorMessage('Molimo unesite puno ime i prezime.');
      return;
    }
  
    if (!emailRegex.test(inputs.email)) {
      setErrorMessage('Molimo unesite ispravan format e-pošte.');
      return;
    }
  
    if (!inputs.numberOfPersons || !inputs.email || !inputs.phoneNumber || !inputs.firstLastName) {
      setErrorMessage("Molimo popunite sva polja.");
      return;
    }
  
    const isDateAvailable = Array.isArray(reservedDates.reservedDates) && reservedDates.reservedDates.length > 0 ?
      reservedDates.reservedDates.every((reservedDate) => {
        const arrivalDate = new Date(inputs.arrivalDate);
        const departureDate = new Date(inputs.departureDate);
        const reservedArrivalDate = new Date(reservedDate.arrivalDate);
        const reservedDepartureDate = new Date(reservedDate.departureDate);
  
        return (
          arrivalDate >= reservedDepartureDate || departureDate <= reservedArrivalDate
        );
      }) :
      true;
  
    if (!isDateAvailable) {
      setErrorMessage("Žao nam je, soba je već rezervisana za odabrane datume.");
      return;
    }
  
    await createReservation(inputs)
    setInputs({
      arrivalDate:'',
      departureDate:'',
      firstLastName:'',
      numberOfPersons:'',
      email:'',
      phoneNumber:'',
      additionalInfo:'',
      roomId: id,
    });
    setCompleted(true)
  }

  return(
    <>
    <Header/>
      <div className="reservation">
        <div className="reservation-img">
          <img src="/images/reservation.png" alt="reservation"/>
        </div>
        <form className="reservation-form" onSubmit={handleSubmit}>
          <h1>Molimo popunite formu za rezervaciju</h1>

          <label className="label-form">Datum dolaska:</label>
          <input
            type="date"
            value={inputs.arrivalDate}
            onChange={(e)=>setInputs({...inputs,arrivalDate:e.target.value})}
          />

          <label className="label-form">Datum odlaksa:</label>
          <input
            type="date"
            value={inputs.departureDate}
            onChange={(e)=>setInputs({...inputs,departureDate:e.target.value})}
          />

          <label className="label-form">Ime i prezime:</label>
          <input
            type="text"
            placeholder="Petar Petrović"
            value={inputs.firstLastName}
            onChange={(e)=>setInputs({...inputs,firstLastName:e.target.value})}
          />

          <label className="label-form">Broj osoba:</label>
          <input
            type="number"
            placeholder="1-3"
            min={'1'}
            max={'3'}
            value={inputs.numberOfPersons}
            onChange={(e)=>setInputs({...inputs,numberOfPersons:e.target.value})}
          />

          <label className="label-form">Email:</label>
          <input
            type="email"
            placeholder="petarpetrovic@gmail.com"
            value={inputs.email}
            onChange={(e)=>setInputs({...inputs,email:e.target.value})}
          />

          <label className="label-form">Broj telefona:</label>
          <input
            type="text"
            placeholder="Vaš broj telefona"
            value={inputs.phoneNumber}
            onChange={(e)=>setInputs({...inputs,phoneNumber:e.target.value})}
          />

          <label className="label-form">Dodatne informacije:</label>
          <textarea
            rows={'4'}
            value={inputs.additionalInfo}
            onChange={(e)=>setInputs({...inputs,additionalInfo:e.target.value})}
          />

          <label style={{display:'none'}} className="label-form">ID sobe</label>
          <input
            type="text"
            placeholder="Id sobe"
            required
            value={inputs.roomId}
            disabled
            style={{display:'none'}}
          />
          <button type="submit">Rezerviši</button>
        </form>
            
        
            
        {completed && <Navigate to={`/reservationInfo/${reservation._id}`}></Navigate>}
        
        {errorMessage && !completed && !reservation && <p style={{color:'red',textAlign:'center',fontSize:'18px'}}>{errorMessage}</p>}

        
        <ToastContainer/>
      </div>
    <Footer/>
    </>
  )
}

export {Reservation}