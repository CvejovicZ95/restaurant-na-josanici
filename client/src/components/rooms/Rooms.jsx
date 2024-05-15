import React from "react";
import { Header } from "../layout/header/Header";
import { Footer } from "../layout/footer/Footer";
import { SingleImageRoom } from "./SingleImageRoom";
import { ImageUploadForm } from "../layout/gallery/ImageUploadForm";
import { RoomsContainer } from "./RoomsContainer";
import { RoomsInfo } from "./RoomsInfo";

import { FaWifi } from "react-icons/fa";
import { FaParking } from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";

import "./Rooms.css";

import { useAuthContext } from "../../context/authContext";
import { useGetImages } from "../../hooks/useGetImagesGallery";

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
              src={`${process.env.API_BASE_URL}/images/${room.imagePath}`}
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
