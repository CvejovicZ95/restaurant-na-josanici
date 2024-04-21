import React, { useState } from "react";
import { useGetRoom } from "../../hooks/useGetRoom";
import { useAuthContext } from "../../context/authContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RoomItem } from "./RoomItem";

export const RoomsContainer = () => {
  const { authUser } = useAuthContext();
  const { rooms, updateRoomHandler } = useGetRoom();

  const [updatedName, setUpdatedName] = useState("");
  const [updatedAbout, setUpdatedAbout] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [updatedInfo, setUpdatedInfo] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);

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
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="rooms-container">
      {rooms && rooms.length > 0 ? (
        rooms.map((room) => (
          <RoomItem
            key={room._id}
            room={room}
            authUser={authUser}
            handleUpdate={handleUpdate}
            selectedRoom={selectedRoom}
            updatedName={updatedName}
            setUpdatedName={setUpdatedName}
            updatedAbout={updatedAbout}
            setUpdatedAbout={setUpdatedAbout}
            updatedPrice={updatedPrice}
            setUpdatedPrice={setUpdatedPrice}
            updatedInfo={updatedInfo}
            setUpdatedInfo={setUpdatedInfo}
            handleSaveUpdate={handleSaveUpdate}
          />
        ))
      ) : (
        <p>No rooms available</p>
      )}
    </div>
  );
};
