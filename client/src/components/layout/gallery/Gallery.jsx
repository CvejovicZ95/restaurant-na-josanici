import React, { useState, useEffect } from "react";
import "./Gallery.css";
import { ImageContainer } from "./SingleImage";
import { useGetImages } from "../../../hooks/useGetImagesGallery.js";
import { useAuthContext } from "../../../context/authContext.js";
import { FaUpload } from "react-icons/fa";

export const Gallery = () => {
  const { images, handleDeleteImage, uploadHandler } = useGetImages();
  const { authUser } = useAuthContext();

  const [completed, setCompleted] = useState(false);
  const [overlayText, setOverlayText] = useState("");
  const [alt, setAlt] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("food");

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

  const foodImages = images.filter((image) => image.category === "food");

  return (
    <div className="gallery-header" id="gallery">
      <h1>Pogledajte šta Vas čeka u</h1>
      <p>Restoranu Na Jošanici</p>
      <img className="img-icon" src="images/icon.png" alt="icon" />
      <div className="gallery">
        {foodImages.map((image) => (
          <ImageContainer
            key={image._id}
            src={`/images/${image.imagePath}`}
            alt={image.alt}
            overlayText={image.overlayText}
            id={image._id}
            handleDeleteImage={handleDeleteImage}
          />
        ))}
      </div>
      {authUser && (
        <div className="div-form">
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
              placeholder="kategorija"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled
              style={{ display: "none" }}
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
        </div>
      )}
    </div>
  );
};
