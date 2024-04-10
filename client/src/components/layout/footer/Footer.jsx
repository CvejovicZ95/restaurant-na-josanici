import { Link } from "react-router-dom";

import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";

import {scrollToTop} from "../../../hooks/useScrollToTop"

import config from "../../../config.json"
import "./Footer.css";

const Footer=()=>{
  const date=new Date().getFullYear()

  return(
    <footer className="footer" id="contact">
      <iframe className="map" src={config.googleMapUrl} width="600" height="450" title="map" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      <div>
        <CiLocationOn className="location" />
        <h2>{config.adress}</h2>
        <h2>Radno vreme: {config.workingTime}</h2>
        <br/>
        <h2>{config.phoneNumber1}</h2>
        <div className="links">
          <a href={config.instagramUrl}><FaInstagram/></a>
          <a href={config.facebookUrl}><FaFacebook/></a>
        </div>
      </div>
      <hr/>
      <Link to={'/'}><img src="/images/josanica.png" onClick={scrollToTop} alt="logo" width={'180px'}/></Link>
      <p>{`© ${date} All Rights Reserved`}</p>
    </footer>
  )
}

export {Footer}