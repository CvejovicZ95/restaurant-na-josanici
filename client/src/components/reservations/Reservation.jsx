import {Header} from "../Layout/Header/Header.jsx"
import {Footer} from "../Layout/Footer/Footer.jsx"

import { useState } from "react"
import {useGetRoomById} from '../../hooks/useGetRoomById'

import {useCreateReservation} from '../../hooks/useCreateReservation'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useParams } from "react-router-dom"

import "./Reservation.css";


export const Reservation=()=>{
  
  const {id}= useParams();
  
  // eslint-disable-next-line
  const {loading,reservedDates,room}=useGetRoomById(id)

  const [completed,setCompleted]=useState(false)
  const [errorMessage, setErrorMessage] = useState("");
  
  const { reservation,createReservation} = useCreateReservation();

  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [firstLastName, setFirstLastName] = useState("");
  const [numberOfPersons, setNumberOfPersons] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [roomId,setRoomId] = useState(id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!arrivalDate || !departureDate) {
      setErrorMessage("Molimo Vas da izaberete datume dolaska i odlaska.");
      return;
    }

    if (departureDate <= arrivalDate) {
      setErrorMessage('Datum odlaska mora biti posle datuma dolaska.');
      return;
    }
  
    if (!phoneRegex.test(phoneNumber)) {
      setErrorMessage('Molimo unesite ispravan format broja telefona.');
      return;
    }
  
    if (firstLastName.length < 6) {
      setErrorMessage('Molimo unesite puno ime i prezime.');
      return;
    }
  
    if (!emailRegex.test(email)) {
      setErrorMessage('Molimo unesite ispravan format e-pošte.');
      return;
    }
  
    if (!numberOfPersons || !email || !phoneNumber || !firstLastName) {
      setErrorMessage("Molimo popunite sva polja.");
      return;
    }
  
    const isDateAvailable =
    Array.isArray(reservedDates.reservedDates) && reservedDates.reservedDates.length > 0
    ? reservedDates.reservedDates.every((reservedDate) => {
        const arrival = new Date(arrivalDate);
        const departure = new Date(departureDate);
        const reservedArrivalDate = new Date(reservedDate.arrivalDate);
        const reservedDepartureDate = new Date(reservedDate.departureDate);

        return arrival >= reservedDepartureDate || departure <= reservedArrivalDate;
      })
    : true;
  
    if (!isDateAvailable) {
      setErrorMessage("Žao nam je, soba je već rezervisana za odabrane datume.");
      return;
    }
  
    try {
      await createReservation({
        arrivalDate,
        departureDate,
        firstLastName,
        numberOfPersons,
        email,
        phoneNumber,
        additionalInfo,
        roomId: id,
      });
      setArrivalDate("");
      setDepartureDate("");
      setFirstLastName("");
      setNumberOfPersons("");
      setEmail("");
      setPhoneNumber("");
      setAdditionalInfo("");
      setRoomId('')

      setCompleted(true);
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="reservation">
        <div className="reservation-img">
          <img src="/images/reservation.png" alt="reservation" />
        </div>
        <form className="reservation-form" onSubmit={handleSubmit}>
          <h1>Molimo popunite formu za rezervaciju</h1>

          <label className="label-form">Datum dolaska:</label>
          <input
            type="date"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
          />

          <label className="label-form">Datum odlaska:</label>
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />

          <label className="label-form">Ime i prezime:</label>
          <input
            type="text"
            placeholder="Petar Petrović"
            value={firstLastName}
            onChange={(e) => setFirstLastName(e.target.value)}
          />

          <label className="label-form">Broj osoba:</label>
          <input
            type="number"
            placeholder="1-3"
            min={"1"}
            max={"3"}
            value={numberOfPersons}
            onChange={(e) => setNumberOfPersons(e.target.value)}
          />

          <label className="label-form">Email:</label>
          <input
            type="email"
            placeholder="petarpetrovic@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="label-form">Broj telefona:</label>
          <input
            type="text"
            placeholder="Vaš broj telefona"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <label className="label-form">Dodatne informacije:</label>
          <textarea
            rows={"4"}
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
          />

          <label style={{display:none}} className="label-form">ID sobe</label>
          <input
            type="text"
            placeholder="Id sobe"
            required
            value={roomId}
            disabled
            style={{display:none}}
          />

          <button type="submit">Rezerviši</button>
        </form>


        {completed && reservation && (
          <Navigate to={`/reservationInfo/${reservation._id}`} />
        )}
        {errorMessage && !completed && !reservation && (
          <p style={{ color: "red", textAlign: "center", fontSize: "18px" }}>
            {errorMessage}
          </p>
        )}
        <ToastContainer />
      </div>
      <Footer />
    </>
  );
};