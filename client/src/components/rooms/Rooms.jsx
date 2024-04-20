import React from "react";
import { Header } from "../layout/header/Header.jsx";
import { Footer } from "../layout/footer/Footer.jsx";
import { SingleImageRoom } from "./SingleImageRoom.jsx";
import { ImageUploadForm } from "../layout/gallery/ImageUploadForm.jsx";
import { RoomsContainer } from "./RoomsContainer.jsx";
import { RoomsInfo } from "./RoomsInfo.jsx";

import { FaWifi } from "react-icons/fa";
import { FaParking } from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";

import "./Rooms.css";

import { useAuthContext } from "../../context/authContext";
import { useGetImages } from "../../hooks/useGetImagesGallery.js";

export const Rooms = () => {
  const { authUser } = useAuthContext();
  const { images, handleDeleteImage, uploadHandler } = useGetImages();
  const roomImages = images.filter((room) => room.category === "soba");

  return (
    <>
      <Header />
      <div className="rooms-page">
        <h1>Sobe na Jošanici</h1>
        <RoomsContainer />
        <RoomsInfo />
        <div className="gallery-room">
          {roomImages.map((room) => (
            <SingleImageRoom
              key={room._id}
              src={`/images/${room.imagePath}`}
              alt={room.alt}
              overlayText={room.overlayText}
              id={room._id}
              handleDeleteImage={handleDeleteImage}
            />
          ))}
        </div>

        {authUser && <ImageUploadForm handleSubmit={uploadHandler} />}

        <div className="icons">
          <FaParking />
          <FaWifi />
          <GiForkKnifeSpoon />
        </div>
      </div>
      <Footer />
    </>
  );
};
