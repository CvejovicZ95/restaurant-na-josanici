import React from "react";
import "./Rooms.css";
import PropTypes from "prop-types";
import { useAuthContext } from "../../context/authContext";
import { toast } from "react-toastify";
import { useGetImages } from "../../hooks/useGetImagesGallery";

export const SingleImageRoom = ({ src, alt, overlayText, id }) => {
  const { authUser } = useAuthContext();
  const { handleDeleteImage } = useGetImages();

  const handleDelete = async () => {
    const confirmed = window.confirm("Da li želite da obrišete sliku?");
    if (confirmed) {
      try {
        await handleDeleteImage(id);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="image-container-room">
      <img src={src} alt={alt} key={id} />
      <div className="overlay-text">{overlayText}</div>
      {authUser && (
        <button
          style={{ backgroundColor: "red" }}
          className="admin-button"
          onClick={handleDelete}
        >
          Obriši
        </button>
      )}
    </div>
  );
};

SingleImageRoom.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  overlayText: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
