import {Header} from "../Layout/Header/Header.jsx"
import {Footer} from "../Layout/Footer/Footer.jsx"
import {useGetReservationInfo} from '../../hooks/useGetReservationInfo';
import {useCreateMessage} from "../../hooks/useCreateMessage"
import "./AdminReservation.css";

export const AllReservations = () => {
  const { allReservations,markReservationAsProcessedHandler,deleteReservationHandler } = useGetReservationInfo();
  
  const {allMessages,deleteMessageHandler}=useCreateMessage()

  const handleProcessedClick = async (reservationId) => {
    await markReservationAsProcessedHandler(reservationId);
  };

  const handleDeleteClick = async (reservationId) => {
    const confirm=window.confirm('Da li ste sigurni da zelite da obrisete rezervaciju?')
    if(confirm){
      await deleteReservationHandler(reservationId);
    }
  };

  const handleDeleteMessage=async(messageId)=>{
  const confirm=window.confirm('Da li ste sigurni da zelite da obrisete poruku?')
    if(confirm){
      await deleteMessageHandler(messageId);
    }
  };

  
  return (
    <>
    <Header/>
    <div>
      <h1>Rezervacije</h1>
      <ul className='reservation-list'>
        {allReservations.map(reservation => (
         <li key={reservation._id} style={{ 
          backgroundColor: reservation.processed ? 'lightgreen' : 'inherit',
          display: reservation.deleted ? 'none' : 'block' 
        }}>
            <p>Ime:{reservation.firstLastName}</p>
            <p>Dolazak: {reservation.arrivalDate} / Odlazak: {reservation.departureDate}</p>
            <span>Osoba: {reservation.numberOfPersons}</span>
            <span>Telefon:{reservation.phoneNumber}</span>
            <span>Email:{reservation.email}</span>
            <span>Dodatne informacije:{reservation.additionalInfo}</span>

            <label>Cena:{reservation.roomId.price}€/noć</label>
            <label>Soba:{reservation.roomId.name}</label>

            <button
              style={{
                backgroundColor: !reservation.processed ? 'blue' : 'silver',
                marginRight: '5px',
                cursor:!reservation.processed ? 'pointer' : 'default',
                color:reservation.processed ? 'black' : 'white'
              }}
              className='admin-button'
              onClick={() => handleProcessedClick(reservation._id)}
              disabled={reservation.processed}
            >Obrađena</button>

            <button 
              style={{backgroundColor:'red'}}
              onClick={() => handleDeleteClick(reservation._id)} className='admin-button'
            >Obriši</button>
          </li>
        ))}
      </ul>
      <h1>Poruke</h1>
      <ul className='messages-list'>
          {allMessages.map(message => (
            <li key={message._id} style={{display:message.deleted ? 'none' : 'block'}}>
              <span>Email: {message.email}</span>
              <span>Ime: {message.firstLastName}</span>
              <span>Telefon: {message.phoneNumber}</span>
              <span>Pitanje: {message.question}</span>
              <button style={{backgroundColor:'red'}}
               onClick={() => handleDeleteMessage(message._id)}
               className='admin-button'>Obriši</button>
            </li>
          ))}
        </ul>
    </div>
    <Footer/>
    </>
  );
};
