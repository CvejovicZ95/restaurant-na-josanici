import React from "react";
import "./Rooms.css";
import PropTypes from "prop-types";

export const SingleImageRoom = ({ src, alt }) => (
  <div className="image-container-room">
    <img src={src} alt={alt} />
  </div>
);
SingleImageRoom.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
