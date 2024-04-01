import React from 'react';

const Gallery = () => {
  return (
    <div className="gallery-header" id='gallery'>
      <h1>Pogledajte šta Vas čeka u</h1>
      <p>Restoranu Na Jošanici</p>
      <img className="img-icon" src="images/icon.png" alt="icon" />
      <div className="gallery">
        <div className="image-container">
          <img src="images/hrana1.jpg" alt="hrana1" />
          <div className="overlay-text">Miks mesa u pogači</div>
        </div>
        <div className="image-container">
          <img src="images/hrana2.jpg" alt="hrana2" />
          <div className="overlay-text">Rolovano belo meso</div>
        </div>
        <div className="image-container">
          <img src="images/hrana3.jpg" alt="hrana3" />
          <div className="overlay-text">Dimljena vešalica</div>
        </div>
        <div className="image-container">
          <img src="images/hrana4.jpg" alt="hrana4" />
          <div className="overlay-text">Teletina ispod sača</div>
        </div>
        <div className="image-container">
          <img src="images/hrana5.jpg" alt="hrana5" />
          <div className="overlay-text">Predjelo <br/>"Na Jošanici"</div>
        </div>
        <div className="image-container">
          <img src="images/hrana6.jpg" alt="hrana6" />
          <div className="overlay-text">Dimljeni vrat u sosu od pečuraka</div>
        </div>
        <div className="image-container">
          <img src="images/hrana7.jpeg" alt="hrana7" />
          <div className="overlay-text">Mešano meso</div>
        </div>
        <div className="image-container">
          <img src="images/hrana8.jpg" alt="hrana8" />
          <div className="overlay-text">Carbonara</div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
