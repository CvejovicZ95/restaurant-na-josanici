import React, { useState } from "react";
import { useGetRoom } from "../../hooks/useGetRoom";
import { scrollToTop } from "../../hooks/useScrollToTop";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const RoomsContainer = () => {
  const { authUser } = useAuthContext();
  const { rooms, updateRoomHandler } = useGetRoom();

  const [updatedName, setUpdatedName] = useState("");
  const [updatedAbout, setUpdatedAbout] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [updatedInfo, setUpdatedInfo] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  // eslint-disable-next-line
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = (item) => {
    setSelectedRoom(item);
    setUpdatedName(item.name);
    setUpdatedAbout(item.about);
    setUpdatedPrice(item.price);
    setUpdatedInfo(item.info);
  };

  const handleSaveUpdate = async (id) => {
    try {
      await updateRoomHandler(
        id,
        updatedName,
        updatedAbout,
        updatedPrice,
        updatedInfo,
      );
      setSelectedRoom(null);
      setIsUpdating(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="rooms-container">
      {rooms && rooms.length > 0 ? (
        rooms.map((room) => (
          <div key={room._id} className="room">
            <img src={room.imagePath} alt={`room`} width="400px" />
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
        ))
      ) : (
        <p>No rooms available</p>
      )}
    </div>
  );
};
