import { useState } from 'react';
import { toast } from 'react-toastify';

const useCreateReservation = () => {
  const [reservation, setReservation] = useState('');
  

  const createReservation = async ({ arrivalDate, departureDate, firstLastName, numberOfPersons, email, phoneNumber, additionalInfo, roomId }) => {

    const success = handleErrors({ arrivalDate, departureDate, firstLastName, numberOfPersons, email, phoneNumber, roomId });
    if (!success) return;

    try {
        const res = await fetch('http://localhost:4500/api/checkAvailability', {
            method: "POST",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ arrivalDate, departureDate, roomId })
        });
        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }

        if (data.available) {
            const reservationRes = await fetch('http://localhost:4500/api/createReservation', {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({ arrivalDate, departureDate, firstLastName, numberOfPersons, email, phoneNumber, additionalInfo, roomId })
            });
            const reservationData = await reservationRes.json();
            if (reservationData.error) {
                throw new Error(reservationData.error);
            }
            setReservation(reservationData);

        } else {
            // Check if the room is available on the departure date of existing reservation
            const departureCheckRes = await fetch('http://localhost:4500/api/checkAvailability', {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({ arrivalDate: departureDate, departureDate: departureDate, roomId })
            });
            const departureCheckData = await departureCheckRes.json();
            if (departureCheckData.available) {
                const reservationRes = await fetch('http://localhost:4500/api/createReservation', {
                    method: "POST",
                    headers: { 'Content-Type': "application/json" },
                    body: JSON.stringify({ arrivalDate, departureDate, firstLastName, numberOfPersons, email, phoneNumber, additionalInfo, roomId })
                });
                const reservationData = await reservationRes.json();
                if (reservationData.error) {
                    throw new Error(reservationData.error);
                }
                setReservation(reservationData);
            } else {
                setReservation(null);
            }
        }
    } catch (error) {
        toast.error(error.message);
        setReservation(null);
    }
  }
  return { reservation,createReservation }
}

export { useCreateReservation }


function handleErrors({arrivalDate,departureDate,firstLastName,numberOfPersons,email,phoneNumber,roomId}){

  const today = new Date();
  const arrivalDateTime = new Date(arrivalDate);
  const departureDateTime = new Date(departureDate);
  const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!arrivalDate || !departureDate || !firstLastName || !numberOfPersons || !email || !phoneNumber || !roomId) {
    toast.error("Molimo unesite sve potrebne informacije.");
    return false;
  }
  if (arrivalDateTime < today || departureDateTime < today) {
    toast.error("Molimo da pravilno unesete datume.");
    return false;
  }
  if (departureDateTime <= arrivalDateTime) {
    toast.error("Datum odlaska mora biti posle datuma dolaska.");
    return false;
  }
  if (!phoneRegex.test(phoneNumber)) {
    toast.error('Molimo unesite ispravan format broja telefona');
    return false;
  }
  if(firstLastName.length < 6){
    toast.error('Molimo unesite puno ime i prezime')
    return false;
  }
  if (!emailRegex.test(email)) {
    toast.error('Molimo unesite ispravan format e-pošte');
    return false;
  }
  return true
}

