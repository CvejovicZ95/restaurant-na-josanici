import React from "react";
import { Header } from "../layout/header/Header.jsx";
import { Footer } from "../layout/footer/Footer.jsx";
import { AdminMessages } from "./AdminMessages.jsx";
import { AdminReseservations } from "./AdminReservation.jsx";
import "./Admin.css";
import "./AdminReservation.css";

export const AllReservations = () => {
  return (
    <>
      <Header />
      <AdminReseservations />
      <AdminMessages />
      <Footer />
    </>
  );
};
