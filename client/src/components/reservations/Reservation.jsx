import React from "react";
import { Header } from "../layout/header/Header.jsx";
import { ReservationForm } from "./ReservationForm.jsx";
import { Footer } from "../layout/footer/Footer.jsx";

import "./Reservation.css";
import "./ReservationDetails.css";

export const Reservation = () => {
  return (
    <>
      <Header />
      <ReservationForm />
      <Footer />
    </>
  );
};
