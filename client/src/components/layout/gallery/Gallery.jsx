import React from "react";
import "./Gallery.css";
import { ImageContainer } from "./SingleImage";
import { useGetImages } from "../../../hooks/useGetImagesGallery.js";
import { useAuthContext } from "../../../context/authContext.js";
import { ImageUploadForm } from "./ImageUploadForm.jsx";

export const Gallery = () => {
  const { images, handleDeleteImage, uploadHandler } = useGetImages();
  const { authUser } = useAuthContext();

  const foodImages = images.filter((image) => image.category === "hrana");

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
          <ImageUploadForm handleSubmit={uploadHandler} />
        </div>
      )}
    </div>
  );
};
