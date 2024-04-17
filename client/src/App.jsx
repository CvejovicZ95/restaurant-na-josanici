import React from "react";
import { Layout } from "./components/layout/Layout";
import { Contact } from "./components/contact/Contact";
import { Menu } from "./components/menu/Menu";
import { Wine } from "./components/menu/Wine";
import { Rooms } from "./components/rooms/Rooms";
import { Reservation } from "./components/reservations/Reservation";
import { ReservationDetails } from "./components/reservations/ReservationDetails";
import { Admin } from "./components/admin/Admin";
import { AllReservations } from "./components/admin/AdminReservations";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/authContext";

export function App() {
  const { authUser } = useAuthContext();
  return (
    <Routes>
      <Route path="/" element={<Layout />} />

      <Route path="/menu" element={<Menu />} />

      <Route path="/wine" element={<Wine />} />

      <Route path="/rooms" element={<Rooms />} />

      <Route path="/reservation/:id" element={<Reservation />} />

      <Route path="/reservationInfo/:id" element={<ReservationDetails />} />

      <Route path="/contact" element={<Contact />} />

      <Route
        path="/admin"
        element={authUser ? <Navigate to={"/"} /> : <Admin />}
      />

      <Route
        path="/allReservations"
        element={
          !authUser ? <Navigate to={"/admin"}></Navigate> : <AllReservations />
        }
      />
    </Routes>
  );
}
