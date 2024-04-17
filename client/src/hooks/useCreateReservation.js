import { useState } from "react";
import { toast } from "react-toastify";
import {
  checkAvailability,
  createSingleReservation,
} from "../api/reservationApi.js";

export const useCreateReservation = () => {
  const [reservation, setReservation] = useState("");

  const createReservation = async ({
    arrivalDate,
    departureDate,
    firstLastName,
    numberOfPersons,
    email,
    phoneNumber,
    additionalInfo,
    roomId,
  }) => {
    const success = handleErrors({
      arrivalDate,
      departureDate,
      firstLastName,
      numberOfPersons,
      email,
      phoneNumber,
      roomId,
    });
    if (!success) return;

    try {
      const availabilityData = await checkAvailability(
        arrivalDate,
        departureDate,
        roomId,
      );

      if (availabilityData.error) {
        throw new Error(availabilityData.error);
      }

      if (availabilityData.available) {
        const reservationData = await createSingleReservation({
          arrivalDate,
          departureDate,
          firstLastName,
          numberOfPersons,
          email,
          phoneNumber,
          additionalInfo,
          roomId,
        });
        setReservation(reservationData);
      } else {
        const departureCheckData = await checkAvailability({
          arrivalDate: departureDate,
          departureDate: departureDate,
          roomId,
        });
        if (departureCheckData.available) {
          const reservationData = await createSingleReservation({
            arrivalDate,
            departureDate,
            firstLastName,
            numberOfPersons,
            email,
            phoneNumber,
            additionalInfo,
            roomId,
          });
          setReservation(reservationData);
        } else {
          setReservation(null);
        }
      }
    } catch (error) {
      toast.error(error.message);
      setReservation(null);
    }
  };

  return { reservation, createReservation };
};

function handleErrors({
  arrivalDate,
  departureDate,
  firstLastName,
  numberOfPersons,
  email,
  phoneNumber,
  roomId,
}) {
  const today = new Date();
  const arrivalDateTime = new Date(arrivalDate);
  const departureDateTime = new Date(departureDate);
  const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return !arrivalDate ||
    !departureDate ||
    !firstLastName ||
    !numberOfPersons ||
    !email ||
    !phoneNumber ||
    !roomId
    ? (console.error("Molimo unesite sve potrebne informacije."), false)
    : arrivalDateTime < today || departureDateTime < today
      ? (console.error("Molimo da pravilno unesete datume."), false)
      : departureDateTime <= arrivalDateTime
        ? (console.error("Datum odlaska mora biti posle datuma dolaska."),
          false)
        : !phoneRegex.test(phoneNumber)
          ? (console.error("Molimo unesite ispravan format broja telefona"),
            false)
          : firstLastName.length < 6
            ? (console.error("Molimo unesite puno ime i prezime"), false)
            : !emailRegex.test(email)
              ? (console.error("Molimo unesite ispravan format e-pošte"), false)
              : true;
}
