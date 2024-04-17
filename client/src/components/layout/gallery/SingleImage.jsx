import React from "react";
import "./Gallery.css";
import PropTypes from "prop-types";

export const ImageContainer = ({ src, alt, overlayText }) => (
  <div className="image-container">
    <img src={src} alt={alt} />
    <div className="overlay-text">{overlayText}</div>
  </div>
);
ImageContainer.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  overlayText: PropTypes.string.isRequired,
};
