import Header from "./Header"
import HomePage from './HomePage'
import Gallery from "./Gallery"
import AboutRooms from "./AboutRooms"
import Footer from "./Footer"

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

//about rooms css media i header da probam da namestim
export default Layout