import "./Gallery.css";

export const ImageContainer = ({ src, alt, overlayText }) => (
  <div className="image-container">
    <img src={src} alt={alt} />
    <div className="overlay-text">{overlayText}</div>
  </div>
);
