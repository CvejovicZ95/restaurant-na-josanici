import {useEffect,useState} from 'react'
import { toast } from 'react-toastify';
import { getAllRooms, updateRoom } from '../api/roomsApi';

export const useGetRoom = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getAllRooms(); 
        setRooms(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchRooms();
  }, [rooms]);

  const updateRoomHandler = async (id, updatedName, updatedAbout, updatedPrice, updatedInfo) => {
    try {
      await updateRoom(id, updatedName, updatedAbout, updatedPrice, updatedInfo);
      const updatedRooms = rooms.map(item => item._id === id ? { ...item, name: updatedName, about: updatedAbout, price: updatedPrice, info: updatedInfo } : item);
      setRooms(updatedRooms);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { rooms, updateRoomHandler };
};