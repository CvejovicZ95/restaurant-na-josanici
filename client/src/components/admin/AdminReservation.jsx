import React from "react";
import { useGetReservationInfo } from "../../hooks/useGetReservationInfo";
import { ReservationItem } from "./AdminReservationItem";

export const AdminReservations = () => {
  const {
    allReservations,
    markReservationAsProcessedHandler,
    deleteReservationHandler,
  } = useGetReservationInfo();

  return (
    <>
      <h1>Rezervacije</h1>
      <ul className="reservation-list">
        {allReservations.map((reservation) => (
          <ReservationItem
            key={reservation._id}
            reservation={reservation}
            markReservationAsProcessedHandler={
              markReservationAsProcessedHandler
            }
            deleteReservationHandler={deleteReservationHandler}
          />
        ))}
      </ul>
    </>
  );
};
