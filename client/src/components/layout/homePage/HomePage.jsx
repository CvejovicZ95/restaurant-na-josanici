import React, { useEffect } from "react";
import "./HomePage.css";

export const HomePage = () => {
  useEffect(() => {
    const slideElements = document.querySelectorAll(".slide-in");

    slideElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add("slide-in-active");
      }, index * 300);
    });
  }, []);

  return (
    <div className="home" id="logo">
      <div className="homePage">
        <img
          className="slide-in"
          src="images/dobrodosli.png"
          alt="dobrodosli"
        />
        <p className="slide-in">Na Jošanici</p>
        <img className="slide-in" src="images/domaca.png" alt="domaca" />
      </div>
      <div className="about" id="about-res">
        <div className="about-res">
          <h2>Dobro došli u restoran</h2>
          <h3>NA JOŠANICI</h3>
          <p>
            Restoran <span>Na Jošanici</span> pozicioniran je u samom centru
            Jošaničke Banje, na ušću dveju reka. Za sve one koji u podnožju
            Kopaonika žele da uživaju u nacionalnoj kuhinji, dobroj hrani,
            profesionalnom osoblju i prelepom ambijentu... Sobe{" "}
            <span>Na Jošanici</span> predstavljaju idealno mesto za porodični
            odmor u Banji, koja prirodom i vodom budi zdravlje.
          </p>
        </div>

        <div className="about-image">
          <img
            className="about-img"
            src="images/hrana.png"
            alt="food"
            width={"500px"}
          />
        </div>
      </div>
    </div>
  );
};
