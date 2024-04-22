import React, { useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa";
import PropTypes from "prop-types";

export const ImageUploadForm = ({ handleSubmit: uploadHandler }) => {
  const [overlayText, setOverlayText] = useState("");
  const [alt, setAlt] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setImage(imageFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadHandler({ overlayText, alt, image, category });
    setCompleted(true);
  };

  useEffect(() => {
    if (completed) {
      setOverlayText("");
      setAlt("");
      setImage(null);
    }
  }, [completed]);

  return (
    <form className="upload-image-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="overlayText"
        placeholder="Opis"
        value={overlayText}
        onChange={(e) => setOverlayText(e.target.value)}
      />
      <input
        type="text"
        name="alt"
        placeholder="Naziv"
        value={alt}
        onChange={(e) => setAlt(e.target.value)}
      />
      <input
        type="text"
        name="category"
        placeholder="Kategorija (hrana/soba)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <div className="upload-wrapper">
        <span className="upload-icon">
          <FaUpload />
        </span>
        <span className="upload-label">Choose image:</span>
        <input
          type="file"
          name="image"
          className="upload-file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {image && <p>Selected image: {image.name}</p>}
      </div>
      <button
        style={{ backgroundColor: "green" }}
        className="admin-button"
        type="submit"
      >
        Dodaj sliku
      </button>
    </form>
  );
};

ImageUploadForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
