import { Link } from "react-router-dom"
import {scrollToTop} from "../../../hooks/useScrollToTop";
import "./AboutRooms.css";
const AboutRooms=()=>{

  return(
      <div className="about-rooms">
        <h1>Predstavljamo</h1>
        <h2>Sobe Na Jošanici</h2>
        <p>Sobe na Jošanici u ponudi imaju smeštaj sa besplatnim WiFi internetom, kao i vrt sa terasom i pogledom na planinu.</p>
        <Link to={'/rooms'} onClick={scrollToTop}><button>Sobe Na Jošanici</button></Link>
        <div className="room-images">
        <img src="images/soba.png" alt="room1"/>  
        <img src="images/slikasoba.png" alt="room2"/>
        </div>
      </div> 
  )
}

export {AboutRooms}