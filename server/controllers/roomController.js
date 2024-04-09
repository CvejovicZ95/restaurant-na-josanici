import { createNewRoom, getRooms, getRoomFromId, updateRoomById } from "../service/roomService.js";

export const createRoom = async (req, res) => {
  try {
    const { name, price, about, imagePath, info } = req.body;
    const newRoom = await createNewRoom(name, price, about, imagePath, info);
    res.status(201).json(newRoom);
  } catch (error) {
    console.error('Error in createRoom controller:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAllRooms = async (req, res) => {
  try {
    const allRooms = await getRooms();
    res.status(200).json(allRooms);
  } catch (error) {
    console.error('Error in getAllRooms controller:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getRoomById = async (req, res) => {
  try {
    const roomId = req.params.id;
    const room = await getRoomFromId(roomId);
    res.status(200).json(room);
  } catch (error) {
    console.error('Error in getRoomById controller:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const roomId = req.params.id;
    const updatedRoom = await updateRoomById(roomId, req.body);
    res.status(200).json(updatedRoom);
  } catch (error) {
    console.error('Error in updateRoom controller:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

