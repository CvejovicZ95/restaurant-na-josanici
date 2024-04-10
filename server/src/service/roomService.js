import { Room } from '../models/roomSchema.js';

export const createNewRoom = async (name, price, about, imagePath, info) => {
  try {
    const newRoom = new Room({ name, price, about, imagePath, info });
    await newRoom.save();
    return newRoom;
  } catch (error) {
    throw new Error('Error creating room');
  }
};

export const getRooms = async () => {
  try {
    const allRooms = await Room.find();
    return allRooms;
  } catch (error) {
    throw new Error('Error getting rooms');
  }
};

export const getRoomFromId = async (roomId) => {
  try {
    const room = await Room.findById(roomId);
    if (!room) {
      throw new Error('Room not found');
    }
    return room;
  } catch (error) {
    throw new Error('Error getting room by id');
  }
};

export const updateRoomById = async (roomId, newData) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(roomId, newData, { new: true });
    if (!updatedRoom) {
      throw new Error('Room not found');
    }
    return updatedRoom;
  } catch (error) {
    throw new Error('Error updating room');
  }
};
