import {Header} from "../Layout/Header/Header.jsx"
import {HomePage} from "../Layout/HomePage/HomePage.jsx"
import {Gallery} from "../Layout/Gallery/Gallery.jsx"
import {AboutRooms} from "../Layout/AboutRooms/AboutRooms.jsx"
import {Footer} from "../Layout/Footer/Footer.jsx"

const Layout=()=>{
  return(
    <div className="App">
      <Header/>
      <HomePage/>
      <Gallery/>
      <AboutRooms/>
      <Footer/>
    </div>
  )
}

export {Layout}