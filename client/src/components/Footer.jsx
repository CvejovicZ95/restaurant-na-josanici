import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";

import scrollToTop from "../hooks/useScrollToTop";
import { Link } from "react-router-dom";

const Footer=()=>{
  const date=new Date().getFullYear()

  return(
    <footer className="footer" id="contact">
      <iframe className="map" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11597.863333260046!2d20.7507079!3d43.388192!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475647aee309dfe9%3A0x1f18cfd978533186!2sRestoran%20Na%20Jo%C5%A1anici!5e0!3m2!1sen!2srs!4v1710955058542!5m2!1sen!2srs" width="600" height="450" title="map" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      <div>
        <CiLocationOn className="location" />
        <h2>Milunke Savić bb, Jošanička Banja</h2>
        <h2>Radno vreme: 08:00-22:00</h2>
        <br/>
        <h2>065/252-8-252</h2>
        <div className="links">
          <a href="https://www.instagram.com/restoran_na_josanici/?hl=en"><FaInstagram/></a>
          <a href="https://www.facebook.com/people/Restoran-Na-Jo%C5%A1anici/100071865143709/"><FaFacebook/></a>
        </div>
      </div>
      <hr/>
      <Link to={'/'}><img src="/images/josanica.png" onClick={scrollToTop} alt="logo" width={'180px'}/></Link>
      <p>{`© ${date} All Rights Reserved`}</p>
    </footer>
  )
}

export default Footer