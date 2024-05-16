import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetReservationInfo } from "../../hooks/useGetReservationInfo";

import { FaPhone } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { scrollToTop } from "../../hooks/useScrollToTop";

import "./Reservation.css";
import "./ReservationDetails.css";

export const ReservationDetails = () => {
  const { id } = useParams();
  const { reservation } = useGetReservationInfo(id);

  return (
    <>
      <div className="reservationInfoContainer">
        {reservation ? (
          <div className="reservationInfo">
            <h2 style={{ textAlign: "center" }}>Rezervacija uspešna!</h2>
            <h1>Detalji rezervacije:</h1>
            <div className="details">
              <p>
                <strong>Rezervacija na ime:</strong> {reservation.firstLastName}
              </p>
              <p>
                <strong>Broj osoba:</strong> {reservation.numberOfPersons}
              </p>
              <p>
                <strong>E-pošta:</strong> {reservation.email}
              </p>
              <p>
                <strong>Broj telefona:</strong> {reservation.phoneNumber}
              </p>
              <p>
                <strong>Dodatne informacije:</strong>{" "}
                {reservation.additionalInfo}
              </p>
              <p>
                <strong>Datum dolaska:</strong> {reservation.arrivalDate}
              </p>
              <p>
                <strong>Datum odlaska:</strong> {reservation.departureDate}
              </p>
            </div>
            <div className="roomInfo">
              <p>
                <strong>Izabrana soba:</strong> {reservation.roomId.name}
              </p>
              <p>
                <strong>Cena po noćenju:</strong> {reservation.roomId.price} €
              </p>
              <p>
                <strong>Informacije o rezervisanoj sobi:</strong>{" "}
                {reservation.roomId.info}
              </p>
              <div className="contact-details">
                <h2>
                  Molimo Vas da sačuvate ovu rezervaciju!
                  <br />U slučaju otkazivanja ili promene podataka, molimo Vas
                  da nas kontaktirate
                </h2>
                <MdOutlineMail className="icon" />
                <span>restorannajosanici@gmail.com</span>
                <FaPhone className="icon" />
                <span>+381 65 252-8-252</span>
                <img src="/josanica.png" alt="logo" width={"150px"} />
                <Link to={"/"} onClick={scrollToTop} className="backLink">
                  Početna strana
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};
