import "./Gallery.css";
import {ImageContainer} from "./SingleImage";


const Gallery = () => {
  const foodItems = [
    { src: "images/hrana1.jpg", alt: "hrana1", overlayText: "Miks mesa u pogači" },
    { src: "images/hrana2.jpg", alt: "hrana2", overlayText: "Rolovano belo meso" },
    { src: "images/hrana3.jpg", alt: "hrana3", overlayText: "Dimljena vešalica" },
    { src: "images/hrana4.jpg", alt: "hrana4", overlayText: "Teletina ispod sača" },
    { src: "images/hrana5.jpg", alt: "hrana5", overlayText: "Predjelo 'Na Jošanici'" },
    { src: "images/hrana6.jpg", alt: "hrana6", overlayText: "Dimljeni vrat u sosu od pečuraka" },
    { src: "images/hrana7.jpeg", alt: "hrana7", overlayText: "Mešano meso" },
    { src: "images/hrana8.jpg", alt: "hrana8", overlayText: "Carbonara" }
  ];

  return (
    <div className="gallery-header" id='gallery'>
      <h1>Pogledajte šta Vas čeka u</h1>
      <p>Restoranu Na Jošanici</p>
      <img className="img-icon" src="images/icon.png" alt="icon" />
      <div className="gallery">
        {foodItems.map((food, index) => (
          <ImageContainer key={index} src={food.src} alt={food.alt} overlayText={food.overlayText} />
        ))}
      </div>
    </div>
  );
};

export {Gallery};
