import React from "react";
import { Header } from "../layout/header/Header";
import { Footer } from "../layout/footer/Footer";
import { AdminMessages } from "./AdminMessages";
import { AdminReservations } from "./AdminReservation";
import "./Admin.css";
import "./AdminReservation.css";

export const AllReservations = () => {
  return (
    <>
      <Header />
      <AdminReservations />
      <AdminMessages />
      <Footer />
    </>
  );
};
