import React from "react";
import PropTypes from "prop-types";

export const ReservationItem = ({
  reservation,
  markReservationAsProcessedHandler,
  deleteReservationHandler,
}) => {
  const handleProcessedClick = async () => {
    await markReservationAsProcessedHandler(reservation._id);
  };

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm(
      "Da li ste sigurni da želite da obrišete rezervaciju?",
    );
    if (confirmDelete) {
      await deleteReservationHandler(reservation._id);
    }
  };

  return (
    <li
      key={reservation._id}
      style={{
        backgroundColor: reservation.processed ? "lightgreen" : "inherit",
        display: reservation.deleted ? "none" : "block",
      }}
    >
      <p>Ime: {reservation.firstLastName}</p>
      <p>
        Dolazak: {reservation.arrivalDate} / Odlazak:{" "}
        {reservation.departureDate}
      </p>
      <span>Osoba: {reservation.numberOfPersons}</span>
      <span>Telefon: {reservation.phoneNumber}</span>
      <span>Email: {reservation.email}</span>
      <span>Dodatne informacije: {reservation.additionalInfo}</span>

      <label>Cena: {reservation.roomId.price}€/noć</label>
      <label>Soba: {reservation.roomId.name}</label>

      <button
        style={{
          backgroundColor: !reservation.processed ? "blue" : "silver",
          marginRight: "5px",
          cursor: !reservation.processed ? "pointer" : "default",
          color: reservation.processed ? "black" : "white",
        }}
        className="admin-button"
        onClick={handleProcessedClick}
        disabled={reservation.processed}
      >
        Obrađena
      </button>

      <button
        style={{ backgroundColor: "red" }}
        onClick={handleDeleteClick}
        className="admin-button"
      >
        Obriši
      </button>
    </li>
  );
};

ReservationItem.propTypes = {
  reservation: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstLastName: PropTypes.string.isRequired,
    arrivalDate: PropTypes.string.isRequired,
    departureDate: PropTypes.string.isRequired,
    numberOfPersons: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    additionalInfo: PropTypes.string.isRequired,
    roomId: PropTypes.shape({
      price: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    processed: PropTypes.bool.isRequired,
    deleted: PropTypes.bool.isRequired,
  }).isRequired,
  markReservationAsProcessedHandler: PropTypes.func.isRequired,
  deleteReservationHandler: PropTypes.func.isRequired,
};
