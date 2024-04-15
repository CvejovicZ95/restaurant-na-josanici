import {Layout} from "./components/Layout/Layout"
import {Contact} from "./components/Contact/Contact";
import {Menu} from "./components/Menu/Menu"
import {Wine} from "./components/Menu/Wine";
import {Rooms} from "./components/Rooms/Rooms";
import {Reservation} from "./components/Reservations/Reservation";
import {ReservationDetails} from "./components/Reservations/ReservationDetails";
import {Admin} from "./components/Admin/Admin";
import {AllReservations} from "./components/Admin/AdminReservations";
import {Navigate, Route,Routes} from 'react-router-dom'
import { useAuthContext } from "./context/authContext";

export function App() {
  const {authUser}=useAuthContext()
  return (
    <Routes>
      <Route path="/" element={<Layout/>}/>

      <Route path="/menu" element={<Menu/>}/>

      <Route path="/wine" element={<Wine/>}/>

      <Route path="/rooms" element={<Rooms/>}/>

      <Route path="/reservation/:id" element={<Reservation/>}/>

      <Route path='/reservationInfo/:id' element={<ReservationDetails/>}/>

      <Route path="/contact" element={<Contact/>}/>

      <Route path="/admin" element={ authUser ? <Navigate to={'/'}/> : <Admin/>}/>

      <Route path="/allReservations" element ={!authUser ? <Navigate to={'/admin'}></Navigate> : <AllReservations/>}/>

    </Routes>
  );
}
