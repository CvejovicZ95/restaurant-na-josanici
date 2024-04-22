import React, { useState } from "react";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";
import config from "../../config.json";

export const RoomsInfo = () => {
  const reviews = [
    config.review1,
    config.review2,
    config.review3,
    config.review4,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1,
    );
  };

  const nextReview = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <div className="rooms-info">
      <div className="rooms-info-left">
        <h2>O sobama Na Jošanici</h2>
        <p>
          Dobrodošli u naš udobni smeštaj smješten u srcu Josaničke Banje,
          okružen planinskim pejzažima i blizu mnogih atrakcija koje ovaj region
          nudi. Naš kompleks nudi udobne sobe koje su idealne za opuštanje nakon
          istraživanja lokalnih znamenitosti ili uživanja u aktivnostima na
          otvorenom.
        </p>

        <p>
          U našem kompleksu imamo različite opcije ishrane kako bismo
          zadovoljili različite potrebe naših gostiju. Možete izabrati između{" "}
          <span>polupansiona</span> ili <span>punog pansiona</span>, ili
          jednostavno uživati u smeštaju bez obroka.
        </p>

        <p>
          Sobe se nalaze blizu lečilišta, udaljene svega 100 metara od smeštaja.
          Ovdje možete uživati u raznim tretmanima i terapijama koje će vam
          pružiti osjećaj potpunog blagostanja i relaksacije. Takođe, otvoreni
          bazen je idealno mesto za osveženje i uživanje.
        </p>

        <p>
          Akva park `Draguljica` je takođe udaljen samo 100 metara od našeg
          smeštaja. To je savršeno mesto za sve uzraste, gde se možete zabaviti
          na različitim toboganima i atrakcijama.
        </p>
      </div>
      <div className="rooms-info-right">
        <h2>Rekli su o našim sobama</h2>
        <div className="reviews">
          <button onClick={prevReview}>
            <FaAngleDoubleLeft className="arrows" id="left" />
          </button>
          <p className="solo-review">{reviews[currentIndex]}</p>
          <button onClick={nextReview}>
            <FaAngleDoubleRight className="arrows" id="right" />
          </button>
        </div>
      </div>
    </div>
  );
};
