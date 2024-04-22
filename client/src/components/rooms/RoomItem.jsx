import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { scrollToTop } from "../../hooks/useScrollToTop";
import config from "../../config.json";

export const RoomItem = ({
  room,
  authUser,
  handleUpdate,
  selectedRoom,
  updatedName,
  setUpdatedName,
  updatedAbout,
  setUpdatedAbout,
  updatedPrice,
  setUpdatedPrice,
  updatedInfo,
  setUpdatedInfo,
  handleSaveUpdate,
}) => {
  return (
    <div key={room._id} className="room">
      <img
        src={`${config.API_BASE_URL}/images/${room.imagePath}`}
        alt={`room`}
        width="400px"
      />
      <div className="overlay-text">Od {room.price}€ po noći</div>
      <p>{room.name}</p>
      <div className="reserve-button">
        <span>({room.info})</span>
        <span>{room.price}€/noć</span>
        <Link to={`/reservation/${room._id}`} onClick={scrollToTop}>
          <button>Rezerviši sobu</button>
        </Link>
      </div>
      {authUser && (
        <div>
          <button
            style={{ backgroundColor: "blue" }}
            className="admin-button"
            onClick={() => handleUpdate(room)}
          >
            Promeni
          </button>
        </div>
      )}

      {selectedRoom && selectedRoom._id === room._id && (
        <div className="update-div-room">
          <input
            className="update-input"
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            placeholder="Naziv sobe"
          />
          <textarea
            className="update-area"
            value={updatedAbout}
            onChange={(e) => setUpdatedAbout(e.target.value)}
            placeholder="Opis sobe"
            disabled
            style={{ display: "none" }}
          />
          <input
            className="update-input"
            type="text"
            value={updatedInfo}
            onChange={(e) => setUpdatedInfo(e.target.value)}
            placeholder="Cena"
          />
          <input
            className="update-input"
            type="text"
            value={updatedPrice}
            onChange={(e) => setUpdatedPrice(e.target.value)}
            placeholder="Cena"
          />
          <button
            style={{ backgroundColor: "green" }}
            className="admin-button"
            onClick={() => handleSaveUpdate(room._id)}
          >
            Sačuvaj
          </button>
        </div>
      )}
    </div>
  );
};

RoomItem.propTypes = {
  room: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
  }).isRequired,
  authUser: PropTypes.any,
  handleUpdate: PropTypes.func.isRequired,
  selectedRoom: PropTypes.any,
  updatedName: PropTypes.string.isRequired,
  setUpdatedName: PropTypes.func.isRequired,
  updatedAbout: PropTypes.string,
  setUpdatedAbout: PropTypes.func.isRequired,
  updatedPrice: PropTypes.string.isRequired,
  setUpdatedPrice: PropTypes.func.isRequired,
  updatedInfo: PropTypes.string.isRequired,
  setUpdatedInfo: PropTypes.func.isRequired,
  handleSaveUpdate: PropTypes.func.isRequired,
};
