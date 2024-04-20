import React from "react";
import { Header } from "../layout/header/Header.jsx";
import { Footer } from "../layout/footer/Footer.jsx";
import { ContactForm } from "./ContactForm.jsx";
import { FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";

import "react-toastify/dist/ReactToastify.css";
import "./Contact.css";
import config from "../../config.json";

export const Contact = () => {
  return (
    <div>
      <Header />
      <div className="contact">
        <h1>KONTAKTIRAJTE NAS</h1>
        <p>
          Ukoliko imate neka pitanja ili sugestije za nas, molimo Vas, javite
          nam se.
        </p>
        <ContactForm />
        <div className="contact-info">
          <FaPhone className="react-icons" />
          <span>{config.phoneNumber2}</span>
          <span>{config.phoneNumber3}</span>
          <IoMdMail className="react-icons" />
          <span>{config.email}</span>
          <FaLocationDot className="react-icons" />
          <span>{config.adress}</span>
        </div>
      </div>
      <Footer />
    </div>
  );
};
