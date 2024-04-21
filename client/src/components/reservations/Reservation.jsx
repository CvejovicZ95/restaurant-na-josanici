import React from "react";
import { Header } from "../layout/header/Header";
import { ReservationForm } from "./ReservationForm";
import { Footer } from "../layout/footer/Footer";

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
