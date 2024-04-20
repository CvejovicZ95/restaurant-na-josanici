import React from "react";
import { useGetReservationInfo } from "../../hooks/useGetReservationInfo";

export const AdminReseservations = () => {
  const {
    allReservations,
    markReservationAsProcessedHandler,
    deleteReservationHandler,
  } = useGetReservationInfo();

  const handleProcessedClick = async (reservationId) => {
    await markReservationAsProcessedHandler(reservationId);
  };

  const handleDeleteClick = async (reservationId) => {
    const confirm = window.confirm(
      "Da li ste sigurni da zelite da obrisete rezervaciju?",
    );
    if (confirm) {
      await deleteReservationHandler(reservationId);
    }
  };

  return (
    <>
      <h1>Rezervacije</h1>
      <ul className="reservation-list">
        {allReservations.map((reservation) => (
          <li
            key={reservation._id}
            style={{
              backgroundColor: reservation.processed ? "lightgreen" : "inherit",
              display: reservation.deleted ? "none" : "block",
            }}
          >
            <p>Ime:{reservation.firstLastName}</p>
            <p>
              Dolazak: {reservation.arrivalDate} / Odlazak:{" "}
              {reservation.departureDate}
            </p>
            <span>Osoba: {reservation.numberOfPersons}</span>
            <span>Telefon:{reservation.phoneNumber}</span>
            <span>Email:{reservation.email}</span>
            <span>Dodatne informacije:{reservation.additionalInfo}</span>

            <label>Cena:{reservation.roomId.price}€/noć</label>
            <label>Soba:{reservation.roomId.name}</label>

            <button
              style={{
                backgroundColor: !reservation.processed ? "blue" : "silver",
                marginRight: "5px",
                cursor: !reservation.processed ? "pointer" : "default",
                color: reservation.processed ? "black" : "white",
              }}
              className="admin-button"
              onClick={() => handleProcessedClick(reservation._id)}
              disabled={reservation.processed}
            >
              Obrađena
            </button>

            <button
              style={{ backgroundColor: "red" }}
              onClick={() => handleDeleteClick(reservation._id)}
              className="admin-button"
            >
              Obriši
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
