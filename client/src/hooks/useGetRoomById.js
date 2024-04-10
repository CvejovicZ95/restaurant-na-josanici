import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getRoomById, getReservedDates } from '../api/roomByIdApi';

const useGetRoomById = (id) => {
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState(null);
  const [reservedDates, setReservedDates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomData = await getRoomById(id); 
        setRoom(roomData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching room:', error);
        toast.error(error.message);
      }
    };

    const fetchReservedDatesData = async () => {
      try {
        const reservedDatesData = await getReservedDates(id);
        setReservedDates(reservedDatesData);
      } catch (error) {
        console.error('Error fetching reserved dates:', error);
        toast.error(error.message);
      }
    };

    fetchData();
    fetchReservedDatesData();
  }, [id]);

  return { loading, room, reservedDates };
};

export { useGetRoomById };