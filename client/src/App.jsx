import Layout from "./components/Layout";
import Contact from "./components/Contact";
import Menu from "./components/Menu";
import Wine from "./components/Wine";
import Rooms from "./components/Rooms";
import Reservation from "./components/Reservation";
import ReservationDetails from "./components/ReservationDetails";
import Admin from "./components/Admin";
import AllReservations from "./components/AdminReservations";
import {Navigate, Route,Routes} from 'react-router-dom'
import { useAuthContext } from "./context/authContext";

function App() {
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

export default App;
